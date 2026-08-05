"use client";

import { EXPERIENCE, SkillNames, SKILLS } from "@/data/constants";
import { SectionHeader } from "./section-header";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import SectionWrapper from "../ui/section-wrapper";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect, useMemo } from "react";
import { Eye, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";

const INITIAL_VISIBLE_COUNT = 2;

const ExperienceSection = () => {
  const [selectedCertImage, setSelectedCertImage] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleExperiences = useMemo(
    () => (showAll ? EXPERIENCE : EXPERIENCE.slice(0, INITIAL_VISIBLE_COUNT)),
    [showAll]
  );
  const hasMore = EXPERIENCE.length > INITIAL_VISIBLE_COUNT;

  // ESC key support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCertImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedCertImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedCertImage]);

  return (
    <SectionWrapper
      className="flex flex-col items-center justify-center min-h-[120vh] py-20"
    >
      <div className="w-full max-w-4xl px-4 md:px-8 mx-auto">
        <SectionHeader
          id="experience"
          title="Certifications & Achievements"
          desc="My learning path and credentials."
          className="mb-12 md:mb-20 mt-0"
        />

        <div className="flex flex-col gap-8 md:gap-12 relative">
          {/* Connector Line - simplified to a subtle border */}
          <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-px bg-border hidden md:block -translate-x-1/2" />

          <AnimatePresence initial={false}>
            {visibleExperiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="relative"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <ExperienceCard 
                  experience={exp} 
                  index={index} 
                  onViewCertificate={() => {
                    if (exp.certificateImage) {
                      setSelectedCertImage(exp.certificateImage);
                    }
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Show More / Show Less */}
          {hasMore && (
            <motion.div
              className="flex justify-center pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="group gap-2 px-8 rounded-full border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-300 shadow-sm hover:shadow-md"
                onClick={() => setShowAll((prev) => !prev)}
              >
                <span className="text-sm font-medium">
                  {showAll ? "Show Less" : `Show More (${EXPERIENCE.length - INITIAL_VISIBLE_COUNT})`}
                </span>
                <motion.span
                  animate={{ rotate: showAll ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex"
                >
                  <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
                </motion.span>
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Modern Modal / Lightbox */}
      <AnimatePresence>
        {selectedCertImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 backdrop-blur-md bg-black/80"
            onClick={() => setSelectedCertImage(null)}
          >
            {/* Close button (top right) */}
            <button 
              className="absolute top-4 right-4 md:top-8 md:right-8 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              onClick={() => setSelectedCertImage(null)}
            >
              <X size={24} />
            </button>

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent outside-click close when clicking image
            >
              <img 
                src={selectedCertImage} 
                alt="Certificate" 
                loading="lazy"
                className="w-full h-full max-h-[90vh] object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
};

const ExperienceCard = ({
  experience,
  index,
  onViewCertificate,
}: {
  experience: (typeof EXPERIENCE)[0];
  index: number;
  onViewCertificate: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Card
        className={cn(
          "bg-card text-card-foreground border-border",
          "hover:border-primary/20 transition-colors duration-300",
          "shadow-sm hover:shadow-md"
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold tracking-tight">
                {experience.title}
              </CardTitle>
              <div className="text-base font-medium text-muted-foreground">
                {experience.company}
              </div>
            </div>
          </div>
        </CardHeader>
        {(experience.description?.length || experience.skills?.length || experience.certificateImage) ? (
          <CardContent className="space-y-6">
            {experience.description && experience.description.length > 0 && (
              <ul className="list-disc list-outside ml-4 space-y-2 text-base text-muted-foreground leading-relaxed">
                {experience.description.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            )}

            {experience.skills && experience.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skillName) => {
                  const skill = SKILLS[skillName as SkillNames];
                  return (
                    <Badge
                      key={skillName}
                      variant="outline"
                      className="gap-2 text-xs font-normal bg-secondary/30 hover:bg-secondary/50 transition-colors border-transparent"
                    >
                      <img
                        src={skill.icon}
                        alt={skill.label}
                        className="w-3.5 h-3.5 object-contain opacity-80"
                      />
                      {skill.label}
                    </Badge>
                  );
                })}
              </div>
            )}

            {experience.certificateImage && (
              <div className="pt-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="gap-2 text-xs shadow-sm hover:bg-primary hover:text-primary-foreground transition-all"
                  onClick={onViewCertificate}
                >
                  <Eye size={14} />
                  View Certificate
                </Button>
              </div>
            )}
          </CardContent>
        ) : null}
      </Card>
    </motion.div>
  );
};

export default ExperienceSection;

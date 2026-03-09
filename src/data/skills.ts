export interface SkillCategory {
  name: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    skills: ["Python", "JavaScript", "TypeScript", "SQL"],
  },
  {
    name: "Frontend",
    skills: ["React", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    name: "Backend",
    skills: ["FastAPI", "REST APIs"],
  },
  {
    name: "Databases",
    skills: ["PostgreSQL", "SQLite", "Supabase"],
  },
  {
    name: "Tools",
    skills: ["Git", "Linux"],
  },
  {
    name: "Learning Next",
    skills: ["Redis", "Celery", "System Design", "AWS"],
  },
];

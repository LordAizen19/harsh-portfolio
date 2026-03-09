export interface Project {
  name: string;
  description: string;
  features: string[];
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
}

export const projects: Project[] = [
  {
    name: "TaskScore",
    description:
      "A gamified productivity tracker where users create tasks with deadlines and gain or lose coins depending on completion time.",
    features: [
      "Task management",
      "Coin-based scoring system",
      "AI productivity summaries",
      "Weekly and monthly statistics",
    ],
    techStack: ["React", "TypeScript", "Supabase", "Tailwind CSS"],
    githubUrl: "https://github.com",
    demoUrl: "https://example.com",
  },
];

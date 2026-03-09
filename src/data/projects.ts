export interface Project {
  name: string;
  description: string;
  features: string[];
  techStack: string[];
  learned: string[];
  githubUrl: string;
  demoUrl?: string;
}

export const projects: Project[] = [
  {
    name: "TaskScore",
    description:
      "A gamified productivity tracker where users create tasks with deadlines and gain or lose coins depending on completion time. Built with a focus on real-time updates and clean UX.",
    features: [
      "Task management with deadlines",
      "Coin-based scoring & rewards system",
      "AI-powered productivity summaries",
      "Weekly and monthly statistics dashboard",
    ],
    techStack: ["React", "TypeScript", "Supabase", "Tailwind CSS"],
    learned: [
      "Real-time database subscriptions with Supabase",
      "Gamification patterns for user engagement",
      "Building responsive dashboards with Recharts",
    ],
    githubUrl: "https://github.com",
    demoUrl: "https://example.com",
  },
];

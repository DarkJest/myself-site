export interface IPortfolioItem {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    images: string[];
    technologies: string[];
    demoUrl?: string;
    repoUrl?: string;
    featured: boolean;
    createdAt: string;
}
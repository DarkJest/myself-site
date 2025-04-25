export interface IBlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featuredImage: string;
    categories: IBlogCategory[];
    tags: string[];
    publishedAt: string;
    updatedAt: string;
}

export interface IBlogCategory {
    id: string;
    name: string;
    slug: string;
}
import { httpClient } from '../apiClient';
import { API_ENDPOINTS } from '../endpoints';
import { IBlogPost, IBlogCategory } from '@/types/blog.types';

export interface IBlogService {
    getPosts(page?: number, limit?: number): Promise<{ posts: IBlogPost[], total: number }>;
    getPostBySlug(slug: string): Promise<IBlogPost>;
    getCategories(): Promise<IBlogCategory[]>;
}

export class BlogService implements IBlogService {
    async getPosts(page = 1, limit = 10): Promise<{ posts: IBlogPost[], total: number }> {
        return httpClient.get<{ posts: IBlogPost[], total: number }>(
            `${API_ENDPOINTS.BLOG}?page=${page}&limit=${limit}`
        );
    }

    async getPostBySlug(slug: string): Promise<IBlogPost> {
        return httpClient.get<IBlogPost>(`${API_ENDPOINTS.BLOG}/${slug}`);
    }

    async getCategories(): Promise<IBlogCategory[]> {
        return httpClient.get<IBlogCategory[]>(`${API_ENDPOINTS.BLOG}/categories`);
    }
}

export const blogService = new BlogService();
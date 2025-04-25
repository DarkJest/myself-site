import { httpClient } from '../apiClient';
import { API_ENDPOINTS } from '../endpoints';
import { IPortfolioItem } from '@/types/portfolio.types';

export interface IPortfolioService {
    getProjects(): Promise<IPortfolioItem[]>;
    getProjectById(id: string): Promise<IPortfolioItem>;
}

export class PortfolioService implements IPortfolioService {
    async getProjects(): Promise<IPortfolioItem[]> {
        return httpClient.get<IPortfolioItem[]>(API_ENDPOINTS.PORTFOLIO);
    }

    async getProjectById(id: string): Promise<IPortfolioItem> {
        return httpClient.get<IPortfolioItem>(`${API_ENDPOINTS.PORTFOLIO}/${id}`);
    }
}

export const portfolioService = new PortfolioService();
import axios from 'axios';
import type { HalCollection, HalResource } from '@/hal/types.ts';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        Accept: 'application/hal+json',
    },
});

export async function fetchCollection<T>(endpoint: string): Promise<HalResource<T>[]> {
    const response = await apiClient.get<HalCollection<T>>(endpoint);

    const embedded = response.data._embedded;
    if (!embedded) return [];

    const values = Object.values(embedded);
    const first = values[0];
    return first ?? [];
}

export async function createResource<T>(endpoint: string, data: T) {
    return await apiClient.post(endpoint, data);
}

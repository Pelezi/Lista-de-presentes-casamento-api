import { injectable, inject } from 'tsyringe';

import { BaseService } from './BaseService';
import { BaseRepository } from './BaseRepository';

@injectable()
export class BaseServiceImpl<T, U, V> implements BaseService<T, U, V> {
    
    constructor(
        @inject('BaseRepository')
        private baseRepository: BaseRepository<T, U, V>
    ) {}

    async getItems(): Promise<T[]> {
        return this.baseRepository.getItems();
    }

    async getItemById(id: number): Promise<T> {
        return this.baseRepository.getItemById(id);
    }

    async getItemByUuid(uuid: string): Promise<T> {
        return this.baseRepository.getItemByUuid(uuid);
    }

    async createItem(item: U): Promise<T> {
        return this.baseRepository.createItem(item);
    }

    async updateItem(id: number, item: V): Promise<T> {
        return this.baseRepository.updateItem(id, item);
    }

    async updateItemByUuid(uuid: string, item: V): Promise<T> {
        return this.baseRepository.updateItemByUuid(uuid, item);
    }

    async deleteItem(id: number): Promise<void> {
        return this.baseRepository.deleteItem(id);
    }

    async deleteItemByUuid(uuid: string, item: string): Promise<void> {
        return this.baseRepository.deleteItemByUuid(uuid, item);
    }
}

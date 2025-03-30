import { Repository, EntityTarget, FindOptionsWhere, DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { BaseRepository } from './BaseRepository';

import dataSource from '../../config/database/typeorm/data-source';

export class BaseRepositoryImpl<T, U, V> implements BaseRepository<T, U, V> {
    private primaryKey: keyof T;
    // uso de protected com o intuito de pegar os metodos e variaveis, estendendo da class pai
    protected typeormRepository: Repository<T>;

    constructor(primaryKey: keyof T, entityType: EntityTarget<T>) {
        this.primaryKey = primaryKey;
        this.typeormRepository = dataSource.getRepository(entityType);
    }

    async getItems(): Promise<T[]> {
        const metadata = this.typeormRepository.metadata;
        const hasCreatedAtColumn = metadata.columns.some(column => column.propertyName === 'createdAt');
    
        if (hasCreatedAtColumn) {
            const order: any = {
                createdAt: 'DESC'
            };
            return await this.typeormRepository.find({ order });
        } else {
            return await this.typeormRepository.find();
        }
    }
    
    async findOne(condition: FindOptionsWhere<T>): Promise<T | null> {
        return await this.typeormRepository.findOne({ where: condition });
    }
    
    async getItemById(id: number): Promise<T> {
        const item =  await this.typeormRepository.findOne({ 
            where: { [this.primaryKey]: id } as FindOptionsWhere<T> 
        });

        if (!item) {
            throw new Error(`Registro não encontrado!`);
        }
        
        return item;
    }

    async getItemByUuid(uuid: string): Promise<T> {
        const item =  await this.typeormRepository.findOne({
            where: { [this.primaryKey]: uuid } as FindOptionsWhere<T>
        });

        if (!item) {
            throw new Error(`Registro não encontrado!`);
        }

        return item;

    }

    async createItem(item: U): Promise<T> {
        const newItem = this.typeormRepository.create(item as DeepPartial<T>);

        return await this.typeormRepository.save(newItem);
    }

    async updateItem(id: number, item: V): Promise<T> {
        await this.typeormRepository.update(id, item as QueryDeepPartialEntity<T>);

        return await this.getItemById(id);
    }

    async updateItemByUuid(uuid: string, item: V): Promise<T> {
        await this.typeormRepository.update(uuid, item as QueryDeepPartialEntity<T>);

        return await this.getItemByUuid(uuid);
    }

    async deleteItem(id: number): Promise<void> {

        await this.typeormRepository.delete(id);
    }

    async deleteItemByUuid(uuid: string, item: string): Promise<void> {
        console.log("item:", item);

        await this.typeormRepository.delete(uuid);
    }

}

export interface BaseService<T, U, V> {
    getItems(): Promise<T[]>;
    getItemById(id: number): Promise<T>;
    getItemByUuid(uuid: string): Promise<T>;
    createItem(item: U): Promise<T>;
    updateItem(id: number, item: V): Promise<T>;
    updateItemByUuid(uuid: string, item: V): Promise<T>;
    deleteItem(id: number): Promise<void>;
    deleteItemByUuid(uuid: string, item: string): Promise<void>;
}

export interface IBaseRepository<T, K = Partial<T>> {
	findById(id: string): Promise<T | null>
	findAll(): Promise<T[]>
	create(data: K): Promise<T>
	updateById(id: string, data: Partial<K>): Promise<T>
	deleteById(id: string): Promise<T>
}

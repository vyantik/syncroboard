/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common'

@Injectable()
export abstract class BaseRepository<T> {
	public constructor(protected readonly model: any) {}

	public async findById(id: string): Promise<T | null> {
		return await this.model.findUnique({ where: { id } })
	}

	public async findAll(): Promise<T[]> {
		return await this.model.findMany()
	}

	public async create(data: Partial<T>): Promise<T> {
		return await this.model.create({ data })
	}

	public async deleteById(id: string): Promise<T> {
		return await this.model.delete({ where: { id } })
	}

	public async updateById(id: string, data: Partial<T>): Promise<T> {
		return await this.model.update({ where: { id }, data })
	}
}

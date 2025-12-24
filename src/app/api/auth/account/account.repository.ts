import { Injectable } from '@nestjs/common'
import type { Prisma, User } from '@prisma'

import { BaseRepository } from '@/src/shared'

import type { IAccountRepository } from './interfaces'

@Injectable()
export class AccountRepository
	extends BaseRepository<
		User,
		Prisma.UserCreateInput,
		Prisma.UserUpdateInput,
		Prisma.UserWhereInput,
		Prisma.UserWhereUniqueInput
	>
	implements IAccountRepository
{
	protected get model() {
		return this.prismaService.user
	}

	public async findById(userId: string): Promise<User | null> {
		return await this.findUnique({ id: userId })
	}

	public async findByEmail(email: string): Promise<User | null> {
		return await this.findUnique({ email })
	}

	public async findByUsername(username: string): Promise<User | null> {
		return await this.findUnique({ username })
	}

	public async createUser(data: Prisma.UserCreateInput): Promise<User> {
		return await this.create({ ...data })
	}

	public async updateUser(
		userId: string,
		data: Prisma.UserUpdateInput,
	): Promise<User> {
		return await this.update({ id: userId }, { ...data })
	}

	public async deleteUser(userId: string): Promise<User> {
		return await this.delete({ id: userId })
	}

	public async findOne(
		input: Prisma.UserFindUniqueArgs,
	): Promise<User | null> {
		return this.model.findUnique(input)
	}

	public async findMany(where?: Prisma.UserWhereInput): Promise<User[]> {
		return this.model.findMany({ where })
	}

	public async findFirst(
		where?: Prisma.UserWhereInput,
	): Promise<User | null> {
		return this.model.findFirst({ where })
	}
}

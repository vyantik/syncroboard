import { Inject, Injectable } from '@nestjs/common'
import type { Board, Prisma, Task, User } from '@prisma'

import { BaseRepository } from '@/src/shared'

import { PrismaService } from '../../infra'

import type { IBoardRepository } from './board/interfaces'
import { BOARD_REPOSITORY_TOKEN } from './board/tokens'
import type { IAccountRepository } from './interfaces'

@Injectable()
export class AccountRepository
	extends BaseRepository<User>
	implements IAccountRepository
{
	public constructor(
		protected readonly prismaService: PrismaService,
		@Inject(BOARD_REPOSITORY_TOKEN)
		private readonly boardRepository: IBoardRepository,
	) {
		super(prismaService.user)
	}

	public async findByEmail(email: string): Promise<User | null> {
		return await this.prismaService.user.findUnique({ where: { email } })
	}

	public async findByUsername(username: string): Promise<User | null> {
		return await this.prismaService.user.findUnique({ where: { username } })
	}

	public async deleteUser(userId: string): Promise<User> {
		return await this.deleteById(userId)
	}

	public async findOne(
		input: Prisma.UserWhereUniqueInput,
		select?: Prisma.UserSelect,
	): Promise<User | null> {
		return this.prismaService.user.findUnique({
			where: input,
			select,
		})
	}

	public async findFirst(
		where?: Prisma.UserWhereInput,
		select?: Prisma.UserSelect,
	): Promise<User | null> {
		return this.prismaService.user.findFirst({ where, select })
	}

	public async exists(where: Prisma.UserWhereInput): Promise<boolean> {
		return (await this.prismaService.user.count({ where })) > 0
	}

	public async findOwnedBoards(userId: string): Promise<Board[]> {
		return await this.boardRepository.findOwnedBoards(userId)
	}

	public async findMemberBoards(userId: string): Promise<Board[]> {
		return await this.boardRepository.findMemberBoards(userId)
	}

	public async findAssignedTasks(userId: string): Promise<Task[]> {
		return await this.prismaService.task.findMany({
			where: { assigneeId: userId },
		})
	}
}

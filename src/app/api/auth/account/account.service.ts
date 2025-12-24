import {
	ConflictException,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { hash } from 'argon2'

import { Board } from '@/prisma/graphql/board/board.model'
import { Task } from '@/prisma/graphql/task/task.model'
import { User } from '@/prisma/graphql/user/user.model'

import type { CreateUserInput } from './inputs/create-user.input'
import type { IAccountRepository } from './interfaces'
import { ACCOUNT_REPOSITORY_TOKEN } from './tokens'

@Injectable()
export class AccountService {
	public constructor(
		@Inject(ACCOUNT_REPOSITORY_TOKEN)
		private readonly accountRepository: IAccountRepository,
	) {}

	public async getMe(userId: string): Promise<User> {
		const user = await this.accountRepository.findById(userId)
		if (!user) {
			throw new NotFoundException('User not found')
		}
		return user
	}

	public async create(dto: CreateUserInput): Promise<User> {
		const { email, displayName, password, username } = dto
		const user = await this.accountRepository.exists({
			OR: [{ email }, { username }, { displayName }],
		})
		if (user) {
			throw new ConflictException('User already exists')
		}

		return await this.accountRepository.createUser({
			...dto,
			password: await hash(password),
		})
	}

	public async getOwnedBoards(userId: string): Promise<Board[]> {
		return await this.accountRepository.findOwnedBoards(userId)
	}

	public async getMemberBoards(userId: string): Promise<Board[]> {
		return await this.accountRepository.findMemberBoards(userId)
	}

	public async getAssignedTasks(userId: string): Promise<Task[]> {
		return await this.accountRepository.findAssignedTasks(userId)
	}
}

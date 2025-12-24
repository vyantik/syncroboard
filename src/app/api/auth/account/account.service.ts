import { ConflictException, Inject, Injectable } from '@nestjs/common'
import type { User } from '@prisma'
import { hash } from 'argon2'

import type { CreateUserInput } from './inputs/create-user.input'
import type { IAccountRepository } from './interfaces'
import { ACCOUNT_REPOSITORY_TOKEN } from './tokens'

@Injectable()
export class AccountService {
	public constructor(
		@Inject(ACCOUNT_REPOSITORY_TOKEN)
		private readonly accountRepository: IAccountRepository,
	) {}

	public async getMe(): Promise<User[]> {
		return await this.accountRepository.findMany()
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
}

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { User } from '@/prisma/graphql/user/user.model'
import { Authorization, Authorized } from '@/src/shared/decorators'

import { AccountService } from './account.service'
import { CreateUserInput } from './inputs/create-user.input'

@Resolver('Account')
export class AccountResolver {
	constructor(private readonly accountService: AccountService) {}

	@Authorization()
	@Query(() => User, { name: 'getMe' })
	public async getMe(@Authorized('id') userId: string): Promise<User> {
		return await this.accountService.getMe(userId)
	}

	@Mutation(() => User, { name: 'createUser' })
	public async createUser(
		@Args('data') input: CreateUserInput,
	): Promise<User> {
		return await this.accountService.create(input)
	}
}

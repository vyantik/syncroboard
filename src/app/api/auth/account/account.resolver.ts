import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { User } from '@/prisma/graphql/user/user.model'

import { AccountService } from './account.service'
import { CreateUserInput } from './inputs/create-user.input'

@Resolver('Account')
export class AccountResolver {
	constructor(private readonly accountService: AccountService) {}

	@Query(() => [User])
	public async getMe(): Promise<User[]> {
		return await this.accountService.getMe()
	}

	@Mutation(() => User, { name: 'createUser' })
	public async createUser(
		@Args('data') input: CreateUserInput,
	): Promise<User> {
		return await this.accountService.create(input)
	}
}

import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql'

import { Board } from '@/prisma/graphql/board/board.model'
import { Task } from '@/prisma/graphql/task/task.model'
import { User } from '@/prisma/graphql/user/user.model'
import { Authorization, Authorized } from '@/src/shared/decorators'

import { AccountService } from './account.service'
import { CreateUserInput } from './inputs/create-user.input'

@Resolver(() => User)
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

	@ResolveField(() => [Board], { name: 'ownedBoards' })
	public async getOwnedBoards(parent: User): Promise<Board[]> {
		return await this.accountService.getOwnedBoards(parent.id)
	}

	@ResolveField(() => [Board], { name: 'memberBoards' })
	public async getMemberBoards(parent: User): Promise<Board[]> {
		return await this.accountService.getMemberBoards(parent.id)
	}

	@ResolveField(() => [Task], { name: 'assignedTasks' })
	public async getAssignedTasks(parent: User): Promise<Task[]> {
		return await this.accountService.getAssignedTasks(parent.id)
	}
}

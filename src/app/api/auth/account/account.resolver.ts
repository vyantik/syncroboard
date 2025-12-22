import { Query, Resolver } from '@nestjs/graphql'
import { User as PrismaUser } from '@prisma'
import { User } from '@prisma/graph/user/user.model'

import { AccountService } from './account.service'

@Resolver('Account')
export class AccountResolver {
	constructor(private readonly accountService: AccountService) {}

	@Query(() => [User])
	public async findAll(): Promise<PrismaUser[]> {
		return await this.accountService.findAll()
	}
}

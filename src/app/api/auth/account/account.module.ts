import { Module } from '@nestjs/common'

import { AccountRepository } from './account.repository'
import { AccountResolver } from './account.resolver'
import { AccountService } from './account.service'
import { ACCOUNT_REPOSITORY_TOKEN } from './tokens'

@Module({
	providers: [
		AccountResolver,
		AccountService,
		{
			provide: ACCOUNT_REPOSITORY_TOKEN,
			useClass: AccountRepository,
		},
	],
})
export class AccountModule {}

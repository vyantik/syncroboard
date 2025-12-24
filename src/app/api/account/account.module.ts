import { Module } from '@nestjs/common'

import { AccountRepository } from './account.repository'
import { AccountResolver } from './account.resolver'
import { AccountService } from './account.service'
import { BoardModule } from './board/board.module'
import { TasksModule } from './tasks/tasks.module'
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
	imports: [BoardModule, TasksModule],
})
export class AccountModule {}

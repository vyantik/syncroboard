import { Module } from '@nestjs/common'

import { AccountRepository } from '../../account/account.repository'
import { ACCOUNT_REPOSITORY_TOKEN } from '../../account/tokens'

import { SessionResolver } from './session.resolver'
import { SessionService } from './session.service'

@Module({
	providers: [
		SessionResolver,
		SessionService,
		{
			provide: ACCOUNT_REPOSITORY_TOKEN,
			useClass: AccountRepository,
		},
	],
})
export class SessionModule {}

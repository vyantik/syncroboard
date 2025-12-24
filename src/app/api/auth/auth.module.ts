import { Module } from '@nestjs/common'

import { AccountModule } from './account/account.module'
import { SessionModule } from './session/session.module'

@Module({
	imports: [AccountModule, SessionModule],
})
export class AuthModule {}

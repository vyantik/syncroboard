import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'

import type { GqlContext } from '@/src/shared'

import { LoginInput } from './inputs'
import { SessionService } from './session.service'

@Resolver()
export class SessionResolver {
	constructor(private readonly sessionService: SessionService) {}

	@Mutation(() => Boolean, { name: 'login' })
	public async login(
		@Context() { req }: GqlContext,
		@Args('data') input: LoginInput,
	): Promise<boolean> {
		return await this.sessionService.login(req, input)
	}

	@Mutation(() => Boolean, { name: 'logout' })
	public async logout(@Context() { req }: GqlContext): Promise<boolean> {
		return await this.sessionService.logout(req)
	}
}

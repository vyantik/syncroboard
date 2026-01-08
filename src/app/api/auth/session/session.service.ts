import {
	BadRequestException,
	Inject,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { verify } from 'argon2'
import type { Request } from 'express'

import type { IAccountRepository } from '../../account/interfaces'
import { ACCOUNT_REPOSITORY_TOKEN } from '../../account/tokens'

import type { LoginInput } from './inputs'

@Injectable()
export class SessionService {
	public constructor(
		@Inject(ACCOUNT_REPOSITORY_TOKEN)
		private readonly accountRepository: IAccountRepository,
		private readonly configService: ConfigService,
	) {}

	public async login(
		req: Request,
		{ login, password }: LoginInput,
	): Promise<boolean> {
		const account = await this.accountRepository.findFirst(
			{
				OR: [
					{ username: { equals: login } },
					{ email: { equals: login } },
				],
			},
			{
				id: true,
				password: true,
			},
		)
		if (!account) {
			throw new BadRequestException('Invalid credentials')
		}

		const isPasswordValid = await verify(account.password, password)
		if (!isPasswordValid) {
			throw new BadRequestException('Invalid credentials')
		}

		await new Promise((resolve, reject) => {
			req.session.userId = account.id
			req.session.createdAt = new Date()
			req.session.save(err => {
				if (err) {
					return reject(
						new InternalServerErrorException(
							'Failed to save session',
						),
					)
				}
				resolve(account)
			})
		})
		return true
	}

	public async logout(req: Request): Promise<boolean> {
		return new Promise((resolve, reject) => {
			req.session.destroy(err => {
				if (err) {
					return reject(
						new InternalServerErrorException(
							'Failed to destroy session',
						),
					)
				}
				req.res?.clearCookie(
					this.configService.getOrThrow<string>(
						'SESSION_COOKIE_NAME',
					),
				)
				resolve(true)
			})
		})
	}
}

import type { ConfigService } from '@nestjs/config'
import { RedisStore } from 'connect-redis'
import type { CookieOptions, SessionOptions } from 'express-session'

import { RedisService } from '@/src/app/infra/redis/redis.service'

import { ms, parseBoolean, type StringValue } from '../utils'

export function getSessionConfig(
	configService: ConfigService,
	redisService: RedisService,
): SessionOptions {
	const sessionSecret = configService.getOrThrow<string>('SESSION_SECRET')
	const sessionDomain = configService.getOrThrow<string>('SESSION_DOMAIN')
	const secure = parseBoolean(
		configService.getOrThrow<string>('SESSION_SECURE'),
	)
	const httpOnly = parseBoolean(
		configService.getOrThrow<string>('SESSION_HTTP_ONLY'),
	)
	const sameSite = 'lax'
	const maxAge = ms(configService.getOrThrow<StringValue>('SESSION_MAX_AGE'))

	const prefix = configService.getOrThrow<string>('SESSION_PREFIX')

	const cookieOptions: CookieOptions = {
		domain: sessionDomain,
		httpOnly,
		secure,
		maxAge,
		sameSite,
	}

	return {
		secret: sessionSecret,
		resave: false,
		saveUninitialized: false,
		cookie: cookieOptions,
		store: new RedisStore({
			client: redisService,
			prefix,
		}),
	}
}

import { type INestApplication, ValidationPipe } from '@nestjs/common'
import type { ConfigService } from '@nestjs/config'
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'

import { RedisService } from '@/src/app/infra/redis/redis.service'

import { getCorsConfig, getSessionConfig } from '../config'

export function setupApp(
	app: INestApplication,
	configService: ConfigService,
	redisService: RedisService,
) {
	const cookieSecret = configService.getOrThrow<string>('COOKIES_SECRET')

	app.use(cookieParser(cookieSecret))
	app.useGlobalPipes(new ValidationPipe({ transform: true }))

	app.use(session(getSessionConfig(configService, redisService)))

	app.enableCors(getCorsConfig(configService))
}

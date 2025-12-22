import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'
import { RedisService } from './app/infra/redis/redis.service'
import { setupApp } from './shared'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const config = app.get(ConfigService)
	const redis = app.get(RedisService)

	setupApp(app, config, redis)

	await app.listen(config.getOrThrow<number>('HTTP_PORT'))
}

bootstrap()
	.then()
	.catch(error => console.error(error))

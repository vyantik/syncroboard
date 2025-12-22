import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/generated/client'

@Injectable()
export class PrismaService extends PrismaClient {
	public constructor(private readonly configService: ConfigService) {
		const adapter = new PrismaPg({
			connectionString: configService.getOrThrow<string>('POSTGRES_URI'),
		})

		super({ adapter })
	}
}

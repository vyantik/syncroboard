import { Injectable } from '@nestjs/common'

import { User } from '@/prisma/generated/client'
import { PrismaService } from '@/src/app/infra'

@Injectable()
export class AccountService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async findAll(): Promise<User[]> {
		return await this.prismaService.user.findMany()
	}
}

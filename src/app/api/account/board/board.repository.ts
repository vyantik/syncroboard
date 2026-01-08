import { Injectable } from '@nestjs/common'
import { Board } from '@prisma'

import { PrismaService } from '@/src/app/infra'
import { BaseRepository } from '@/src/shared'

@Injectable()
export class BoardRepository extends BaseRepository<Board> {
	public constructor(private readonly prismaService: PrismaService) {
		super(prismaService.board)
	}

	public async findByUserId(userId: string): Promise<Board[]> {
		return await this.prismaService.board.findMany({
			where: {
				OR: [
					{ ownerId: userId },
					{ members: { some: { id: userId } } },
				],
			},
		})
	}

	public async findOwnedBoards(userId: string): Promise<Board[]> {
		return await this.prismaService.board.findMany({
			where: { ownerId: userId },
		})
	}

	public async findMemberBoards(userId: string): Promise<Board[]> {
		return await this.prismaService.board.findMany({
			where: {
				members: {
					some: { id: userId },
				},
			},
		})
	}
}

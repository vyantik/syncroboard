import { Inject, Injectable } from '@nestjs/common'

import type { Board } from '@/prisma/graphql/board/board.model'

import type { CreateBoardInput } from './inputs'
import type { IBoardRepository } from './interfaces'
import { BOARD_REPOSITORY_TOKEN } from './tokens'

@Injectable()
export class BoardService {
	public constructor(
		@Inject(BOARD_REPOSITORY_TOKEN)
		private readonly boardRepository: IBoardRepository,
	) {}

	public async getUserBoards(userId: string): Promise<Board[]> {
		return this.boardRepository.findByUserId(userId)
	}

	public async createBoard(
		userId: string,
		input: CreateBoardInput,
	): Promise<Board> {
		return await this.boardRepository.create({
			...input,
			owner: {
				connect: { id: userId },
			},
		})
	}
}

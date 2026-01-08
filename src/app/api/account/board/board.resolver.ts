import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { Board } from '@/prisma/graphql/board/board.model'
import { Authorization, Authorized } from '@/src/shared'

import { BoardService } from './board.service'
import { CreateBoardInput } from './inputs'

@Resolver()
export class BoardResolver {
	constructor(private readonly boardService: BoardService) {}

	@Authorization()
	@Mutation(() => Board, { name: 'createBoard' })
	public async createBoard(
		@Authorized('id') userId: string,
		@Args('input') input: CreateBoardInput,
	): Promise<Board> {
		return await this.boardService.createBoard(userId, input)
	}
}

import { Module } from '@nestjs/common'

import { BoardRepository } from './board.repository'
import { BoardResolver } from './board.resolver'
import { BoardService } from './board.service'
import { BOARD_REPOSITORY_TOKEN } from './tokens'

@Module({
	providers: [
		BoardResolver,
		BoardService,
		{ provide: BOARD_REPOSITORY_TOKEN, useClass: BoardRepository },
	],
	exports: [BoardService, BOARD_REPOSITORY_TOKEN],
})
export class BoardModule {}

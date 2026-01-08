import type { Board, Prisma } from '@prisma'

import { IBaseRepository } from '@/src/shared'

export interface IBoardRepository extends IBaseRepository<
	Board,
	Prisma.BoardCreateInput
> {
	findOwnedBoards(userId: string): Promise<Board[]>
	findMemberBoards(userId: string): Promise<Board[]>
	findByUserId(userId: string): Promise<Board[]>
}

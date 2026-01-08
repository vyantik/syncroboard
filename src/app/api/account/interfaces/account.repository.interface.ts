import type { Board, Prisma, Task, User } from '@prisma'

import { IBaseRepository } from '@/src/shared'

import { CreateUserInput } from '../inputs/create-user.input'

export interface IAccountRepository extends IBaseRepository<
	User,
	CreateUserInput
> {
	findOwnedBoards(userId: string): Promise<Board[]>
	findMemberBoards(userId: string): Promise<Board[]>
	findAssignedTasks(userId: string): Promise<Task[]>
	findFirst(
		where?: Prisma.UserWhereInput,
		select?: Prisma.UserSelect,
	): Promise<User | null>
	exists(where: Prisma.UserWhereInput): Promise<boolean>
}

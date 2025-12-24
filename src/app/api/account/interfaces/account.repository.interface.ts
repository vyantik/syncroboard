import type { Board, Prisma, Task, User } from '@prisma'

export interface IAccountRepository {
	findById(userId: string): Promise<User | null>
	findByEmail(email: string): Promise<User | null>
	findByUsername(username: string): Promise<User | null>
	findMany(where?: Prisma.UserWhereInput): Promise<User[]>
	findFirst(where?: Prisma.UserWhereInput): Promise<User | null>
	createUser(data: Prisma.UserCreateInput): Promise<User>
	updateUser(userId: string, data: Prisma.UserUpdateInput): Promise<User>
	deleteUser(userId: string): Promise<User>
	exists(where: Prisma.UserWhereInput): Promise<boolean>
	findOwnedBoards(userId: string): Promise<Board[]>
	findMemberBoards(userId: string): Promise<Board[]>
	findAssignedTasks(userId: string): Promise<Task[]>
}

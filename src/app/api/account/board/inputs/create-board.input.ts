import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

@InputType()
export class CreateBoardInput {
	@Field()
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(30)
	public title: string

	@Field()
	@IsString()
	@IsNotEmpty()
	@MinLength(1)
	@MaxLength(1000)
	public description: string
}

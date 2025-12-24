import { Field, InputType } from '@nestjs/graphql'
import {
	IsEmail,
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator'

@InputType()
export class CreateUserInput {
	@Field()
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(30)
	public username: string

	@Field()
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	public email: string

	@Field()
	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	@MaxLength(32)
	public password: string

	@Field()
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(30)
	public displayName: string
}

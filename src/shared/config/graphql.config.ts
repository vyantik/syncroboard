import type { ApolloDriverConfig } from '@nestjs/apollo'
import { ConfigService } from '@nestjs/config'
import type { Request, Response } from 'express'
import { join } from 'path'

import { isDev } from '../utils'

import { errorFormat } from './error-format.config'

export function getGraphQLConfig(
	configService: ConfigService,
): ApolloDriverConfig {
	return {
		playground: isDev(configService)
			? {
					settings: {
						'request.credentials': 'include',
					},
				}
			: false,
		path: configService.getOrThrow<string>('GRAPHQL_PREFIX'),
		autoSchemaFile: join(process.cwd(), 'src/app/graphql/schema.gql'),
		sortSchema: true,
		context: ({ req, res }: { req: Request; res: Response }) => ({
			req,
			res,
		}),
		formatError: error => errorFormat(error),
	}
}

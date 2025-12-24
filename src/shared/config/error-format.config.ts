import type { GraphQLFormattedError } from 'graphql'

const errorCodeMap: Record<number, string> = {
	400: 'BAD_USER_INPUT',
	401: 'UNAUTHENTICATED',
	403: 'FORBIDDEN',
	404: 'NOT_FOUND',
	409: 'CONFLICT',
	422: 'BAD_USER_INPUT',
}

export const errorFormat = (error: GraphQLFormattedError) => {
	const originalError = error.extensions?.originalError as
		| { statusCode?: number }
		| undefined
	const statusCode =
		originalError?.statusCode ||
		(error.extensions?.status as number | undefined)

	const code = statusCode
		? errorCodeMap[statusCode] || 'INTERNAL_SERVER_ERROR'
		: error.extensions?.code || 'INTERNAL_SERVER_ERROR'

	const graphQLFormattedError = {
		message: error.message,
		code,
		timestamp: new Date().toISOString(),
		path: error.path,
	}
	return graphQLFormattedError
}

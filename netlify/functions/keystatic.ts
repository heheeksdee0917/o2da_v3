import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic'
import config from '../../keystatic.config'

export const handler = makeGenericAPIRouteHandler({ config })
import postgres from 'postgres'
import {drizzle} from 'drizzle-orm/postgres-js'
import { env } from '../env'
import {subscriptions} from './schema/subscriptions'

//pg configura o postgres e db o orm (drizzle)
export const pg = postgres(env.POSTGRES_URL)
export const db = drizzle(pg, {
  schema: {
    subscriptions
  }
})

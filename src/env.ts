import { z } from 'zod'

//faz o parse caso exista a porta no .env e se nao tiver usa o default
const envSchema = z.object({
  PORT: z.coerce.number().default(8080)
})

export const env = envSchema.parse(process.env)

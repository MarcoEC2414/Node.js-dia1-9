import { z } from 'zod'

const envSchema = z.object({
  PORT: z.string().default('3000'),
  MONGO_URI: z.string().min(1, {
    message: 'MONGO_URI es requerida — agreguen mongodb://... al .env'
  }),
  JWT_SECRET: z.string().min(8, {
    message: 'JWT_SECRET debe tener al menos 8 caracteres'
  }),
})

const env = envSchema.parse(process.env)

export const config = {
  port: Number(env.PORT),
  mongoUri: env.MONGO_URI,
  jwtSecret: env.JWT_SECRET,
} as const

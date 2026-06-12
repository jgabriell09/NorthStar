import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Creamos el cliente de Redis con las credenciales de Upstash
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Limitamos a 10 mensajes por minuto por IP
// Esto significa que un mismo usuario no puede mandar
// más de 10 mensajes en 60 segundos
export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '60 s'),
  analytics: true,
})
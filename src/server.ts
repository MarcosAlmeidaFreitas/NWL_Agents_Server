import { fastifyCors } from '@fastify/cors'
import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './env.ts'
import { getRoomsRoute } from './http/routes/get-rooms.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: 'http:localhost:5173',
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

// app.listen({ port: Number(process.env.PORT) || 3333 }).then(() => {
//   console.log('HTTP SERVER RUNNING!');
// })

app.get('/health', () => {
  return 'Ok'
})

app.register(getRoomsRoute);

app.listen({ port: env.PORT }).then(() => {
  console.log(`Esta é a porta : ${env.PORT}`)
  console.log('HTTP SERVER RUNNING!')
})

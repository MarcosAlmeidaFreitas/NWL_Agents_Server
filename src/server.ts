import { fastifyCors } from '@fastify/cors'
import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './env.ts'
import { getRoomsRoute } from './http/routes/get-rooms.ts'
import { createRoomRoute } from './http/routes/create-room.ts'
import { getRoomsQuestion } from './http/routes/get-room-question.ts'
import { createQuestionRoute } from './http/routes/create-question.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: 'http://localhost:5173',
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
app.register(createRoomRoute);
app.register(getRoomsQuestion);
app.register(createQuestionRoute);

app.listen({ port: env.PORT }).then(() => {
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.log(`HTTP SERVER RUNNING!!! => NA PORTA: ${env.PORT}`)
})

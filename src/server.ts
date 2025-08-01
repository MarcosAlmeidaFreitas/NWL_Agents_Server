import { fastifyCors } from '@fastify/cors'
import { fastifyMultipart } from '@fastify/multipart'
import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './env.ts'
import { createQuestionRoute } from './http/routes/create-question.ts'
import { createRoomRoute } from './http/routes/create-room.ts'
import { getRoomsQuestion } from './http/routes/get-room-question.ts'
import { getRoomsRoute } from './http/routes/get-rooms.ts'
import { uploadAudioRoute } from './http/routes/upload-audio.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

//registando qual api pode acessar o nosso server
app.register(fastifyCors, {
  origin: 'http://localhost:5173',
})

// biblioteca para transição de arquivos entre o front e o back-end como audio
app.register(fastifyMultipart)

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

// app.listen({ port: Number(process.env.PORT) || 3333 }).then(() => {
//   console.log('HTTP SERVER RUNNING!');
// })

app.get('/health', () => {
  return 'Ok'
})

app.register(getRoomsRoute)
app.register(createRoomRoute)
app.register(getRoomsQuestion)
app.register(createQuestionRoute)
app.register(uploadAudioRoute)

app.listen({ port: env.PORT }).then(() => {
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.log(`HTTP SERVER RUNNING!!! => NA PORTA: ${env.PORT}`)
})

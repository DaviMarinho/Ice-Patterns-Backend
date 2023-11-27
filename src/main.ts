import 'reflect-metadata'
import express, { json } from 'express'
import cron from 'node-cron'
import { dataSource } from './db/config'
import routes from './routes'
import cors from 'cors'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { energy } from './schedule'

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })

const port = process.env.PORT || 4001

const app = express()
app.use(cors())
app.use(json())
app.use('/icepatterns', routes)

const serverHttp = createServer(app)
const socketIO = new Server(serverHttp, {
  cors: {
    origin: "http://localhost:3000"
  }
})

cron.schedule('*/5 * * * *', energy)

socketIO.on('connection', (socket) => {
  console.log(`${socket.id} a user connected`);
  console.log(socket.handshake.auth.token)
  
  const username = socket.handshake.auth.token

  socket.join(username)

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

export { socketIO };



serverHttp.listen(port, () => console.log(`rodando na porta ${port}`))


import 'reflect-metadata'
import express, { json } from 'express'
import { dataSource } from './db/config'
import routes from './routes'
import cors from 'cors'

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

app.listen(port, () => console.log(`rodando na porta ${port}`))


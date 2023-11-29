import { DataSource, DataSourceOptions } from 'typeorm'
import path from 'path'

const connectOptions: DataSourceOptions = {
  type: 'postgres',
  // host: 'localhost',
  url: process.env.DB_URL,
  // url: 'postgres://user:postgres@db:5432/user',
  // port: 5432,
  ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : undefined,
  // username: 'postgres',
  // password: 'postgres',
  // // database: 'user',
  synchronize: true,
  entities: [`${path.join(__dirname, '/entities/*{.ts, .js}')}`],
  migrations: [`${path.join(__dirname, '/migrations/*{.ts, .js}')}`]
}

export const dataSource = new DataSource(connectOptions)
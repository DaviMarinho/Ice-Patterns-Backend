import { DataSource, DataSourceOptions } from 'typeorm'
import path from 'path'

const connectOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  // url: process.env.DATABASE_URL,
  port: 5432,
  // username: 'postgres',
  // password: 'postgres',
  // database: 'postgres',
  synchronize: true,
  entities: [`${path.join(__dirname, '/entities/*{.ts, .js}')}`],
  migrations: [`${path.join(__dirname, '/migrations/*{.ts, .js}')}`]
}

export const dataSource = new DataSource(connectOptions)
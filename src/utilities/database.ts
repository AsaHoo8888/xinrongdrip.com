import { postgresAdapter } from '@payloadcms/db-postgres'

export const database = postgresAdapter({
  pool: {
    connectionString: process.env.DATABASE_URL,
    ssl: false,
    max: 5,
    connectionTimeoutMillis: 10_000,
  },
  push: false,
  disableCreateDatabase: true,
})

const initialize = database.init
database.init = (args) => {
  const adapter = initialize(args)
  const connect = adapter.connect!
  adapter.connect = function (options) {
    if (!process.env.DATABASE_URL) throw new Error('请先在项目根目录 .env 填写 DATABASE_URL。')
    return connect.call(this, options)
  }
  return adapter
}

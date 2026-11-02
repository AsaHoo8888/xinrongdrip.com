import 'dotenv/config'
import pg from 'pg'

if (!process.env.DATABASE_URL) {
  console.error('请先在项目根目录 .env 填写 DATABASE_URL。')
  process.exit(1)
}
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
  connectionTimeoutMillis: 10000,
})
try {
  await client.connect()
  await client.query('BEGIN READ ONLY')
  const target = await client.query(
    'SELECT current_database() AS database, current_schema() AS schema',
  )
  const tables = await client.query(
    "SELECT table_schema, table_name FROM information_schema.tables WHERE table_schema NOT IN ('pg_catalog', 'information_schema') ORDER BY table_schema, table_name",
  )
  console.info('Database target:', target.rows[0])
  console.info('Existing tables:', tables.rows)
  console.info(
    tables.rowCount === 0
      ? 'No user tables found. Review target before running migrations.'
      : 'Existing tables found. Inspect before applying the initial migration.',
  )
  await client.query('ROLLBACK')
} catch {
  console.error('数据库只读检查失败，请在本地核对连接参数及服务状态；未执行迁移。')
  process.exitCode = 1
} finally {
  await client.end()
}

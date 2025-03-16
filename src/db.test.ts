import { getPayload } from 'payload'
import { test } from 'vitest'
import config from './payload.config'
import { postgresAdapter } from '@payloadcms/db-postgres'

test('fails to close db connection', async () => {
  const awaitedConfig = await config
  const payload = await getPayload({
    config: {
      ...awaitedConfig,
      secret: 'secret',
      db: postgresAdapter({
        pool: {
          connectionString:
            'postgres://postgres:password@127.0.0.1:5432/payload-db-postgres-reproduction',
        },
      }),
    },
  })

  // uncomment to make the test pass
  // // @ts-ignore
  // for (const client of payload.db.pool._clients) {
  //   try {
  //     await client.release()
  //   } catch {}
  // }

  await payload.db.pool.end()
})

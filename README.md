# blank

To reproduce the issue run:
`pnpm test`

Test can be made to pass by uncommenting the follwing block of code in `db.test.ts`:

```
//@ts-ignore
for (const client of payload.db.pool._clients) {
  try {
    await client.release()
  } catch {}
}
```

To force the release of all client in the pool.

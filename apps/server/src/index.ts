import { serve } from '@hono/node-server'
import app from "./app";

const port = process.env.PORT || 8000;

console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port: Number(port)
})

export default app;

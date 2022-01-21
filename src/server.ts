import app from './app'
import dotenv from 'dotenv'

dotenv.config()
const PORT = parseInt(process.env.PORT as string)

app.listen(PORT, ()=>{
    if (process.env.NODE_ENV !== 'test') {
        console.log(`
          ################################################
          🛡️  Server listening on port: ${PORT} 🛡️
          ################################################
          SERVER IN ${process.env.NODE_ENV as string} MODE
        `);
      }
})
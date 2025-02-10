import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser'
import { connectDB } from './config/db.js'
import { apiRouter } from './routes/index.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'

// Get the directory name for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express()
app.use(express.json())
app.use(
  cors({
    origin: ["http://localhost:5173","https://movie-app-frontend-ashy.vercel.app"],
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    credentials: true,
}))
app.use(cookieParser())

const port = 8000;
connectDB()
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, 'build')))

app.use('/api' , apiRouter)

// Catch-all route to serve React app for non-API requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
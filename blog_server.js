const express = require('express')
const app = express()
/* const cors = require('cors') */
const port = 3000
const errorHandler = require('./middlewares/serverError')
const routeNotFound = require('./middlewares/routeNotFound')


/* // Middleware per il CORS
app.use(cors({
    origin: 'http://localhost:5173'
})) */

// Inserimento body-parser
app.use(express.json())

const postsRouter = require('./routers/posts')

app.get('/', (req, res) => {
    res.send("Welcome on my server")
})

app.use('/api/v1/blog_posts', postsRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

// Registro il middleware per la gestione errori
app.use(errorHandler)

// Registro il middleware per rotta inesistente
app.use(routeNotFound)
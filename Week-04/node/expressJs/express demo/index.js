import express from 'express'
import {logger} from "./logger.js";
import helmet from "helmet";
import morgen from 'morgan'

const app = express()

app.use(express.json()) // middleware function
app.use(helmet()) // middleware function
app.use(morgen('tiny'))
app.use(express.urlencoded({extended: true})) // middleware function
app.use(express.static('public')) // all static asses inside this folder can access directly in broser

// Middleware 1
app.use(logger)

// Middleware 2
app.use(function (req, res, next) {
    console.log('Authenticating')
    next()
})

app.get('/', (req, res) => {
    res.send('Hello world')
})
app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3])
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
import express from "express"

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3])
})

app.listen(4000, () => console.log('Server is running'))



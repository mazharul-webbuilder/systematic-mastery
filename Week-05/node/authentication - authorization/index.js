import express from "express"
import mongoose from "mongoose";

await mongoose.connect('mongodb://localhost/mongoplayground')
const app = express()

const userSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
        unique: true,
    },
    password: {
        required: true,
        type: String,
    }
})
const User = mongoose.model('User', userSchema)

app.use(express.json())

app.post('/api/users', async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.send(user)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3])
})


app.listen(4000, () => console.log('Server is running'))



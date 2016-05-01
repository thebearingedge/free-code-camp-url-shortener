
import express from 'express'


const app = express()


app.get('/', (req, res) => res.send('hello app'))

app.listen(process.env.PORT || 3000)

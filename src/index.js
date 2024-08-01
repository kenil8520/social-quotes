const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const router = require('./routers/index.router.js')

dotenv.config();

const app = express()
var corOptions = {
    origin: 'https://localhost:8081'
}

app.use(cors(corOptions))

app.use(express.json())

app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) =>{
    res.json({message : "API working"})
})

app.use('/v1', router)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
})

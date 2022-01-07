const express = require('express')
const cors= require('cors')
const ConnectMongo = require('./db')
const app = express()

const port = 5000
ConnectMongo();

app.use(cors())
app.use(express.json())


app.use("/api/auth", require('./routes/auth'))
app.use("/api/notes", require('./routes/notes'))





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



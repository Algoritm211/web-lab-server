const express = require('express')
const cors = require("cors");
const mongoose = require('mongoose')
const config = require('config')
const userRouter  = require('./routes/user.routes')



const app = express()
app.use(cors())

const PORT = config.get('PORT')
app.use(express.json())

app.use('/api/user/', userRouter)


const START = async () => {

  try {
    const dbURL = config.get('dbURL')
    await mongoose.connect(dbURL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false, tls: true })
      .then(() => console.log( 'Database Connected' ))
      .catch(err => console.log( err ));

    app.listen(PORT, () => {
      console.log(`Server was started on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

START()

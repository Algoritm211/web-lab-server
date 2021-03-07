const express = require('express')
const cors = require("cors");
const mongoose = require('mongoose')
const config = require('config')



const app = express()
app.use(cors())

const PORT = config.get('PORT')



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


const express = require('express')
const cors = require("cors");
const mongoose = require('mongoose')
const config = require('config')
const userRouter = require('./routes/user.routes')
const client = require('./models/query')
const bodyParser = require('body-parser')


const app = express()
app.use(cors())

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded());
const PORT = process.env.PORT || config.get('PORT')
app.use(express.json())

app.use('/api/user/', userRouter)


const START = async () => {

  try {
    // const dbURL = config.get('dbURL')
    // await mongoose.connect(dbURL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false, tls: true })
    //   .then(() => console.log( 'Database Connected' ))
    //   .catch(err => console.log( err ));
    //

    await client.connect();

    client.query(`CREATE TABLE IF NOT EXISTS Users (
      id VARCHAR ( 150 ),
      firstName VARCHAR ( 50 ),
      lastName VARCHAR ( 50 ),
      email VARCHAR ( 50 ),
      phone VARCHAR ( 15 ),
      linkTwitter VARCHAR ( 255 ),
      linkFacebook VARCHAR ( 255 ),
      linkLinkedin VARCHAR ( 255 ),
      linkTelegram VARCHAR ( 255 ),
      linkVK VARCHAR ( 255 )
    )`, (err, res) => {
      if (err) throw err;
      for (let row of res.rows) {
        console.log(JSON.stringify(row));
      }
      // client.end();
    });


    app.listen(PORT, () => {
      console.log(`Server was started on http://localhost:${PORT}`)
    })

  } catch (error) {
    console.log(error)
  }
}

START()

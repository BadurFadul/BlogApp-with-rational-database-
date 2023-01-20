const express = require('express')
require('express-async-errors');
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const blogRouter = require('./routes/blog')
const userRouter = require('./routes/user');
const loginRouter = require('./routes/login')
const { Sequelize } = require('sequelize');

app.use(express.json())

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'SequelizeValidationError') {
    return res.status(400).send({error: error.message})
  }

  next(error)
}

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

//error handler
app.use(unknownEndpoint)
app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()



  


'use strict'

const port = 8080

import * as express from 'express'
import * as Joi from 'joi'
import * as validation from '../../index'

const app = express()
const validator = validation()

const headerSchema = Joi.object({
  'host': Joi.string().required(),
  'user-agent': Joi.string().required()
})

app.use(validator.headers(headerSchema))

app.use('/users', require('./router'))

app.listen(port, (err) => {
  if (err) {
    throw err
  }

  console.log(`\napp started on ${port}\n`)
  console.log(`Try accessing http://localhost:${port}/users/1001 or http://localhost:${port}/users?name=dean to get some data.\n`)
  console.log(`Now try access http://localhost:${port}/users?age=50. You should get an error complaining that your querystring is invalid.`)
})

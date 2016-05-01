
import express from 'express'
import { toBase26, fromBase26 } from 'bases'
import { isUri } from 'valid-url'
import db from './db'


const port = process.env.PORT || 3000
const hostname = process.env.NODE_ENV === 'production'
  ? 'https://intense-reaches-14844.herokuapp.com'
  : `localhost:${port}`


const app = express()


app.get('/', (req, res) => res.send('hello app'))


app.get('/new/*', ({ params }, res) => {

  const url = params[0]

  if (!isUri(url)) {

    return res.status(400).json({ error: 'URL Invalid' })
  }

  return db
    .insert({ url })
    .into('urls')
    .returning('id')
    .then(([ id ]) => {

      const original_url = url
      const shortened_url = `${hostname}/${toBase26(id)}`

      return res.json({ original_url, shortened_url })
    })
})


app.get('/*', ({ params }, res) => {

  const id = fromBase26(params[0])

  return db
    .from('urls')
    .where({ id })
    .first()
    .then(result =>
      result ? res.redirect(result.url) : res.status(404).send('Not Found')
    )
})


app.listen(port)

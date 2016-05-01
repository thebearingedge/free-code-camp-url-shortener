
import express from 'express'
import { toBase26, fromBase26 } from 'bases'
import { isUri } from 'valid-url'
import db from './db'


const port = process.env.PORT || 3000
const hostname = process.env.NODE_ENV === 'production'
  ? 'https://intense-reaches-14844.herokuapp.com'
  : `localhost:${port}`


const app = express()


app.get('/', (req, res) =>

    res.send(`
      <html>
        <head>
          <title>URL Shortener</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/4.1.1/normalize.min.css"/>
        </head>
        <body>
          <h1>URL Shortener</h1>
          <h4>Example Creation</h4>
          <pre>${hostname}/new/https://wikipedia.com</pre>
          <h4>Example Output</h4>
          <pre>{ "original_url": "https://wikipedia.com", "shortened_url": "${hostname}/e" }
          </pre>
          <h4>Usage</h4>
          <pre>${hostname}/e</pre>
          <h4>Redirects To</h4>
          <pre>https://wikipedia.com</pre>
        </body>
      </html>
    `)

  )


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

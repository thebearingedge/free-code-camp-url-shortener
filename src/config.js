
const client = 'postgresql'


export const development = {
  client,
  connection: {
    user: 'url-shortener',
    password: 'url-shortener',
    database: 'url-shortener'
  }
}


export const production = {
  client,
  connection: process.env.DATABASE_URL,
  ssl: true
}

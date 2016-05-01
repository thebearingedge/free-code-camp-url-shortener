
import knex from 'knex'
import * as connections from './config'


const connection = connections[process.env.NODE_ENV || 'development']

export default knex(connection)

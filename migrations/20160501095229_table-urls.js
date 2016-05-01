
export const up = ({ schema }) =>

  schema
    .createTable('urls', tb => {
      tb.increments('id')
      tb.string('url')
        .notNullable()
    })


export const down = ({ raw }) =>

  raw('drop table if exists "urls" cascade')

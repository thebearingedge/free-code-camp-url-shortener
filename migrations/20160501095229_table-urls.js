
export const up = ({ schema }) =>

  schema
    .createTable('urls', tb => {
      tb.string('long_url')
        .unique()
        .notNullable()
      tb.string('short_url')
        .unique()
        .notNullable()
    })


export const down = ({ raw }) =>

  raw('drop table if exists "urls" cascade')

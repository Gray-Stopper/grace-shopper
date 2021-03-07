const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

let db

if (process.env.DEPLOY === 'true') {
  db = new Sequelize(
    process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
    {
      logging: false,
      operatorsAliases: false,
      dialect: 'postgres',
      protocol: 'postgres',
      ssl: true,
      dialectOptions: {
        ssl: true
      }
    }
  )
} else {
  db = new Sequelize(
    process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
    {
      logging: false
    }
  )
}

module.exports = db

if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}

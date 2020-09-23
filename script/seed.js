'use strict'

const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({
      firstName: 'Sofia',
      lastName: 'Javed',
      email: 'sofia@sofia.sofia',
      password: 'blahBLAH'
    }),
    User.create({
      firstName: 'Melissa',
      lastName: 'Lam',
      email: 'mlam@mlam.mlam',
      password: 'lamchop'
    }),
    User.create({
      firstName: 'Khalilah',
      lastName: 'Fellow',
      email: 'khalilah@fellow.fun',
      password: 'fellowsRus'
    }),
    User.create({
      firstName: 'Orlando',
      lastName: 'Florida',
      email: 'orlando@city.florida',
      password: 'iHateThatJoke'
    }),
    User.create({
      firstName: 'Mac',
      lastName: 'Donald',
      email: 'Mac@Donald.farm',
      password: 'EIEIO'
    }),
    User.create({
      firstName: 'Alexandra',
      lastName: 'Langton',
      email: 'alex@alex.com',
      password: 'cody'
    })
  ])

  const alex = await User.findOne({
    where: {
      firstName: 'Alexandra'
    }
  })

  const melissa = await User.findOne({
    where: {
      firstName: 'Melissa'
    }
  })

  const products = await Promise.all([
    Product.create({
      name: 'blonde dye',
      description: 'a favorite everyday blonde color',
      price: 45.99,
      category: 'color'
    }),
    Product.create({
      name: 'magenta dye',
      description: 'are you mad for magenta?',
      price: 55.99,
      category: 'color',
      imageUrl: '../public/magenta.png'
    }),
    Product.create({
      name: 'rainbow dye',
      description: "for those who can't decide",
      price: 62.99,
      category: 'color'
    }),
    Product.create({
      name: 'tudor wig',
      description: 'old-school throwback',
      price: 85.99,
      category: 'wigs'
    }),
    Product.create({
      name: 'barrister wig',
      description: 'an across-the-pond favorite',
      price: 85.99,
      category: 'wigs'
    }),
    Product.create({
      name: "all's fair with hair vitamins",
      description: 'pills to nourish your hair color',
      price: 72.99,
      category: 'nutrition'
    })
  ])

  const blondeDye = await Product.findOne({
    where: {
      name: 'blonde dye'
    }
  })

  const alexOrder = await Order.create({
    userId: alex.id
  })

  const melissaOrder = await Order.create({
    userId: melissa.id
  })

  const macOrder = await Order.create({
    userId: users[6].id,
    completed: true
  })

  await alexOrder.addProduct(blondeDye, {through: {quantity: 3}})
  await alexOrder.addProducts([products[1], products[2]])

  await melissaOrder.addProduct(products[2], {through: {quantity: 2}})
  await melissaOrder.addProducts([products[3], products[5]])

  await macOrder.addProducts([products[4], products[5]])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

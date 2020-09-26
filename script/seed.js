'use strict'

const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'Pug',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Murphy',
      lastName: 'Puggle',
      email: 'murphy@email.com',
      password: '123'
    }),
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
      password: 'cody',
      isAdmin: true
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
      name: 'Blonde Dye',
      description: 'a favorite everyday blonde color',
      price: 4599,
      category: 'color',
      imageUrl:
        'https://thumbs.dreamstime.com/b/young-beautiful-woman-dying-her-hair-blonde-color-happy-157142388.jpg'
    }),
    Product.create({
      name: 'Magenta Dye',
      description: 'are you mad for magenta?',
      price: 5599,
      category: 'color',
      imageUrl:
        'https://png.pngtree.com/png-vector/20191205/ourmid/pngtree-girl-with-pink-hair-illustration-vector-on-white-background-png-image_2029610.jpg'
    }),
    Product.create({
      name: 'Rainbow Dye',
      description: "for those who can't decide",
      price: 6299,
      category: 'color',
      stock: 0,
      imageUrl:
        'https://i.pinimg.com/474x/03/76/40/03764046d06ec848fb7a3ba52f4b646e.jpg'
    }),
    Product.create({
      name: 'Tudor Wig',
      description: 'old-school throwback',
      price: 8599,
      category: 'wigs',
      // imageUrl: 'https://i.pinimg.com/236x/b0/b4/62/b0b46202f08411826f71c90e0a40a9b6--tudor-dynasty-english-tudor.jpg'
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/51hAmCzkcCL._AC_UY1000_.jpg'
    }),
    Product.create({
      name: 'Barrister Wig',
      description: 'an across-the-pond favorite',
      price: 8599,
      category: 'wigs',
      imageUrl:
        'https://st3.depositphotos.com/3038577/12922/v/450/depositphotos_129227100-stock-illustration-funny-judge-understand-thumbs-up.jpg'
    }),
    Product.create({
      name: "All's Fair With Hair Vitamins",
      description: 'pills to nourish your hair color',
      price: 7299,
      category: 'nutrition',
      // imageUrl: 'https://www.pngitem.com/pimgs/m/556-5569166_cartoon-vitamins-and-minerals-hd-png-download.png'
      imageUrl:
        'https://thumbs.dreamstime.com/b/capsule-mascot-doing-ok-hand-sign-vector-illustration-80659483.jpg'
    }),
    Product.create({
      name: 'Embrace the Grays Meditation',
      description: 'lean into your wisdom',
      price: 2299,
      category: 'nutrition',
      stock: 0
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

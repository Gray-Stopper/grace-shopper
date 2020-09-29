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
      description:
        "'I'm not offended by all the dumb blonde jokes because I know I'm not dumb... and I also know that I'm not blonde.' -- Dolly Parton",
      price: 4599,
      category: 'color',
      imageUrl:
        'https://thumbs.dreamstime.com/b/young-beautiful-woman-dying-her-hair-blonde-color-happy-157142388.jpg'
    }),
    Product.create({
      name: 'Magenta Dye',
      description:
        "'I'm having a magenta day. Not just red, but magenta!' -- Stephen King",
      price: 5599,
      category: 'color',
      imageUrl:
        'https://png.pngtree.com/png-vector/20191205/ourmid/pngtree-girl-with-pink-hair-illustration-vector-on-white-background-png-image_2029610.jpg'
    }),
    Product.create({
      name: 'Rainbow Dye',
      description:
        "'Where does the rainbow end, in your soul or on the horizon?' -- Pablo Neruda",
      price: 6299,
      category: 'color',
      stock: 0,
      imageUrl:
        'https://i.pinimg.com/474x/03/76/40/03764046d06ec848fb7a3ba52f4b646e.jpg'
    }),
    Product.create({
      name: 'Lime Green Dye',
      description:
        "'Green is the prime color of the world, and that from which its loveliness arises.' -- Pedro Calderon de la Barca",
      price: 6099,
      category: 'color',
      imageUrl:
        'https://fredonialeader.org/wp-content/uploads/2019/12/RaeHubal_Issue14_SC.png'
    }),
    Product.create({
      name: 'Black Dye',
      description:
        "'I'll stop wearing black when they invent a darker color.' -- Wednesday Addams",
      price: 5399,
      category: 'color',
      imageUrl:
        'https://www.iconfinder.com/data/icons/hair-color-palette/500/hair-09-512.png'
    }),
    Product.create({
      name: 'Blue Dye',
      description:
        "'But never have I been a blue calm sea. I have always been a storm.' -- Stevie Nicks",
      price: 4899,
      category: 'color',
      imageUrl:
        'https://previews.123rf.com/images/agnessz/agnessz1608/agnessz160800207/61146274-long-haired-girl-with-headband-blue-hair-color.jpg'
    }),
    Product.create({
      name: 'Tudor Wig',
      description:
        "'I have no heir. The Tudor Dynasty, all my father's work, finished, and it's MY fault!' -- King Henry VIII in 'The Tudors'",
      price: 8599,
      category: 'wigs',
      // imageUrl: 'https://i.pinimg.com/236x/b0/b4/62/b0b46202f08411826f71c90e0a40a9b6--tudor-dynasty-english-tudor.jpg'
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/51hAmCzkcCL._AC_UY1000_.jpg'
    }),
    Product.create({
      name: 'Barrister Wig',
      description:
        "'An author must be nothing if he do not love truth; a barrister must be nothing if he do.' -- Anthony Trollope",
      price: 8599,
      category: 'wigs',
      imageUrl:
        'https://st3.depositphotos.com/3038577/12922/v/450/depositphotos_129227100-stock-illustration-funny-judge-understand-thumbs-up.jpg'
    }),
    Product.create({
      name: 'Clown Wig',
      description:
        "'I remain just one thing, and one thing only, and that is a clown. It places me on a far higher plane than any politician.' -- Charlie Chaplin",
      price: 7999,
      category: 'wigs',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR0mjM4sjUcOsw8agTXB8UZ8MKQP2dWH5EXAw&usqp=CAU'
    }),
    Product.create({
      name: 'Cruella de Vil Wig',
      description:
        "'To see in color is a delight for the eye, but to see in black and white is a delight for the soul.' -- Andri Cauldwell",
      price: 8999,
      category: 'wigs',
      imageUrl:
        'https://cdn.costumewall.com/wp-content/uploads/2017/03/cruella-de-vil.webp'
    }),
    Product.create({
      name: 'Marie Antoinette Wig',
      description:
        "'There is nothing new except what has been forgotten.' -- Marie Antoinette",
      price: 19999,
      category: 'wigs',
      imageUrl:
        'https://i.pinimg.com/236x/98/dd/cc/98ddcc91e30b17ab1a8f37212b916089--ostriches-marie-antoinette.jpg'
    }),
    Product.create({
      name: "All's Fair With Hair Vitamins",
      description:
        "'To all my little Hulkamaniacs, say your prayers, take your vitamins and you will never go wrong.' -- Hulk Hogan",
      price: 7299,
      category: 'nutrition',
      // imageUrl: 'https://www.pngitem.com/pimgs/m/556-5569166_cartoon-vitamins-and-minerals-hd-png-download.png'
      imageUrl:
        'https://thumbs.dreamstime.com/b/capsule-mascot-doing-ok-hand-sign-vector-illustration-80659483.jpg'
    }),
    Product.create({
      name: 'Embrace the Grays Meditation',
      description:
        "'It's great to have gray hair. Ask anyone who's bald.' -- Rodney Dangerfield",
      price: 2299,
      category: 'nutrition',
      stock: 0
    }),
    Product.create({
      name: 'Marge Simpson Wig',
      description:
        "'I can't believe it! I've done all my housework and it's only 9:30! Well, better go upstairs and make sure the beds are still made.' -- Marge Simpson",
      price: 8599,
      category: 'wigs',
      imageUrl:
        'https://2.bp.blogspot.com/_nuLnGSnu094/THEojekdaWI/AAAAAAAAKBI/XQR7Fmocu0M/s200/marge-simpson.jpg'
    }),
    Product.create({
      name: 'Head Massager',
      description:
        "'She put her hands to her face and rubbed, then dug her fingers into her scalp, trying to massage some life back into her tired brain.' -- Thea Harrison",
      price: 3295,
      category: 'nutrition',
      imageUrl: 'https://i.ebayimg.com/images/g/ChgAAOSwIndcTxYN/s-l300.jpg'
    }),
    Product.create({
      name: 'Hair Brush',
      description:
        "'You know you're living right when you wake up, brush your hair - and confetti falls out!' -- Katy Perry",
      price: 3295,
      category: 'nutrition',
      imageUrl:
        'https://www.jing.fm/clipimg/detail/112-1122477_transparent-background-hair-brush.png'
    }),
    Product.create({
      name: 'Shower Cap',
      description:
        "'There's no half-singing in the shower, you're either a rock star or an opera diva.' -- Josh Groban",
      price: 3295,
      category: 'nutrition',
      imageUrl:
        'https://www.jing.fm/clipimg/detail/126-1269453_cute-towel-funny-personnel-dog-bath-hot-clipart.png'
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

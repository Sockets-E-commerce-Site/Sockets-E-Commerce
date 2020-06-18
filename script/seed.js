'use strict'

const db = require('../server/db')
const {
  User,
  Product,
  Order,
  ProductOrder,
  Review
} = require('../server/db/models')

const faker = require('faker')
const productCategories = ['Video Games', 'PC Parts', 'Drones', 'Other']
const randomInt = function(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const seedUsers = async function() {
    for (let i = 0; i < 100; i++) {
      await User.create({
        email: faker.internet.email(),
        password: faker.internet.password(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName()
      })
    }
  }

  const seedProducts = async function() {
    for (let i = 0; i < 100; i++) {
      await Product.create({
        invQuantity: 10,
        title: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        photo: faker.image.cats(),
        category: productCategories[randomInt(4)],
        price: faker.commerce.price()
      })
    }
  }

  await seedUsers()
  await seedProducts()
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

const router = require('express').Router()
const {User, Product, Order} = require('../db/models')
const {Op} = require('sequelize')
const adminAuthentication = require('./admin')

module.exports = router

// when you do to cart
// to get the current order from that user with all the prdocuts inside of that order
// /api/user/:userId/order/cart

const userNotFound = next => {
  const error = new Error('Product not found')
  error.stack = 404
  next(error)
}

//get all users, only if an admin
router.get('/', adminAuthentication, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//get cart data
router.get('/orders/cart', async (req, res, next) => {
  try {
    //check to see if they are a guest or a registered user
    if (!req.user) {
      //if the guest doesn't have a cart setup, this will set it up
      if (!req.session.cart) {
        req.session.cart = {products: []}
      }
      //if the guest has a cart otherwise, will return the cart in sessions
      res.json(req.session.cart)
      return
    } else {
      const userId = req.user.id
      const [usersCart, created] = await Order.findOrCreate({
        where: {
          userId,
          status: 'in cart'
        },
        include: Product
      })

      //check to see if the cart was created. If true, refetch cart and include products
      if (created) {
        const emptyCart = await Order.findOne({
          where: {
            userId,
            status: 'in cart'
          },
          include: Product
        })
        res.json(emptyCart)
        return
      }
      res.json(usersCart)
    }
  } catch (error) {
    next(userNotFound)
  }
})

//add items to cart as either user or guest
router.put('/orders/cart', async (req, res, next) => {
  try {
    if (!req.user) {
      //create a cart if there is no cart in session already
      if (!req.session.cart) {
        req.session.cart = {}
        req.session.cart.products = []
      }
      //find the product in our catalog
      const product = await Product.findByPk(req.body.productId)
      //see if product is already in the guest cart
      const foundProduct = req.session.cart.products.find(
        item => item.id === product.id
      )

      //if product is already in cart, increase quantity by 1,
      // otherwise, add the product to the cart
      if (foundProduct) {
        if (foundProduct.productOrder.productQuantity < product.invQuantity) {
          foundProduct.productOrder.productQuantity++
        }
      } else {
        //add product to the cart
        req.session.cart.products.push(product)
        const updatedProduct = req.session.cart.products.find(
          item => item.id === product.id
        )

        //add productOrder property to the cart product
        //to keep track of quantity in cart
        updatedProduct.dataValues.productOrder = {productQuantity: 1}
      }
      res.json(req.session.cart)
      return
    }
    // if there is a user
    const userId = req.user.id
    const [newOrder, created] = await Order.findOrCreate({
      where: {
        userId,
        status: 'in cart'
      }
    })
    const product = await Product.findByPk(req.body.productId)

    await newOrder.addProduct(product)

    const cart = await Order.findOne({
      where: {
        id: newOrder.id
      },
      include: Product
    })
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

//remove an item from the cart
router.delete('/orders/cart', async (req, res, next) => {
  try {
    if (!req.user) {
      const products = req.session.cart.products
      const removedProduct = products.find(
        product => product.id === req.body.productId
      )

      const splicePoint = products.indexOf(removedProduct)
      products.splice(splicePoint, 1)

      res.json(req.session.cart)
      return
    }
    const userId = req.user.id
    const cart = await Order.findOne({
      where: {
        userId,
        status: 'in cart'
      },

      include: Product
    })

    const product = await Product.findByPk(req.body.productId)

    await cart.removeProduct(product)

    const updatedCart = await Order.findOne({
      where: {
        id: cart.id
      },
      include: Product
    })

    res.json(updatedCart)
  } catch (error) {
    next(error)
  }
})

//change apssword
// router.put('/newPassword', async(req, res, next) => {
//   try {
//       const userId = req.user.id
//       // const {formerPassWord, newPassWord} = req.body
//       const [created, afftectUser] = await User.udpate(req.body, {
//         where: {
//           userId
//         },
//         returning: true,
//       })
//       res.json(afftectUser)
//   } catch (error) {
//     next(error)
//   }
// })

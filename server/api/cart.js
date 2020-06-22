const router = require('express').Router()
const {Product, User, ProductOrder, Order} = require('../db/models')

module.exports = router

// alter product quantity in cart
router.put('/edit', async (req, res, next) => {
  try {
    const {productId, productQuantity} = req.body

    if (!req.user) {
      const foundProduct = req.session.cart.products.find(
        product => product.id === productId
      )

      foundProduct.productOrder.productQuantity = productQuantity
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

    const foundProduct = cart.products.find(product => {
      return product.id === parseInt(productId)
    })

    if (
      productQuantity <= foundProduct.invQuantity &&
      productQuantity > 0 &&
      foundProduct.invQuantity > 0
    ) {
      await foundProduct.productOrder.update(
        {productQuantity: productQuantity},
        {
          returning: true
        }
      )
    }

    const updatedCart = await Order.findOne({
      where: {
        userId,
        status: 'in cart'
      },
      include: Product
    })

    res.json(updatedCart)
  } catch (error) {
    next(error)
  }
})

//checkout and change status from in cart to pending shipping
//this is only updating orders table, need to also update productOrders to fill in purchase price
router.put('/checkout', async (req, res, next) => {
  try {
    const userId = req.user.id
    const finalOrder = await Order.findOne({
      where: {
        userId,
        status: 'in cart'
      }
    })
    if (finalOrder) {
      finalOrder.update({
        status: 'pending shipping'
      })
    }
    res.json(finalOrder)
    //find order and product bought
    // const orderId = req.order.id
    // const productId = req.product.id
    //find price when placing this order
    //find order in productOrder table based on orderID and productID
    // const productOrderPrice = await ProductOrder.findOne({
    //   where: {
    //     orderId,
    //     productId
    //   }
    // })
    //set purchaseprice into productOrder table.
  } catch (error) {
    next(error)
  }
})

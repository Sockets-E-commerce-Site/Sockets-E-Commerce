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

//checkout and change status from in cart to pending shipping also placing final purchase price into through table

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
      await finalOrder.update({
        status: 'pending shipping'
      })
    }
    const products = await ProductOrder.findAll({
      where: {
        orderId: finalOrder.id
      }
    })
    products.forEach(async product => {
      const singleproduct = await Product.findByPk(product.productId)
      await product.update({
        purchasePrice: singleproduct.price
      })
    })
    //also do inventory reduction
    res.json(finalOrder)
  } catch (error) {
    next(error)
  }
})

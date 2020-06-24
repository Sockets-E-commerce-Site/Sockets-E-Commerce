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

      if (productQuantity <= foundProduct.invQuantity && productQuantity > 0) {
        foundProduct.productOrder.productQuantity = productQuantity
      }
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
    if (!req.user) {
      req.session.cart.status = 'pending shipping'

      req.session.cart = {status: 'in cart', products: []}
      res.json(req.session.cart)
      return
    }
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
      await singleproduct.update({
        invQuantity: singleproduct.invQuantity - product.productQuantity
      })
    })

    await Order.create({
      userId,
      status: 'in cart'
    })

    const newCart = await Order.findOne({
      where: {
        userId,
        status: 'in cart'
      },
      include: Product
    })

    res.json(newCart)
  } catch (error) {
    next(error)
  }
})

router.put('/mergecarts', async (req, res, next) => {
  try {
    let [userCart, created] = await Order.findOrCreate({
      where: {
        userId: req.user.id,
        status: 'in cart'
      },
      include: Product
    })

    if (created) {
      req.session.cart.products.forEach(async product => {
        const addProduct = await Product.findByPk(product.id)
        await userCart.addProduct(addProduct)
        const newCart = await Order.findOne({
          where: {
            id: userCart.id
          },
          include: Product
        })
        const foundProduct = newCart.products.find(
          item => item.id === product.id
        )

        await foundProduct.productOrder.update(
          {productQuantity: product.productOrder.productQuantity},
          {
            returning: true
          }
        )
      })
      const newCart = await Order.findOne({
        where: {
          id: userCart.id
        },
        include: Product
      })

      res.json(newCart)
    } else {
      req.session.cart.products.forEach(async product => {
        if (userCart.products.some(item => item.id === product.id)) {
          const foundInCart = userCart.products.find(item => {
            return item.id === product.id
          })

          if (
            foundInCart.productOrder.productQuantity <
            product.productOrder.productQuantity
          ) {
            await foundInCart.productOrder.update({
              productQuantity: product.productOrder.productQuantity
            })
          }
        } else {
          const newProduct = await Product.findByPk(product.id)
          await userCart.addProduct(newProduct)

          userCart = await Order.findOne({
            where: {
              userId: req.user.id,
              status: 'in cart'
            },
            include: Product
          })
          const foundInCart = userCart.products.find(item => {
            return item.id === product.id
          })

          if (
            foundInCart.productOrder.productQuantity <
            product.productOrder.productQuantity
          ) {
            await foundInCart.productOrder.update({
              productQuantity: product.productOrder.productQuantity
            })
          }
        }
      })
      res.json(userCart)
    }
  } catch (error) {
    next(error)
  }
})

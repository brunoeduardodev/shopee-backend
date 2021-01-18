const Express = require('express')

const ItemController = require('./controllers/ItemController')
const UserController = require('./controllers/UserController')
const CategoryController = require('./controllers/CategoryController')
const AuthController = require('./controllers/AuthController')

const AuthToken = require('./middlewares/AuthToken')

const itemController = new ItemController()
const userController = new UserController()
const categoryController = new CategoryController()
const authController = new AuthController()

const routes = Express.Router()

// Items
routes.get('/items', itemController.index)
routes.post('/items', AuthToken, itemController.store)
routes.put('/items/:id', AuthToken, itemController.update)
routes.delete('/items/:id', AuthToken, itemController.delete)

// Users
routes.get('/users', userController.index)
routes.post('/users', userController.store)
routes.put('/users/:id', AuthToken, userController.update)
routes.delete('/users/:id', AuthToken, userController.delete)

// Categories
routes.get('/categories', categoryController.index)
routes.post('/categories', AuthToken, categoryController.store)
routes.put('/categories/:id', AuthToken, categoryController.update)
routes.delete('/categories/:id', AuthToken, categoryController.delete)

routes.post('/auth', authController.auth)

module.exports = routes

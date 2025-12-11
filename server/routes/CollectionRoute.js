const express = require('express')
const router = express.Router()

const collectionController = require('../controllers/CollectionController')
const authentication = require('../middleware/authentication')

router.use(authentication)

router.get('/', collectionController.getCollections)

module.exports = router
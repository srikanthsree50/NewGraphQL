const path = require('path');
const isRouteSecure = require('../RouteSecureMiddleware/isRouteSecure');
const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product',isRouteSecure, adminController.getAddProduct);

// /admin/products => GET
router.get('/products',isRouteSecure, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product',isRouteSecure, adminController.postAddProduct);

router.get('/edit-product/:productId',isRouteSecure, adminController.getEditProduct);

router.post('/edit-product',isRouteSecure, adminController.postEditProduct);

router.post('/delete-product',isRouteSecure, adminController.postDeleteProduct);

module.exports = router;

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', orderController.createOrder);
router.post('/cancel/:id', orderController.cancelOrder);
router.get('/me', orderController.getUserOrders);
router.get('/:id', orderController.getOrderById);
router.get('/user/:userId', orderController.getUserOrders);

module.exports = router;

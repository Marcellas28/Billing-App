const express = require('express');
const router = express.Router();
const billController = require('../controllers/billController');

// Create new bill
router.post('/', billController.createBill);

// Get all bills
router.get('/', billController.getBills);

// Get single bill
router.get('/:id', billController.getBill);

// Send SMS receipt
router.post('/:id/sms', billController.sendSMS);

// Print receipt
router.post('/:id/print', billController.printReceipt);

module.exports = router;
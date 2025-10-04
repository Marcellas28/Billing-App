const Bill = require('../models/Bill');
const ReceiptFormatter = require('../utils/receiptFormatter');
const smsService = require('../services/smsService');
const printerService = require('../services/printerService');

class BillController {
    // Create new bill
    async createBill(req, res) {
        try {
            const { items, customerPhone, subtotal, tax, total } = req.body;

            // Calculate item totals
            const billItems = items.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                total: item.quantity * item.price
            }));

            // Create bill data
            const billData = {
                items: billItems,
                customerPhone,
                subtotal,
                tax,
                total
            };

            // Generate receipt text
            const receiptText = ReceiptFormatter.formatReceipt(billData);
            billData.receiptText = receiptText;

            // Save to database
            const bill = new Bill(billData);
            await bill.save();

            // Populate with final bill number
            const savedBill = await Bill.findById(bill._id);

            res.status(201).json({
                success: true,
                message: 'Bill created successfully',
                bill: savedBill
            });
        } catch (error) {
            console.error('Create bill error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create bill',
                error: error.message
            });
        }
    }

    // Send SMS receipt
    async sendSMS(req, res) {
        try {
            const { id } = req.params;
            const bill = await Bill.findById(id);

            if (!bill) {
                return res.status(404).json({
                    success: false,
                    message: 'Bill not found'
                });
            }

            const smsText = ReceiptFormatter.formatSMSReceipt(bill);
            const smsResult = await smsService.sendReceipt(bill.customerPhone, smsText);

            if (smsResult.success) {
                bill.smsSent = true;
                await bill.save();

                res.json({
                    success: true,
                    message: 'SMS sent successfully',
                    bill
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: 'Failed to send SMS',
                    error: smsResult.error
                });
            }
        } catch (error) {
            console.error('Send SMS error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to send SMS',
                error: error.message
            });
        }
    }

    // Print receipt
    async printReceipt(req, res) {
        try {
            const { id } = req.params;
            const bill = await Bill.findById(id);

            if (!bill) {
                return res.status(404).json({
                    success: false,
                    message: 'Bill not found'
                });
            }

            let printResult;
            if (process.env.NODE_ENV === 'production') {
                printResult = await printerService.printReceipt(bill.receiptText);
            } else {
                printResult = await printerService.simulatePrint(bill.receiptText);
            }

            if (printResult) {
                bill.printed = true;
                await bill.save();

                res.json({
                    success: true,
                    message: 'Receipt printed successfully',
                    bill
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: 'Failed to print receipt'
                });
            }
        } catch (error) {
            console.error('Print receipt error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to print receipt',
                error: error.message
            });
        }
    }

    // Get all bills
    async getBills(req, res) {
        try {
            const bills = await Bill.find().sort({ createdAt: -1 });
            res.json({
                success: true,
                bills
            });
        } catch (error) {
            console.error('Get bills error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch bills',
                error: error.message
            });
        }
    }

    // Get single bill
    async getBill(req, res) {
        try {
            const { id } = req.params;
            const bill = await Bill.findById(id);

            if (!bill) {
                return res.status(404).json({
                    success: false,
                    message: 'Bill not found'
                });
            }

            res.json({
                success: true,
                bill
            });
        } catch (error) {
            console.error('Get bill error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch bill',
                error: error.message
            });
        }
    }
}

module.exports = new BillController();
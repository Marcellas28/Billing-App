const mongoose = require('mongoose');

const billItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    total: {
        type: Number,
        required: true
    }
});

const billSchema = new mongoose.Schema({
    billNumber: {
        type: String,
        unique: true,
        required: true
    },
    items: [billItemSchema],
    customerPhone: {
        type: String,
        required: true,
        trim: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    receiptText: {
        type: String,
        required: true
    },
    smsSent: {
        type: Boolean,
        default: false
    },
    printed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Generate bill number before saving
billSchema.pre('save', async function(next) {
    if (this.isNew) {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        // Find the latest bill for today
        const latestBill = await this.constructor
            .findOne({ billNumber: new RegExp(`^BILL-${year}${month}${day}`) })
            .sort({ createdAt: -1 });

        let sequence = 1;
        if (latestBill) {
            const lastSequence = parseInt(latestBill.billNumber.split('-')[2]) || 0;
            sequence = lastSequence + 1;
        }

        this.billNumber = `BILL-${year}${month}${day}-${String(sequence).padStart(4, '0')}`;
    }
    next();
});

module.exports = mongoose.model('Bill', billSchema);
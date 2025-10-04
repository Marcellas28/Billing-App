class ReceiptFormatter {
    static formatReceipt(billData) {
        const { billNumber, items, subtotal, tax, total, customerPhone, createdAt } = billData;

        let receipt = "╔══════════════════════════╗\n";
        receipt += "║      MARCELLA'S STORE     ║\n";
        receipt += "║    *** MADE BY MARCELLAS ***    ║\n";
        receipt += "╚══════════════════════════╝\n\n";

        receipt += `Bill: ${billNumber}\n`;
        receipt += `Date: ${new Date(createdAt).toLocaleString()}\n`;
        receipt += `Customer: ${customerPhone}\n`;
        receipt += "┌──────────────────────────┐\n";

        // Items
        items.forEach(item => {
            const name = item.name.length > 20 ? item.name.substring(0, 17) + '...' : item.name.padEnd(20);
            const qty = `x${item.quantity}`.padStart(4);
            const price = `$${item.total.toFixed(2)}`.padStart(8);
            receipt += `│ ${name} ${qty} ${price} │\n`;
        });

        receipt += "├──────────────────────────┤\n";

        // Totals
        receipt += `│ Subtotal: $${subtotal.toFixed(2).padStart(13)} │\n`;
        receipt += `│ Tax: $${tax.toFixed(2).padStart(17)} │\n`;
        receipt += `│ TOTAL: $${total.toFixed(2).padStart(15)} │\n`;

        receipt += "└──────────────────────────┘\n\n";
        receipt += "Thank you for your purchase!\n";
        receipt += "Powered by Marcellas Did It\n";
        receipt += "══════════════════════════════\n";

        return receipt;
    }

    static formatSMSReceipt(billData) {
        const { billNumber, items, total, customerPhone } = billData;

        let sms = `Marcella's Store Receipt\n`;
        sms += `Bill: ${billNumber}\n`;
        sms += `Items:\n`;

        items.forEach(item => {
            sms += `${item.name} x${item.quantity} - $${item.total.toFixed(2)}\n`;
        });

        sms += `Total: $${total.toFixed(2)}\n`;
        sms += `Thank you! Powered by Marcellas Did It`;

        return sms;
    }
}

module.exports = ReceiptFormatter;
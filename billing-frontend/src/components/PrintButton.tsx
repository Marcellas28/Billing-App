import React from 'react';
import { BillItem } from '../types/Bill';
import './PrintButton.css';

interface PrintButtonProps {
  items: BillItem[];
  subtotal: number;
  tax: number;
  total: number;
  customerPhone: string;
  onPrint?: () => void;
}

const PrintButton: React.FC<PrintButtonProps> = ({
  items,
  subtotal,
  tax,
  total,
  customerPhone,
  onPrint
}) => {

  const formatReceiptForPrint = (): string => {
    let receipt = "=== YOUR STORE ===\n";
    receipt += "Thank you for shopping!\n";
    receipt += "----------------------\n";
    receipt += `Date: ${new Date().toLocaleString()}\n`;
    receipt += `Customer: ${customerPhone}\n`;
    receipt += "----------------------\n";
    
    items.forEach(item => {
      const line = `${item.name.padEnd(20).substring(0,20)}`;
      const quantity = `x${item.quantity}`.padStart(4);
      const price = `$${(item.quantity * item.price).toFixed(2)}`.padStart(8);
      receipt += `${line} ${quantity} ${price}\n`;
    });
    
    receipt += "----------------------\n";
    receipt += `Subtotal: $${subtotal.toFixed(2).padStart(10)}\n`;
    receipt += `Tax: $${tax.toFixed(2).padStart(14)}\n`;
    receipt += `TOTAL: $${total.toFixed(2).padStart(12)}\n`;
    receipt += "======================\n";
    receipt += "Thank you for your business!\n";
    
    return receipt;
  };

  const handlePrint = async () => {
    if (items.length === 0) {
      alert('No items to print!');
      return;
    }

    try {
      // For now, we'll simulate printing and show the receipt content
      // Later we'll integrate with actual printer API
      const receiptText = formatReceiptForPrint();
      
      // Method 1: Open print dialog with formatted receipt
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Receipt</title>
              <style>
                body { 
                  font-family: 'Courier New', monospace; 
                  font-size: 12px; 
                  margin: 20px;
                  white-space: pre-wrap;
                }
                @media print {
                  body { margin: 0; }
                }
              </style>
            </head>
            <body>
              <pre>${receiptText}</pre>
              <script>
                window.onload = function() {
                  window.print();
                  setTimeout(() => window.close(), 1000);
                }
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }

      // Method 2: Log receipt text for backend integration
      console.log('Receipt for printing:', receiptText);

      // Call the onPrint callback if provided
      if (onPrint) {
        onPrint();
      }

      alert('Receipt sent to printer! (Simulated for now)');

    } catch (error) {
      console.error('Print error:', error);
      alert('Error printing receipt');
    }
  };

  const handleSendToBackend = async () => {
    // This will be used when we have the backend ready
    const receiptData = {
      items,
      customerPhone,
      subtotal,
      tax,
      total,
      receiptText: formatReceiptForPrint()
    };

    console.log('Sending to backend:', receiptData);
    alert('Receipt data ready for backend integration!');
  };

  return (
    <div className="print-button-container">
      <button 
        onClick={handlePrint}
        className="print-btn"
        disabled={items.length === 0}
      >
        🖨️ Print Receipt
      </button>
      
      <button 
        onClick={handleSendToBackend}
        className="backend-btn"
        disabled={items.length === 0}
      >
        📡 Send to Printer API
      </button>

      {/* Debug: Show receipt text */}
      <details className="receipt-debug">
        <summary>View Receipt Text (For Thermal Printer)</summary>
        <pre className="receipt-text-preview">
          {formatReceiptForPrint()}
        </pre>
      </details>
    </div>
  );
};

export default PrintButton;
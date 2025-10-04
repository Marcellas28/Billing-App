import React, { useState } from 'react';
import { BillItem } from '../types/Bill';
import Receipt from './Receipt';
import PrintButton from './PrintButton';
import Logo from './Logo';
import './BillForm.css';

const BillForm: React.FC = () => {
  const [items, setItems] = useState<BillItem[]>([]);
  const [customerPhone, setCustomerPhone] = useState('');
  const [currentItem, setCurrentItem] = useState<Omit<BillItem, 'id'>>({ 
    name: '', 
    quantity: 1, 
    price: 0 
  });

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  const addItem = () => {
    if (currentItem.name && currentItem.price > 0) {
      const newItem: BillItem = {
        ...currentItem,
        id: Date.now().toString()
      };
      setItems([...items, newItem]);
      setCurrentItem({ name: '', quantity: 1, price: 0 });
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const billData = {
      items,
      customerPhone,
      subtotal,
      tax,
      total
    };

    console.log('Bill Data:', billData);
    alert('Bill created successfully! Ready to send SMS and print.');
  };

  const handlePrintSuccess = () => {
    console.log('Print operation completed successfully');
  };

  return (
    <div className="bill-container">
      {/* Background Watermark */}
      <div className="background-watermark">
        Marcellas Did It
      </div>

      <div className="bill-form">
        {/* Logo Section */}
        <Logo size="large" showWatermark={true} />
        
        <h1>Billing Application</h1>
        
        <form onSubmit={handleSubmit}>
          {/* Customer Info */}
          <div className="form-section">
            <h3>Customer Information</h3>
            <div className="input-group">
              <label>Phone Number:</label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+254712345678"
                required
              />
            </div>
          </div>

          {/* Add Items */}
          <div className="form-section">
            <h3>Add Items</h3>
            <div className="item-inputs">
              <input
                type="text"
                placeholder="Item name"
                value={currentItem.name}
                onChange={(e) => setCurrentItem({...currentItem, name: e.target.value})}
              />
              <input
                type="number"
                placeholder="Quantity"
                min="1"
                value={currentItem.quantity}
                onChange={(e) => setCurrentItem({...currentItem, quantity: parseInt(e.target.value) || 1})}
              />
              <input
                type="number"
                placeholder="Price"
                min="0"
                step="0.01"
                value={currentItem.price}
                onChange={(e) => setCurrentItem({...currentItem, price: parseFloat(e.target.value) || 0})}
              />
              <button type="button" onClick={addItem} className="add-btn">
                Add Item
              </button>
            </div>
          </div>

          {/* Items List */}
          {items.length > 0 && (
            <div className="form-section">
              <h3>Items in Cart</h3>
              <div className="items-list">
                {items.map((item) => (
                  <div key={item.id} className="item-row">
                    <span>{item.name}</span>
                    <span>Qty: {item.quantity}</span>
                    <span>${(item.quantity * item.price).toFixed(2)}</span>
                    <button 
                      type="button" 
                      onClick={() => removeItem(item.id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Totals */}
          {items.length > 0 && (
            <div className="totals-section">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Tax (16%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="total-row grand-total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          {items.length > 0 && customerPhone && (
            <button type="submit" className="submit-btn">
              Create Bill & Send Receipt
            </button>
          )}

          {/* Print Button */}
          {items.length > 0 && (
            <PrintButton
              items={items}
              subtotal={subtotal}
              tax={tax}
              total={total}
              customerPhone={customerPhone}
              onPrint={handlePrintSuccess}
            />
          )}
        </form>
      </div>

      {/* Receipt Preview */}
      {items.length > 0 && (
        <div className="receipt-preview">
          <Receipt 
            items={items}
            subtotal={subtotal}
            tax={tax}
            total={total}
            customerPhone={customerPhone}
          />
        </div>
      )}
    </div>
  );
};

export default BillForm;
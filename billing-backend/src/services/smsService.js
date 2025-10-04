const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

class SMSService {
    constructor() {
        this.client = twilio(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        );
    }

    async sendReceipt(phoneNumber, receiptText) {
        try {
            if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
                console.warn('Twilio credentials not configured. SMS would be sent to:', phoneNumber);
                console.log('SMS Content:', receiptText);
                return { success: true, simulated: true };
            }

            const message = await this.client.messages.create({
                body: receiptText,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phoneNumber
            });

            console.log('SMS sent successfully:', message.sid);
            return { success: true, messageId: message.sid };
        } catch (error) {
            console.error('SMS sending failed:', error.message);
            return { success: false, error: error.message };
        }
    }
}

module.exports = new SMSService();
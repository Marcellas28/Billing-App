const escpos = require('escpos');
escpos.USB = require('escpos-usb');
escpos.Network = require('escpos-network');

class PrinterService {
    constructor() {
        this.device = null;
        this.printer = null;
        this.isConnected = false;
    }

    async connect() {
        try {
            if (process.env.PRINTER_TYPE === 'network') {
                this.device = new escpos.Network(process.env.NETWORK_PRINTER_IP, process.env.NETWORK_PRINTER_PORT);
            } else {
                // USB printer
                this.device = new escpos.USB(
                    parseInt(process.env.PRINTER_VENDOR_ID),
                    parseInt(process.env.PRINTER_PRODUCT_ID)
                );
            }

            this.printer = new escpos.Printer(this.device);
            this.isConnected = true;
            console.log('Printer connected successfully');
        } catch (error) {
            console.error('Printer connection failed:', error.message);
            this.isConnected = false;
        }
    }

    async printReceipt(receiptText) {
        if (!this.isConnected) {
            await this.connect();
        }

        return new Promise((resolve, reject) => {
            if (!this.printer) {
                reject(new Error('Printer not available'));
                return;
            }

            this.device.open(async(error) => {
                if (error) {
                    console.error('Printer open error:', error);
                    reject(error);
                    return;
                }

                try {
                    this.printer
                        .font('a')
                        .align('ct')
                        .style('bu')
                        .size(1, 1)
                        .text("MARCELLA'S STORE")
                        .text("Made by Marcellas")
                        .size(0, 0)
                        .align('lt')
                        .text("")
                        .text(receiptText)
                        .text("")
                        .text("Thank you for your purchase!")
                        .text("Powered by Marcellas Did It")
                        .cut()
                        .close((err) => {
                            if (err) {
                                reject(err);
                            } else {
                                console.log('Receipt printed successfully');
                                resolve(true);
                            }
                        });
                } catch (printError) {
                    reject(printError);
                }
            });
        });
    }

    // Simulated printing for development
    async simulatePrint(receiptText) {
        console.log('=== SIMULATED PRINTING ===');
        console.log(receiptText);
        console.log('=== END SIMULATED PRINT ===');
        return true;
    }
}

module.exports = new PrinterService();
const emailService = require('./services/emailService');
require('dotenv').config();

async function testEmail() {
    const testEmail = 'e23cseu1877@bennett.edu.in'; // Testing with your registered email
    console.log('--- START EMAIL TEST ---');
    console.log('Sending test email to:', testEmail);
    console.log('Using Service:', process.env.EMAIL_SERVICE);
    console.log('Using User:', process.env.EMAIL_USER);

    const dummyOrder = {
        orderId: 'TEST-123456',
        orderDate: new Date().toLocaleDateString(),
        items: [
            { name: 'Test Product', quantity: 1, price: 999 }
        ],
        totalAmount: 999,
        shippingDetails: {
            name: 'Test User',
            address: '123 Test St',
            city: 'Test City',
            state: 'Test State',
            zipCode: '12345'
        }
    };

    try {
        const info = await emailService.sendOrderConfirmationEmail(testEmail, dummyOrder);
        console.log('SUCCESS: Email sent!', info.messageId);
    } catch (error) {
        console.error('FAILURE: Error sending email:', error);
    } finally {
        process.exit();
    }
}

testEmail();

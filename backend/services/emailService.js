const nodemailer = require('nodemailer');

const sendOrderConfirmationEmail = async (userEmail, orderDetails) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE || 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const { orderId, items, totalAmount, shippingDetails, orderDate } = orderDetails;

        const productListHtml = items.map(item => `<li>${item.name} (Qty: ${item.quantity})</li>`).join('');
        const productListText = items.map(item => `* ${item.name} (Qty: ${item.quantity})`).join('\n');

        const mailOptions = {
            from: `"Amazon.in" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: 'Your Order Has Been Placed Successfully',
            text: `
Hello,

Your order has been successfully placed.

Order ID: ${orderId}
Order Date: ${orderDate}

Products:
${productListText}

Total Amount: ₹${totalAmount}

Shipping Address:
${shippingDetails.name}
${shippingDetails.address}
${shippingDetails.city}, ${shippingDetails.state} ${shippingDetails.zipCode}

Your order will be processed shortly.

Thank you for shopping with us.
            `,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h1 style="color: #232f3e;">amazon<span style="color: #febd69;">.in</span></h1>
                    </div>
                    <h2 style="color: #333;">Thank you for your order!</h2>
                    <p>Hello,</p>
                    <p>Your order has been successfully placed.</p>
                    
                    <div style="background-color: #f6f6f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">Order Summary</h3>
                        <p><strong>Order Number:</strong> #${orderId}</p>
                        <p><strong>Order Date:</strong> ${orderDate}</p>
                        <p><strong>Order Total:</strong> ₹${totalAmount}</p>
                    </div>

                    <div style="margin: 20px 0;">
                        <h3>Products:</h3>
                        <ul>
                            ${productListHtml}
                        </ul>
                    </div>

                    <div style="margin: 20px 0;">
                        <h3>Shipping Address:</h3>
                        <p>${shippingDetails.name}<br>
                        ${shippingDetails.address}<br>
                        ${shippingDetails.city}, ${shippingDetails.state} ${shippingDetails.zipCode}</p>
                    </div>

                    <p>Your order will be processed shortly.</p>
                    <p>Thank you for shopping with us.</p>

                    <p style="color: #666; font-size: 12px; border-top: 1px solid #eee; padding-top: 20px;">
                        If you have any questions, please contact our support team.
                    </p>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Order confirmation email sent: ' + info.response);
        return info;
    } catch (error) {
        console.error('Error sending order confirmation email:', error);
        throw error;
    }
};

const sendPasswordResetEmail = async (userEmail, resetToken) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE || 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

        const mailOptions = {
            from: `"Amazon.in" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: 'Password Reset Request',
            text: `
You are receiving this because you (or someone else) have requested the reset of the password for your account.

Please click on the following link, or paste this into your browser to complete the process:

${resetUrl}

If you did not request this, please ignore this email and your password will remain unchanged.
            `,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h1 style="color: #232f3e;">amazon<span style="color: #febd69;">.in</span></h1>
                    </div>
                    <h2 style="color: #333 text-align: center;">Password Reset Request</h2>
                    <p>Hello,</p>
                    <p>You requested a password reset for your Amazon.in clone account.</p>
                    <p>Click the button below to reset your password. This link is valid for 1 hour.</p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetUrl}" style="background-color: #ffd814; color: #111; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; border: 1px solid #fcd200; display: inline-block;">Reset Password</a>
                    </div>

                    <p style="font-size: 13px; color: #666;">If the button doesn't work, copy and paste this link into your browser:</p>
                    <p style="font-size: 13px; color: #007185;">${resetUrl}</p>

                    <p style="color: #666; font-size: 12px; border-top: 1px solid #eee; padding-top: 20px; margin-top: 20px;">
                        If you did not request this reset, you can safely ignore this email.
                    </p>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Password reset email sent: ' + info.response);
        return info;
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw error;
    }
};

module.exports = {
    sendOrderConfirmationEmail,
    sendPasswordResetEmail
};

const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/Payment');
exports.renderPaymentPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../assets/templetes', 'payment.html'));
};

exports.createCheckoutSession = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Account Premium',
                            description:
                                'Premium account for the medical tracking system, including additional features like detailed reporting, health history tracking, and more.',
                            images: [
                                'https://cdn.pixabay.com/photo/2017/01/31/22/32/doctor-2027768_1280.png',
                            ],
                        },
                        unit_amount: 50 * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url:
                'http://localhost:9090/complete?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:9090/cancel',
            billing_address_collection: 'auto',
        });

        res.redirect(303, session.url);
    } catch (error) {
        console.error('Error creating Stripe session:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.paymentSuccess = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(
            req.query.session_id
        );
        console.log(session);

        const paymentData = {
            sessionId: session.id,
            clientEmail: session.customer_details.email,
            amountTotal: session.amount_total,
            currency: session.currency,
            paymentStatus: session.payment_status,
        };

        const newPayment = new Payment(paymentData);
        await newPayment.save();

        console.log('Payment saved:', newPayment);

        res.send(
            'Payment complete Thank you for purchasing the premium account.'
        );
    } catch (error) {
        console.error(' Error in paymentSuccess:', error.message);
        res.status(500).send(
            'Something went wrong while processing your payment.'
        );
    }
};

exports.paymentCancel = (req, res) => {
    res.send('Payment cancelled! You can try again.');
};

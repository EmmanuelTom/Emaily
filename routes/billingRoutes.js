const keys = require("../config/keys");
const stripe = require("stripe"); // Import stripe first
const stripeClient = stripe(keys.stripeSecretKey); // Then initialize with secret key
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        try {
            // Handle the Stripe token and charge the user
            const token = req.body.id;
            const charge = await stripeClient.charges.create({
                amount: 500,
                currency: "usd",
                description: "Charge for 5 credits",
                source: token
            });

            req.user.credits += 5; // add to user session
            const user = await req.user.save(); // save session
            res.send(user);
        } catch (error) {
            console.error('Stripe error:', error);
            res.status(500).send({ error: 'Payment processing failed' });
        }
    });
};
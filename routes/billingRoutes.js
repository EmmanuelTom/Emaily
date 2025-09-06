
const keys = require("../config/keys")
const stripe = require("stripe")(keys.stripeSecretKey)
const requireLogin = require("../middlewares/requireLogin")


module.exports = app => {

    app.post('/api/stripe', requireLogin, async (req, res) => {
        // Handle the Stripe token and charge the user
        const token = req.body.id;
        const charge = await stripe.charges.create({
            amount: 500,
            currency: "usd",
            description: "Charge for 5 credits",
            source: token
        });

        req.user.credits += 5; //add to user session
        const user = await req.user.save(); // save session
        res.send(user);
    });
}
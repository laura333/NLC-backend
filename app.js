'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const path = require ('path');
const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;
const stripe = require("stripe")(keySecret);
const pug = require('pug');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
app.use(express.static('./'));

const images = require('./routes/photos');
app.use('/photos', images);

app.get("/", (req, res) =>
    res.render("index.pug", {
        keyPublishable
    }));

app.post("/charge", (req, res) => {
    let amount = 1500;

    stripe.customers.create({
            email: req.body.stripeEmail,
            source: req.body.stripeToken
        })
        .then(customer =>
            stripe.charges.create({
                amount,
                description: "Sample Charge",
                currency: "usd",
                customer: customer.id
            }))
        .then(charge => res.render("charge.pug"));
});

// app.use('*', function(req, res, next) {
//   console.log("Are we getting here?");
//   // res.sendFile('index.html', {root: path.join(__dirname, 'public')});
// });

const port = process.env.PORT || 5280;

// app.get('/', (req, res, next) => {
//     console.log('Is this thing on?');
// });

app.listen(port, () => {
    console.log('Listening on port', port);
});

module.exports = app;

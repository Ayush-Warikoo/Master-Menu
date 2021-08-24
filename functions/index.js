const functions = require("firebase-functions");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(`${process.env.STRIPE_TEST_KEY}`);

//API

//App config
const app = express();

//Middleware
app.use(
  cors({ origin: [`${process.env.DEV_CORS}`, `${process.env.TEST_CORS}`] })
);
app.use(express.json());

// API Routes

app.get("/health", async (request, response) => {
  response.status(200).send("All Good!");
});

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment Request Recieved! for this amount ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "cad",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

//Listen command
exports.api = functions.https.onRequest(app);

//API Endpoint
//Dev: https://us-central1-master-menu-app.cloudfunctions.net/api
//Test: http://localhost:5001/master-menu-app/us-central1/api

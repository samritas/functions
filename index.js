const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const port = 5002;
const stripe = require("stripe")(
  "sk_test_51OOwT7GAsmpVmdeiPQh9KbTMKfVrDveurlVMVqUk9uENKcLIgCuTZjQ3E6Tvq1hrlP15N1DoKPPSpkrzA5vfGKdT00FFjvsoJE"
);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
// - Listen command
// exports.api = functions.https.onRequest(app);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Example endpoint
// http://localhost:5001/challenge-4b2b2/us-central1/api

// http://127.0.0.1:5001/clone-3bd16/us-central1/api
// sk_test_51OOwT7GAsmpVmdeiPQh9KbTMKfVrDveurlVMVqUk9uENKcLIgCuTZjQ3E6Tvq1hrlP15N1DoKPPSpkrzA5vfGKdT00FFjvsoJE



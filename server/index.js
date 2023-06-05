/* eslint-disable no-undef */
import express from 'express';
import pkg from 'body-parser';
const { json, urlencoded } = pkg;
import 'dotenv/config';
import Stripe from 'stripe';
import cors from 'cors';

const stripe = new Stripe(process.env.SECRET_KEY);
const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, (error) => {
	if (error) throw error;
	console.log('server run on port 5000');
});

app.post('/payment', async (req, res) => {
	let status, error;
  const { token, amount } = req.body;
  console.log(token, amount);
  try {
    await stripe.charges.create({
      source: token.id,
      amount,
      currency:'usd'
    })
    status='success'
  } catch (error) {
    console.log(error);
    status='fail'
  }
  res.json({error,status})
});

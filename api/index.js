import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.js';
import authRoute from './routes/auth.js';
import productRoute from './routes/product.js';
import orderRoute from './routes/order.js';
import cartRoute from './routes/cart.js';
import stripeRoute from './routes/stripe.js';
dotenv.config();

// init app
const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', stripeRoute);

//db copnnect
let mongoDB = process.env.DB;
mongoose
    .connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log(`connection to DB successful`))
    .catch((error) => console.log(error));

//listen
const PORT = process.env.PORT || 5010;
app.listen(PORT, () =>
    console.log(`Server started: Running on port: http://localhost:${PORT}`)
);

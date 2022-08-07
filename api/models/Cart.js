import mongoose from 'mongoose';
const { Schema } = mongoose;


const CartSchema = new Schema({

   userId: {
      type: String,
      required: true,
      unique: true
   },
   products: [
      {
         productID: String,
         quantity: {
            type: Number,
            default: 1
         }
      }
   ]




}, { timestamps: true });
// Compile model from schema
const Cart = mongoose.model('Cart', CartSchema);

export default Cart;
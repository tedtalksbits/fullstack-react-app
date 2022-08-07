import mongoose from 'mongoose';
const { Schema } = mongoose;


const ProductSchema = new Schema({

   title: {
      type: String,
      required: true,
      unique: true
   },
   desc: {
      type: String,
      required: true
   },
   img: {
      type: String,
      required: true
   },
   categories: {
      type: Array
   },
   size: String,
   color: String,
   price: {
      type: Number,
      required: true
   }



}, { timestamps: true });
// Compile model from schema
const Product = mongoose.model('Product', ProductSchema);

export default Product;
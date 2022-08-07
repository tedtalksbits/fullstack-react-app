import express from 'express'
import Cart from '../models/Cart.js';
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from './verifyToken.js';
const router = express.Router();


/************************** CREATE CART **************************/
//any user  can create a cart
router.post('/', verifyToken, async (req, res) => {
   const newCart = new Cart(req.body);

   try {
      const savedCart = await newCart.save();
      res.status(200).json(savedCart)

   } catch (error) {
      return res.status(500).json({ msg: "error creating new cart", errorMsg: error })
   }


})
/************************** GET ALL Carts of all users **************************/
router.get('/', verifyTokenAndAdmin, async (req, res) => {
   try {
      const carts = await Cart.find();

      res.status(200).json(carts);
   } catch (error) {
      return res.status(500).json({ msg: "Error finding cart", errorMsg: error })
   }

})



/************************** GET USER CART **************************/
router.get('/find/:id', verifyTokenAndAuthorization, async (req, res) => {
   //all can request Cart
   try {
      const cart = await Cart.findById(req.params.id);
      res.status(200).json(cart)

   } catch (error) {

      return res.status(500).json({ msg: "Error finding cart", errorMsg: error })

   }
})

/************************** UPDATE CART **************************/
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
   //only authorized user can update cart

   try {

      const updateRequest = req.body;
      const updatedCart = await Cart.findByIdAndUpdate(req.params.id, updateRequest, { new: true })

      res.status(200).json(updatedCart)

   } catch (error) {

      return res.status(500).json({ msg: 'Something went wrong. No changes made.', errorMsg: error })
   }

})


/************************** DELETE **************************/
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
   //only authorized user can delete cart
   try {

      const deletedCart = await Cart.findByIdAndDelete(req.params.id)
      res.status(200).json({ ...deletedCart._doc, msg: "cart deleted" })

   } catch (error) {

      return res.status(500).json({ msg: 'Something went wrong. No changes made.', errorMsg: error })
   }
})

export default router;
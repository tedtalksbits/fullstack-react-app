import express from 'express'
import Order from '../models/Order.js';
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from './verifyToken.js';
const router = express.Router();


/************************** CREATE ORDER **************************/
//any user  can create a order
router.post('/', verifyToken, async (req, res) => {
   const newOrder = new Order(req.body);

   try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder)

   } catch (error) {
      return res.status(500).json({ msg: "error creating new order", errorMsg: error })
   }


})
/************************** GET ALL ORDER of all USERS **************************/
router.get('/', verifyTokenAndAdmin, async (req, res) => {
   try {
      const orders = await Order.find();

      res.status(200).json(orders);
   } catch (error) {
      return res.status(500).json({ msg: "Error finding orders", errorMsg: error })
   }

})



/************************** GET USER ORDER **************************/
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
   //all can request Cart
   try {
      const orders = await Order.find({ userId: req.params.id });
      res.status(200).json(orders)

   } catch (error) {

      return res.status(500).json({ msg: "Error finding cart", errorMsg: error })

   }
})

/************************** UPDATE ORDER **************************/
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
   //only admin user can update cart

   try {

      const updateRequest = req.body;
      const updatedOrder = await Cart.findByIdAndUpdate(req.params.id, updateRequest, { new: true })

      res.status(200).json(updatedOrder)

   } catch (error) {

      return res.status(500).json({ msg: 'Something went wrong. No changes made.', errorMsg: error })
   }

})


/************************** DELETE **************************/
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
   //only authorized user can delete cart
   try {

      const deletedOrder = await Order.findByIdAndDelete(req.params.id)
      res.status(200).json({ ...deletedOrder._doc, msg: "Order deleted" })

   } catch (error) {

      return res.status(500).json({ msg: 'Something went wrong. No changes made.', errorMsg: error })
   }
})


/************************** GET MONTHLY STATS **************************/

router.get('/income', verifyTokenAndAdmin, async (req, res) => {
   const date = new Date();
   const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
   const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))

   try {
      const income = await Order.aggregate([
         { $match: { createdAt: { $gte: prevMonth } } },
         {
            $project: {
               month: { $month: '$createdAt' },
               sales: "$amount",
            }
         },
         {
            $group: {
               _id: "$month",
               total: { $sum: "$sales" }
            }
         }
      ])
      res.status(200).json(income);
   } catch (error) {
      res.status(500).json({ msg: 'Unable to aggregate', errorMsg: error })
   }
})
export default router;
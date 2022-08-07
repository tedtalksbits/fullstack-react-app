import express from 'express'
import User from '../models/User.js';
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from './verifyToken.js';
const router = express.Router();


/************************** GET ALL USERS **************************/
router.get('/', verifyTokenAndAdmin, async (req, res) => {
   // retrieve url query
   const query = req.query.new;
   try {
      let users;

      if (query) {
         //if theres a query return last 5 users
         users = await User.find().sort({ _id: -1 }).limit(5);
      } else {
         users = await User.find();
      }

      res.status(200).json(users)

   } catch (error) {

      return res.status(500).json(error)

   }
})



/************************** GET **************************/
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
   //allow only admin to get any user by id
   try {
      const user = await User.findById(req.params.id);

      //hide password property from object
      const { password, ...userWithoutPw } = user._doc;

      res.status(200).json(userWithoutPw)

   } catch (error) {

      return res.status(500).json({ msg: "Error finding user", errorMsg: error })

   }
})

/************************** UPDATE USER **************************/
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
   //allow authorized user to update password

   if (req.body.password) {
      //encrypt password again
      req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PW_SECRET).toString()
   }

   try {

      const updateRequest = req.body;
      const updatedUser = await User.findByIdAndUpdate(req.params.id, updateRequest, { new: true })

      res.status(200).json(updatedUser)

   } catch (error) {

      return res.status(500).json({ msg: 'Something went wrong. No changes made.', errorMsg: error })
   }

})


/************************** DELETE **************************/
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
   // allow authorized user to delete account
   try {

      const deletedUser = await User.findByIdAndDelete(req.params.id)
      res.status(200).json({ ...deletedUser._doc, msg: "user deleted" })

   } catch (error) {

      return res.status(500).json({ msg: 'Something went wrong. No changes made.', errorMsg: error })
   }
})

/************************** GET USER STATS **************************/
router.get('/stats', verifyTokenAndAdmin, async (req, res) => {
   const date = new Date();
   const lastYear = date.getFullYear() - 1;
   // const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

   try {

      //mongodb 

      const data = await User.aggregate([
         //count num of admins
         {
            $match: { isAdmin: true }
         },
         {
            $group: { _id: null, numAdmins: { $sum: 1 } }
         }
         // {
         //    $project: {
         //       month: { $month: "$createdAt" }, //get the month(number) in createdAt date
         //    },
         // },
         // {
         //    $group: {
         //       _id: "$month", //group results by month
         //       total: { $sum: 1 }, //sum number of results
         //    }
         // }
      ])

      res.status(200).json(data);

   } catch (error) {
      return res.status(500).json(error)
   }

})

export default router;
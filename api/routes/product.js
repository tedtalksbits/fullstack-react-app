import express from "express";
import Product from "../models/Product.js";
import {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization,
} from "./verifyToken.js";
const router = express.Router();

/************************** POST PRODUCT **************************/
//only admin can post new product
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const product = new Product(req.body);

    try {
        const savedProduct = await product.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        return res
            .status(500)
            .json({ msg: "error add product", errorMsg: error });
    }
});
/************************** GET ALL PRODUCTS **************************/
router.get("/", async (req, res) => {
    // retrieve url query
    const queryForNew = req.query.new;
    const queryForCategory = req.query.category;
    try {
        let product;

        if (queryForNew) {
            //if theres a query return last 5 product
            product = await Product.find().sort({ createdAt: -1 }).limit(10);
        } else if (queryForCategory) {
            //if catergory query is `in` categories (product.catergoies)
            product = await Product.find({
                categories: {
                    $in: [queryForCategory],
                },
            });
        } else {
            product = await Product.find();
        }

        res.status(200).json(product);
    } catch (error) {
        return res
            .status(500)
            .json({
                msg: "Something went wrong. routes/products/line 51",
                errorMsg: error,
            });
    }
});

/************************** GET ONE PRODUCT **************************/
router.get("/find/:id", async (req, res) => {
    //all can request products
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        return res
            .status(500)
            .json({ msg: "Error finding product", errorMsg: error });
    }
});

/************************** UPDATE PRODUCT **************************/
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    //only admin can update product

    try {
        const updateRequest = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updateRequest,
            { new: true }
        );

        res.status(200).json(updatedProduct);
    } catch (error) {
        return res
            .status(500)
            .json({
                msg: "Something went wrong. No changes made.",
                errorMsg: error,
            });
    }
});

/************************** DELETE **************************/
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    //only admin can delete product
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            ...deletedProduct._doc,
            msg: "product deleted",
        });
    } catch (error) {
        return res
            .status(500)
            .json({
                msg: "Something went wrong. No changes made.",
                errorMsg: error,
            });
    }
});

export default router;

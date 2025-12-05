import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        orderImage: {
            type: String,
            required: true,
        },
        reviewImage: {
            type: String,
        },
        returnImage: {
            type: String,
        },
        sellerImage: {
            type: String,
        },
        productName: {
            type: String,
            required: true,
        },
        exchangeName: {
            type: String,
            default: "Original",
        },
        productBrand: {
            type: String,
            required: true,
        },
        platform: {
            type: String,
            required: true,
            enum: ["Amazon", "Flipkart", "Meesho", "Myntra", "Ajio"],
        },
        mediatorName: {
            type: String,
            required: true,
        },
        mediatorNumber: {
            type: String,
            required: true,
        },
        orderType: {
            type: String,
            required: true,
            enum: ["Original", "Exchange"],
        },
        dealType: {
            type: String,
            required: true,
            enum: ["Review", "Rating","Order"],
        },
        reviewStatus: {
            type: String,
            required: true,
            enum: ["Pending", "Live", "Unverified", "Deleted"],
            default: "Pending",
        },
        reviewLink: {
            type: String,
            default: "",
        },
        orderLink: {
            type: String,
            required: true,
            default: "",
        },
        paymentStatus: {
            type: String,
            required: true,
            enum: ["Pending", "Completed", "Rejected"],
            default: "Pending",
        },
        reviwer: {
            type: String,
            required: true,
        },
        reviewerEmail: {
            type: String,
            required: true,
        },
        productPrice: {
            type: String,
            required: true,
        },
        productLess: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        timeLine: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Model
const productModel =
    mongoose.models.product || mongoose.model("product", productSchema);
export default productModel;

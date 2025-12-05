"use server";

import ConnectDB from "@/configs/connectDB";
import productModel from "@/models/productModel";
import {
    uploadMultipleImagesToCloudinary,
    deleteImageFromCloudinary,
} from "@/utils/uploadImage";
import { revalidatePath, revalidateTag, unstable_noStore } from "next/cache";

// Get all products
export async function getProducts() {
    unstable_noStore(); // Prevent caching to ensure fresh data on every request
    try {
        await ConnectDB();
        const allData = await productModel
            .find({})
            .sort({ createdAt: -1 })
            .lean();
        return JSON.parse(JSON.stringify(allData));
    } catch (error) {
        console.error("Get Products Error", error);
        return [];
    }
}

// Get single product by ID
export async function getProduct(id) {
    unstable_noStore(); // Prevent caching to ensure fresh data on every request
    try {
        await ConnectDB();
        const single = await productModel.findById(id).lean();
        return JSON.parse(JSON.stringify(single));
    } catch (error) {
        console.error("Get Product Error", error);
        return null;
    }
}

// Add a new product
export async function addProduct(formData) {
    try {
        await ConnectDB();

        // Debug: Check if formData has the image file
        const orderImageFile = formData.get("orderImage");
        console.log("Order image file received:", {
            exists: !!orderImageFile,
            type: orderImageFile?.constructor?.name,
            isFile: orderImageFile instanceof File,
            size: orderImageFile?.size,
            name: orderImageFile?.name,
        });

        // Handle image uploads to Cloudinary
        const imageFields = ["orderImage", "reviewImage", "returnImage", "sellerImage"];
        const uploadedImages = await uploadMultipleImagesToCloudinary(
            formData,
            imageFields,
            "product-info"
        );

        console.log("Uploaded images result:", uploadedImages);

        // Check if all required images are uploaded
        if (!uploadedImages.orderImage) {
            return {
                message: "Order image is required. Please upload an image file.",
                status: 400,
            };
        }

        const productData = {
            orderImage: uploadedImages.orderImage,
            reviewImage: uploadedImages.reviewImage,
            returnImage: uploadedImages.returnImage,
            sellerImage: uploadedImages.sellerImage,
            productName: formData.get("productName"),
            exchangeName: formData.get("exchangeName") || "Original",
            productBrand: formData.get("productBrand"),
            platform: formData.get("platform") || "amazon",
            mediatorName: formData.get("mediatorName"),
            mediatorNumber: formData.get("mediatorNumber"),
            orderType: formData.get("orderType") || "Original",
            dealType: formData.get("dealType") || "Review",
            reviewStatus: formData.get("reviewStatus") || "Pending",
            reviewLink: formData.get("reviewLink") || "",
            orderLink: formData.get("orderLink") || "",
            paymentStatus: formData.get("paymentStatus") || "Pending",
            reviwer: formData.get("reviwer"),
            reviewerEmail: formData.get("reviewerEmail"),
            productPrice: formData.get("productPrice"),
            productLess: formData.get("productLess"),
            address: formData.get("address"),
            timeLine: formData.get("timeLine"),
        };

        // Validate required fields
        if (
            !productData.productName ||
            !productData.productBrand ||
            !productData.mediatorName ||
            !productData.mediatorNumber ||
            !productData.reviwer ||
            !productData.reviewerEmail ||
            !productData.productPrice ||
            !productData.productLess ||
            !productData.address 
        ) {
            return {
                message: "All required fields must be filled",
                status: 400,
            };
        }

        await productModel.create(productData);
        revalidatePath("/");
        revalidateTag("products");

        return {
            message: "Product added successfully",
            status: 201,
        };
    } catch (error) {
        console.error("Add Product Error", error);
        return {
            message: "Error adding product",
            error: error.message,
            status: 500,
        };
    }
}

// Edit an existing product
export async function editProduct(id, formData) {
    try {
        await ConnectDB();

        const existingProduct = await productModel.findById(id).lean();

        if (!existingProduct) {
            return {
                message: "Product not found",
                status: 404,
            };
        }

        // Handle image uploads to Cloudinary (only upload if new files are provided)
        const imageFields = ["orderImage", "reviewImage", "returnImage", "sellerImage"];
        const uploadedImages = await uploadMultipleImagesToCloudinary(
            formData,
            imageFields,
            "product-info"
        );

        // Delete old images from Cloudinary if new ones are uploaded
        const imagesToDelete = [];
        if (uploadedImages.orderImage && existingProduct.orderImage) {
            imagesToDelete.push(existingProduct.orderImage);
        }
        if (uploadedImages.reviewImage && existingProduct.reviewImage) {
            imagesToDelete.push(existingProduct.reviewImage);
        }
        if (uploadedImages.returnImage && existingProduct.returnImage) {
            imagesToDelete.push(existingProduct.returnImage);
        }
        if (uploadedImages.sellerImage && existingProduct.sellerImage) {
            imagesToDelete.push(existingProduct.sellerImage);
        }

        // Delete old images in parallel (don't wait for completion)
        Promise.all(imagesToDelete.map((url) => deleteImageFromCloudinary(url))).catch(
            (error) => console.error("Error deleting old images:", error)
        );

        const productData = {
            orderImage:
                uploadedImages.orderImage || existingProduct.orderImage,
            reviewImage:
                uploadedImages.reviewImage || existingProduct.reviewImage,
            returnImage:
                uploadedImages.returnImage || existingProduct.returnImage,
            sellerImage:
                uploadedImages.sellerImage || existingProduct.sellerImage,
            productName: formData.get("productName") || existingProduct.productName,
            exchangeName: formData.get("exchangeName") || existingProduct.exchangeName,
            productBrand: formData.get("productBrand") || existingProduct.productBrand,
            platform: formData.get("platform") || existingProduct.platform,
            mediatorName: formData.get("mediatorName") || existingProduct.mediatorName,
            mediatorNumber:
                formData.get("mediatorNumber") || existingProduct.mediatorNumber,
            orderType: formData.get("orderType") || existingProduct.orderType,
            dealType: formData.get("dealType") || existingProduct.dealType,
            reviewStatus:
                formData.get("reviewStatus") || existingProduct.reviewStatus,
            reviewLink: formData.get("reviewLink") || existingProduct.reviewLink,
            orderLink: formData.get("orderLink") || existingProduct.orderLink,
            paymentStatus:
                formData.get("paymentStatus") || existingProduct.paymentStatus,
            reviwer: formData.get("reviwer") || existingProduct.reviwer,
            reviewerEmail:
                formData.get("reviewerEmail") || existingProduct.reviewerEmail,
            productPrice: formData.get("productPrice") || existingProduct.productPrice,
            productLess: formData.get("productLess") || existingProduct.productLess,
            address: formData.get("address") || existingProduct.address,
            timeLine: formData.get("timeLine") || existingProduct.timeLine,
        };

        await productModel.findByIdAndUpdate(id, productData);
        revalidatePath("/");
        revalidateTag("products");

        return {
            message: "Product updated successfully",
            status: 202,
        };
    } catch (error) {
        console.error("Update Product Error", error);
        return {
            message: "Error updating product",
            error: error.message,
            status: 500,
        };
    }
}

// Delete an existing product
export async function deleteProduct(id) {
    try {
        await ConnectDB();
        const product = await productModel.findById(id).lean();

        if (!product) {
            return {
                message: "Product not found",
                status: 404,
            };
        }

        // Delete images from Cloudinary
        const imagesToDelete = [
            product.orderImage,
            product.reviewImage,
            product.returnImage,
            product.sellerImage,
        ].filter(Boolean); // Remove empty strings/null values

        // Delete images in parallel (don't wait for completion)
        Promise.all(imagesToDelete.map((url) => deleteImageFromCloudinary(url))).catch(
            (error) => console.error("Error deleting images:", error)
        );

        await productModel.findByIdAndDelete(id);
        revalidatePath("/");
        revalidateTag("products");

        return {
            message: "Product deleted successfully",
            status: 202,
        };
    } catch (error) {
        console.error("Delete Product Error", error);
        return {
            message: "Error deleting product",
            error: error.message,
            status: 500,
        };
    }
}

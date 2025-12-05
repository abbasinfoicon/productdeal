import cloudinary from "./cloudinary";

/**
 * Upload a file to Cloudinary
 * @param {File} file - The file to upload
 * @param {string} folder - Optional folder name in Cloudinary
 * @returns {Promise<string>} - The uploaded image URL
 */
export async function uploadImageToCloudinary(file, folder = "product-info") {
    // Validate file object - handle both File instances and File-like objects from Next.js FormData
    if (!file) {
        console.error("No file provided");
        return "";
    }

    // Check if it's a File instance or has File-like properties
    const isFileInstance = file instanceof File;
    const hasFileProperties = file.size !== undefined && file.size > 0;
    
    if (!isFileInstance && !hasFileProperties) {
        console.error("Invalid file object:", {
            file: file,
            isFile: isFileInstance,
            size: file?.size,
            type: typeof file,
            constructor: file?.constructor?.name,
        });
        return "";
    }

    // Check Cloudinary configuration
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
        console.error("Cloudinary credentials are not configured");
        throw new Error("Cloudinary is not configured. Please set up your environment variables in .env.local");
    }

    try {
        // Convert file to buffer - handle both File and Blob-like objects
        let buffer;
        if (file.arrayBuffer) {
            buffer = Buffer.from(await file.arrayBuffer());
        } else if (file.buffer) {
            buffer = file.buffer;
        } else {
            throw new Error("File object does not have arrayBuffer() or buffer property");
        }

        // Convert buffer to base64
        const base64Image = buffer.toString("base64");
        const mimeType = file.type || file.mimetype || "image/jpeg";
        const dataURI = `data:${mimeType};base64,${base64Image}`;

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(dataURI, {
            folder: folder,
            resource_type: "image",
            transformation: [
                {
                    quality: "auto",
                    fetch_format: "auto",
                },
            ],
        });

        return result.secure_url;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw new Error(`Failed to upload image: ${error.message}`);
    }
}

/**
 * Upload multiple images to Cloudinary
 * @param {FormData} formData - FormData containing files
 * @param {string[]} fieldNames - Array of field names to extract from formData
 * @param {string} folder - Optional folder name in Cloudinary
 * @returns {Promise<Object>} - Object with field names as keys and image URLs as values
 */
export async function uploadMultipleImagesToCloudinary(
    formData,
    fieldNames,
    folder = "product-info"
) {
    const uploads = {};
    for (const fieldName of fieldNames) {
        const file = formData.get(fieldName);
        
        // Check if file exists and has valid properties
        // In Next.js server actions, FormData files should be File instances
        if (file) {
            const isFileInstance = file instanceof File;
            const hasFileProperties = file.size !== undefined && file.size > 0;
            
            if (isFileInstance || hasFileProperties) {
                try {
                    uploads[fieldName] = await uploadImageToCloudinary(file, folder);
                } catch (error) {
                    console.error(`Error uploading ${fieldName}:`, error);
                    uploads[fieldName] = "";
                }
            } else {
                // Log for debugging if file exists but isn't valid
                console.log(`File ${fieldName} exists but is not a valid File object:`, {
                    type: typeof file,
                    constructor: file?.constructor?.name,
                    size: file?.size,
                    name: file?.name,
                    isFile: isFileInstance,
                });
            }
        } else {
            console.log(`No file found for field: ${fieldName}`);
        }
    }
    return uploads;
}

/**
 * Delete an image from Cloudinary
 * @param {string} imageUrl - The Cloudinary image URL to delete
 * @returns {Promise<void>}
 */
export async function deleteImageFromCloudinary(imageUrl) {
    if (!imageUrl || !imageUrl.includes("cloudinary.com")) {
        return; // Not a Cloudinary URL, skip deletion
    }

    try {
        // Extract public_id from Cloudinary URL
        // URL format: https://res.cloudinary.com/{cloud_name}/image/upload/{version}/{folder}/{public_id}.{format}
        // or: https://res.cloudinary.com/{cloud_name}/image/upload/{folder}/{public_id}.{format}
        const urlParts = imageUrl.split("/");
        const uploadIndex = urlParts.findIndex((part) => part === "upload");

        if (uploadIndex === -1) {
            console.error("Invalid Cloudinary URL format");
            return;
        }

        // Get everything after "upload" (skip version if present)
        const afterUpload = urlParts.slice(uploadIndex + 1);
        // Check if first part after upload is a version number
        const startIndex = /^\d+$/.test(afterUpload[0]) ? 1 : 0;
        const pathParts = afterUpload.slice(startIndex);

        // Get the filename (last part) and remove extension
        const filename = pathParts[pathParts.length - 1];
        const publicIdWithoutExt = filename.split(".")[0];

        // Reconstruct public_id with folder path (everything except the filename)
        const folderPath = pathParts.slice(0, -1).join("/");
        const fullPublicId = folderPath
            ? `${folderPath}/${publicIdWithoutExt}`
            : publicIdWithoutExt;

        await cloudinary.uploader.destroy(fullPublicId);
    } catch (error) {
        console.error("Cloudinary delete error:", error);
        // Don't throw error, just log it
    }
}


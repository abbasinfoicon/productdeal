"use client";
import { FaEdit, FaExternalLinkAlt } from "react-icons/fa";
import { FiX, FiLink, FiMapPin, FiClock } from "react-icons/fi";
import ProductImage from "@/components/ProductImage";

const ProductDetails = ({ product, isOpen, onClose, onEdit, onDelete }) => {
  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden flex flex-col animate-slideUp border-2 border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-8 py-6 flex items-center justify-between relative overflow-hidden h-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Product Details
            </h2>
            <p className="text-gray-300 text-sm font-medium">Order ID: <span className="font-bold">#{product._id?.toString().slice(-6) || 'N/A'}</span></p>
          </div>
          <button
            onClick={onClose}
            className="relative z-10 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2.5 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-8 bg-gradient-to-br from-gray-50 via-white to-gray-50">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Image Section */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Main Product Image */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                  <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-2xl border-4 border-white transform group-hover:scale-[1.02] transition-transform duration-300">
                    <ProductImage
                      src={product.orderImage}
                      alt={product.productName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-black/80 to-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg border border-white/20">
                    Order Image
                  </div>
                </div>

                {/* Additional Images Grid */}
                <div className="bg-white rounded-2xl p-5 shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                  <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-gray-900 rounded-full"></span>
                    Additional Images
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative group">
                      <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-md hover:shadow-lg">
                        <ProductImage
                          src={product.reviewImage}
                          alt="Review Image"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 bg-gradient-to-r from-black/80 to-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-bold text-center shadow-lg border border-white/20">
                        Review
                      </div>
                    </div>
                    <div className="relative group">
                      <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-md hover:shadow-lg">
                        <ProductImage
                          src={product.returnImage}
                          alt="Return Image"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 bg-gradient-to-r from-black/80 to-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-bold text-center shadow-lg border border-white/20">
                        Return
                      </div>
                    </div>
                    <div className="relative group col-span-2">
                      <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-md hover:shadow-lg">
                        <ProductImage
                          src={product.sellerImage}
                          alt="Seller Image"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 bg-gradient-to-r from-black/80 to-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-bold text-center shadow-lg border border-white/20">
                        Seller
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Badges - Modern Card */}
                <div className="bg-white rounded-2xl p-5 shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                  <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-gray-900 rounded-full"></span>
                    Status
                  </h4>
                  <div className="flex flex-col gap-3">
                    <span className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-2 border-blue-200 shadow-sm">
                      Deal Type: <strong className="ml-1">{product.dealType}</strong>
                    </span>
                    <span className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border-2 border-gray-200 shadow-sm">
                      Order Type: <strong className="ml-1">{product.orderType}</strong>
                    </span>
                    <span
                      className={`inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-bold border-2 shadow-sm ${
                        product.reviewStatus === "Live"
                          ? "bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-200"
                          : product.reviewStatus === "Pending"
                          ? "bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-800 border-yellow-200"
                          : product.reviewStatus === "Unverified"
                          ? "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border-gray-200"
                          : product.reviewStatus === "Deleted"
                          ? "bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-200"
                          : "bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-200"
                      }`}
                    >
                      Review: <strong className="ml-1">{product.reviewStatus}</strong>
                    </span>
                    <span
                      className={`inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-bold border-2 shadow-sm ${
                        product.paymentStatus === "Pending"
                          ? "bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-800 border-yellow-200"
                          : product.paymentStatus === "Completed"
                          ? "bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-200"
                          : "bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-200"
                      }`}
                    >
                      Payment: <strong className="ml-1">{product.paymentStatus}</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Product Name Card */}
              <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4 leading-tight">
                  {product.productName}
                </h3>
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t-2 border-gray-100">
                  <span className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 rounded-xl text-sm font-bold border-2 border-gray-200 shadow-sm">
                    Brand: <strong className="ml-1">{product.productBrand}</strong>
                  </span>
                  <span className="text-gray-400 font-bold">•</span>
                  <span className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 rounded-xl text-sm font-bold border-2 border-gray-200 shadow-sm">
                    Exchange: <strong className="ml-1">{product.exchangeName}</strong>
                  </span>
                  <span className="ml-auto px-4 py-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl text-sm font-bold capitalize shadow-lg">
                    {product.platform}
                  </span>
                </div>
              </div>

              {/* Pricing Card */}
              <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl text-white overflow-hidden border-2 border-gray-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                <h4 className="relative z-10 text-sm font-bold text-gray-300 uppercase tracking-wider mb-5 flex items-center gap-2">
                  <span className="w-1 h-4 bg-white rounded-full"></span>
                  Pricing Details
                </h4>
                <div className="relative z-10 space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b-2 border-white/10">
                    <span className="text-gray-300 font-medium">Product Price</span>
                    <span className="text-2xl font-bold">₹{product.productPrice}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b-2 border-white/10">
                    <span className="text-gray-300 font-medium">Less Amount</span>
                    <span className="text-xl font-bold text-red-300">-₹{product.productLess}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xl font-bold">Refund Price</span>
                    <span className="text-4xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
                      ₹{parseInt(product.productPrice) - parseInt(product.productLess)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Information Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Mediator Information */}
                <div className="bg-white rounded-2xl p-5 shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                  <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-5 bg-gradient-to-b from-gray-900 to-gray-700 rounded-full"></span>
                    Mediator Information
                  </h4>
                  <div className="space-y-4">
                    <div className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                      <p className="text-xs text-gray-600 uppercase tracking-wide mb-2 font-bold">Name</p>
                      <p className="text-sm font-bold text-gray-900">{product.mediatorName}</p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                      <p className="text-xs text-gray-600 uppercase tracking-wide mb-2 font-bold">Contact</p>
                      <p className="text-sm font-bold text-gray-900">{product.mediatorNumber}</p>
                    </div>
                  </div>
                </div>

                {/* Reviewer Information */}
                <div className="bg-white rounded-2xl p-5 shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                  <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-5 bg-gradient-to-b from-gray-900 to-gray-700 rounded-full"></span>
                    Reviewer Information
                  </h4>
                  <div className="space-y-4">
                    <div className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                      <p className="text-xs text-gray-600 uppercase tracking-wide mb-2 font-bold">Name</p>
                      <p className="text-sm font-bold text-gray-900">{product.reviwer}</p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                      <p className="text-xs text-gray-600 uppercase tracking-wide mb-2 font-bold">Email</p>
                      <p className="text-sm font-bold text-gray-900 break-all">{product.reviewerEmail}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Links Card */}
              <div className="bg-white rounded-xl p-5 shadow-md border border-gray-200">
                <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FiLink className="text-gray-600" />
                  <span className="w-1 h-5 bg-gray-900 rounded-full"></span>
                  Important Links
                </h4>
                <div className="space-y-3">
                  <a
                    href={product.reviewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FiLink className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Review Link</p>
                        <p className="text-sm font-semibold text-gray-900 truncate max-w-[200px]">{product.reviewLink}</p>
                      </div>
                    </div>
                    <FaExternalLinkAlt className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </a>
                  <a
                    href={product.orderLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <FiLink className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Order Link</p>
                        <p className="text-sm font-semibold text-gray-900 truncate max-w-[200px]">{product.orderLink}</p>
                      </div>
                    </div>
                    <FaExternalLinkAlt className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </a>
                </div>
              </div>

              {/* Address Card */}
              <div className="bg-white rounded-xl p-5 shadow-md border border-gray-200">
                <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FiMapPin className="text-gray-600" />
                  <span className="w-1 h-5 bg-gray-900 rounded-full"></span>
                  Delivery Address
                </h4>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm font-semibold text-gray-900 leading-relaxed">{product.address}</p>
                </div>
              </div>

              {/* Timeline Card */}
              <div className="bg-white rounded-xl p-5 shadow-md border border-gray-200">
                <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FiClock className="text-gray-600" />
                  <span className="w-1 h-5 bg-gray-900 rounded-full"></span>
                  Timeline & Dates
                </h4>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Timeline</p>
                    <p className="text-lg font-bold text-gray-900">{product.timeLine} Days</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Order Date</p>
                      <p className="text-sm font-semibold text-gray-900">{product.createdAt}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Review Date</p>
                      <p className="text-sm font-semibold text-gray-900">{product.updatedAt}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gradient-to-r from-gray-50 to-white border-t-2 border-gray-200 px-8 py-5 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onDelete && onDelete(product);
            }}
            className="group relative px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10">Delete Product</span>
            <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 text-sm font-bold text-gray-700 bg-white rounded-xl hover:bg-gray-50 transition-all duration-200 border-2 border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onEdit(product);
              }}
              className="group px-6 py-3 text-sm font-bold text-gray-700 bg-white rounded-xl hover:bg-gray-50 transition-all duration-200 border-2 border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <FaEdit className="w-4 h-4" />
              Edit Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

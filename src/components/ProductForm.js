"use client";
import { FiX, FiLink, FiMapPin } from "react-icons/fi";

const ProductForm = ({
  isOpen,
  onClose,
  formData,
  editingProduct,
  handleInputChange,
  handleImageChange,
  handleSubmit,
  setFormData,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden flex flex-col animate-slideUp border-2 border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-8 py-6 flex items-center justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <p className="text-gray-300 text-sm font-medium">
              {editingProduct
                ? `Order ID: #${editingProduct._id?.toString().slice(-6) || 'N/A'}`
                : "Fill in all the product details"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="relative z-10 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2.5 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-8 bg-gradient-to-br from-gray-50 via-white to-gray-50">
          <div className="space-y-6">
            {/* Product Information Section */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-gradient-to-b from-gray-900 to-gray-700 rounded-full"></span>
                Product Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter Product Name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 bg-white hover:border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Product Brand *
                  </label>
                  <input
                    type="text"
                    name="productBrand"
                    value={formData.productBrand}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter Product Brand"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 bg-white hover:border-gray-300 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Order Type *
                  </label>
                  <select
                    name="orderType"
                    value={formData.orderType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 bg-white hover:border-gray-300 cursor-pointer"
                  >
                    <option value="Original">Original</option>
                    <option value="Exchange">Exchange</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Exchange Name *
                  </label>
                  <input
                    type="text"
                    name="exchangeName"
                    value={formData.exchangeName || "Original"}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter Exchange Name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 bg-white hover:border-gray-300 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Platform *
                  </label>
                  <select
                    name="platform"
                    value={formData.platform}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 bg-white hover:border-gray-300 cursor-pointer"
                  >
                    <option value="">Choose Platform</option>
                    <option value="Amazon">Amazon</option>
                    <option value="Flipkart">Flipkart</option>
                    <option value="Meesho">Meesho</option>
                    <option value="Myntra">Myntra</option>
                    <option value="Ajio">Ajio</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Deal Type *
                  </label>
                  <select
                    name="dealType"
                    value={formData.dealType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 bg-white hover:border-gray-300 cursor-pointer"
                  >
                    <option value="">Choose Deal Type</option>
                    <option value="Review">Review</option>
                    <option value="Rating">Rating</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-gradient-to-b from-gray-900 to-gray-700 rounded-full"></span>
                Product Images
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Order Image */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Order Image * <span className="text-xs text-gray-500 font-medium">(JPG/PNG/JPEG)</span>
                  </label>
                  <div className="space-y-2">
                    {formData.orderImage && (
                      <div className="relative w-full h-32 rounded-xl overflow-hidden border-2 border-gray-200 shadow-md">
                        <img
                          src={formData.orderImage}
                          alt="Order preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, orderImage: "" }))}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg"
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    )}
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-200 hover:border-gray-400 shadow-sm hover:shadow-md">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">JPG, PNG, JPEG (MAX. 5MB)</p>
                      </div>
                      <input
                        type="file"
                        name="orderImage"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl text-white overflow-hidden border-2 border-gray-700">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
              <h3 className="relative z-10 text-lg font-bold mb-5 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-white rounded-full"></span>
                Pricing Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">
                    Product Price (₹) *
                  </label>
                  <input
                    type="text"
                    name="productPrice"
                    value={formData.productPrice}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter Product Price"
                    className="relative z-10 w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/40 transition-all duration-200 hover:bg-white/15"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">
                    Less Amount (₹) *
                  </label>
                  <input
                    type="text"
                    name="productLess"
                    value={formData.productLess}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter Less Amount"
                    className="relative z-10 w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/40 transition-all duration-200 hover:bg-white/15"
                  />
                </div>
              </div>
              {formData.productPrice && formData.productLess && (
                <div className="relative z-10 mt-5 pt-4 border-t-2 border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Refund Price</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
                      ₹{parseInt(formData.productPrice || 0) - parseInt(formData.productLess || 0)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Order Link Section */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FiLink className="text-gray-600" />
                <span className="w-1 h-6 bg-gray-900 rounded-full"></span>
                Order Link
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Order Link *
                  </label>
                  <input
                    type="url"
                    name="orderLink"
                    value={formData.orderLink}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter Order Link"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 bg-white hover:border-gray-300 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Mediator Information */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-gray-900 rounded-full"></span>
                Mediator Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Mediator Name *
                  </label>
                  <input
                    type="text"
                    name="mediatorName"
                    value={formData.mediatorName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter Mediator Name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 bg-white hover:border-gray-300 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Mediator Number *
                  </label>
                  <input
                    type="tel"
                    name="mediatorNumber"
                    value={formData.mediatorNumber}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter Mediator Number"
                    pattern="[0-9]{10}"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 bg-white hover:border-gray-300 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Reviewer Information */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-gray-900 rounded-full"></span>
                Reviewer Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Reviewer Name *
                  </label>
                  <input
                    type="text"
                    name="reviwer"
                    value={formData.reviwer}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter Reviewer Name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 bg-white hover:border-gray-300 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Reviewer Email *
                  </label>
                  <input
                    type="email"
                    name="reviewerEmail"
                    value={formData.reviewerEmail}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter Reviewer Email"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 bg-white hover:border-gray-300 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Address & Timeline */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FiMapPin className="text-gray-600" />
                <span className="w-1 h-6 bg-gray-900 rounded-full"></span>
                Address
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Delivery Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 bg-white hover:border-gray-300 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-gray-900 rounded-full"></span>
                After Review Images
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Review Image */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Review Image <span className="text-xs text-gray-500">(JPG/PNG/JPEG)</span>
                  </label>
                  <div className="space-y-2">
                    {formData.reviewImage && (
                      <div className="relative w-full h-32 rounded-xl overflow-hidden border-2 border-gray-200 shadow-md">
                        <img
                          src={formData.reviewImage}
                          alt="Review preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, reviewImage: "" }))}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg"
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    )}
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-200 hover:border-gray-400 shadow-sm hover:shadow-md">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">JPG, PNG, JPEG (MAX. 5MB)</p>
                      </div>
                      <input
                        type="file"
                        name="reviewImage"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Return Image */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Return Image <span className="text-xs text-gray-500">(JPG/PNG/JPEG)</span>
                  </label>
                  <div className="space-y-2">
                    {formData.returnImage && (
                      <div className="relative w-full h-32 rounded-xl overflow-hidden border-2 border-gray-200 shadow-md">
                        <img
                          src={formData.returnImage}
                          alt="Return preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, returnImage: "" }))}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg"
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    )}
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-200 hover:border-gray-400 shadow-sm hover:shadow-md">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">JPG, PNG, JPEG (MAX. 5MB)</p>
                      </div>
                      <input
                        type="file"
                        name="returnImage"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Seller Image */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Seller Image <span className="text-xs text-gray-500">(JPG/PNG/JPEG)</span>
                  </label>
                  <div className="space-y-2">
                    {formData.sellerImage && (
                      <div className="relative w-full h-32 rounded-xl overflow-hidden border-2 border-gray-200 shadow-md">
                        <img
                          src={formData.sellerImage}
                          alt="Seller preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, sellerImage: "" }))}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg"
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    )}
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-200 hover:border-gray-400 shadow-sm hover:shadow-md">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">JPG, PNG, JPEG (MAX. 5MB)</p>
                      </div>
                      <input
                        type="file"
                        name="sellerImage"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Review Live Links Section */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FiLink className="text-gray-600" />
                <span className="w-1 h-6 bg-gray-900 rounded-full"></span>
                Review Live Links
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Review Link
                  </label>
                  <input
                    type="url"
                    name="reviewLink"
                    value={formData.reviewLink}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter Review Link"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 bg-white hover:border-gray-300 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Status & Type Section */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-gray-900 rounded-full"></span>
                Timeline, Status & Type
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Timeline (Days)
                  </label>
                  <input
                    type="number"
                    name="timeLine"
                    value={formData.timeLine}
                    onChange={handleInputChange}
                    required
                    min="1"
                    placeholder="Enter Timeline"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 bg-white hover:border-gray-300 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Review Status *
                  </label>
                  <select
                    name="reviewStatus"
                    value={formData.reviewStatus}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 bg-white hover:border-gray-300 cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Live">Live</option>
                    <option value="Unverified">Unverified</option>
                    <option value="Deleted">Deleted</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Payment Status *
                  </label>
                  <select
                    name="paymentStatus"
                    value={formData.paymentStatus}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 bg-white hover:border-gray-300 cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Form Footer */}
        <div className="bg-gradient-to-r from-gray-50 to-white border-t-2 border-gray-200 px-8 py-5 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-sm font-bold text-gray-700 bg-white rounded-xl hover:bg-gray-50 transition-all duration-200 border-2 border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="group relative px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl hover:from-gray-800 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10">{editingProduct ? "Update Product" : "Add Product"}</span>
            <span className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;


"use client";
import { FiX, FiAlertTriangle } from "react-icons/fi";

const DeleteConfirmation = ({ isOpen, onClose, onConfirm, product }) => {
  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full animate-slideUp border-2 border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 text-white px-6 py-5 flex items-center justify-between rounded-t-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
              <FiAlertTriangle size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent">
                Delete Product
              </h2>
              <p className="text-red-100 text-sm font-medium">This action cannot be undone</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="relative z-10 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2.5 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
          <div className="mb-6">
            <p className="text-gray-800 text-base mb-4 font-semibold">
              Are you sure you want to delete this product?
            </p>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border-2 border-gray-200 shadow-sm">
              <p className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Product Details:</p>
              <div className="space-y-2">
                <p className="text-sm text-gray-700 font-medium">
                  <span className="font-bold text-gray-900">ID:</span> <span className="text-gray-800">#{product._id?.toString().slice(-6) || 'N/A'}</span>
                </p>
                <p className="text-sm text-gray-700 font-medium">
                  <span className="font-bold text-gray-900">Name:</span> <span className="text-gray-800">{product.productName}</span>
                </p>
                <p className="text-sm text-gray-700 font-medium">
                  <span className="font-bold text-gray-900">Brand:</span> <span className="text-gray-800">{product.productBrand}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-200 rounded-xl p-4 mb-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-yellow-200 rounded-lg flex items-center justify-center flex-shrink-0">
                <FiAlertTriangle className="text-yellow-700" size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-yellow-900 mb-1">Warning</p>
                <p className="text-sm text-yellow-800 font-medium">
                  This will permanently delete the product and all associated data. This action cannot be undone.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gradient-to-r from-gray-50 to-white border-t-2 border-gray-200 px-6 py-4 flex items-center justify-end gap-3 rounded-b-3xl">
          <button
            onClick={onClose}
            className="px-6 py-3 text-sm font-bold text-gray-700 bg-white rounded-xl hover:bg-gray-50 transition-all duration-200 border-2 border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="group relative px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10">Delete Product</span>
            <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;


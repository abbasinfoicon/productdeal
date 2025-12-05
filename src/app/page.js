"use client";
import { useState, useMemo, useEffect } from "react";
import { FcStackOfPhotos, FcAlarmClock, FcAcceptDatabase, FcBearish } from "react-icons/fc";
import { FaRegEye, FaEdit, FaTrash } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";
import ProductImage from "@/components/ProductImage";
import ProductDetails from "@/components/ProductDetails";
import ProductForm from "@/components/ProductForm";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import { getProducts, addProduct, editProduct, deleteProduct } from "@/actions/productAction";

export default function Home() {
  const [productsList, setProductsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageFiles, setImageFiles] = useState({
    orderImage: null,
    reviewImage: null,
    returnImage: null,
    sellerImage: null,
  });
  const [formData, setFormData] = useState({
    orderImage: "",
    reviewImage: "",
    returnImage: "",
    sellerImage: "",
    productName: "",
    exchangeName: "",
    productBrand: "",
    platform: "amazon",
    mediatorName: "",
    mediatorNumber: "",
    orderType: "Original",
    dealType: "Review",
    reviewStatus: "Pending",
    reviewLink: "",
    orderLink: "",
    paymentStatus: "Pending",
    reviwer: "",
    reviewerEmail: "",
    productPrice: "",
    productLess: "",
    address: "",
    timeLine: "",
  });
  const itemsPerPage = 10;

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await getProducts();
        console.log("Fetched products:", data);
        setProductsList(data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products");
        setProductsList([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleOpenAddForm = () => {
    setEditingProduct(null);
    setImageFiles({
      orderImage: null,
      reviewImage: null,
      returnImage: null,
      sellerImage: null,
    });
    setFormData({
      orderImage: "",
      reviewImage: "",
      returnImage: "",
      sellerImage: "",
      productName: "",
      exchangeName: "",
      productBrand: "",
      platform: "amazon",
      mediatorName: "",
      mediatorNumber: "",
      orderType: "Original",
      dealType: "Review",
      reviewStatus: "Pending",
      reviewLink: "",
      orderLink: "",
      paymentStatus: "Pending",
      reviwer: "",
      reviewerEmail: "",
      productPrice: "",
      productLess: "",
      address: "",
      timeLine: "",
    });
    setIsFormModalOpen(true);
  };

  const handleOpenEditForm = (product) => {
    setEditingProduct(product);
    setImageFiles({
      orderImage: null,
      reviewImage: null,
      returnImage: null,
      sellerImage: null,
    });
    setFormData({
      orderImage: product.orderImage || "",
      reviewImage: product.reviewImage || "",
      returnImage: product.returnImage || "",
      sellerImage: product.sellerImage || "",
      productName: product.productName || "",
      exchangeName: product.exchangeName || "",
      productBrand: product.productBrand || "",
      platform: product.platform || "amazon",
      mediatorName: product.mediatorName || "",
      mediatorNumber: product.mediatorNumber || "",
      orderType: product.orderType || "Original",
      dealType: product.dealType || "Review",
      reviewStatus: product.reviewStatus || "Pending",
      reviewLink: product.reviewLink || "",
      orderLink: product.orderLink || "",
      paymentStatus: product.paymentStatus || "Pending",
      reviwer: product.reviwer || "",
      reviewerEmail: product.reviewerEmail || "",
      productPrice: product.productPrice || "",
      productLess: product.productLess || "",
      address: product.address || "",
      timeLine: product.timeLine || "",
    });
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingProduct(null);
  };

  const handleOpenDeleteModal = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      try {
        const result = await deleteProduct(productToDelete._id);
        if (result.status === 202) {
          // Fetch updated products
          const updatedProducts = await getProducts();
          setProductsList(updatedProducts || []);
          
          // Calculate remaining products count
          const remainingCount = updatedProducts?.length || 0;
          
          // Calculate new total pages
          const newTotalPages = Math.ceil(remainingCount / itemsPerPage);
          
          // Reset pagination if needed
          if (currentPage > newTotalPages && newTotalPages > 0) {
            setCurrentPage(newTotalPages);
          } else if (newTotalPages === 0) {
            setCurrentPage(1);
          }
          
          handleCloseDeleteModal();
          toast.success("Product deleted successfully");
        } else {
          toast.error(result.message || "Error deleting product");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Error deleting product");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];

    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload only JPG, JPEG, or PNG images');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      // Store the file object
      setImageFiles((prev) => ({
        ...prev,
        [name]: file,
      }));

      // Also store as base64 for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          [name]: reader.result, // Store as base64 data URL for preview
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.productName ||
      !formData.productBrand ||
      !formData.mediatorName ||
      !formData.mediatorNumber ||
      !formData.reviwer ||
      !formData.reviewerEmail ||
      !formData.productPrice ||
      !formData.productLess ||
      !formData.address 
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    // For new products, validate images
    if (!editingProduct) {
      if (
        !imageFiles.orderImage
      ) {
        toast.error("Please upload all required images");
        return;
      }
    }

    try {
      // Create FormData
      const submitFormData = new FormData();
      submitFormData.append("productName", formData.productName);
      submitFormData.append("exchangeName", formData.exchangeName || "Original");
      submitFormData.append("productBrand", formData.productBrand);
      submitFormData.append("platform", formData.platform || "amazon");
      submitFormData.append("mediatorName", formData.mediatorName);
      submitFormData.append("mediatorNumber", formData.mediatorNumber);
      submitFormData.append("orderType", formData.orderType || "Original");
      submitFormData.append("dealType", formData.dealType || "Review");
      submitFormData.append("reviewStatus", formData.reviewStatus || "Pending");
      submitFormData.append("reviewLink", formData.reviewLink || "");
      submitFormData.append("orderLink", formData.orderLink || "");
      submitFormData.append("paymentStatus", formData.paymentStatus || "Pending");
      submitFormData.append("reviwer", formData.reviwer);
      submitFormData.append("reviewerEmail", formData.reviewerEmail);
      submitFormData.append("productPrice", formData.productPrice);
      submitFormData.append("productLess", formData.productLess);
      submitFormData.append("address", formData.address);
      submitFormData.append("timeLine", formData.timeLine);

      // Append image files if they exist (for new or updated images)
      if (imageFiles.orderImage) {
        submitFormData.append("orderImage", imageFiles.orderImage);
      }
      if (imageFiles.reviewImage) {
        submitFormData.append("reviewImage", imageFiles.reviewImage);
      }
      if (imageFiles.returnImage) {
        submitFormData.append("returnImage", imageFiles.returnImage);
      }
      if (imageFiles.sellerImage) {
        submitFormData.append("sellerImage", imageFiles.sellerImage);
      }

      let result;
      if (editingProduct) {
        // Edit existing product
        result = await editProduct(editingProduct._id, submitFormData);
      } else {
        // Add new product
        result = await addProduct(submitFormData);
      }

      if (result.status === 201 || result.status === 202) {
        // Fetch updated products
        const updatedProducts = await getProducts();
        setProductsList(updatedProducts || []);
        handleCloseFormModal();
        toast.success(
          editingProduct
            ? "Product updated successfully"
            : "Product added successfully"
        );
      } else {
        toast.error(result.message || "Error saving product");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Error saving product");
    }
  };

  // Calculate stats from products
  const stats = useMemo(() => {
    if (!productsList || productsList.length === 0) {
      return {
        allProducts: 0,
        pendingPayment: 0,
        completedPayment: 0,
        rejectedPayment: 0,
      };
    }

    return {
      allProducts: productsList.length,
      pendingPayment: productsList.filter(
        (product) => product.paymentStatus === "Pending"
      ).length,
      completedPayment: productsList.filter(
        (product) => product.paymentStatus === "Completed"
      ).length,
      rejectedPayment: productsList.filter(
        (product) => product.paymentStatus === "Rejected"
      ).length,
    };
  }, [productsList]);

  // Dynamic cards array
  const cards = useMemo(
    () => [
      {
        title: "All Products",
        value: stats.allProducts.toString(),
        icon: <FcStackOfPhotos />,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
      },
      {
        title: "Pending Payment",
        value: stats.pendingPayment.toString(),
        icon: <FcAlarmClock />,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
      },
      {
        title: "Completed Payment",
        value: stats.completedPayment.toString(),
        icon: <FcAcceptDatabase />,
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
      },
      {
        title: "Rejected Payment",
        value: stats.rejectedPayment.toString(),
        icon: <FcBearish />,
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
      },
    ],
    [stats]
  );

  // Filter and search logic
  const filteredProducts = useMemo(() => {
    if (!productsList || productsList.length === 0) return [];

    return productsList.filter((product) => {
      // Filter by review status
      const statusMatch =
        filterStatus === "all" ||
        (product.reviewStatus &&
          product.reviewStatus.toLowerCase() === filterStatus.toLowerCase());

      // Search across multiple fields
      const searchMatch =
        searchQuery === "" ||
        (product.productName &&
          product.productName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.productBrand &&
          product.productBrand.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.exchangeName &&
          product.exchangeName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.platform &&
          product.platform.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.mediatorName &&
          product.mediatorName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.mediatorNumber && product.mediatorNumber.includes(searchQuery)) ||
        (product.dealType &&
          product.dealType.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.reviewStatus &&
          product.reviewStatus.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.paymentStatus &&
          product.paymentStatus.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.reviwer &&
          product.reviwer.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.reviewerEmail &&
          product.reviewerEmail.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.productPrice && product.productPrice.includes(searchQuery)) ||
        (product.productLess && product.productLess.includes(searchQuery));

      return statusMatch && searchMatch;
    });
  }, [searchQuery, filterStatus, productsList]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterStatus]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4 md:p-8">
      <div className="max-w-8xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <h2 className="text-lg text-gray-600 font-medium">Welcome to your dashboard</h2>
          </div>
          <div className="flex items-center justify-end">
            <button
              onClick={handleOpenAddForm}
              className="group relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Add New Product</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200 overflow-hidden"
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative flex items-center justify-between">
                <div className={`${card.iconBg} ${card.iconColor} flex items-center justify-center w-16 h-16 rounded-2xl p-3 text-4xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  {card.icon}
                </div>

                <div className="flex flex-col items-end">
                  <h3 className="text-gray-600 text-sm font-semibold mb-2 uppercase tracking-wide">{card.title}</h3>
                  <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {card.value}
                  </p>
                </div>
              </div>
              
              {/* Decorative line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent group-hover:via-gray-400 transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        {/* Products Table Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header with Title, Search, and Add Button */}
          <div className="bg-gradient-to-r from-gray-50 to-white p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-1">
                  All Products Data
                </h2>
                <p className="text-sm text-gray-500 font-medium">Manage and track all your products</p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1 sm:flex-initial group">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-gray-600 transition-colors" size={20} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-72 pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 bg-white hover:border-gray-300"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full sm:w-64 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-200 bg-white hover:border-gray-300 font-medium text-gray-700 cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Live">Live</option>
                  <option value="Unverified">Unverified</option>
                  <option value="Deleted">Deleted</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center">
                      <input id="selectAll" type="checkbox" className="w-4 h-4 text-gray-600 bg-white border-gray-300 rounded focus:ring-gray-500 cursor-pointer" />
                      <label htmlFor="selectAll" className="ml-2 text-sm font-bold uppercase tracking-wider cursor-pointer">ID</label>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Image</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Product Name <small className="block text-xs font-normal normal-case opacity-90">Brand | Exchange</small></th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Platform</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider whitespace-nowrap">Mediator <small className="block text-xs font-normal normal-case opacity-90">Name | Number</small></th>
                  <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider whitespace-nowrap">Status <small className="block text-xs font-normal normal-case opacity-90">Review | Payment</small></th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider whitespace-nowrap">Deal Type</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Reviewer <small className="block text-xs font-normal normal-case opacity-90">Name | Email</small></th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Price <small className="block text-xs font-normal normal-case opacity-90">Price | Less</small></th>
                  <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">Dates <small className="block text-xs font-normal normal-case opacity-90">Order | Review</small></th>
                  <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan="11" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
                        <p className="text-gray-600 font-medium">Loading products...</p>
                      </div>
                    </td>
                  </tr>
                ) : paginatedProducts.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="px-6 py-12 text-center">
                      <p className="text-gray-600 font-medium">No products found</p>
                    </td>
                  </tr>
                ) : (
                  paginatedProducts.map((product) => (
                    <tr key={product._id} className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-200 group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-gray-600 bg-white border-2 border-gray-300 rounded focus:ring-gray-500 cursor-pointer"
                          />
                          <span className="ml-3 text-sm text-gray-900 font-semibold">#{product._id?.toString().slice(-6) || 'N/A'}</span>
                        </div>
                      </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center cursor-pointer hover:scale-110 hover:shadow-lg transition-all duration-300 border-2 border-gray-200 group-hover:border-gray-300"
                        onClick={() => handleProductClick(product)}
                      >
                        <ProductImage
                          src={product.orderImage}
                          alt={product.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs">
                        <div
                          className="font-bold truncate cursor-pointer hover:text-gray-600 transition-colors group-hover:text-gray-900"
                          title={product.productName}
                          onClick={() => handleProductClick(product)}
                        >
                          {product.productName}
                        </div>
                        <div className="block text-xs text-gray-500 mt-1.5">
                          <span className="font-medium">{product.productBrand}</span> | <span className="text-gray-400">{product.exchangeName}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 capitalize border border-gray-300 shadow-sm">
                        {product.platform}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="text-gray-900 font-semibold">{product.mediatorName}</div>
                        <div className="text-xs text-gray-500 font-medium"><small>{product.mediatorNumber}</small></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2 flex-wrap">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap shadow-sm ${
                            product.reviewStatus === "Live"
                              ? "bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-200"
                              : product.reviewStatus === "Pending"
                              ? "bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 border border-yellow-200"
                              : product.reviewStatus === "Unverified"
                              ? "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 border border-gray-200"
                              : product.reviewStatus === "Deleted"
                              ? "bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200"
                              : "bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200"
                          }`}
                        >
                          {product.reviewStatus}
                        </span>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap shadow-sm ${
                            product.paymentStatus === "Pending"
                              ? "bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 border border-yellow-200"
                              : product.paymentStatus === "Completed"
                              ? "bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-200"
                              : "bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200"
                          }`}
                        >
                          {product.paymentStatus}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border border-blue-200 shadow-sm">
                        {product.dealType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="text-gray-900 font-semibold">{product.reviwer}</div>
                        <div className="text-xs text-gray-500 font-medium break-all"><small>{product.reviewerEmail}</small></div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="text-gray-900 font-bold">₹{product.productPrice}</div>
                        <div className="text-xs text-gray-500 font-medium"><small>₹{product.productLess}</small></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm">
                        <div className="text-gray-900 font-semibold">
                          {product.createdAt
                            ? new Date(product.createdAt).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              })
                            : "N/A"}
                        </div>
                        <div className="text-xs text-gray-500 font-medium">
                          <small>
                            {product.updatedAt
                              ? new Date(product.updatedAt).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                })
                              : "N/A"}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleProductClick(product)}
                          className="group relative px-3 py-2 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
                          title="View Details"
                        >
                          <FaRegEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEditForm(product)}
                          className="group relative px-3 py-2 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
                          title="Edit Product"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenDeleteModal(product)}
                          className="group relative px-3 py-2 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
                          title="Delete Product"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-white border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 font-medium">
              Showing <span className="font-bold text-gray-900">{filteredProducts.length > 0 ? startIndex + 1 : 0}</span> to{" "}
              <span className="font-bold text-gray-900">{Math.min(endIndex, filteredProducts.length)}</span> of{" "}
              <span className="font-bold text-gray-900">{filteredProducts.length}</span> entries
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm disabled:shadow-none"
              >
                Previous
              </button>
              {(() => {
                const pages = [];
                const showEllipsis = totalPages > 7;

                if (!showEllipsis) {
                  // Show all pages if total pages is 7 or less
                  for (let i = 1; i <= totalPages; i++) {
                    pages.push(
                      <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`px-4 py-2 text-sm font-bold border-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 ${
                          currentPage === i
                            ? "text-white bg-gradient-to-r from-gray-900 to-gray-800 border-gray-900 shadow-lg hover:shadow-xl"
                            : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm hover:shadow-md"
                        }`}
                      >
                        {i}
                      </button>
                    );
                  }
                } else {
                  // Always show first page
                  pages.push(
                    <button
                      key={1}
                      onClick={() => handlePageChange(1)}
                      className={`px-4 py-2 text-sm font-bold border-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 ${
                        currentPage === 1
                          ? "text-white bg-gradient-to-r from-gray-900 to-gray-800 border-gray-900 shadow-lg hover:shadow-xl"
                          : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm hover:shadow-md"
                      }`}
                    >
                      1
                    </button>
                  );

                  let startPage = Math.max(2, currentPage - 1);
                  let endPage = Math.min(totalPages - 1, currentPage + 1);

                  // Adjust if we're near the start
                  if (currentPage <= 3) {
                    endPage = 4;
                  }

                  // Adjust if we're near the end
                  if (currentPage >= totalPages - 2) {
                    startPage = totalPages - 3;
                  }

                  // Add ellipsis after first page if needed
                  if (startPage > 2) {
                    pages.push(
                      <span key="ellipsis-start" className="px-2 text-gray-500">
                        ...
                      </span>
                    );
                  }

                  // Add middle pages
                  for (let i = startPage; i <= endPage; i++) {
                    pages.push(
                      <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`px-4 py-2 text-sm font-bold border-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 ${
                          currentPage === i
                            ? "text-white bg-gradient-to-r from-gray-900 to-gray-800 border-gray-900 shadow-lg hover:shadow-xl"
                            : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm hover:shadow-md"
                        }`}
                      >
                        {i}
                      </button>
                    );
                  }

                  // Add ellipsis before last page if needed
                  if (endPage < totalPages - 1) {
                    pages.push(
                      <span key="ellipsis-end" className="px-2 text-gray-500">
                        ...
                      </span>
                    );
                  }

                  // Always show last page
                  pages.push(
                    <button
                      key={totalPages}
                      onClick={() => handlePageChange(totalPages)}
                      className={`px-4 py-2 text-sm font-bold border-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 ${
                        currentPage === totalPages
                          ? "text-white bg-gradient-to-r from-gray-900 to-gray-800 border-gray-900 shadow-lg hover:shadow-xl"
                          : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm hover:shadow-md"
                      }`}
                    >
                      {totalPages}
                    </button>
                  );
                }

                return pages;
              })()}
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm disabled:shadow-none"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetails
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onEdit={handleOpenEditForm}
        onDelete={handleOpenDeleteModal}
      />

      {/* Add/Edit Product Form Modal */}
      <ProductForm
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        formData={formData}
        editingProduct={editingProduct}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
        setFormData={setFormData}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        product={productToDelete}
      />
    </div>
  );
}

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Star, ShoppingBag, Package, RefreshCw, Shield, ThumbsUp, MessageCircle } from 'lucide-react';
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, token } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews] = useState([
    {
      id: 1,
      user: "Sarah Johnson",
      rating: 5,
      date: "2024-03-15",
      text: "Absolutely love this product! The quality is outstanding and it fits perfectly. Would definitely recommend to others.",
      helpful: 12
    },
    {
      id: 2,
      user: "Michael Chen",
      rating: 4,
      date: "2024-03-10",
      text: "Great product overall. The material is high quality and comfortable. Only giving 4 stars because the sizing runs slightly large.",
      helpful: 8
    },
    {
      id: 3,
      user: "Emma Davis",
      rating: 5,
      date: "2024-03-05",
      text: "Perfect fit and exactly as described. The shipping was fast and the packaging was excellent.",
      helpful: 15
    }
  ]);

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please login to post a review");
      return;
    }
    // Here you would typically make an API call to submit the review
    console.log({ rating, reviewText });
    setReviewText("");
    setRating(5);
  };

  return productData ? (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse lg:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-auto gap-4 lg:w-24">
            {productData.image.map((item, i) => (
              <img
                src={item}
                key={i}
                className={`w-20 h-20 object-cover cursor-pointer rounded-lg border-2 transition-all duration-200 ${
                  image === item ? "border-blue-500" : "border-transparent hover:border-gray-200"
                }`}
                alt={`${productData.name} view ${i + 1}`}
                onClick={() => setImage(item)}
              />
            ))}
          </div>
          
          {/* Main Image */}
          <div className="flex-1">
            <img
              src={image}
              className="w-full h-auto rounded-2xl"
              alt={productData.name}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {productData.name}
            </h1>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">{renderStars(4)}</div>
              <span className="text-sm text-gray-500">({reviews.length} reviews)</span>
            </div>

            <p className="text-4xl font-bold text-gray-900 mb-6">
              {currency}
              {productData.price}
            </p>

            <p className="text-gray-600 leading-relaxed">
              {productData.description}
            </p>
          </div>

          {/* Size Selection */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Select Size
            </label>
            <div className="flex flex-wrap gap-3">
              {productData.sizes.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setSize(item)}
                  className={`h-12 min-w-[3rem] px-4 rounded-lg font-medium transition-all duration-200 ${
                    item === size
                      ? "bg-blue-600 text-white"
                      : "bg-gray-50 text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(productData._id, size)}
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" />
            Add to Cart
          </button>

          {/* Features */}
          <div className="border-t pt-8 grid sm:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Original Product</h3>
                <p className="text-sm text-gray-500">100% authenticity guaranteed</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Easy Returns</h3>
                <p className="text-sm text-gray-500">7-day return policy</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Secure Payment</h3>
                <p className="text-sm text-gray-500">Multiple payment options</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Tabs */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <div className="flex gap-8">
            
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-4 text-sm font-medium transition-colors duration-200 ${
                activeTab === "reviews"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Reviews ({reviews.length})
            </button>
          </div>
        </div>

        {activeTab === "review" ? (
          <div className="py-6 prose prose-blue max-w-none">
            <p className="text-gray-600 leading-relaxed">
              {productData.description}
            </p>
          
          </div>
        ) : (
          <div className="py-6">
            {/* Write a Review */}
            <div className="mb-12 bg-white-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
              <form onSubmit={handleReviewSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review
                  </label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Share your thoughts about the product..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Post Review
                </button>
              </form>
            </div>

            {/* Reviews List */}
            <div className="space-y-8">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium text-gray-900">{review.user}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600">
                      <ThumbsUp className="w-4 h-4" />
                      Helpful ({review.helpful})
                    </button>
                  </div>
                  <p className="text-gray-600">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <RelatedProduct
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse">Loading...</div>
    </div>
  );
};

export default Product; 
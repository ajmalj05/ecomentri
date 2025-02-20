import { motion } from "framer-motion";

const NewsletterBox = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white py-16 mt-16">
      <div className="text-center">
        {/* Title with animation */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold text-gray-800"
        >
          Subscribe now & get 20% off
        </motion.p>

        {/* Subtitle with animation */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-gray-600 opacity-80 mt-3 mb-6 max-w-xl mx-auto"
        >
          Stay updated with our latest news and offers. Never miss a deal!
        </motion.p>

        {/* Form */}
        <form
          onSubmit={onSubmitHandler}
          className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border border-gray-300 bg-gray-50 bg-opacity-70 px-4 py-3 rounded-lg shadow-lg backdrop-blur-lg"
        >
          {/* Input Field with animation */}
          <motion.input
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            type="email"
            placeholder="Enter your email."
            className="w-full outline-none p-3 text-gray-700 rounded-lg"
            required
          />
          
          {/* Submit Button with hover animation */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, backgroundColor: "#FF6347" }}
            transition={{ duration: 0.3 }}
            className="bg-black text-white px-6 py-3 rounded-lg font-medium"
          >
            SUBSCRIBE
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterBox;

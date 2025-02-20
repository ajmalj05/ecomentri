import { motion } from "framer-motion";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="bg-white py-16 text-gray-800">
      <div className="container mx-auto px-6 sm:px-12">
        <div className="flex flex-col sm:grid grid-cols-3 gap-10 sm:gap-20">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center sm:text-left"
          >
            <img src={assets.logo} className="mb-5 w-32 mx-auto sm:mx-0" alt="Logo" />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600"
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam itaque distinctio et quas?
            </motion.p>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center sm:text-left"
          >
            <p className="text-xl font-semibold text-gray-700 mb-5">COMPANY</p>
            <ul className="flex flex-col gap-2 text-gray-600">
              <motion.li whileHover={{ scale: 1.05, color: "#FF6347" }} className="cursor-pointer">
                Home
              </motion.li>
              <motion.li whileHover={{ scale: 1.05, color: "#FF6347" }} className="cursor-pointer">
                About Us
              </motion.li>
              <motion.li whileHover={{ scale: 1.05, color: "#FF6347" }} className="cursor-pointer">
                Delivery
              </motion.li>
              <motion.li whileHover={{ scale: 1.05, color: "#FF6347" }} className="cursor-pointer">
                Privacy Policy
              </motion.li>
            </ul>
          </motion.div>

          {/* Get In Touch */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center sm:text-left"
          >
            <p className="text-xl font-semibold text-gray-700 mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-2 text-gray-600">
              <motion.li whileHover={{ scale: 1.05, color: "#FF6347" }} className="cursor-pointer">
                +1-212-521-4569
              </motion.li>
              <motion.li whileHover={{ scale: 1.05, color: "#FF6347" }} className="cursor-pointer">
                contact@foreveryou.com
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 border-t border-gray-300 pt-5"
        >
          <p className="text-sm text-center text-gray-600">
            Copyright 2024@ forever.com - All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Footer;

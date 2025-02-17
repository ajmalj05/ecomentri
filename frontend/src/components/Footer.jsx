import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-600">
                LuxeCart
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              Discover the latest trends in fashion and lifestyle. We bring you carefully curated collections that blend style, comfort, and quality.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { label: 'Home', path: '/' },
                { label: 'Shop', path: '/collection' },
                { label: 'About Us', path: '/about' },
                { label: 'Contact', path: '/contact' }
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-blue-600 transition-colors flex items-center group"
                  >
                    <ExternalLink size={16} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Customer Service</h3>
            <ul className="space-y-4">
              {[
                'FAQ',
                'Privacy Policy'
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <MapPin size={16} className="mr-2" />
                 Ayoor,kollam,Kerala
                </a>
              </li>
              <li>
                <a href="tel:+1-212-521-4569" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <Phone size={16} className="mr-2" />
                  +919074689326
                </a>
              </li>
              <li>
                <a href="mailto:contact@luxecart.com" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <Mail size={16} className="mr-2" />
                  ajmalj@admin.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Subscribe to our newsletter
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Stay updated with our latest trends and products
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-gray-600 text-sm">
            © {currentYear} LuxeCart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
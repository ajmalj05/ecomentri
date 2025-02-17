import { useState, useEffect } from 'react';
import { Users, Target, Award, ShieldCheck } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="relative py-20 sm:py-24 border-t">
        <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-600 mb-6">
            About Our Story
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Crafting exceptional shopping experiences since 2024
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="my-16 flex flex-col md:flex-row gap-16 items-center">
        <div className="relative w-full md:w-1/2 group">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200"
            className="w-full rounded-2xl shadow-xl transform transition-all duration-500 group-hover:scale-105"
            alt="About Us"
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        <div className="flex flex-col justify-center gap-8 md:w-1/2">
          <div className={`space-y-6 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <h2 className="text-3xl font-bold text-gray-900">Redefining Online Shopping</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We believe in creating more than just a shopping platform - we're building a community where quality meets convenience, and where every purchase tells a story of excellence and trust.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our commitment to innovation and customer satisfaction drives us to continuously evolve and enhance your shopping experience.
            </p>

            <div className="pt-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To revolutionize online shopping by providing unparalleled product quality, exceptional customer service, and a seamless shopping experience that exceeds expectations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-20">
        <h2 className="text-3xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-600">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
              title: "Quality Assurance",
              description: "Every product undergoes rigorous quality checks to ensure it meets our premium standards."
            },
            {
              icon: <Target className="w-8 h-8 text-blue-600" />,
              title: "Convenience First",
              description: "Our intuitive platform makes shopping effortless, with smart features designed around you."
            },
            {
              icon: <Users className="w-8 h-8 text-blue-600" />,
              title: "Expert Support",
              description: "Our dedicated team is here to assist you 24/7, ensuring your complete satisfaction."
            }
          ].map((feature, index) => (
            <div
              key={index}
              className={`group p-8 rounded-xl border border-gray-200 hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl bg-white ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="my-20 bg-gradient-to-r from-blue-50 to-pink-50 rounded-2xl p-8 sm:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Stay Updated</h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter for exclusive offers, new arrivals, and insider news.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-8 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
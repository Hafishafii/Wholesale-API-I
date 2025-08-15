import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { 
  FaIndustry, 
  FaTruck, 
  FaStar,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaGlobe,
  FaRocket
} from 'react-icons/fa';

const LandingPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  
  // Multiple images for the carousel
  const images = [
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  // Scroll event listener with enhanced animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
      
      // Trigger animations based on scroll position
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('animate-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for more precise animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-10 animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-10 animate-float-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-gradient-to-r from-green-400 to-teal-400 rounded-full opacity-10 animate-float-reverse"></div>
      </div>

      {/* Header with enhanced animations */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white backdrop-blur-lg shadow-lg border-b border-gray-200' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Animated Logo */}
            <div className="flex items-center">
              <h1 className={`text-2xl font-bold transition-all duration-300 ${
                isScrolled ? 'text-blue-900' : 'text-white'
              } cursor-pointer hover:scale-110 transform`}>
                KTR
              </h1>
            </div>

            {/* Navigation Menu with hover effects */}
            <nav className="hidden md:flex space-x-8">
              {['Home', 'Features', 'How It Works', 'Testimonials', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`} 
                  className={`transition-all duration-300 font-medium relative group ${
                    isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                  }`}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            {/* User Actions with enhanced animations */}
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className={`transition-all duration-300 font-medium hover:scale-105 ${
                  isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                }`}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section with Parallax */}
      <section id="home" className="relative h-screen overflow-hidden" ref={heroRef}>
        {/* Full-width Image Carousel with enhanced transitions */}
        <div className="w-full h-full relative">
          <div className="relative h-full overflow-hidden">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ${
                  index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                }`}
                style={{
                  backgroundImage: `url('${image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
            ))}
            
            {/* Enhanced overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

            {/* Animated Text Content Overlay */}
            <div className="absolute inset-0 flex items-center p-8">
              <div className="text-white max-w-4xl animate-fade-in-up">
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold mb-8 leading-none tracking-tight">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-red-500 bg-clip-text text-transparent animate-gradient-x">
                    MAKE
                  </span>
                  <br />
                  <span className="text-white animate-slide-in-left">YOUR</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-red-500 bg-clip-text text-transparent animate-gradient-x">
                    OWN BRAND
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fade-in-up-delayed max-w-2xl">
                  Transform your vision into reality with our cutting-edge manufacturing solutions
                </p>
                
                <div className="flex flex-col md:flex-row gap-6 animate-fade-in-up-delayed-2">
                  <Link 
                    to="/register" 
                    className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 rounded-full text-lg font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl transform hover:scale-105"
                  >
                    Get Started 
                    <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                  
                  
                </div>
              </div>
            </div>

            {/* Enhanced Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110 shadow-lg"
            >
              <FaChevronLeft className="text-xl" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110 shadow-lg"
            >
              <FaChevronRight className="text-xl" />
            </button>
          </div>

          {/* Enhanced Navigation Dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 ${
                  index === currentImageIndex 
                    ? 'bg-gradient-to-r from-blue-400 to-purple-400 scale-125 shadow-lg' 
                    : 'bg-white/60 hover:bg-white'
                }`}
              ></button>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden" ref={featuresRef}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 animate-float"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-10 animate-float-delayed"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Why Choose 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> KTR Exports</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Experience the perfect blend of innovation, quality, and reliability in every product we manufacture
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-on-scroll">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaIndustry className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced Manufacturing</h3>
              <p className="text-gray-600 leading-relaxed">
                State-of-the-art facilities with cutting-edge technology for precision manufacturing
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-on-scroll" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaCheck className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Assurance</h3>
              <p className="text-gray-600 leading-relaxed">
                Rigorous quality control processes ensuring every product meets international standards
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-on-scroll" style={{animationDelay: '0.4s'}}>
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaTruck className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fast Delivery</h3>
              <p className="text-gray-600 leading-relaxed">
                Efficient logistics and global shipping network for timely delivery worldwide
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-on-scroll" style={{animationDelay: '0.6s'}}>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaGlobe className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Global Reach</h3>
              <p className="text-gray-600 leading-relaxed">
                Serving clients worldwide with our extensive network and international expertise
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Legacy Section */}
      <section className="py-20 bg-gradient-to-br from-gray-500 to-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating geometric shapes */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-red-200 rounded-full opacity-30 animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-yellow-200 rounded-full opacity-25 animate-ping" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-green-200 rounded-full opacity-20 animate-spin" style={{animationDuration: '3s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in">
              Our 
              <span className="bg-orange-900 bg-clip-text text-transparent animate-pulse"> Legacy</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto animate-fade-in-up">
              We are among India's leading manufacturers and exporters of apparel and our legacy dates back all the way to 1979! Across seasons, we have helped generations step up and step out in style. Here is a list of our accolades that stand testimony to our legacy in the textile industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Left Side - Company Description with Animated Images */}
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-6 relative animate-on-scroll">
                {/* Animated Factory Image */}
                <div className="relative mb-8">
                  <div className="w-full h-64 bg-gradient-to-r  rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                    <img 
                      src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                      alt="Manufacturing Facility" 
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold">Manufacturing Excellence</h3>
                      <p className="text-sm opacity-90">State-of-the-art facilities</p>
                    </div>
                  </div>
                  {/* Floating elements around the image */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full animate-bounce opacity-80"></div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse opacity-70"></div>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 animate-slide-in-left">
                  ONE WORLD
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed animate-fade-in-up">
                  We, at KTR Exports, are a globally reputed apparel manufacturer, evoking distinctive recognition for product, performance, processes and people.
                </p>
              </div>
              
              <div className="space-y-6 relative animate-on-scroll" style={{animationDelay: '0.3s'}}>
                {/* Animated Thread/Textile Image */}
                <div className="relative mb-8">
                  <div className="w-full h-48  rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                    <img 
                      src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                      alt="Textile Innovation" 
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-red-800/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">Innovation & Quality</h3>
                      <p className="text-sm opacity-90">Cutting-edge technology</p>
                    </div>
                  </div>
                  {/* Animated thread elements */}
                  <div className="absolute top-4 right-4 w-12 h-12 border-2 border-white rounded-full animate-spin opacity-60" style={{animationDuration: '4s'}}></div>
                  <div className="absolute bottom-6 right-6 w-6 h-6 bg-white rounded-full animate-ping opacity-50"></div>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 animate-slide-in-right">
                  MANY THREADS
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed animate-fade-in-up">
                  Innovation, quality, consistency and commitment - these are pillars on which we stand.
                </p>
              </div>
            </div>

            {/* Right Side - Statistics with Enhanced Animations */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 transform hover:scale-105 transition-all duration-500 relative overflow-hidden animate-on-scroll">
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400 to-red-400 animate-pulse"></div>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-gray-800 mb-6 animate-fade-in">NO LIMITS</h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center group">
                      <div className="relative">
                        <div className="text-3xl font-bold text-red-600 mb-2 animate-count-up group-hover:scale-110 transition-transform duration-300">48,000+</div>
                        <div className="text-sm text-gray-600">Employees</div>
                        {/* Animated icon */}
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-70"></div>
                      </div>
                    </div>
                    
                    <div className="text-center group">
                      <div className="relative">
                        <div className="text-3xl font-bold text-red-600 mb-2 animate-count-up group-hover:scale-110 transition-transform duration-300" style={{animationDelay: '0.5s'}}>$290 Mn</div>
                        <div className="text-sm text-gray-600">Revenue</div>
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-ping opacity-70" style={{animationDelay: '0.5s'}}></div>
                      </div>
                    </div>
                    
                    <div className="text-center group">
                      <div className="relative">
                        <div className="text-3xl font-bold text-red-600 mb-2 animate-count-up group-hover:scale-110 transition-transform duration-300" style={{animationDelay: '1s'}}>80%</div>
                        <div className="text-sm text-gray-600">Female employees</div>
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-500 rounded-full animate-ping opacity-70" style={{animationDelay: '1s'}}></div>
                      </div>
                    </div>
                    
                    <div className="text-center group">
                      <div className="relative">
                        <div className="text-3xl font-bold text-red-600 mb-2 animate-count-up group-hover:scale-110 transition-transform duration-300" style={{animationDelay: '1.5s'}}>35+</div>
                        <div className="text-sm text-gray-600">Units</div>
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-500 rounded-full animate-ping opacity-70" style={{animationDelay: '1.5s'}}></div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full mt-8 py-3 px-6 border border-gray-300 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    READ MORE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional floating elements */}
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-gradient-to-r from-blue-400 to-red-400 rounded-full opacity-20 animate-spin" style={{animationDuration: '8s'}}></div>
        <div className="absolute top-1/3 left-5 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-30 animate-bounce" style={{animationDelay: '2s'}}></div>
      </section>

      {/* Enhanced Clothing Categories Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 animate-float"></div>
          <div className="absolute bottom-10 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-10 animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-10 animate-float-slow"></div>
          <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-10 animate-float-reverse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Our 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x"> Collections</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Discover our diverse range of premium clothing categories crafted with excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Fashion Wear */}
            <div className="group relative overflow-hidden rounded-2xl cursor-pointer h-80 animate-on-scroll transform hover:scale-105 transition-all duration-500 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-600 opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 animate-photo-zoom-in group-hover:animate-photo-pan-left"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:animate-photo-shimmer"></div>
              <div className="absolute bottom-6 left-6 transform group-hover:translate-y-2 transition-transform duration-500">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">FASHION WEAR</h3>
                <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">Trendsetting designs</p>
              </div>
              {/* Enhanced floating elements */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-1/2 right-1/2 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-60 animate-float group-hover:block"></div>
              <div className="absolute bottom-4 left-1/2 w-4 h-4 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 animate-bounce group-hover:block" style={{animationDelay: '0.5s'}}></div>
            </div>

            {/* Outerwear */}
            <div className="group relative overflow-hidden rounded-2xl cursor-pointer h-80 animate-on-scroll transform hover:scale-105 transition-all duration-500 hover:shadow-2xl" style={{animationDelay: '0.1s'}}>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-600 opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 animate-photo-tilt group-hover:animate-photo-pan-right"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:animate-photo-shimmer"></div>
              <div className="absolute bottom-6 left-6 transform group-hover:translate-y-2 transition-transform duration-500">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">OUTERWEAR</h3>
                <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">Premium outer layers</p>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-1/3 left-1/3 w-5 h-5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-60 animate-float-delayed group-hover:block"></div>
              <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 animate-bounce group-hover:block" style={{animationDelay: '0.3s'}}></div>
            </div>

            {/* Bottomwear */}
            <div className="group relative overflow-hidden rounded-2xl cursor-pointer h-80 animate-on-scroll transform hover:scale-105 transition-all duration-500 hover:shadow-2xl" style={{animationDelay: '0.2s'}}>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-blue-600 opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 animate-photo-float group-hover:animate-photo-bounce"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:animate-photo-shimmer"></div>
              <div className="absolute bottom-6 left-6 transform group-hover:translate-y-2 transition-transform duration-500">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">BOTTOMWEAR</h3>
                <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">Comfortable essentials</p>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-60 animate-float-slow group-hover:block"></div>
              <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 animate-bounce group-hover:block" style={{animationDelay: '0.7s'}}></div>
            </div>

            {/* Casual Wear */}
            <div className="group relative overflow-hidden rounded-2xl cursor-pointer h-80 animate-on-scroll transform hover:scale-105 transition-all duration-500 hover:shadow-2xl" style={{animationDelay: '0.3s'}}>
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-600 opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 animate-photo-wave group-hover:animate-photo-glow"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:animate-photo-shimmer"></div>
              <div className="absolute bottom-6 left-6 transform group-hover:translate-y-2 transition-transform duration-500">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">CASUAL WEAR</h3>
                <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">Everyday comfort</p>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-1/3 right-1/4 w-5 h-5 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-60 animate-float-reverse group-hover:block"></div>
              <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 animate-bounce group-hover:block" style={{animationDelay: '0.4s'}}></div>
            </div>

            {/* Formal Wear */}
            <div className="group relative overflow-hidden rounded-2xl cursor-pointer h-80 animate-on-scroll transform hover:scale-105 transition-all duration-500 hover:shadow-2xl" style={{animationDelay: '0.4s'}}>
              <div className="absolute inset-0 bg-gradient-to-br from-slate-600 to-gray-800 opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 animate-photo-zoom-in group-hover:animate-photo-tilt"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:animate-photo-shimmer"></div>
              <div className="absolute bottom-6 left-6 transform group-hover:translate-y-2 transition-transform duration-500">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">FORMAL WEAR</h3>
                <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">Professional elegance</p>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-gradient-to-r from-slate-400 to-gray-400 rounded-full opacity-0 group-hover:opacity-60 animate-float group-hover:block"></div>
              <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 animate-bounce group-hover:block" style={{animationDelay: '0.6s'}}></div>
            </div>

            {/* Sportswear */}
            <div className="group relative overflow-hidden rounded-2xl cursor-pointer h-80 animate-on-scroll transform hover:scale-105 transition-all duration-500 hover:shadow-2xl" style={{animationDelay: '0.5s'}}>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-green-600 opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 animate-photo-float group-hover:animate-photo-wave"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:animate-photo-shimmer"></div>
              <div className="absolute bottom-6 left-6 transform group-hover:translate-y-2 transition-transform duration-500">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">SPORTSWEAR</h3>
                <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">Performance gear</p>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-1/3 right-1/3 w-5 h-5 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full opacity-0 group-hover:opacity-60 animate-float-delayed group-hover:block"></div>
              <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 animate-bounce group-hover:block" style={{animationDelay: '0.8s'}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 animate-float"></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-10 animate-float-delayed"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              How It 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Works</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Simple steps to bring your manufacturing vision to life with our expert team
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center group animate-on-scroll">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <span className="text-white text-2xl font-bold">1</span>
                </div>
                {/* Connecting line */}
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 opacity-30"></div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">Design & Plan</h3>
              <p className="text-gray-600 leading-relaxed">
                Share your design requirements and specifications with our expert team
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group animate-on-scroll" style={{animationDelay: '0.2s'}}>
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <span className="text-white text-2xl font-bold">2</span>
                </div>
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-green-500 to-purple-500 opacity-30"></div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-green-600 transition-colors duration-300">Get Quote</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive a detailed quote with pricing and timeline for your project
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group animate-on-scroll" style={{animationDelay: '0.4s'}}>
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <span className="text-white text-2xl font-bold">3</span>
                </div>
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-purple-500 to-orange-500 opacity-30"></div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-purple-600 transition-colors duration-300">Production</h3>
              <p className="text-gray-600 leading-relaxed">
                Our skilled craftsmen bring your design to life with precision and care
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center group animate-on-scroll" style={{animationDelay: '0.6s'}}>
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
                <span className="text-white text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-orange-600 transition-colors duration-300">Delivery</h3>
              <p className="text-gray-600 leading-relaxed">
                Quality-checked products delivered to your doorstep on schedule
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-10 animate-float"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-10 animate-float-delayed"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              What Our 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Clients Say</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Trusted by thousands of businesses worldwide with proven results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-on-scroll">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xl animate-pulse" style={{animationDelay: `${i * 0.1}s`}} />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed font-light text-lg">
                "Exceptional quality and attention to detail. KTR Exports delivered exactly what we envisioned and more."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mr-4 animate-pulse"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Sarah Johnson</h4>
                  <p className="text-gray-500 font-light">Fashion Designer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-on-scroll" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xl animate-pulse" style={{animationDelay: `${i * 0.1}s`}} />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed font-light text-lg">
                "Professional service from start to finish. The quality of their work exceeded our expectations."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full mr-4 animate-pulse"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Michael Chen</h4>
                  <p className="text-gray-500 font-light">Startup Founder</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-on-scroll" style={{animationDelay: '0.4s'}}>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xl animate-pulse" style={{animationDelay: `${i * 0.1}s`}} />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed font-light text-lg">
                "Outstanding craftsmanship and timely delivery. Highly recommended for any manufacturing needs."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mr-4 animate-pulse"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Emily Rodriguez</h4>
                  <p className="text-gray-500 font-light">E-commerce Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full animate-pulse"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight animate-on-scroll">
            Ready to Start Your 
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent animate-gradient-x"> Manufacturing Journey</span>?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed font-light animate-on-scroll" style={{animationDelay: '0.2s'}}>
            Join thousands of satisfied customers who trust us with their manufacturing needs
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center animate-on-scroll" style={{animationDelay: '0.4s'}}>
            <Link 
              to="/register" 
              className="group bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white px-10 py-5 rounded-full text-lg font-bold transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 flex items-center justify-center gap-3"
            >
              Get Started Today
              <FaRocket className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">KTR Exports</h3>
              <p className="text-gray-400">
                Your trusted partner in bringing manufacturing visions to life with 
                quality, precision, and innovation.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Custom Manufacturing</li>
                <li>Design Services</li>
                <li>Quality Control</li>
                <li>Fast Delivery</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Customer Service</li>
                <li>Technical Support</li>
                <li>Order Tracking</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@manufacturing.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Manufacturing St</li>
                <li>Hours: Mon-Fri 9AM-6PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 KTR Exports. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 
import { useNavigate } from 'react-router-dom';

const products = [
  {
    name: 'Formal',
    image: 'https://images.pexels.com/photos/24375099/pexels-photo-24375099.jpeg?auto=compress&w=400',
    link: '/products/categories/formal',
  },
  {
   name: 'Party wear',
    image: 'https://images.pexels.com/photos/3419687/pexels-photo-3419687.jpeg?auto=compress&w=400',
    link: '/products/categories/Partywear',
  },
  {
    name: 'Casual fit ',
    image: 'https://images.pexels.com/photos/1959036/pexels-photo-1959036.jpeg?auto=compress&w=400',
    link: '/products/categories/casual',
  },
  {
    name: 'Golden Set Saree',
    image: 'https://images.pexels.com/photos/17040875/pexels-photo-17040875.jpeg?auto=compress&w=400',
    link: '/products/categories/Setsarees',
  },
  {
    name: 'Kerala Kasavu',
    image: 'https://images.pexels.com/photos/27155552/pexels-photo-27155552.jpeg?auto=compress&w=400',
    link: '/products/categories/kasav',
  },
  {
    name: 'Dress code',
    image: 'https://images.pexels.com/photos/7568787/pexels-photo-7568787.jpeg?auto=compress&w=400',
    link: '/products/categories/dresscode',
  },
];

const WholesaleFavorites = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#06194A] text-white py-10 md:py-14 px-2 md:px-4 flex flex-col items-center min-h-screen">
      <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 text-center">Fast-Moving Wholesale Favorites</h2>
      <p className="mb-6 md:mb-10 text-center text-base md:text-xl font-normal">Discover top-selling styles your customers are asking for!</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 mb-8 md:mb-12">
        {products.map((product, idx) => (
          <div
            key={idx}
            className="relative w-48 h-48 md:w-64 md:h-64 rounded overflow-hidden shadow-lg bg-white/5 mx-auto cursor-pointer hover:scale-105 transition"
            onClick={() => navigate(product.link)}
            role="button"
            tabIndex={0}
            onKeyPress={e => { if (e.key === 'Enter') navigate(product.link); }}
          >
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />            
            {/* Name overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white bg-opacity-80 text-gray-900 text-center px-2 py-2 text-xs md:text-base font-semibold w-11/12 rounded">
                {product.name}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="border-2 border-white text-white px-8 md:px-12 py-2 md:py-3 rounded text-base md:text-xl hover:bg-white hover:text-[#06194A] transition font-semibold mt-2 md:mt-4 w-fit"
        onClick={() => navigate('/products')}
      >
        View More
      </button>
    </div>
  );
};

export default WholesaleFavorites; 
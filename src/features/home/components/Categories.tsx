import CategoryCard from './CategoryCard';
import { useNavigate } from 'react-router-dom';

const categories = [
   {
    title: 'Formals',
    image: 'https://images.pexels.com/photos/10620471/pexels-photo-10620471.jpeg?auto=compress&w=400',
    link: '/products/categories/formals',
  },
  {
    title: 'Casuals',
    image: 'https://images.pexels.com/photos/33261748/pexels-photo-33261748.jpeg?auto=compress&w=400',
    link: '/products/categories/casuals',
  },
 {
    title: 'Funky',
    image: 'https://images.pexels.com/photos/7147428/pexels-photo-7147428.jpeg?auto=compress&w=400',
    link: '/products/categories/funky',
}

];

const Categories = () => {
  const navigate = useNavigate();
  return (
    <div className="px-2 md:px-4 py-8 md:py-12 bg-[#ededed] w-full">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-center text-black">Select Your Design</h2>
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 justify-center items-center">
        <CategoryCard
          key="all-products"
          image="https://images.pexels.com/photos/9771802/pexels-photo-9771802.jpeg?auto=compress&w=400"
          title="All Products"
          onClick={() => navigate('/products')}
        />
        {categories.map((cat) => (
          <CategoryCard
            key={cat.title}
            image={cat.image}
            title={cat.title}
            onClick={() => navigate(cat.link)}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories; 
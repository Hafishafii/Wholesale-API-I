import {
  Banner,
  Categories,
  TrustedClients,
  WholesaleFavorites,
  WhyChooseUs,
  HomeSkeleton,
} from "../features/home";
import { useHomeLoading } from "../features/home/hooks/useHomeLoading";
import { useTrustedUser } from "../features/home/hooks/useTrustedUser";
import Footer from "../components/common/Footer";
import HeaderLayout from "../components/layouts/HeaderLayout";

const Home = () => {
  const { isLoading } = useHomeLoading();
  const { isTrusted, loading: isTrustedLoading } = useTrustedUser();

  if (isLoading || isTrustedLoading) {
    return (
      <HeaderLayout>
        <HomeSkeleton />
      </HeaderLayout>
    );
  }

  return (
    <HeaderLayout>
      <div className="min-h-screen bg-gray-100">
        <Banner />
        <Categories />
        <WholesaleFavorites />
        <WhyChooseUs />
        {isTrusted && <TrustedClients />}
        <Footer />
      </div>
    </HeaderLayout>
  );
};

export default Home;

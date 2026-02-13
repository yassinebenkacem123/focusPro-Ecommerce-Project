import HeroSection from '../components/hero/HeroSection'
import type {JSX} from "react";
import AboutUs from '../components/sections/aboutus/AboutUs';
import OurAmazingCameras from '../components/sections/details/OurAmazingCameras';
import ExploreSection from '../components/sections/explore/ExploreSection';
import ProductDetails from '../components/sections/productDetails/FeaturedProducts';
import ShownCreativity from '../components/sections/shownCreativity/ShownCreativity';
import Subscribe from '../components/sections/subscribe/Subscribe';
import Template from '../utils/Template';
const Home = ():JSX.Element => {
  return (
    <Template>
      <main className='px-12 md:px-15 lg:px-18'> 
        <HeroSection  />  
        <AboutUs  />
        <OurAmazingCameras  />
        <ProductDetails />
        <ShownCreativity  />
        <Subscribe  />
      </main>
      <ExploreSection />
    </Template>
  )
}

export default Home
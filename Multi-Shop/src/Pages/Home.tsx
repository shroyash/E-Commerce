import { useState } from 'react';
import HeroBannerImg from '../Assests/Image/hero_banner-removebg-preview.png';
import GreenTshirt from '../Assests/Image/green-single.jpg'
import BlackTshirt from '../Assests/Image/black-single.jpg'
import WhiteTshirt from '../Assests/Image/single-white.jpg'

const Home = () => {
  const [singleProduct, setSingleProduct] = useState<string | undefined>(HeroBannerImg);
  const handleSetSingleCloth = (id:number) => {
    if(id ===1){
      setSingleProduct(WhiteTshirt);
    }else if(id === 2){
      setSingleProduct(BlackTshirt);
      console.log("clicked",BlackTshirt);
    }else if(id ===3){
      setSingleProduct(GreenTshirt);
    }

  }
  return (
    <div>
      <section className="heroBanner container mx-auto md:py-8 px-8 grid grid-cols-1 md:grid-cols-12 mb-24">
        <div className="heroBanner-text md:col-span-6">
          <div className="heroBanner__text-heading md:mt-14">
            <h5 className="text-red-500 text-xs mt-5 font-[550] md:text-[1em] mx-2">Our Summer Collections</h5>
          </div>
          <div className="heroBanner__main-text-heading mt-5 leading-1 ">
            <h1 className="font-bold text-4xl md:text-7xl">The New Arrival</h1><br />
            <h1 className="text-red-500 text-4xl font-bold -mt-5 md:text-7xl">Clothes</h1>
          </div>
          <div className="heroBanner__description-text my-5 md:my-10">
            <p className="text-[0.7em] md:text-xl">Discover stylish, quality comfort,<br />and innovation for your life</p>
          </div>
          <div className="heroBanner__shop-btn my-8">
            <button className="rounded-full text-white px-5 py-2 bg-red-500">
              Shop
            </button>
          </div>
        </div>

        <div className="heroBanner__wrapper md:col-span-6 md:flex">
  {/* Hero banner image */}
  <div className="heroBanner__image">
    <img src={singleProduct} alt="Hero Banner Image" className="w-full h-[450px] mb-3 md:w-[400px]" />
  </div>

  {/* Product grid */}
  <div className="heroBanner-single-cloth grid grid-cols-12 gap-5 ml-0  md:grid-cols-3 md:ml-16">
    <div className="single-cloth-1 col-span-4  border-solid border-2 border-indigo-600" onClick={() => handleSetSingleCloth(1)}>
      <img src={WhiteTshirt} alt="White Tshirt" className="w-36 h-16 md:h-32 md:w-32" />
    </div>
    <div className="single-cloth-2 col-span-4 border-solid border-2 border-indigo-600" onClick={() => handleSetSingleCloth(2)}>
      <img src={BlackTshirt} alt="Black Tshirt" className="w-36 h-16 md:h-32 md:w-32" />
    </div>
    <div className="single-cloth-3 col-span-4 border-solid border-2 border-indigo-600" onClick={() => handleSetSingleCloth(3)}>
      <img src={GreenTshirt} alt="Green Tshirt" className="w-36 h-16 md:h-32 md:w-32" />
    </div>
  </div>
</div>




      </section>
    </div>
  );
}

export default Home;

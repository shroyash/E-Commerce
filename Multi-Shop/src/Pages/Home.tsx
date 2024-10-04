import HeroBanner from "../Assests/herobanner.jpg";
import ProductList from "../Component/ProductList";
import { useLatestSelling } from "../LatestSellingContext/LatestSellingContext";
import { assets } from "../Assests/assets";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { latestProducts, sellingProducts } = useLatestSelling();
  const { exchange_icon, support_img, quality_icon } = assets;
  const navigate = useNavigate();
  return (
    <div>
      <section className="heroBanner container mx-auto px-4 md:px-[7vw] grid grid-cols-1 md:grid-cols-12 mb-24">
        <div className="heroBanner-text md:col-span-6 border border-gray-400 md:border-r-0 px-8 my-2 border-b-0">
          <div className="heroBanner__text-heading md:mt-28">
            <h5 className="text-red-500 text-xs mt-5 font-[550] md:text-[1em] mx-2">
              Our Summer Collections
            </h5>
          </div>
          <div className="heroBanner__main-text-heading mt-5 leading-1">
            <h1 className="font-bold text-4xl md:text-3xl lg:text-5xl">
              The New Arrival
            </h1>
            <br />
            <h1 className="text-red-500 text-4xl font-bold -mt-5  md:text-3xl lg:text-5xl">
              Clothes
            </h1>
          </div>
          <div className="heroBanner__description-text my-5 md:my-10">
            <p className="text-[0.7em] md:text-xl">
              Discover stylish, quality comfort,
              <br />
              and innovation for your life
            </p>
          </div>
          <div className="heroBanner__shop-btn my-8">
            <button className="rounded-full text-white px-5 py-2 bg-red-500" onClick={() => navigate('/shop')} >
              Shop
            </button>
          </div>
        </div>

        <div className="heroBanner__wrapper md:col-span-6 border md:my-2 -mt-2  border-t-0  border-gray-500 md:border-l-0 ">
          {/* Hero banner image */}
          <div className="heroBanner__image">
            <img
              src={HeroBanner}
              alt="Hero Banner Image"
              className="object-cover object-top h-[300px] md:h-[500px] w-[550px]"
            />
          </div>
        </div>
      </section>

      <section className="latestCloth-section container mx-auto px-4 md:px-[7vw]">
        <div className="latestCloth__main-heading text-center">
          <h1 className="md:text-3xl text-2xl mb-8 md:mb-14">LATEST COLLECTIONS____</h1>
          <ProductList selectedProduct={latestProducts} />
        </div>
      </section>

      <section className="sellingCloth-section container mx-auto px-4 md:px-[7vw] mt-8">
        <div className="sellingCloth__main-heading text-center">
          <h1 className="md:text-3xl text-2xl mb-8 md:mt-16 md:mb-14">
            MOST SELLING<br></br> COLLECTIONS____
          </h1>
          <ProductList selectedProduct={sellingProducts} />
        </div>
      </section>

      <section className="policy-section mt-12 md:my-16 container mx-auto px-4 md:px-[7vw]">
  <div className="grid grid-cols-1 md:grid-cols-12 gap-16  justify-center">
    <div className="exchange-heading md:col-span-4 text-center">
      <img src={exchange_icon} alt="" className="w-12 mx-auto" />
      <p className="font-bold">Easy Exchange Policy</p>
      <p className="text-slate-500">We offer hassle-free exchange policy</p>
    </div>

    <div className="Return-heading md:col-span-4 text-center">
      <div className="exchange-heading">
        <img src={quality_icon} alt="" className="w-12 mx-auto" />
        <p className="font-bold">7 Days Return Policy</p>
        <p className="text-slate-500">We provide 7 days free return policy</p>
      </div>
    </div>

    <div className="customer-heading md:col-span-4 text-center">
      <div className="exchange-heading">
        <img src={support_img} alt="" className="w-12 mx-auto" />
        <p className="font-bold">Best customer support</p>
        <p className="text-slate-500">We provide 24/7 customer support</p>
      </div>
    </div>
  </div>
</section>

    </div>
  );
};

export default Home;

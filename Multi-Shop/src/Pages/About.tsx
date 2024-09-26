import { assets } from "../Assests/assets";
const About = () => {
  const { about_img } = assets;
  return (
    <div className="About container mx-auto px-4 md:px-[7vw]">
      <div className="About__heading my-8 ">
        <h1 className="font-[500] text-center text-2xl text-gray-600">
          ABOUT US
        </h1>
      </div>

      <div className="About__main-content grid grid-col-1 md:grid-cols-12 gap-8">
        <div className="About__img md:col-span-6 flex justify-center">
          <img src={about_img} alt="about-img" className="h-[90vh] w-full" />
        </div>
        <div className="About__main-content  md:col-span-6 mt-8 mb-6 text-gray-600">
          <p className="mb-6 text-justify">
            Multi-Yash was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>
          <p className="mb-6 text-justify">
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <h2 className="font-bold my-6">Our Mission</h2>
          <p>
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations, from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </div>

      <div className="About__sub-section">
        <div className="main-heading text-2xl text-gray-600 font-[500] my-10">
          Why Choose Us
        </div>
        <div className="sub-section grid grid-col-1 md:grid-cols-12  text-gray-600 ">
          <div className="md:col-span-4 border border-gray-400 px-8 py-6 md:py-14 md:px-10">
            <div className="mainTopic-1">
              <h3 className="font-bold my-5">Quality Assurance:</h3>
              <p>
                We meticulously select and vet each product to ensure it meets
                our stringent quality standards.
              </p>
            </div>
          </div>
          <div className="md:col-span-4 border border-gray-400 px-8 py-6 md:py-14 md:px-10">
            <div className="mainTopic-2">
              <h3 className="font-bold my-5">Exceptional Customer Service:</h3>
              <p>
                Our team of dedicated professionals is here to assist you the
                way, ensuring your satisfaction is our top priority.
              </p>
            </div>
          </div>
          <div className="md:col-span-4 border border-gray-400 px-8 py-6 md:py-14 md:px-10">
            <div className="mainTopic-3">
              <h3 className="font-bold my-5">Convenience:</h3>
              <p>
                With our user-friendly interface and hassle-free ordering
                process, shopping has never been easier.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

import { assets } from "../Assests/assets";

const Contact = () => {
  const { contact_img} = assets;
  return (
    <div className="contact">
      <div className="contact__main-heading flex mx-2 justify-center my-12 space-x-1">
        <h1 className="text-gray-500 font-[500] text-2xl">CONTACT</h1>
        <p className="text-black text-2xl">US</p>
        <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] mt-4 mx-2 bg-gray-700"></p>
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img className="w-full md:max-w-[480px]" src={contact_img} alt="Contact" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">54709 Willms Station <br /> Suite 350, Washington, USA</p>
          <p className="text-gray-500">Tel: (415) 555-0132 <br /> Email: admin@forever.com</p>
          <p className="font-semibold text-xl text-gray-600">Careers at Forever</p>
          <p className="text-gray-500">Learn more about our teams and job openings.</p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;

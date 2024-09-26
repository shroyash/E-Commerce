import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="grid grid-cols-1 md:grid-cols-12 container mx-auto px-4 mt-32 md:px-[7vw] md:gap-[6.5rem] gap-8 ">
        <div className="footer__main col-span-12 md:col-span-6">
          <h1 className="footer__logo text-black font-[500] text-2xl">
            Multi-Yash
          </h1>

          <p className="footer__mainText mt-6 text-[0.9em] w-full max-w-full overflow-hidden">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        <div className="footer__link col-span-12 md:col-span-3 ite">
          <div>
            <h1 className="footer__logo-text font-[500] text-2xl">Company</h1>
          </div>
          <div>
            <ul className="mt-5 text-[0.9em]">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__main col-span-12 md:col-span-3 items-end ">
          <h1 className="footer__logo text-black font-[500] text-2xl">
            Get In Touch
          </h1>

          <p className="footer__mainText mt-6 text-[0.9em] w-full max-w-full overflow-hidden">
            shroyash@gmail.com
            <br />
            9818824609
            <br />
            Instagram
          </p>
        </div>

        <hr className="col-span-12 my-0" />

        <div className="footer__copyright-text col-span-12  text-center md:-mt-12 font-[500] text-[0.9em]">
          Copyright 2024 @ shroyash.dev - All Rights Reserved
        </div>
      </footer>
    </div>
  );
};

export default Footer;

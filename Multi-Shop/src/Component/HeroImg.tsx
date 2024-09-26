const HeroImg = ({ title,img }: any) => {
    return (
      <div className="w-full h-[100px] bg-[#f8da2d] relative">
        <div className="hero-img w-full h-full">
          <img
            src={img}
            alt="shop-img"
            className="w-full absolute "
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-5xl font-bold">{title}</h3>
          </div>
        </div>
      </div>
    );
  };
  
  export default HeroImg;
  
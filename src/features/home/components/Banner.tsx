import { useEffect, useRef } from "react";

const Banner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <div className="relative w-full h-64 md:h-96 rounded overflow-hidden shadow-md">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/src/assets/video/banner video.MP4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Text Overlay */}
      <div className="absolute inset-0  bg-opacity-40 flex flex-col justify-center items-center px-4 py-8 text-center">
        {/* <h1 className="text-2xl md:text-4xl font-bold mb-3 text-white leading-tight drop-shadow-lg">
          Make Your Own Brand
          <br />
          Manufacturing Excellence
        </h1> */}
      
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <button className="bg-[#0a174e] text-white px-8 py-3 rounded-md border-2 border-[#0a174e] text-lg md:text-xl transition hover:bg-[#0a174e]/90 focus:outline-none w-full md:w-auto shadow-lg">
            Shop Now
          </button>
          <button className="bg-white/90 text-[#0a174e] px-8 py-3 rounded-md border-2 border-white text-lg md:text-xl transition hover:bg-white focus:outline-none w-full md:w-auto shadow-lg">
            <a href="/customize-order">Customize Order</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;

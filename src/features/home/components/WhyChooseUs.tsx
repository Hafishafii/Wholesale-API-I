const features = [
  {
    icon: (
      <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
    ),
    title: '100% Quality Checked Fabrics',
    desc: 'All our garments go through strict quality control to ensure durability, comfort, and finish.',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-yellow-700" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 1l7.997 4.884A2 2 0 0 1 19 7.618V17a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7.618a2 2 0 0 1 1.003-1.734z" /></svg>
    ),
    title: 'Bulk Discounts',
    desc: 'Save more with volume purchases — designed to support your retail margins.',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-gray-700" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4zm0 2h12v12H4V5zm2 2v8h8V7H6z" /></svg>
    ),
    title: 'Direct from Manufacturer',
    desc: 'We eliminate middlemen to offer you factory-rate pricing straight from our production unit.',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M3 8a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8zm2-3a2 2 0 1 1 4 0h2a2 2 0 1 1 4 0h-2a2 2 0 1 1-4 0H5z" /></svg>
    ),
    title: 'Fast Delivery',
    desc: 'Timely dispatches and reliable logistics to get your orders to your doorstep quickly.',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-indigo-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2.08a2 2 0 0 1 1.106-1.789l7-3.11a2 2 0 0 1 1.788 0l7 3.11A2 2 0 0 1 22 16.92z" /></svg>
    ),
    title: 'Dedicated Support',
    desc: 'Our wholesale support team is just a call or message away — ready to assist you anytime.',
  },
];

const WhyChooseUs = () => {
  return (
    <div className="bg-[#f5f6fa] py-10 md:py-14 px-2 md:px-4 flex flex-col items-center min-h-screen">
      <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-12 text-center text-black">Why choose KTR Exports?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 w-full max-w-6xl mb-6 md:mb-8">
        {features.slice(0, 3).map((f) => (
          <div key={f.title} className="bg-white border-2 border-blue-900 rounded-xl p-5 md:p-8 flex flex-col items-center text-center shadow-md min-h-[180px] md:min-h-[220px]">
            <div className="mb-3 md:mb-4">{f.icon}</div>
            <div className="font-bold text-black mb-1 md:mb-2 text-base md:text-lg">{f.title}</div>
            <div className="text-gray-700 text-sm md:text-base">{f.desc}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full max-w-3xl">
        {features.slice(3).map((f) => (
          <div key={f.title} className="bg-white border-2 border-blue-900 rounded-xl p-5 md:p-8 flex flex-col items-center text-center shadow-md min-h-[180px] md:min-h-[220px]">
            <div className="mb-3 md:mb-4">{f.icon}</div>
            <div className="font-bold text-black mb-1 md:mb-2 text-base md:text-lg">{f.title}</div>
            <div className="text-gray-700 text-sm md:text-base">{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs; 
import React from 'react';

const Contact = () => {
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg border-b-4 border-gray-300">
        <div className='text-center'>
          <h1>connect</h1>
<h2 className='text-3xl'>need help? <span className='text-red-600'>contact us</span> 
</h2>
        </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-8">
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Call Us</h2>
        <p className="text-lg">Phone: <a href="tel:5214448" className="text-blue-500 hover:underline">5214448</a></p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Address</h2>
        <p className="text-lg">166 Geish Road, Cleopatra, Sedi Gaber, Egypt</p>
      </div>


      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Opening Hours</h2>
        <p className="text-lg">Monday to Sunday: 8:00 AM - 11:00 PM</p>
      </div>
    </div>
        <p className='my-5 text-center'>you can find us at</p>
        <div className='mx-10'>
          <iframe
            width="300"
            height="400"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src="https://maps.google.com/maps?width=300&amp;height=400&amp;hl=en&amp;q=166%20Geish%20Road,%20Cleopatra,%20Sedi%20Gaber,%20Egypt+(Dom's)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            title="Google Map"
            className="w-full"
          ></iframe>
          <p className='text-center mt-4'>
            <a href="https://www.google.com/maps/place/Dom%E2%80%99s/@31.2254413,29.9366415,15z/data=!4m6!3m5!1s0x14f5c59079f75641:0xa4210107ba450f20!8m2!3d31.2254413!4d29.9366415!16s%2Fg%2F11tx_t4vw7?entry=tts">gps vehicle tracker</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;

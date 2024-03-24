import React from 'react';

const Aboutus = () => {
    
    return (

        <div className="flex flex-col bg-lavender h-[80vh] items-center justify-center">
            <h1 className='text-3xl font-semibold text-blue-900 mb-4'>About Us</h1>
            <div className=' bg-white p-8 rounded-lg shadow-xl w-2/3'>
                <section className=" text-xl">
                    <li className="mb-4">
                        <strong>Commitment to Security:</strong> At Project Lock And Key, we are dedicated to addressing the increasing threats posed by security lapses and cyber-attacks.
                    </li>
                    <li className="mb-4">
                        <strong>Breaking Free from Passwords:</strong> We understand that traditional password-based authentication systems are no longer sufficient.
                    </li>
                    <li className="mb-4">
                        <strong>Four Layers of Protection:</strong> With Project Lock And Key, we introduce a unique approach to authentication.
                    </li>
                    <li className="mb-4">
                        <strong>User-Friendly Interface:</strong> Managing user profiles is a breeze with our intuitive interface. We believe security should be accessible to all, and our user-friendly design ensures smooth navigation for administrators and users alike.
                    </li>
                </section>
            </div>
        </div>

    );
};

export default Aboutus;
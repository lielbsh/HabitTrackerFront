import React from 'react';

const Start = () => {
    return ( 
        /* Hero Section */
        <header className="bg-background-yellow p-8">
            <div className="container mx-auto flex flex-col md:flex-row items-center">
                {/* Text Content */}
                <div className="md:w-1/2">
                    <h1 className="text-4xl font-serif text-dark mb-4">Track Your Habits</h1>
                    <p className="prose">
                        Stay consistent and build healthy habits with our intuitive habit tracker. Add, monitor, and achieve your goals effortlessly!
                    </p>
                    <button className="mt-6 bg-mustard text-white px-6 py-3 rounded-md hover:bg-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-mustard">
                        Get Started
                    </button>
                </div>
                {/* Illustrative Image */}
                <div className="mt-6 md:mt-0 md:w-1/2">
                    <img 
                        src="/images/habit-illustration.svg" 
                        alt="Illustration showing habit tracking features" 
                        className="w-full rounded-md shadow-custom-light" 
                    />
                </div>
            </div>
        </header>
    );
}

export default Start;

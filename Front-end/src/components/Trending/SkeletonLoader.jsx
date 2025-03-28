import React from 'react';
import './SkeletonLoader.css'; // Style for skeleton loading

const SkeletonLoader = () => {
    return (
        <>
            <div className='Trending-Container-city'>
                <div className='section-one'>
                    <h2>FAMOUS DESTINATIONS</h2>
                    <h3 style={{ textAlign: "center" }} className="sub">worth a thousand stories</h3>
                    <p>These luxury India Cities are simply suggestions for the kind of holiday you might have. Yours will be tailored, altered, and refined until it matches you completely.</p>
                </div>
                <div className='section-two'>
                    <div className="skeleton-loader-container">

                        <div className="skeleton-slider">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="skeleton-card"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='Trending-Container-places'>
                <div className='section-one'>
                    <h2>FAMOUS ATTRACTIONS</h2>
                    <h3 style={{ textAlign: "center" }} className="sub">Come And Fall In Love</h3>
                    <p>These luxurious destinations in India are just a starting point for your dream getaway. Your journey will be personalized, customized, and fine-tuned to perfectly suit your preferences.</p>
                </div>
                <div className='section-two'>
                    <div className="skeleton-loader-container">

                        <div className="skeleton-slider">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="skeleton-card"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

};

export default SkeletonLoader;

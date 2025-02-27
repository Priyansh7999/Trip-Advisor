import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './SelectedCity.css'; // Assuming you have a CSS file for styling
import useFetch from '../../components/hooks/useFetch';
import Weather from '../../components/Weather/Weather';
import CityMap from '../../components/CityMap/CityMap';
import CityImages from '../../components/CityImages/CityImages';
const SelectedCity = () => {
  const latitude = 23.2599; // Example: Bhopal, India
  const longitude = 77.4126;
  const { cityName } = useParams(); // Get the city name from the URL
  useEffect(() => {
    window.scrollTo(0, 0);
  },[])
  return (
    <div className='selected-city-container'>

      {/* City image with title and breif desc */}
      <div className='selected-city-header'>
        <div className='selected-city-image'>
          <img src="https://plus.unsplash.com/premium_photo-1697729585263-29ebdcb972ee?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmhvcGFsfGVufDB8MHwwfHx8MA%3D%3D" alt="" />
        </div>
        <div className='selected-city-name'>
          <h1>Bhopal</h1>
        </div>
        <div className='selected-city-desc'>
          <p>Ruled by Mughal Begums in the past, Bhopal’s rich history, traditional legacy and artistic vibrancy is mirrored in its various Architectural marvels, historical monuments, religious sites and museums.</p>
        </div>
      </div>

      {/* Best time to visit city based on season and festival */}
      <div className='selected-city-best-time-to-visit'>
        <h1>Best Time to Visit Bhopal</h1>
        <p>All year round destination</p>
        <div className='selected-city-best-time-to-visit-Season-weather'>
          <div className='selected-city-best-time-to-visit-Season'>
            <div className='box1'>
              <h2>Peak Season</h2>
              <p>OCT-FEB</p>
              <p>Pleasant weather, clear skies.</p>
            </div>
            <div className='box2'>
              <h2>Moderate Season</h2>
              <p>Jul - SEP</p>
              <p>Pleasant weather with cool showers. Sightseeing and local food tours.</p>
            </div>
            <div className='box3'>
              <h2>Off-season</h2>
              <p>Apr - Jun</p>
              <p>Hot days with cooler evenings. </p>
            </div>
          </div>
          <div className='Weather'>
          <Weather city="bhopal" />
          </div>
        </div>
      </div>

      {/* Attractions in that city */}
      <div className='selected-city-attractions-section'>
        <h1>Attractions</h1>
        <div className='selected-city-attractions'></div>
      </div>

      {/* Hotels in that city */}
      <div className='selected-city-hotels-section'>
        <h1>Stay in Bhopal</h1>
        <p>Recommended Options</p>
        <div className='selected-city-hotels'></div>
      </div>


      {/* More about city */}
      <div className='selected-city-overview'>
        <h1>Bhopal Overview</h1>
        {/* City title history card */}
        <div className='city-name-title-history-card'>
          <h2>Bhopal - The City of Joy</h2>
          <p>Bhopal a city in the middle of the Indian state of Madhya Pradesh, is known for its vibrant cultural heritage and rich history. It was once a major center of trade and commerce, with the Mauryas, Chalukyas, and the Kadambas leading the way. The city's rich heritage includes its temples, forts, and museums, as well as its traditional arts and crafts. Bhopal is also known for its festivals, including the famous Bhopal Festival, which celebrates the birth of Lord Shiva. The city's vibrant atmosphere and cultural heritage make it a popular destination for tourists.</p>
          <div className='selected-city-card'>
            <table>
              <tr>
                <th>State</th>
                <td>Madhya Pradesh</td>
              </tr>
              <tr>
                <th>Tourist Places in Bhopal</th>
                <td>Museum of Mankind, Van Vihar National Park, Birla Mandir Near Bhopal, Bhojpur Temple, Yodhasthal</td>
              </tr>
              <tr>
                <th>Bhopal is famous for</th>
                <td>Memorable Experiences, Food & Culture</td>
              </tr>
              <tr>
                <th>Weather in Bhopal</th>
                <td>Bhopal enjoys a tropical climate, with warm temperatures year-round. The monsoon season lasts from June to September, while the best time to visit is between November and February when the weather is pleasant and cool.</td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      {/* How to Reach */}
      <div className='selected-city-how-to-reach'>
        <div className='selected-city-transport-map'>
          <div className='transport'>
          <h1>How to Reach Goa</h1>
            <div className='by-air'>
              <h2>By Air</h2>
              <p>Bhopal is connected by regular flights from airlines like Indian Airlines, Air Deccan, and Jet Airways to major cities such as Delhi, Mumbai, and Indore. Affordable and comfortable air travel options make reaching the city convenient.</p>
            </div>
            <div className='by-train'>
              <h2>By Rail</h2>
              <p>Bhopal is a major railway hub with frequent trains from Delhi, Mumbai, and other cities. The Shatabdi Express and other trains connect Bhopal to key destinations like Gwalior, Agra, and Ujjain.</p>
            </div>
            <div className='by-road'>
              <h2>By Road</h2>
              <p>Bhopal is well-connected by road with deluxe buses, including AC options, traveling to nearby cities like Indore, Sanchi, and Jabalpur. The city's road transport infrastructure, including buses, taxis, and rickshaws, offers affordable travel options.</p>
            </div>
          </div>
          <div className='map'>
          <CityMap url={`https://www.google.com/maps/embed/v1/view?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&center=${latitude},${longitude}&zoom=12`} />
          </div>
        </div>
      </div>

      {/* What are the Things to See and Do */}
      <div className='selected-city-what-to-see-and-do'>
        <h2>What are the Things to See and Do in Bhopal?</h2>
        <p>There is no shortage of things to do in Bhopal. The upper lake and lower lakes are the crown jewel of the city with varied landscapes delivering thrilling adventures. Have a fun outing at Sair Sapata and amusement in watermarks.</p>
      </div>

      {/* Food to Try in Places to Visit  */}
      <div className='selected-city-food-to-try'>
        <h2>Food to Try in Bhopal</h2>
        <p>Bhopal is famous for Gujarati and Rajasthani cuisines with a hint of Mughal zest. Bhopal famous food that you must try include kebabs, barfi rasmalai, rogan josh, mawa bati, biryani pilaf, Bhopal gosht korma, chats of Bhopal, achar gosht and roghan josh, etc. Vegetarian Bhopal food is mostly spicy with a distinct taste.</p>
      </div>

      {/* Famous Restaurants  */}
      <div className='selected-city-famous-restaurants'>
        <h2>Famous Restaurants in Bhopal</h2>
        <div className='restaurants-list'>
          <div className='restaurants'>
            <h2>Tattenham Across the Orient</h2>
            <p>TAO is one of the famous restaurants in Bhopal serving delicious foods at reasonable rates. It also has a variety of delicacies with a spacious bar</p>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <button className='glow-on-hover'>Explore Now</button>
            </div>
          </div>
          <div className='restaurants'>
            <h2>Tattenham Across the Orient</h2>
            <p>TAO is one of the famous restaurants in Bhopal serving delicious foods at reasonable rates. It also has a variety of delicacies with a spacious bar</p>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <button className='glow-on-hover'>Explore Now</button>
            </div>
          </div>
          <div className='restaurants'>
            <h2>Tattenham Across the Orient</h2>
            <p>TAO is one of the famous restaurants in Bhopal serving delicious foods at reasonable rates. It also has a variety of delicacies with a spacious bar</p>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <button className='glow-on-hover'>Explore Now</button>
            </div>
          </div>
        </div>
      </div>

      {/* Famous Places to Stay  */}
      <div className='selected-city-famous-hotels'>
        <h2>Famous Places To Stay In Bhopal</h2>
        <p>There are plenty of options to stay in Bhopal so you can delight in the beauty of tourist places in Bhopal with complete ease. You can pick from budget-friendly, mid-range to luxury hotels in Bhopal.</p>
        <div className='hotels-list'>
          <div className='hotel'>
            <h3>Taj Lakefront</h3>
            <p>The five-star hotel is situated in Prempura. It is near some close attractions of the city with quality amenities inside the hotel premises.</p>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <button className='glow-on-hover'>Explore Now</button>
            </div>
          </div>
          <div className='hotel'>
            <h3>Taj Lakefront</h3>
            <p>The five-star hotel is situated in Prempura. It is near some close attractions of the city with quality amenities inside the hotel premises.</p>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <button className='glow-on-hover'>Explore Now</button>
            </div>
          </div>
          <div className='hotel'>
            <h3>Taj Lakefront</h3>
            <p>The five-star hotel is situated in Prempura. It is near some close attractions of the city with quality amenities inside the hotel premises.</p>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <button className='glow-on-hover'>Explore Now</button>
            </div>
          </div>
        </div>
      </div>

      {/* Things to Buy in Gwalior */}
      <div className='selected-city-things-to-buy'>
        <h2>Things to Buy in Bhopal</h2>
        <div className='things-to-buy'>
          <h2>Chowk Bazaar</h2>
          <p>Hardcore shoppers should not miss shopping from this place. The market is full of leather products, silver ornaments, fancy shoes, handlooms, and batua with colourful beadwork</p>
        </div>
        <div className='things-to-buy'>
          <h2>New Market</h2>
          <p>The Bhopal market is located near the upper and lower lakes. Here you can shop for readymade clothes, handicraft products, beadwork products, leather goods, and velvet items.</p>
        </div>
        <div className='things-to-buy'>
          <h2>Bittan Market</h2>
          <p>Here you can definitely feel the real Bhopal. Here you can buy a range of products such as footwear, bags, and accessories with classic Bhopal vibes at reasonable prices.
            But when one does arrive at that fresh frontier, there are ways better than others to begin your journey of discovery. Follow these steps and see the world with a new light.</p>
        </div>
      </div>
      {/* Conclusion */}
      <div className='selected-city-Conclusion'>
        <h2>Conclusion</h2>
        <p>The old and new cultural hubs, fascinating places, and stunning heritage spots are enticing travellers across the globe. The marvellous architecture, azure water bodies, and lip-smacking cuisine of Bhopal make your trip to Bhopal worth it. The city of lakes has something for everybody.</p>
      </div>
    </div>
  );
};

export default SelectedCity;

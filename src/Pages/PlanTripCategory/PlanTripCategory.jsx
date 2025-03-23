import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Whereto.module.css"
import beach from "../../assets/beach.jpg";
import Hills from "../../assets/Hills.jpg";
import Adventure from "../../assets/Adventure.jpg";
import Honeymoon from "../../assets/Honeymoon.jpg";
import Romantic from "../../assets/Romantic.jpg";
import heritage from "../../assets/heritage.jpg";
import Foodies from "../../assets/Foodies.jpg";
import Relax from "../../assets/Relax.jpg";
import bg1 from "../../assets/bg2.jpg";
import AllCards from "../../components/AllCards_PlanTrip/AllCards";
export default function PlanTripCategory() {
  const places = [
    {
      img: Romantic,
      name: "Romantic Vacation",
      description: "List of romantic tourism destinations and plan a passionate getaway with your special someone to surreal valleys, snow-clad mountains, sun-soaked beaches or adventurous wildlife trails",
    },
    {
      img: Foodies,
      name: "Foodies",
      description: "List of foodie tourism destinations and plan a culinary adventure with your loved one to delectable cuisines, local markets, and culinary experiences.",
    },
    {
      img: heritage,
      name: "Heritage Walk",
      description: "Explore historical places & countless ideas for an epic break and make way to explore the prominent monuments, streets, architectures, and UNESCO recognized sites",
    },
    {
      img: Hills,
      name: "Hills and Mountains",
      description: "Hill Stations - Breathe in the fresh mountain air, treat your eyes to the spectacular views, and lose yourself in the charming ambiance to feel refreshed from within.",
    },
    {
      img: Adventure,
      name: "Adventure Seekers",
      description: "Adventure Tourism - Explore the uncharted territories, experience the rush of adrenaline, and witness the breathtaking beauty of nature's wonders.",
    },
    {
      img: Honeymoon,
      name: "Honeymoon Hotspots",
      description: "Honeymoon Destinations - Plan a romantic getaway with your partner to the most romantic destinations and create unforgettable memories together.",
    },
    {
      img: beach,
      name: "Beach Retreat",
      description: "Beach Tourism - Enjoy the soothing sounds of the ocean waves, the gentle breeze, and the warm sun on your skin. Immerse yourself in the tranquility and relaxation of the beach.",
    },
    {
      img: Relax,
      name: 'Places To Relax',
      description: "Peaceful Places - Plan awesome relaxing places in India for peaceful vacations and pamper yourself to a traditional spa or a dip in a turquoise pool. Relish exquisite cocktails and BBQ or indulge in more such relaxing activities.",
    }
  ];

  return (
    <>
      <div className='where-to-container' id="where-to-container">
        <div className="where-to-header" id="where-to-header">
          <img src={bg1} alt="" />
          <h1 className="where-to-title" id="where-to-title">Trip Idea - Discover Places & Plan Your Holidays!</h1>
          <p className="where-to-description" id="where-to-description">
            Planning your next vacation? Try one of these exotic and comfortable travel ideas to make your holiday memorable. Whether a romantic beach vacation, a relaxing family holiday, an adventurous trek, or a heritage walk, plan the most appropriate itinerary within your budget.
          </p>
        </div>
        <div className={"where-to-content"} id="where-to-content">
          <AllCards places={places} />
          <div className={styles["where-to-footer"]} id="where-to-footer">
            <h2>Unleash Your Wanderlust with Our Exclusive Holiday Ideas!</h2>
            <p>Vacations are the perfect opportunity to create lasting memories, and a well-organized itinerary ensures an unforgettable experience. Explore a diverse range of destinations, from serene mountain escapes and vibrant valleys to iconic monuments, bustling cities, and thrilling adventure trails. <br />
              Heritage enthusiasts and spiritual seekers will find joy in our handpicked heritage and pilgrimage destinations, while food lovers can indulge in culinary journeys exploring exotic dishes and renowned food hubs.<br />
              Dreaming of a hill's and mountain retreat? Our breathtaking destinations boast stunning views of snow-capped peaks and include visits to unique tourist attractions.<br />
              If you're an adventure enthusiast, get ready for an action-packed holiday! Choose from activities like camping, scuba diving, white-water rafting, kayaking, parasailing, skydiving, bungee jumping, and more for an adrenaline-pumping experience.<br />
              Planning a honeymoon or a romantic getaway? Discover our specially curated packages designed to make your moments of love even more magical.<br />
              For beach lovers, our destinations offer stunning accommodations with breathtaking views, delectable cuisine, exciting water activities, and serene beach beds to relax and rejuvenate.</p>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import style from "./TravelGrid.module.css";
import heritage from "./public/heritage.jpg";
import Romantic from "./public/Romantic.jpg";
import Foodies from "./public/Foodies.jpg";
import Hills from "./public/Hills.jpg";
import Beach from "./public/beach.jpg";
import { TripPlannerContext } from "../../context";

const TravelGrid = () => {
  const { setTripCategory } = useContext(TripPlannerContext);
  const navigate = useNavigate();

  const articles = [
    {
      category: "Hills and Mountains",
      title: "Explore Hills and Mountains",
      description: "Hill Stations - Breathe in the fresh mountain air, treat your eyes to the spectacular views, and lose yourself in the charming ambiance to feel refreshed from within.",
      image: Hills
    },
    {
      category: "Heritage Walk",
      title: "Best Tourist Attractions",
      description: "Explore historical places & countless ideas for an epic break and make way to explore the prominent monuments, streets, architectures, and UNESCO recognized sites",
      image: heritage,
    },
    {
      category: "Foodies",
      title: "Best Food Attractions",
      description: "List of foodie tourism destinations and plan a culinary adventure with your loved one to delectable cuisines, local markets, and culinary experiences.",
      image: Foodies,
    },
    {
      category: "Beach Retreat",
      title: "Best Beach Attractions",
      description: "Beach Tourism - Enjoy the soothing sounds of the ocean waves, the gentle breeze, and the warm sun on your skin. Immerse yourself in the tranquility and relaxation of the beach.",
      image: Beach,
    },
    {
      category: "Romantic Vacation",
      title: "Best Romantic Attractions",
      description: "List of romantic tourism destinations and plan a passionate getaway with your special someone to surreal valleys, snow-clad mountains, sun-soaked beaches or adventurous wildlife trails",
      image: Romantic,
    },
  ];

  const handleCardClick = (category, image, description) => {
    setTripCategory({ name: category, image: image, description: description });
    navigate(`/PlanTripCategory/${category}`);
  };

  return (
    <div className={style["travel-grid-header"]}>
      <h2>PLAN TRIP</h2>
      <p>Discover the most beautiful places to visit, the best things to do, where to stay, and more in India.</p>
      <div className={style["travel-grid"]}>
        {articles.map((article, index) => (
          <div
            key={index}
            className={`${style['travel-card']} ${index === 0 ? style['large'] : ''}`}
            style={{ backgroundImage: `url(${article.image})` }}
            onClick={() => handleCardClick(article.category, article.image, article.description)}
          >
            <div className={style["travel-card-content"]}>
              <h3>{article.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelGrid;

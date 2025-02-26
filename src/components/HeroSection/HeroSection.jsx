import React from "react";
import "./HeroSection.css";
import GradientText from "../../ui/GradientText";
const HeroSection = () => {
  const HeroLine=[
    "Every journey is a heartbeat, a moment that transforms into a memory, inviting you to explore the world and discover yourself.",
    "Discover the world with our comprehensive travel itineraries to popular destinations around the globe.",
    "Travel is not just about the places you visit, it's about the connections you make and the memories that linger in your heart forever.",
    "Embark on a journey where every step is a new adventure, and every memory is a treasure that enriches your soul.",
    "Let the world be your canvas, painting vibrant memories that will last a lifetime, one adventure at a time.",
    "In the embrace of new horizons, we find the stories that shape us, creating memories that echo in our hearts long after the journey ends."]

    const randomIndex = Math.floor(Math.random() * HeroLine.length);
    const randomHeroLine = HeroLine[randomIndex];
    return (
      <div className="hero-section">
        <div className="hero-content">
          <h1>
          Explore the World
          </h1>
          <p>
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={3}
              showBorder={false}
              className="custom-class"
            >
              {randomHeroLine}
            </GradientText>
          </p>
          <div className="see-more">
              <button class="glow-on-hover" type="button">SEE MORE</button>
        </div>
        </div>
      </div>
    );
  }; 
export default HeroSection;

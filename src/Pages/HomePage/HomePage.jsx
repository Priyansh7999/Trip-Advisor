import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import HeroSection from "../../components/HeroSection/HeroSection";
import bgg from "../../assets/bgg.mp4";
import "./HomePage.css";
import Trending from "../../components/Trending/Trending";
import BelowHeroSeaction from "../../components/BelowHeroSeaction/BelowHeroSeaction";
import TravelGrid from "../../components/TravelGrid/TravelGrid";
import Stack from "../../components/WhatToSEE/Example"
import LesserKnown from "../../components/LesserKnown/LesserKnown";
import CollectionByMonth from "../../components/CollectionByMonth/CollectionByMonth";
import WhatToSee from "../../components/WhatToSEE/WhatToSee"
export default function HomePage() {
  return (
    <>
      <div className="HomePage">
        <div className="video-background">
          <video src={bgg} autoPlay loop muted />
          <div className="overlay"></div>
        </div>

        {/* HERO SECTION */}
        <div id="HeroSection" className="Hero">
          <HeroSection />
        </div>

        {/* BELOW HERO SECTION Why To Travel */}
        <div id="Why_To_Travel" className="BelowHero">
          <BelowHeroSeaction />
        </div>

        {/* TRAVEL GRID Based On Interest */}
        <div id="TravelGrid_Based_On_Interest">
          <TravelGrid />
        </div>

        {/* WHAT TO SEE IN INDIA */}
        <div id="What_To_See_In_India" className="Stacks">
          <WhatToSee />
        </div>

        {/* TRENDING CITY & PLACES */}
        <div id="Trending_City_Places" className="Trending">
          <Trending />
        </div>

        {/* LESSER KNOWN WONDERS */}
        <div id="LesserKnown_Wonders" className="LesserKnown">
          <LesserKnown />
        </div>

        {/* COLLECTIONS BY MONTH */}
        <div id="Collections_by_Month" className="Collections-by-month">
          <CollectionByMonth />
        </div>
      </div>
    </>
  );
}


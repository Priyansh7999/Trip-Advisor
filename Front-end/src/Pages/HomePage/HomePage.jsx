import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import HeroSection from "../../components/HeroSection/HeroSection";
import bgg from "../../assets/bgg.mp4";
import styles from "./HomePage.module.css";
import Trending from "../../components/Trending/Trending";
import BelowHeroSeaction from "../../components/BelowHeroSeaction/BelowHeroSeaction";
import TravelGrid from "../../components/TravelGrid/TravelGrid";
import LesserKnown from "../../components/LesserKnown/LesserKnown";
import CollectionByMonth from "../../components/CollectionByMonth/CollectionByMonth";
import WhatToSee from "../../components/WhatToSEE/WhatToSee"
export default function HomePage() {
  return (
    <>
      <div className={styles.HomePage} id="HomePage">
        <div className={styles["video-background"]} id="video-background">
          <video src={bgg} autoPlay loop muted />
          <div className={styles.overlay} id="overlay"></div>
        </div>

        {/* HERO SECTION */}
        <div id="HeroSection" className={styles.Hero}>
          <HeroSection />
        </div>

        {/* BELOW HERO SECTION Why To Travel */}
        <div id="Why_To_Travel" className={styles.BelowHero}>
          <BelowHeroSeaction />
        </div>

        {/* TRAVEL GRID Based On Interest */}
        <div id="TravelGrid_Based_On_Interest">
          <TravelGrid />
        </div>

        {/* WHAT TO SEE IN INDIA */}
        <div id="What_To_See_In_India" className={styles.Stacks}>
          <WhatToSee />
        </div>

        {/* TRENDING CITY & PLACES */}
        <div id="Trending_City_Places" className={styles.Trending}>
          <Trending />
        </div>

        {/* LESSER KNOWN WONDERS */}
        <div id="LesserKnown_Wonders" className={styles.LesserKnown}>
          <LesserKnown />
        </div>

        {/* COLLECTIONS BY MONTH */}
        <div id="Collections_by_Month" className={styles["Collections-by-month"]}>
          <CollectionByMonth />
        </div>
      </div>
    </>
  );
}


import React, { useState } from 'react';
import india from "../../assets/India-1.jpg";
import "./WhatToSee.css";
import Himalayas from "../../assets/Himalayas-India-scaled.jpg"
import jaipur from "../../assets/jaipur-city-palace-1.jpg";
import TajMahal from "../../assets/TajMahal.jpg";
import Ganga from "../../assets/Ganga-Aarti-ceremony-in-Rishikesh.jpg";
import jodhpur from "../../assets/jodhpur.jpg";
import kerala from "../../assets/kerala.jpg";
import forts from "../../assets/forts.jpg";

export default function WhatToSee() {
  const content =[
      {
          title: "Sail Through the Peaceful Backwaters of Kerala",
          description: "Discover Kerala’s serene backwaters and lush landscapes, where nature’s beauty meets calm waters. Glide gently on a traditional houseboat, surrounded by palm trees and tranquil landscapes. This peaceful journey will fill you with joy, offering moments of reflection and pure happiness as you connect with the soul-soothing beauty of Kerala.",
          imgSrc: kerala,
        },
      {
        title: "Wander Through the Enchanting Blue City of Jodhpur",
        description: "Let the Blue City captivate you with its charm. As the sun sets over the Mehrangarh Fort, watch the city come alive with warm hues of sapphire, creating a romantic atmosphere. End your evening with a magical dinner, surrounded by the rich culture and beauty of Rajasthan – the perfect way to fall in love with India all over again.",
        imgSrc: jodhpur,
      },
      {
        title: "Embrace the Majestic Himalayas for a Soulful Escape",
        description: "High in the Himalayan peaks, find your soul’s peace. Surrounded by serene monasteries, blooming apricot orchards, and breathtaking mountain views, this journey through Ladakh will fill you with peace, joy, and a deeper connection to nature. Let the calm beauty of the Himalayas awaken your spirit and lead you to a place of true happiness.",
        imgSrc: Himalayas,
      },
      {
        title: "Step into the Royal Glory of India’s Palaces and Forts",
        description: "India’s palaces and forts are the backdrop to a story of love, grandeur, and timeless beauty. Journey through Delhi, Agra, and Rajasthan to discover the royal wonders that have captured hearts for centuries. With each palace you explore, feel the romance and history surrounding you, and let the majestic architecture fill your heart with joy.",
        imgSrc: forts,
      },
      {
        title: "Experience the Sacred Ganga Aarti in Rishikesh",
        description: "Feel the spiritual energy of India through the magical Ganga Aarti ceremony in Rishikesh. As the sacred river flows gently under the night sky, experience a profound sense of peace and joy that fills your heart and soul. This ancient tradition connects you to something greater, offering a deep sense of love and tranquility.",
        imgSrc: Ganga,
      },
      {
        title: "Unveil the Charm of Jaipur, the Pink City of Love",
        description: "Jaipur, with its pink sandstone buildings and rich history, exudes romance and charm. Whether you’re riding through the golden sand dunes on a camel or exploring majestic palaces, Jaipur’s beauty is sure to fill your heart with joy. Let the love story of Rajasthan unfold before you, as you experience this magical city’s elegance and grace.",
        imgSrc: jaipur,
      },
      {
          title: "Wake Up to the Magic of the Taj Mahal",
          description: "The Taj Mahal at sunrise is a dream come true – a glowing symbol of love and devotion. As the sun rises over the white marble, the beauty of this monument takes on a magical glow, filling your heart with awe and happiness. Join a private guide as you explore this iconic wonder, experiencing a love story that transcends time.",
          imgSrc: TajMahal,
      },
      {
          title: "Fall in Love with India's Timeless Charm",
          description: "India, a land of deep traditions and eternal beauty, welcomes you to fall in love with its incredible history, dazzling monuments, and vibrant culture. Imagine a sunrise over the Taj Mahal, a symbol of eternal love, where every stone whispers the sweet tale of romance. Whether you're strolling through the colorful streets of Jaipur. India fills your heart with joy and wonder.",
          imgSrc: india,
      },
    ];

  const [visibleItems, SetvisibleItems] = useState(3);

  function handleClick() {
    SetvisibleItems(visibleItems + 3);
  }

  return (
    <div className='WhatToSee'>
      <h1>Experience the Love and Joy of India</h1>
      <div className='content-container'>
        {content.slice(0, visibleItems).map((item, index) => (
          <div key={index} className='content-item'>
            <img src={item.imgSrc} alt={item.title} />
            <div className='content-description'>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      {visibleItems < content.length ? (
        <div>
          <button className='glow-on-hover' onClick={handleClick}>See More</button>
        </div>
      ) : null}
    </div>
  );
}

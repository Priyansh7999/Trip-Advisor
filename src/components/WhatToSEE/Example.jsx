import { useState } from 'react';
import { useSprings, animated, to as interpolate } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';
import india from "../../assets/India-1.jpg"
import Himalayas from "../../assets/Himalayas-India-scaled.jpg"
import jaipur from "../../assets/jaipur-city-palace-1.jpg";
import TajMahal from "../../assets/TajMahal.jpg";
import Ganga from "../../assets/Ganga-Aarti-ceremony-in-Rishikesh.jpg";
import jodhpur from "../../assets/jodhpur.jpg";
import kerala from "../../assets/kerala.jpg";
import forts from "../../assets/forts.jpg";
import './Stack.css';

const cards = [
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

const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});
const from = () => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });

const trans = (r, s) =>
  `rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

function Stack() {
  const [gone] = useState(() => new Set());
  const [props, api] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  }));
  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2;
      const dir = xDir < 0 ? -1 : 1;
      if (!down && trigger) gone.add(index);
      api.start((i) => {
        if (index !== i) return;
        const isGone = gone.has(index);
        const x = isGone
          ? (200 + window.innerWidth) * dir
          : down
            ? mx
            : 0;
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!down && gone.size === cards.length)
        setTimeout(() => {
          gone.clear();
          api.start((i) => to(i));
        }, 600);
    }
  );
  return (
    <>
    <h1 className='heading'>Experience the Love and Joy of India</h1>
    <div className="Stack-what">
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div className='stack' key={i} style={{ x, y }}>
          {/* Update the card content to display whatever you want */}
          <animated.div
            {...bind(i)}
             style={{
              transform: interpolate([rot, scale], trans),
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '600px',
              height: '600px',
              border: '1px solid  #ffffff4c',
              borderRadius: '10px',
              fontSize: '90px', // Adjust font size as needed
              fontWeight: 'bold',
            }}
          >
            {cards[i].imgSrc && (
              <img
                src={cards[i].imgSrc}
                alt={cards[i].title}
                style={{ width: '60%', height: '70%', objectFit: 'cover' }}
              />
            )}
            <div className='image-desc'>
                <h3>{cards[i].title}</h3>
                <p>{cards[i].description}</p>
            </div>
            
          </animated.div>
        </animated.div>
      ))}
    </div>
    </>
  );
}

export default Stack;
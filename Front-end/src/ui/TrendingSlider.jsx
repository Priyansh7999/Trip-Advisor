
import React , { useEffect, useState } from 'react'
import styles from  "./TrendingSlider.module.css"
import { useNavigate } from 'react-router-dom';
export default function TrendingSlider({cards,text}) {
  const [loaded, setLoaded] = useState(false);
  const navigate=useNavigate();
  useEffect(() => {
    if (cards && cards.length > 0) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [cards]);
  return (
    <>
      <div className={styles["card-container"]}>
      {loaded ? (
          cards.map((item, index) => (
            <div key={index} className={styles["homepage-card"]}>
              <img src={item.src} alt={item.title} />
              <div className={styles["card-title"]}>
                <h2>{item.title}</h2>
                <p>{item.des}</p>
                <div className={styles["explore"]}>
                  <button onClick={() => (navigate(`/${text}/${item.title}`))}>
                    Explore {item.title}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1 style={{ color: 'black' }}>Loading...</h1>
        )}
        <div className={styles['see-more']}>
          {loaded? <button class="glow-on-hover" type="button" onClick={() => {
            text==='city' ? navigate(`/cities`) : navigate(`/places`)
          }}>SEE MORE</button> : null}
        </div>
      </div>
    </>
  )
}
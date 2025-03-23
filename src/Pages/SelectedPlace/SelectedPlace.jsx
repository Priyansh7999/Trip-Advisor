import React, { useEffect } from 'react'
import CityMap from '../../components/CityMap/CityMap'
import styles from "../SelectedCity/SelectedCity.module.css";
export default function SelectedPlace() {
    const latitude = 25.424120; 
    const longitude = 77.657990;
    useEffect(() => {
      window.scrollTo(0, 0);
    },[])
  return (
    <div className={styles["selected-city-container"]} id='selected-city-container'>
      <div className={styles["selected-city-header"]} id='selected-city-header'>
        <div className={styles["selected-city-image"]} id='selected-city-image'>
          <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/40/a3/7d/cartoline-da-gwalior.jpg?w=1400&h=800&s=1" alt="" />
        </div>
        <div className={styles["selected-city-name"]} id='selected-city-name'>
          <h1>Gwalior Fort,Gwalior</h1>
        </div>
        <div className={styles["selected-place-desc"]} id='selected-place-desc'>
          <p>A Majestic Hilltop Citadel</p>
        </div>
      </div>
      <div className={styles["selected-city-overview"]} id='selected-city-overview'>
        <h1>Overview</h1>
        {/* City title history card */}
        <div className={styles["city-name-title-history-card"]} id='selected-city-name-title-history-card'>
          <h2>History</h2>
          <p>The majestic Gwalior Fort, one of India's architectural treasures, towers above Gwalior city on a hilltop. Constructed by leaders of the Kachchhapaghata dynasty during ancient times around the 8th century A.D., this fort is proof of their ability to cultivate visionaries who understood greatness as well as wielded power.
            Throughout its many centuries of existence, the Gwalior Fort has withstood numerous trials, from times of prosperity under ruling dynasties like the Tomaras or Mughals to periods of decline endured under others like the Marathas or Scindias. Despite these chaotic shifts in power over time, though, they�ve each forged a unique element concerning both their architectural design and overall feel. Spreading across an expanse exceeding 3 sq km, this majestic fortress is characterised by imposing walls that tower above everything else in sight, along with intricate carvings meticulously scribed throughout. The fort's main entrance, known as the Hathi Pol, or Elephant Gate, greets visitors with its massive dimensions and ornate design.</p>
          <div className={styles["selected-city-card"]} id='selected-city-card'>
            <table>
              <tr>
                <th>City</th>
                <td>Gwalior</td>
              </tr>
              <tr>
                <th>State</th>
                <td>Madhya Pradesh</td>
              </tr>
              <tr>
                <th>What To Expect?</th>
                <td>Large domes and carved walls welcome you to the fort. A light show is set up every evening for visitors at the amphitheatre of Man Mandir Palace showing fort history and love story of Raja Man Singh and his wife. </td>
              </tr>
              <tr>
                <th>Suggested Duration</th>
                <td>2 to 3 Hours</td>
              </tr>
              <tr>
                <th>Highlights</th>
                <td>Imposing walls, intricate carvings, and a massive entrance</td>
              </tr>
              <tr>
                <th>Timings</th>
                <td>Open daily from 6:30 AM to 12:00 PM and 1:00 PM to 6:00 PM.</td>
              </tr>
              <tr>
                <th>Entry Fee</th>
                <td>No entry fee is required to visit the temple.</td>
              </tr>
              <tr>
                <th>Restricted Items</th>
                <td>Drones, alcohol, smoking, food, beverages, large backpacks, fireworks, and pets are not allowed in the fort.</td>
              </tr>
            </table>
          </div>
        </div>
        <h2>More About Gwalior Fort</h2>
        <p>Gwalior Fort, located in Gwalior, symbolises not only a magnificent architectural gem but also a reflection of this region's culturally vibrant past. It comprises two parts the lower fort, or Man Singh Palace, and the upper fort which embraces Gurjari Mahal, a timeless masterpiece erected under Raja Man Singh Tomar's supervision.

One of the prominent features of the fort is the imposing Teli ka Mandir, a 9th-century temple dedicated to Lord Vishnu. The fort has seen battles, conquests, and sieges, leaving behind a legacy of valour and bravery. One of the notable events in its history is the imprisonment of the famous musician and saint, Tansen, in the fort during the reign of Emperor Akbar.</p>
      </div>
      <div className={styles["selected-city-what-to-see-and-do"]} id='selected-city-what-to-see-and-do'>
        <h2>Best Time to Visit Gwalior Fort</h2>
        <p>The best time to visit Gwalior Fort is from October to March, as the weather during this period is generally pleasant and favourable for exploring the fort and its surroundings. Visiting Gwalior Fort during the winter months allows you to explore the historical site comfortably and expect a vibrant atmosphere with the opportunity to engage in various cultural events and festivals that take place in Gwalior during this period.</p>
      </div>
      <div className={styles["selected-city-how-to-reach"]} id='selected-city-how-to-reach'>
        <div className={styles["selected-city-transport-map"]} id='selected-city-transport-map'>
          <div className={styles.transport}>
          <h1>How to Reach Gwalior Fort</h1>
            <div className={styles["by-air"]}>
              <h2>By Air</h2>
              <p>The nearest airport is Gwalior Airport.</p>
            </div>
            <div className={styles["by-train"]}>
              <h2>By Rail</h2>
              <p> utilising regular train services that originate from major cities like Delhi, Mumbai, Kolkata, Jaipur, and Bhopal straight into Gwalior Railway Station gives choices depending on specific travel needs. From the railway station, you can hire a taxi, auto-rickshaw, or use public transportation to reach Gwalior Fort, which is around 3 km away.</p>
            </div>
            <div className={styles["by-road"]}>
              <h2>By Road</h2>
              <p>Embarking on a journey by road comes with its own unique set of experiences, unrivalled by any other mode of transport. For those with access to a car or bus, several recommended national/ state highway routes lead directly into Gwalior</p>  
            </div>
          </div>
          <div className={styles.map} id='map'>
          <CityMap latitude={latitude} longitude={longitude} />
          </div>
        </div>
      </div>
      <div className={styles["selected-place-tips"]} id='selected-place-tips'>
        <h2>Tips to Visit Gwalior Fort</h2>
        <ul>
            <li>The fort also has a small pond inside.</li>
            <li>Shahjahan Mahal and Jehangir Mahal, within the fort premises, are also worth a visit.</li>
            <li>Chaturbhuj Temple here is believed to have the oldest inscription of zero on its wall.</li>
            <li>Other monuments within the fort complex worth visiting: Karn Mahal, Vikram Mahal, Hathi Pol etc.</li>
        </ul>
      </div>
      

    </div>
  )
}

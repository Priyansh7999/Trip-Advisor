import React, { useState, useEffect } from "react";
import styles from "./UserReviews.module.css";

export default function UserReviews() {
  // Mock User Data (Replace with actual user authentication)
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
  };

  // State to store reviews
  const [reviews, setReviews] = useState([]);

  // Function to fetch reviews from backend

  // const fetchReviews = async () => {
  //   try {
  //     // Define API endpoint
  //     const apiUrl = "/api/getUserReviews";
  
  //     // Prepare request payload (sending user details)
  //     const requestBody = {
  //       name: user.name,
  //       email: user.email,
  //     };
  
  //     // Make API request
  //     const response = await fetch(apiUrl, {
  //       method: "POST", // Using POST since we're sending data
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(requestBody),
  //     });
  
  //     // Parse response
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch reviews");
  //     }
  
  //     const data = await response.json(); // Assuming response is JSON
  
  //     // Set reviews in state
  //     setReviews(data.reviews); // Assuming backend returns { reviews: [...] }
  //   } catch (error) {
  //     console.error("Error fetching reviews:", error);
  //   }
  // };
  
  const fetchReviews = async () => {
    try {
      // Simulating a backend API call (Replace with real API)
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve([
              {
                place: "Eiffel Tower",
                comment: "An amazing experience! Must visit!",
                date: "2024-02-15",
              },
              {
                place: "Grand Canyon",
                comment: "Breathtaking views, unforgettable!",
                date: "2023-11-05",
              },
              {
                place: "Taj Mahal",
                comment: "The most beautiful monument I have ever seen.",
                date: "2022-08-20",
              },
            ]),
          1000
        )
      );

      setReviews(response);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // Fetch reviews when component mounts
  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className={styles.reviewsContainer}>
      <h1>My Reviews</h1>
      <p>Here are the reviews you've made on different places.</p>

      {/* Display Reviews */}
      {reviews.length === 0 ? (
        <p className={styles.noReviews}>No reviews yet.</p>
      ) : (
        <ul className={styles.reviewsList}>
          {reviews.map((review, index) => (
            <li key={index} className={styles.reviewItem}>
              <h3>{review.place}</h3>
              <p className={styles.comment}>"{review.comment}"</p>
              <p className={styles.date}>📅 {review.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

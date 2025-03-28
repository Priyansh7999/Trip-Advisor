import React, { useState } from "react";
import styles from "./UserProfile.module.css";
import profileImage from "./user.png"; // Replace with actual image path

export default function UserProfile() {
  // Mock user data
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    city: "New York",
    state: "NY",
    phone: "+1 234 567 890",
    profilePic: profileImage,
  });

  // Editable State
  const [editMode, setEditMode] = useState({
    name: false,
    city: false,
    state: false,
    phone: false,
  });

  // Function to enable editing for a field
  const handleEdit = (field) => {
    setEditMode({ ...editMode, [field]: true });
  };

  // Function to save changes
  const handleSave = (field) => {
    setEditMode({ ...editMode, [field]: false });
  };

  // Handle Input Change
  const handleChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  return (
    <div className={styles.profileContainer}>
      <h1>My Profile</h1>
      <p>Update your personal details to keep your profile up to date.</p>

      <div className={styles.profileInfo}>
        {/* Profile Image */}
        <div className={styles.profileImageSection}>
          <img src={user.profilePic} alt="User Profile" className={styles.profilePic} />
        </div>

        {/* Profile Details */}
        <div className={styles.detailsSection}>
          <div className={styles.detailItem}>
            <label>Name:</label>
            {editMode.name ? (
              <input
                type="text"
                value={user.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            ) : (
              <span>{user.name}</span>
            )}
            {editMode.name ? (
              <button className={styles.saveButton} onClick={() => handleSave("name")}>Save</button>
            ) : (
              <button className={styles.editButton} onClick={() => handleEdit("name")}>Edit</button>
            )}
          </div>

          <div className={styles.detailItem}>
            <label>Email:</label>
            <span>{user.email} (Cannot be changed)</span>
          </div>

          <div className={styles.detailItem}>
            <label>City:</label>
            {editMode.city ? (
              <input
                type="text"
                value={user.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
            ) : (
              <span>{user.city}</span>
            )}
            {editMode.city ? (
              <button className={styles.saveButton} onClick={() => handleSave("city")}>Save</button>
            ) : (
              <button className={styles.editButton} onClick={() => handleEdit("city")}>Edit</button>
            )}
          </div>

          <div className={styles.detailItem}>
            <label>State:</label>
            {editMode.state ? (
              <input
                type="text"
                value={user.state}
                onChange={(e) => handleChange("state", e.target.value)}
              />
            ) : (
              <span>{user.state}</span>
            )}
            {editMode.state ? (
              <button className={styles.saveButton} onClick={() => handleSave("state")}>Save</button>
            ) : (
              <button className={styles.editButton} onClick={() => handleEdit("state")}>Edit</button>
            )}
          </div>

          <div className={styles.detailItem}>
            <label>Phone Number:</label>
            {editMode.phone ? (
              <input
                type="text"
                value={user.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            ) : (
              <span>{user.phone}</span>
            )}
            {editMode.phone ? (
              <button className={styles.saveButton} onClick={() => handleSave("phone")}>Save</button>
            ) : (
              <button className={styles.editButton} onClick={() => handleEdit("phone")}>Edit</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

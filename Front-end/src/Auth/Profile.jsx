import React, { useEffect, useState, useContext } from "react";
import { auth, db } from "../Firebase/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import styles from "./Profile.module.css";
import { toast } from 'react-toastify';
import { TripPlannerContext } from "../context";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: ""
  });
  const [errors, setErrors] = useState({});
  const { authenticated, setAuthenticated, userProfilename, setUserProfilename } = useContext(TripPlannerContext);
  console.log("Initial profile values:", userProfilename, authenticated);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setAuthenticated(true);
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserDetails(userData);
          const profileName = userData.firstName || userData.email.split('@')[0];
          setUserProfilename(profileName);
          
          setEditedData({
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            phoneNumber: userData.phoneNumber || ""
          });
        } else {
          console.log("User data not found");
        }
      } else {
        // Set auth state to false when no user is logged in
        setAuthenticated(false);
        setUserProfilename('');
        console.log("User is not logged in");
      }
    });
  };

  // IMPORTANT FIX: Run fetchUserData only once when component mounts
  useEffect(() => {
    console.log("Profile component mounted, fetching user data");
    fetchUserData();
    
    // Return a cleanup function
    return () => {
      console.log("Profile component unmounted");
    };
  }, []); // Empty dependency array

  // Separate effect for logging context changes
  useEffect(() => {
    console.log("Context values changed - profile " + userProfilename, authenticated);
  }, [userProfilename, authenticated]);

  async function handleLogout() {
    try {
      await auth.signOut();
      // Update authentication state in context
      setAuthenticated(false);
      setUserProfilename('');
      console.log("Logged out: profile values reset to:", "", false);
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  const handleEditToggle = () => {
    if (isEditing) {
      setEditedData({
        firstName: userDetails.firstName || "",
        lastName: userDetails.lastName || "",
        phoneNumber: userDetails.phoneNumber || ""
      });
    }
    setIsEditing(!isEditing);
    setErrors({});
  };

  const handleInputChange = (e) => {           
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Phone number validation - must be exactly 10 digits
    if (editedData.phoneNumber && !/^\d{10}$/.test(editedData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = async () => {
    if (!validateForm()) return;
    
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        await updateDoc(docRef, {
          firstName: editedData.firstName,
          lastName: editedData.lastName,
          phoneNumber: editedData.phoneNumber
        });
        
        // Update local state
        setUserDetails({
          ...userDetails,
          firstName: editedData.firstName,
          lastName: editedData.lastName,
          phoneNumber: editedData.phoneNumber
        });
        
        // Update the user profile name in the context when saved
        const updatedProfileName = editedData.firstName || userDetails.email.split('@')[0];
        setUserProfilename(updatedProfileName);
        console.log("Profile updated: profile name =", updatedProfileName, "authenticated =", true);
        
        toast.success("Profile updated successfully", {
          position: "top-center"
        });
        
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile", {
        position: "top-center"
      });
    }
  };

  return (
    <div className={styles.profileContainer}>
      {userDetails ? (
        <>
          <div className={styles.headerSection}>
            <h3 className={styles.welcomeHeader}>
              Welcome {userDetails.firstName || userDetails.email.split('@')[0]} 🙏
            </h3>
            {!isEditing && (
              <button 
                className={styles.editButton} 
                onClick={handleEditToggle}
              >
                Edit Profile
              </button>
            )}
          </div>
          
          {isEditing ? (
            <div className={styles.editForm}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={editedData.firstName}
                  onChange={handleInputChange}
                  className={styles.formInput}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={editedData.lastName}
                  onChange={handleInputChange}
                  className={styles.formInput}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Phone Number:</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={editedData.phoneNumber}
                  onChange={handleInputChange}
                  className={`${styles.formInput} ${errors.phoneNumber ? styles.inputError : ''}`}
                  placeholder="10-digit phone number"
                />
                {errors.phoneNumber && (
                  <span className={styles.errorText}>{errors.phoneNumber}</span>
                )}
              </div>
              
              <div className={styles.actionButtons}>
                <button 
                  className={styles.saveButton} 
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
                <button 
                  className={styles.cancelButton} 
                  onClick={handleEditToggle}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.userInfo}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Email:</span>
                <span className={styles.infoValue}>{userDetails.email}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>First Name:</span>
                <span className={styles.infoValue}>
                  {userDetails.firstName || userDetails.email.split('@')[0]}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Last Name:</span>
                <span className={styles.infoValue}>
                  {userDetails.lastName || '—'}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Phone Number:</span>
                <span className={styles.infoValue}>
                  {userDetails.phoneNumber || '—'}
                </span>
              </div>
            </div>
          )}
          
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <div className={styles.loadingContainer}>
          <p className={styles.loadingText}>Loading</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
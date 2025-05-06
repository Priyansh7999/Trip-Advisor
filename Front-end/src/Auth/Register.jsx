import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth, db } from '../Firebase/Firebase';
import {setDoc,doc} from 'firebase/firestore';
import { toast } from 'react-toastify';
import styles from './Register.module.css';
import SignInWithGoogle from './signInWithGoogle';
export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          const user = auth.currentUser;
          console.log(user);
          if(user){
            await setDoc(doc(db, "Users", user.uid), {
                email: user.email,
                firstName: fname,
                lastName: lname,
                photo:"",
                phoneNumber:""
              });
          }
          console.log("User registered successfully");
          toast.success("User registered successfully",{
            position: "top-center"
          });
        } catch (error) {
            console.log(error);
            toast.error(error.message,{
                position: "top-center"
              });
        }
    }
  return (
    <form onSubmit={handleRegister} className={styles.formContainer}>
    <h3>Sign Up</h3>
  
    <div className={styles["mb-3"]}>
      <label>First name</label>
      <input
        type="text"
        className={styles["form-control"]}
        placeholder="First name"
        onChange={(e) => setFname(e.target.value)}
        required
      />
    </div>
  
    <div className={styles["mb-3"]}>
      <label>Last name</label>
      <input
        type="text"
        className={styles["form-control"]}
        placeholder="Last name"
        onChange={(e) => setLname(e.target.value)}
      />
    </div>
  
    <div className={styles["mb-3"]}>
      <label>Email address</label>
      <input
        type="email"
        className={styles["form-control"]}
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>
  
    <div className={styles["mb-3"]}>
      <label>Password</label>
      <input
        type="password"
        className={styles["form-control"]}
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
  
    <div className={styles["d-grid"]}>
      <button type="submit" className={styles["btn-primary"]}>
        Sign Up
      </button>
    </div>
    <SignInWithGoogle />
    
    <p className={`${styles["forgot-password"]} ${styles["text-right"]}`}>
      Already registered? <a href="/login">Login</a>
    </p>
  </form>
  )
}

import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react'
import { auth } from '../Firebase/Firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import SignInWithGoogle from './signInWithGoogle';
export default function Login() {
    const navigate=useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      navigate("/profile");
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);

      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h3>Login</h3>

      <div>
        <label className={styles.label}>Email address</label>
        <input
          type="email"
          className={styles.inputField}
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className={styles.label}>Password</label>
        <input
          type="password"
          className={styles.inputField}
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" className={styles.button}>
        Submit
      </button>
    <SignInWithGoogle />
      <p className={styles.forgotPassword}>
        New user? <a href="/register">Register Here</a>
      </p>
    </form>
  );
}
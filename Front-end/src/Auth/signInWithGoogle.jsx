import React, { useContext } from 'react';
import googleLogo from '../assets/google.png';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../Firebase/Firebase';
import { toast } from 'react-toastify';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { TripPlannerContext } from '../context';
import { useNavigate } from 'react-router-dom';

export default function SignInWithGoogle() {
    const { setAuthenticated, setUserProfilename } = useContext(TripPlannerContext);
    const navigate = useNavigate();
    
    async function googleLogin() {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            
            if (user) {
                // Check if user document already exists
                const userDocRef = doc(db, "Users", user.uid);
                const userDocSnap = await getDoc(userDocRef);
                
                if (!userDocSnap.exists()) {
                    // Create new user document if it doesn't exist
                    await setDoc(userDocRef, {
                        email: user.email,
                        firstName: user.displayName,
                        photo: user.photoURL,
                        lastName: "",
                        phoneNumber: ""
                    });
                }
                
                // Update context state
                setAuthenticated(true);
                setUserProfilename(user.displayName || user.email.split('@')[0]);
                
                toast.success("User logged in Successfully", {
                    position: "top-center",
                });
                
                // Use navigate instead of direct location change
                navigate("/profile");
            }
        } catch (error) {
            console.error("Google login error:", error);
            toast.error(error.message, {
                position: "bottom-center",
            });
        }
    }
    
    return (
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <div style={{ margin: '10px 0', color: '#666' }}>-- Or continue with --</div>
                <img 
                    src={googleLogo} 
                    alt="Google"
                    style={{ height: '50%', width: '50%' }}
                    onClick={googleLogin}
                />
        </div>
    );
}
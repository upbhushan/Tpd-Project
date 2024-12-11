import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const auth = getAuth(app); 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });

        try {
            // Use signInWithPopup to handle sign-in
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Send user info to your backend (optional)
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: user.displayName,
                    email: user.email,
                    googlePhotoUrl: user.photoURL,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                // Dispatch Redux action and navigate on success
                dispatch(signInSuccess(data));
                navigate('/');
            } else {
                // Handle unsuccessful authentication
                console.error("Authentication failed", data);
            }
        } catch (error) {
            // Catch and log errors
            console.error("Google sign-in error: ", error);
        }
    };

    return (
        <Button type="button" gradientDuoTone="pinkToOrange" outline onClick={handleGoogleClick}>
            <AiFillGoogleCircle className="w-6 h-6 mr-2" />
            Continue with Google
        </Button>
    );
}

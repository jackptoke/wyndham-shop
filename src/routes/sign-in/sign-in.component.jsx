import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utility/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      const userDocRef = await createUserDocumentFromAuth(user);
      console.log(userDocRef);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>SignIn</h1>
      <button onClick={logGoogleUser}>Sign In with Google Popup</button>
    </div>
  );
};

export default SignIn;

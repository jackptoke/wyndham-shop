import {
  /* auth, */
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utility/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

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
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default SignIn;

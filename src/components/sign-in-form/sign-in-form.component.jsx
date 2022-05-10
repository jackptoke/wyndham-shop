import { /*useContext, */ useState } from "react";
import Button from "../button/button.component";
// import { UserContext } from "../../contexts/user.context";

import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import {
  signInWithUsersEmailAndPassword,
  signInWithGooglePopup,
} from "../../utility/firebase/firebase.utils";

const defaultSignInFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultSignInFormFields);
  const { email, password } = formFields;

  // const { setCurrentUser } = useContext(UserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultSignInFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { user } = await signInWithUsersEmailAndPassword(email, password);
      // setCurrentUser(user);
      console.log(user);
      resetFormFields();
    } catch (err) {
      switch (err.code) {
        case "auth/wrong-password":
          alert("Incorrect password provided.");
          break;
        case "auth/user-not-found":
          alert("No user associated with this email.");
          break;
        default:
          console.log("Error signing in.  ", err);
      }
    }
  };

  console.log(formFields);

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in</span>
      <form onSubmit={onSubmitHandler}>
        <FormInput
          label="Email"
          type="text"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit" buttonType="submit">
            Sign In
          </Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

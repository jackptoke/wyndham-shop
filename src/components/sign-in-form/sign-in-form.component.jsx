import { /*useContext, */ useState } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
// import { UserContext } from "../../contexts/user.context";
import { useNavigate } from "react-router-dom";

import FormInput from "../form-input/form-input.component";
import {
  signInWithUsersEmailAndPassword,
  signInWithGooglePopup,
} from "../../utility/firebase/firebase.utils";

import {
  SignInContainer,
  SignInH2,
  ButtonsContainer,
} from "./sign-in-form.styles";

const defaultSignInFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultSignInFormFields);
  const { email, password } = formFields;
  const navigate = useNavigate();
  // const { setCurrentUser } = useContext(UserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultSignInFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();

    user.accessToken && navigate("/");
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { user } = await signInWithUsersEmailAndPassword(email, password);
      // setCurrentUser(user);

      user.accessToken && navigate("/");
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

  return (
    <SignInContainer>
      <SignInH2>Already have an account?</SignInH2>
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
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< Updated upstream
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utility/firebase/firebase.utils";
=======
import { useDispatch } from "react-redux";
// import { useDispatch } from "react-redux";
// import { setCurrentUser } from "../../store/user/user.action";

import { signUpStart } from "../../store/user/user.action";

import /*createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,*/
"../../utility/firebase/firebase.utils";
>>>>>>> Stashed changes

import FormInput from "../form-input/form-input.component";

import { UserContext } from "../../contexts/user.context";

import Button from "../button/button.component";

import { SignUpContainer, SignUpH2 } from "./sign-up-form.styles";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  cPassword: "",
};

const SignUpForm = () => {
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, cPassword } = formFields;
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (password !== cPassword) {
      alert("Passwords do not match");
      return;
    } else {
      try {
        dispatch(signUpStart(email, password, displayName));
        // const { user } = await createAuthUserWithEmailAndPassword(
        //   email,
        //   password
        // );

        // user.displayName = displayName;
        // await createUserDocumentFromAuth(user, {
        //   displayName,
        // });

<<<<<<< Updated upstream
        setCurrentUser(user);
        user.accessToken && navigate("/");

=======
        // dispatch(setCurrentUser(user));
>>>>>>> Stashed changes
        resetFormFields();
      } catch (err) {
        if (err.code === "auth/email-already-in-use") {
          alert("Cannot create user, email already in use");
        } else console.log("Error creating user. ", err);
      }
    }
  };

  return (
    <SignUpContainer>
      <SignUpH2>Don't have an account?</SignUpH2>
      <span>Sign up with your email and password</span>
      <form onSubmit={onSubmitHandler}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
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

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="cPassword"
          value={cPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;

import { useState } from "react";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import { signInWithUsersEmailAndPassword } from "../../utility/firebase/firebase.utils";

const defaultSignInFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultSignInFormFields);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultSignInFormFields);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { user } = await signInWithUsersEmailAndPassword(email, password);
      console.log(user);
    } catch (err) {
      console.log("Error signing in.  ", err);
    }

    resetFormFields();
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
        <Button type="submit">Sign In</Button>
      </form>
    </div>
  );
};

export default SignInForm;

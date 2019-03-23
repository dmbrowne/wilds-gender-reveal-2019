import * as React from "react";
import { useState } from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import cx from "classnames";

import { validateDisplayName, validatePassword, validateEmail } from "./sign-up-utils";
import styles from "./sign-up-form.module.css";
import { getFirebaseAuth } from "../../firebase";

interface IProps {
  onSubmit: (email: string, password: string, displayName: string) => any;
}

function SignUpForm({ onSubmit }: IProps) {
  const [submitted, setSubmitted] = useState(false);
  const [displayName, updateDisplayName] = useState("");
  const [password, updatePassword] = useState("");
  const [email, updateEmail] = useState("");
  const [emailReset, updateResetEmail] = useState("");
  const [passwordResetView, setPasswordResetView] = useState(false);
  const [passwordResetSent, setPasswordResetSent] = useState(false);

  const handleInputChange = (cb: (value: string) => any) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSubmitted(false);
    cb(e.target.value);
  };

  const errors = {
    displayName: validateDisplayName(displayName),
    password: validatePassword(password),
    email: validateEmail(email)
  };

  const handleSubmit = () => {
    if (passwordResetView) {
      getFirebaseAuth()
        .sendPasswordResetEmail(emailReset)
        .then(() => setPasswordResetSent(true));
      return;
    }

    setSubmitted(true);
    const hasError = Object.entries(errors).some(([_, err]) => !!err);
    if (hasError) {
      return;
    }
    onSubmit(email, password, displayName);
  };

  return (
    <div className={styles.signUpFormContainer}>
      <div className={cx(styles.formTypeSwitcher, { [styles.switch]: passwordResetView })}>
        <div>
          <TextField
            required
            fullWidth
            margin="dense"
            label="Email"
            type="email"
            helperText={
              submitted && errors.email
                ? errors.email
                : "Only used if you forget your password!"
            }
            value={email}
            onChange={handleInputChange(updateEmail)}
            error={submitted && !!errors.email}
          />
          <TextField
            required
            fullWidth
            margin="dense"
            label="Display Name"
            value={displayName}
            onChange={handleInputChange(updateDisplayName)}
            helperText={submitted && errors.displayName}
            error={submitted && !!errors.displayName}
          />
          <TextField
            required
            fullWidth
            margin="dense"
            label="Password"
            type="password"
            value={password}
            onChange={handleInputChange(updatePassword)}
            helperText={submitted && errors.password}
            error={submitted && !!errors.password}
          />
        </div>
        <div>
          {passwordResetSent ? (
            <Typography>
              Password reset instructions have been sent to the email address provided
            </Typography>
          ) : (
            <>
              <Button size="small" onClick={() => setPasswordResetView(false)}>
                I remember! go back
              </Button>
              <TextField
                required
                fullWidth
                margin="normal"
                label="Email"
                type="email"
                helperText="An email will be sent with reset instructions"
                value={emailReset}
                onChange={handleInputChange(updateResetEmail)}
              />
            </>
          )}
        </div>
      </div>
      <div className={styles.button}>
        <Button
          variant="text"
          size="small"
          color="primary"
          disabled={passwordResetView}
          onClick={() => setPasswordResetView(true)}
        >
          I forgot my password
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {passwordResetView ? "Send" : "Join"}
        </Button>
      </div>
    </div>
  );
}

export default SignUpForm;

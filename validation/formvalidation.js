import * as Yup from 'yup'

export const signUpValidation = Yup.object({
  siteName: Yup.string()
    .min(3, "Site name must be at least 3 characcters")
    .max(50, "Site name can not be more than 10 characcters")
    .required("Site name is required"),

  email: Yup.string()
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .test(
      "is-strong",
      "Password is not strong",
      value =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)
    ),
});

export const loginValidation = signUpValidation.pick(["email", "password"]);
export const forgotPassValidation = signUpValidation.pick(["email"]);

export const passwordChangeValidation = Yup.object({
  password: signUpValidation.fields.password,
  confirmPass: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match")
    .required("Confirm password is required"),
});

export const otpValidation = Yup.object({
  otp: Yup.string()
    .required("OTP is required"),
});
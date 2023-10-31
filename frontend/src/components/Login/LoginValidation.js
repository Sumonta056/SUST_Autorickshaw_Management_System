function LoginValidation(values) {
  let error = {};
  // const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  //   Contains at least one digit (\d).
  // Contains at least one lowercase letter ([a-z]).
  // Contains at least one uppercase letter ([A-Z]).
  // Consists of alphanumeric characters (letters and digits) only ([0-9a-zA-Z]).
  // Has a minimum length of 8 characters ({8,}).

  if (values.email === "") {
    error.email = "অনুগ্রহ করে আপনার ইমেইল দিন";
  } else {
    error.email = "";
  }

  if (values.password === "") {
    error.password = "অনুগ্রহ করে আপনার পাসওয়ার্ড দিন";
  } else {
    error.password = "";
  }

  return error;
}

export default LoginValidation;

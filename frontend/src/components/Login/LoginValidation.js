function LoginValidation(values) {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
//   Contains at least one digit (\d).
// Contains at least one lowercase letter ([a-z]).
// Contains at least one uppercase letter ([A-Z]).
// Consists of alphanumeric characters (letters and digits) only ([0-9a-zA-Z]).
// Has a minimum length of 8 characters ({8,}).

  if (values.email === "") {
    error.email = "ইমেইল দিন !! ";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email is not a valid email";
  } else {
    error.email = "";
  }

  if (values.password === "") {
    error.password = "Password should not be empty";
  } else if (!password_pattern.test(values.password)) {
    error.password = "Password didnot match the criteria";
  } else {
    error.password = "";
  }


  return error;
}

export default LoginValidation;

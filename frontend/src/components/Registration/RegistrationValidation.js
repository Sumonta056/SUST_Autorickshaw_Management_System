function RegistrationValidation(values) {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

  // Do the validation
  if (values.name === "") {
    error.name = "অনুগ্রহ করে আপনার নাম দিন";
  } else {
    error.name = "";
  }

  if (values.email === "") {
    error.email = "অনুগ্রহ করে আপনার ইমেইল দিন";
  } else if (!email_pattern.test(values.email)) {
    error.email = "ইমেইলটি একটি বৈধ ইমেইল নয়";
  } else {
    error.email = "";
  }

  if (values.password === "") {
    error.password = "অনুগ্রহ করে আপনার পাসওয়ার্ড দিন";
  } else if (!password_pattern.test(values.password)) {
    error.password =
      "পাসওয়ার্ডে ১টি সংখ্যা, ১টি বড় হাতের লেটার, ১টি ছোট হাতের লেটার থাকতে হবে এবং সাইজ ৮ বা তার বেশি হতে হবে।";
  } else {
    error.password = "";
  }

  console.log(error);
  return error;
}

export default RegistrationValidation;

function AuthorityRegistrationValidation(formData) {
  let errors = {};

  const nid_pattern = /^\d{10}$/;
  const postal_code_pattern = /^\d{4}$/;
  const date_of_birth_pattern = /^\d{4}-\d{2}-\d{2}$/;
  const house_no_pattern = /[a-zA-Z0-9\s-]{5,}/;

  if (!formData.Authority_houseNo.match(house_no_pattern)) {
    errors.Authority_houseNo =
      "বর্তমান ঠিকানা সঠিক নয় (বাড়ির নাম, ব্লক নং এবং বাড়ি নং দিন)";
  } else {
    errors.Authority_houseNo = "";
  }

  if (!formData.Authority_nid.match(nid_pattern)) {
    errors.Authority_nid = "জাতীয় পরিচয়পত্র নম্বর সঠিক নয় (10-digit number).";
  } else {
    errors.Authority_nid = "";
  }

  if (
    isNaN(formData.Authority_postalCode) ||
    !formData.Authority_postalCode.match(postal_code_pattern)
  ) {
    errors.Authority_postalCode =
      "বর্তমান ঠিকানা : পোস্টাল কোড দিন (4-digit number).";
  } else {
    errors.Authority_postalCode = "";
  }

  if (formData.Authority_firstName.trim() === "") {
    errors.Authority_firstName =
      "ম্যানেজারের নাম (প্রথম অংশ) সঠিকভাবে প্রদান করুন.";
  } else {
    errors.Authority_firstName = "";
  }

  if (formData.Authority_lastName.trim() === "") {
    errors.Authority_lastName = "ম্যানেজারের নাম (শেষ অংশ) সঠিকভাবে প্রদান করুন.";
  } else {
    errors.Authority_lastName = "";
  }

  // Validate Birth Date
  if (!formData.Authority_date_of_birth.match(date_of_birth_pattern)) {
    errors.Authority_date_of_birth = "জন্ম তারিখ সঠিক নয় (YYYY-MM-DD).";
  } else {
    // Check if birth date is more than 100 years ago and not less than 14 years ago
    const birthDate = new Date(formData.Authority_date_of_birth);
    const currentDate = new Date();
    const minValidDate = new Date(currentDate);
    minValidDate.setFullYear(currentDate.getFullYear() - 100);
    const maxValidDate = new Date(currentDate);
    maxValidDate.setFullYear(currentDate.getFullYear() - 14);

    if (birthDate > maxValidDate || birthDate < minValidDate) {
      errors.Authority_date_of_birth =
        "জন্ম তারিখ সঠিক নয় (সর্বনিম্ন 14 এবং সর্বাধিক 100 বছর পূর্বে).";
    } else {
      errors.Authority_date_of_birth = "";
    }
  }

  if (formData.Authority_address.trim() === "") {
    errors.Authority_address = "আপনার জেলা বাছাই করুন.";
  } else {
    errors.Authority_address = "";
  }

  return errors;
}

export default AuthorityRegistrationValidation;

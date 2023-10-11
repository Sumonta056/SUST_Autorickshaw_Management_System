function OwnerRegistrationValidation(formData) {
  let errors = {};

  const nid_pattern = /^\d{10}$/;
  const postal_code_pattern = /^\d{4}$/;
  const trade_license_pattern = /^\d{18}$/;
  const insurance_pattern = /^\d{20}$/;
  const date_of_birth_pattern = /^\d{4}-\d{2}-\d{2}$/;
  const house_no_pattern = /[a-zA-Z0-9\s-]{5,}/;
  
  if (!formData.owner_houseNo.match(house_no_pattern)) {
    errors.owner_houseNo = "বর্তমান ঠিকানা সঠিক নয় (বাড়ির নাম, ব্লক নং এবং বাড়ি নং দিন)";
  } else {
    errors.owner_houseNo = "";
  }
  if (!formData.owner_tradeLicenseNo.match(trade_license_pattern)) {
    errors.owner_tradeLicenseNo = "ট্রেড লাইসেন্স নং সঠিক নয় (18-digit number).";
  } else {
    errors.owner_tradeLicenseNo = "";
  }
  if (!formData.owner_insuranceNo.match(insurance_pattern)) {
    errors.owner_insuranceNo = "ইনস্যুরেন্স নং সঠিক নয় (20-digit number).";
  } else {
    errors.owner_insuranceNo = "";
  }

  if (!formData.owner_nid.match(nid_pattern)) {
    errors.owner_nid = "জাতীয় পরিচয়পত্র নম্বর সঠিক নয় (10-digit number).";
  } else {
    errors.owner_nid = "";
  }

  if (isNaN(formData.owner_postalCode) || !formData.owner_postalCode.match(postal_code_pattern)) {
    errors.owner_postalCode = "বর্তমান ঠিকানা : পোস্টাল কোড দিন (4-digit number).";
  } else {
    errors.owner_postalCode = "";
  }

  if (formData.owner_firstName.trim() === "") {
    errors.owner_firstName = "মালিকের নাম (প্রথম অংশ) সঠিকভাবে প্রদান করুন.";
  } else {
    errors.owner_firstName = "";
  }

  if (formData.owner_lastName.trim() === "") {
    errors.owner_lastName = "মালিকের নাম (শেষ অংশ) সঠিকভাবে প্রদান করুন.";
  } else {
    errors.owner_lastName = "";
  }

  // Validate Birth Date
  if (!formData.owner_date_of_birth.match(date_of_birth_pattern)) {
    errors.owner_date_of_birth = "জন্ম তারিখ সঠিক নয় (YYYY-MM-DD).";
  } else {
    // Check if birth date is more than 100 years ago and not less than 14 years ago
    const birthDate = new Date(formData.owner_date_of_birth);
    const currentDate = new Date();
    const minValidDate = new Date(currentDate);
    minValidDate.setFullYear(currentDate.getFullYear() - 100);
    const maxValidDate = new Date(currentDate);
    maxValidDate.setFullYear(currentDate.getFullYear() - 14);

    if (birthDate > maxValidDate || birthDate < minValidDate) {
      errors.owner_date_of_birth = "জন্ম তারিখ সঠিক নয় (সর্বনিম্ন 14 এবং সর্বাধিক 100 বছর পূর্বে).";
    } else {
      errors.owner_date_of_birth = "";
    }
  }

  if (formData.owner_address.trim() === "") {
    errors.owner_address = "আপনার জেলা বাছাই করুন.";
  } else {
    errors.owner_address = "";
  }

  return errors;
}


export default OwnerRegistrationValidation;

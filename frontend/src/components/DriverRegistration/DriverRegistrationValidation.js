function DriverRegistrationValidation(formData) {
  let errors = {};

  const nid_pattern = /^\d{10}$/;
  const postal_code_pattern = /^\d{4}$/;
  const date_of_birth_pattern = /^\d{4}-\d{2}-\d{2}$/;
  const license_pattern = /^\d{15}$/; 
  const house_no_pattern = /\b[a-zA-Z]{4,}\s[a-zA-Z]{1,2}[-/]\d{1,3}\b/;

  if (!formData.driver_houseNo.match(house_no_pattern)) {
    errors.driver_houseNo = "বর্তমান ঠিকানা সঠিক নয়.";
  } else {
    errors.driver_houseNo = "";
  }

  if (!formData.driver_license_no.match(license_pattern)) {
      errors.driver_license_no = "ড্রাইভারের লাইসেন্স নম্বরটি সঠিক নয় (15-digit number)";
    } else {
      errors.driver_license_no = "";
    }

  
  if (!formData.driver_nid.match(nid_pattern)) {
    errors.driver_nid = "জাতীয় পরিচয়পত্র নম্বর সঠিক নয় (10-digit number).";
  } else {
    errors.driver_nid = "";
  }

  if (isNaN(formData.driver_postalCode) || !formData.driver_postalCode.match(postal_code_pattern)) {
    errors.driver_postalCode = "বর্তমান ঠিকানা : পোস্টাল কোড দিন (4-digit number).";
  } else {
    errors.driver_postalCode = "";
  }

  if (formData.driver_firstName.trim() === "") {
    errors.driver_firstName = "ড্রাইভারের নাম (প্রথম অংশ) সঠিকভাবে প্রদান করুন.";
  } else {
    errors.driver_firstName = "";
  }

  if (formData.driver_lastName.trim() === "") {
    errors.driver_lastName = "ড্রাইভারের নাম (শেষ অংশ) সঠিকভাবে প্রদান করুন.";
  } else {
    errors.driver_lastName = "";
  }

  // Validate Birth Date
  if (!formData.driver_date_of_birth.match(date_of_birth_pattern)) {
    errors.driver_date_of_birth = "জন্ম তারিখ সঠিক নয় (YYYY-MM-DD).";
  } else {
    // Check if birth date is more than 100 years ago and not less than 14 years ago
    const birthDate = new Date(formData.driver_date_of_birth);
    const currentDate = new Date();
    const minValidDate = new Date(currentDate);
    minValidDate.setFullYear(currentDate.getFullYear() - 100);
    const maxValidDate = new Date(currentDate);
    maxValidDate.setFullYear(currentDate.getFullYear() - 14);

    if (birthDate > maxValidDate || birthDate < minValidDate) {
      errors.driver_date_of_birth = "জন্ম তারিখ সঠিক নয় (সর্বনিম্ন 14 এবং সর্বাধিক 100 বছর পূর্বে).";
    } else {
      errors.driver_date_of_birth = "";
    }
  }

 
  if (formData.driver_address.trim() === "") {
    errors.driver_address = "আপনার জেলা বাছাই করুন.";
  } else {
    errors.driver_address = "";
  }

  return errors;
}


export default DriverRegistrationValidation;

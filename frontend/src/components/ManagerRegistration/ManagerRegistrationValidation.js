function ManagerRegistrationValidation(formData) {
  let errors = {};

  const nid_pattern = /^\d{10}$/;
  const postal_code_pattern = /^\d{4}$/;
  const date_of_birth_pattern = /^\d{4}-\d{2}-\d{2}$/;
  const house_no_pattern = /^[a-zA-Z0-9\/-]{1,20}$/;


  if (!formData.driver_houseNo.match(house_no_pattern)) {
    errors.driver_houseNo = "বর্তমান ঠিকানা : বাড়ি নং সঠিক নয়.";
  } else {
    errors.driver_houseNo = "";
  }

  if (!formData.manager_nid.match(nid_pattern)) {
    errors.manager_nid = "জাতীয় পরিচয়পত্র নম্বর সঠিক নয় (10-digit number).";
  } else {
    errors.manager_nid = "";
  }

  if (isNaN(formData.manager_postalCode) || !formData.manager_postalCode.match(postal_code_pattern)) {
    errors.manager_postalCode = "বর্তমান ঠিকানা : পোস্টাল কোড দিন (4-digit number).";
  } else {
    errors.manager_postalCode = "";
  }

  if (formData.manager_firstName.trim() === "") {
    errors.manager_firstName = "ম্যানেজারের নাম (প্রথম অংশ) সঠিকভাবে প্রদান করুন.";
  } else {
    errors.manager_firstName = "";
  }

  if (formData.manager_lastName.trim() === "") {
    errors.manager_lastName = "ম্যানেজারের নাম (শেষ অংশ) সঠিকভাবে প্রদান করুন.";
  } else {
    errors.manager_lastName = "";
  }

  // Validate Birth Date
  if (!formData.manager_date_of_birth.match(date_of_birth_pattern)) {
    errors.manager_date_of_birth = "জন্ম তারিখ সঠিক নয় (YYYY-MM-DD).";
  } else {
    // Check if birth date is more than 100 years ago and not less than 14 years ago
    const birthDate = new Date(formData.manager_date_of_birth);
    const currentDate = new Date();
    const minValidDate = new Date(currentDate);
    minValidDate.setFullYear(currentDate.getFullYear() - 100);
    const maxValidDate = new Date(currentDate);
    maxValidDate.setFullYear(currentDate.getFullYear() - 14);

    if (birthDate > maxValidDate || birthDate < minValidDate) {
      errors.manager_date_of_birth = "জন্ম তারিখ সঠিক নয় (সর্বনিম্ন 14 এবং সর্বাধিক 100 বছর পূর্বে).";
    } else {
      errors.manager_date_of_birth = "";
    }
  }

  if (formData.manager_address.trim() === "") {
    errors.manager_address = "আপনার জেলা বাছাই করুন.";
  } else {
    errors.manager_address = "";
  }

  return errors;
}


export default ManagerRegistrationValidation;

function driverRegistrationValidation(formData) {
  let errors = {};

  const nid_pattern = /^\d{10}$/; 
  const license_pattern = /^\d{15}$/; 
  const postal_code_pattern = /^\d{4}$/; 
  const date_of_birth_pattern = /^\d{4}-\d{2}-\d{2}$/;


  if (!formData.driver_nid.match(nid_pattern)) {
    errors.driver_nid = "জাতীয় পরিচয়পত্র নম্বর সঠিক নয় (10-digit number)";
  } else {
    errors.driver_nid = "";
  }
  
  if (!formData.driver_license_no.match(license_pattern)) {
    errors.driver_license_no = "ড্রাইভারের লাইসেন্স নম্বরটি সঠিক নয় (15-digit number)";
  } else {
    errors.driver_license_no = "";
  }

  if (isNaN(formData.driver_postalCode) || !formData.driver_postalCode.match(postal_code_pattern)) {
    errors.driver_postalCode = "বর্তমান ঠিকানা : পোস্টাল কোড দিন (4-digit number)";
  } else {
    errors.driver_postalCode = "";
  }

  if (!isNaN(formData.driver_name)) {
    errors.driver_name = "ড্রাইভারের নাম সঠিকভাবে প্রদান করুন";
  } else {
    errors.driver_name = "";
  }

  if (!formData.driver_date_of_birth.match(date_of_birth_pattern)) {
    errors.driver_date_of_birth = "জন্ম তারিখ সঠিক নয় (YYYY-MM-DD)";
  } else {
    errors.driver_date_of_birth = "";
  }

  if (formData.driver_houseNo.trim() === "") {
    errors.driver_houseNo = "বর্তমান ঠিকানা : বাড়ি নং দিন";
  } else {
    errors.driver_houseNo = "";
  }

  if (formData.driver_address.trim() === "") {
    errors.driver_address = "আপনার জেলা বাছাই করুন";
  } else {
    errors.driver_address = "";
  }

  return errors;
}

export default driverRegistrationValidation;

function managerRegistrationValidation(formData) {
  let errors = {};

  const nid_pattern = /^\d{10}$/; 
  const postal_code_pattern = /^\d{4}$/; 
  const date_of_birth_pattern = /^\d{4}-\d{2}-\d{2}$/;


  if (!formData.manager_nid.match(nid_pattern)) {
    errors.manager_nid = "জাতীয় পরিচয়পত্র নম্বর সঠিক নয় (10-digit number)";
  } else {
    errors.manager_nid = "";
  }
  

  if (isNaN(formData.manager_postalCode) || !formData.manager_postalCode.match(postal_code_pattern)) {
    errors.manager_postalCode = "বর্তমান ঠিকানা : পোস্টাল কোড দিন (4-digit number)";
  } else {
    errors.manager_postalCode = "";
  }

  if (!isNaN(formData.manager_name)) {
    errors.manager_name = "ড্রাইভারের নাম সঠিকভাবে প্রদান করুন";
  } else {
    errors.manager_name = "";
  }

  if (!formData.manager_date_of_birth.match(date_of_birth_pattern)) {
    errors.manager_date_of_birth = "জন্ম তারিখ সঠিক নয় (YYYY-MM-DD)";
  } else {
    errors.manager_date_of_birth = "";
  }

  if (formData.manager_houseNo.trim() === "") {
    errors.manager_houseNo = "বর্তমান ঠিকানা : বাড়ি নং দিন";
  } else {
    errors.manager_houseNo = "";
  }

  if (formData.manager_address.trim() === "") {
    errors.manager_address = "আপনার জেলা বাছাই করুন";
  } else {
    errors.manager_address = "";
  }

  return errors;
}

export default managerRegistrationValidation;

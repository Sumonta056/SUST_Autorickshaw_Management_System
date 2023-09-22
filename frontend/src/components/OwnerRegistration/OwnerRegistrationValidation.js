function OwnerRegistrationValidation(formData) {
  let errors = {};

  const nid_pattern = /^\d{10}$/; 
  const postal_code_pattern = /^\d{4}$/; 
  const date_of_birth_pattern = /^\d{4}-\d{2}-\d{2}$/;


  if (!formData.owner_nid.match(nid_pattern)) {
    errors.owner_nid = "জাতীয় পরিচয়পত্র নম্বর সঠিক নয় (10-digit number)";
  } else {
    errors.owner_nid = "";
  }

  if (isNaN(formData.owner_postalCode) || !formData.owner_postalCode.match(postal_code_pattern)) {
    errors.owner_postalCode = "বর্তমান ঠিকানা : পোস্টাল কোড দিন (4-digit number)";
  } else {
    errors.owner_postalCode = "";
  }

  if (!isNaN(formData.owner_name)) {
    errors.owner_name = "মালিকের নাম সঠিকভাবে প্রদান করুন";
  } else {
    errors.owner_name = "";
  }

  if (!formData.owner_date_of_birth.match(date_of_birth_pattern)) {
    errors.owner_date_of_birth = "জন্ম তারিখ সঠিক নয় (YYYY-MM-DD)";
  } else {
    errors.owner_date_of_birth = "";
  }

  if (formData.owner_houseNo.trim() === "") {
    errors.owner_houseNo = "বর্তমান ঠিকানা : বাড়ি নং দিন";
  } else {
    errors.owner_houseNo = "";
  }

  if (formData.owner_address.trim() === "") {
    errors.owner_address = "আপনার জেলা বাছাই করুন";
  } else {
    errors.owner_address = "";
  }

  return errors;
}

export default OwnerRegistrationValidation;

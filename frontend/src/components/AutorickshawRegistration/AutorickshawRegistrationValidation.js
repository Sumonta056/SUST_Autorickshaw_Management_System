function AutorickshawRegistrationValidation(formData, serverErrors) {
  const driver_nid_pattern = /^\d{10}$/; 
const owner_nid_pattern = /^\d{10}$/; 

  let errors = {};

  if (!formData.driver_nid.match(driver_nid_pattern)) {
    errors.driver_nid = "ড্রাইভারের জাতীয় পরিচয়পত্র নম্বর সঠিক নয় (10-digit number)";
  } else {
    errors.driver_nid = "";
  }

  if (formData.autorickshaw_number.trim() === "") {
    errors.autorickshaw_number = "অটোরিকশা নাম্বার দিন";
  }  else {
    errors.autorickshaw_number = "";
  }

  if (formData.autorickshaw_company.trim() === "") {
    errors.autorickshaw_company = "অটোরিকশা কোম্পানি দিন";
  } else {
    errors.autorickshaw_company = "";
  }

  if (formData.autorickshaw_model.trim() === "") {
    errors.autorickshaw_model = "অটোরিকশা মডেল দিন";
  } else {
    errors.autorickshaw_model = "";
  }

  if (!formData.owner_nid.match(owner_nid_pattern)) {
    errors.owner_nid = "মালিকের জাতীয় পরিচয়পত্র নম্বর সঠিক নয় (10-digit number)";
  } else {
    errors.owner_nid = "";
  }

  return errors;
}

export default AutorickshawRegistrationValidation;

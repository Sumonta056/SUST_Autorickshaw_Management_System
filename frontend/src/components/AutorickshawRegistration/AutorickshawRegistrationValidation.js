function AutorickshawRegistrationValidation(formData, serverErrors) {
  const driver_nid_pattern = /^\d{10}$/;
  const owner_nid_pattern = /^\d{10}$/;
  const vehicle_registration_number_pattern = /^[A-Z0-9]{1,10}$/; // Modify the pattern as needed
  const chassis_number_pattern = /^[A-Z0-9]{1,17}$/; // Modify the pattern as needed
  const engine_number_pattern = /^[A-Z0-9]{1,15}$/; // Modify the pattern as needed

  let errors = {};

  if (!formData.driver_nid.match(driver_nid_pattern)) {
    errors.driver_nid =
      "ড্রাইভারের জাতীয় পরিচয়পত্র নম্বর সঠিক নয় (10-digit number)";
  } else {
    errors.driver_nid = "";
  }

  if (formData.autorickshaw_number.trim() === "") {
    errors.autorickshaw_number = "অটোরিকশা নাম্বার দিন";
  } else {
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
    errors.owner_nid =
      "মালিকের জাতীয় পরিচয়পত্র নম্বর সঠিক নয় (10-digit number)";
  } else {
    errors.owner_nid = "";
  }

  if (
    !formData.vehicle_registration_number.match(
      vehicle_registration_number_pattern
    )
  ) {
    errors.vehicle_registration_number = "গাড়ির নিবন্ধন সংখ্যা সঠিক নয় (10-digit number)"; // Provide an appropriate error message
  } else {
    errors.vehicle_registration_number = "";
  }

  if (!formData.chassis_number.match(chassis_number_pattern)) {
    errors.chassis_number = "চেসিস সংখ্যা সঠিক নয় (17-digit number)"; // Provide an appropriate error message
  } else {
    errors.chassis_number = "";
  }

  if (!formData.engine_number.match(engine_number_pattern)) {
    errors.engine_number = "ইঞ্জিন সংখ্যা সঠিক নয় (15-digit number)"; // Provide an appropriate error message
  } else {
    errors.engine_number = "";
  }

  return errors;
}

export default AutorickshawRegistrationValidation;

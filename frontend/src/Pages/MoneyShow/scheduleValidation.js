function scheduleValidation(formData, serverErrors) {
  let errors = {};

  // Added fields
  if (formData.schedule_date.trim() === "") {
    errors.schedule_date = "তফসিল তারিখ দিন";
  } else {
    errors.schedule_date = "";
  }

  if (formData.schedule_round.trim() === "") {
    errors.schedule_round = "তফসিল রাউন্ড দিন";
  } else {
    errors.schedule_round = "";
  }

  if (formData.schedule_serial.trim() === "") {
    errors.schedule_serial = "তফসিল সিরিয়াল দিন";
  } else {
    errors.schedule_serial = "";
  }

  if (formData.schedule_time.trim() === "") {
    errors.schedule_time = "তফসিল সময় দিন";
  } else {
    errors.schedule_time = "";
  }

  if (formData.schedule_autorickshaw.trim() === "") {
    errors.schedule_autorickshaw = "তফসিল অটোরিকশা নাম্বার দিন";
  } else {
    errors.schedule_autorickshaw = "";
  }

  return errors;
}

export default scheduleValidation;

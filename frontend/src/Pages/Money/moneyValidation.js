function moneyValidation(formData) {
  let errors = {};

  // Validate date
  if (!formData.payment_date) {
    errors.payment_date = "তারিখ প্রদান করুন";
  } else {
    const selectedDate = new Date(formData.payment_date);
    const currentDate = new Date();

    if (
      selectedDate.getFullYear() !== currentDate.getFullYear() ||
      selectedDate.getMonth() !== currentDate.getMonth() ||
      selectedDate.getDate() !== currentDate.getDate()
    ) {
      errors.payment_date = "আজকের তারিখ নির্বাচন করুন";
    }
  }

  // Validate autorickshaw_number
  if (!formData.autorickshaw_number) {
    errors.autorickshaw_number = "অটোরিকশা নাম্বার নির্বাচন করুন";
  }

  // Validate driver_name
  if (!formData.driver_name) {
    errors.driver_name = "ড্রাইভারের নাম দিন";
  }

  // Validate driver_nid
  if (!formData.driver_nid) {
    errors.driver_nid = "ড্রাইভারের জাতীয় পরিচয়পত্র নম্বর দিন";
  }

  // Validate payment_amount
  if (!formData.payment_amount) {
    errors.payment_amount = "টাকার পরিমাণ দিন";
  } else if (!/^\d+$/.test(formData.payment_amount)) {
    errors.payment_amount = "টাকার পরিমাণ সংখ্যায় হতে হবে";
  }

  return errors;
}

export default moneyValidation;

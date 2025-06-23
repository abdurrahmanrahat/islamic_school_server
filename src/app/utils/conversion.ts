// Function to convert Bengali numbers to English numbers
export function convertBengaliToEnglishNumber(bengaliNumber: string) {
  return bengaliNumber.replace(/[০-৯]/g, function (digit) {
    return '০১২৩৪৫৬৭৮৯'.indexOf(digit).toString();
  });
}

// Function to convert English numbers to Bengali numbers
export function convertEnglishToBengaliNumber(englishNumber: string) {
  return englishNumber.replace(/[0-9]/g, function (digit) {
    return '০১২৩৪৫৬৭৮৯'[parseInt(digit)];
  });
}

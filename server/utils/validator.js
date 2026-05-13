// ================================
// EMAIL VALIDATOR
// ================================
export const emailRegex =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

// ================================
// PASSWORD VALIDATOR
// Minimum 8 chars
// 1 uppercase
// 1 lowercase
// 1 number
// 1 special character
// ================================
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// ================================
// INDIAN PHONE NUMBER
// +91XXXXXXXXXX or XXXXXXXXXX
// ================================
export const indianPhoneRegex =
  /^(?:\+91|91)?[6-9]\d{9}$/;

// ================================
// UAE PHONE NUMBER
// +971XXXXXXXXX or 05XXXXXXXX
// ================================
export const uaePhoneRegex =
  /^(?:\+971|971|0)?5\d{8}$/;

// ================================
// COMMON VALIDATION FUNCTIONS
// ================================
export const validateEmail = (email) => {
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return passwordRegex.test(password);
};

export const validateIndianPhone = (phone) => {
  return indianPhoneRegex.test(phone);
};

export const validateUAEPhone = (phone) => {
  return uaePhoneRegex.test(phone);
};

// Validate either India or UAE
export const validatePhoneNumber = (phone) => {
  return (
    indianPhoneRegex.test(phone) ||
    uaePhoneRegex.test(phone)
  );
};
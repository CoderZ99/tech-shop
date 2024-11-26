// Regex for username
const usernamePattern = /^(?!_)([a-zA-Z0-9_]{4,20})(?<!_)$/;

// Regex for name
const fullNamePattern = /^[A-Za-zÀ-ỹ]+(?: [A-Za-zÀ-ỹ]+)*$/;

// Regex pattern cho mật khẩu
const passwordPattern = /^[A-Za-z\d@$!%*?&]{6,20}$/;

// Regex for phone number VN
const phonePattern =
  /^(?:\+84|0)(?:3[2-9]|5[5-9]|7[0|6-9]|8[1-9]|9[0-9])\d{7}$/;

// Regex for email
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Export các pattern
export {
  usernamePattern,
  fullNamePattern,
  passwordPattern,
  phonePattern,
  emailPattern,
};

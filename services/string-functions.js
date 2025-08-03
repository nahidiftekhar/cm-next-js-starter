export function camelCaseToCapitalizedString(input) {
  if (!input) return input;
  let result = '';
  let currentWord = '';

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (char === char.toUpperCase()) {
      // Current character is uppercase
      if (
        i > 0 &&
        input[i - 1] !== ' ' &&
        input[i + 1] !== input[i + 1].toUpperCase()
      ) {
        // Previous character was not a space
        result += currentWord + ' '; // Start a new word
        currentWord = char; // Start a new word
      } else {
        // Previous character was a space or start of the string
        currentWord += char; // Add to the current word
      }
    } else {
      // Current character is lowercase
      currentWord += char; // Add to the current word
    }
  }

  // Add the last word (or the only word if there's no space)
  result += currentWord;

  // Capitalize the very first letter
  result = result[0].toUpperCase() + result.substring(1);

  return result.trim(); // Remove leading/trailing spaces
}

export function reduceStringBySubstring(string, substring, maxCount) {
  let count = 0;
  let lastIndex = -1;

  while (count < maxCount) {
    const index = string.indexOf(substring, lastIndex + 1);
    if (index !== -1) {
      lastIndex = index;
      count++;
    } else {
      break;
    }
  }
  return string.substring(0, lastIndex);
}

export function productDescriptionShortener(htmlString, maxCount) {
  let count = 0;
  let lastIndex = -1;
  const substring = '<br />';

  const string = htmlString
    .replace(/<\/?(div|p)[^>]*>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\n/g, '<br />');

  while (count < maxCount) {
    const index = string.indexOf(substring, lastIndex + 1);
    if (index !== -1) {
      lastIndex = index;
      count++;
    } else {
      break;
    }
  }
  if (lastIndex === -1) return string;
  return string.substring(0, lastIndex);
}

export function isUrl(str) {
  // Regular expression pattern to match a URL
  const urlPattern = /^(http|https):\/\/[^ "]+$/;
  return urlPattern.test(str);
}

export function generateRandomString(n) {
  let randomString = '';
  let characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < n; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomString;
}

export function convertToInternationalFormat(phoneNumber) {
  // Remove any non-digit characters from the input
  const cleanedNumber = phoneNumber.replace(/\D/g, '');

  // Check if the cleaned number starts with "01", "00880", "880", or "+880"
  if (/^01/.test(cleanedNumber)) {
    // Starts with "01", convert to "+880"
    return '+880' + cleanedNumber.substring(1);
  } else if (/^00880/.test(cleanedNumber)) {
    // Starts with "00880", convert to "+880"
    return '+880' + cleanedNumber.substring(5);
  } else if (/^880/.test(cleanedNumber)) {
    // Starts with "880", convert to "+880"
    return '+880' + cleanedNumber.substring(3);
  } else if (/^\+880/.test(cleanedNumber)) {
    // Starts with "+880", already in the correct format
    return cleanedNumber;
  } else {
    // Not a recognized format, return the original input
    return phoneNumber;
  }
}

export function setLocalStorageWithExpiry(key, value, minutes) {
  const now = new Date();
  const expiryTime = now.getTime() + minutes * 60 * 1000; // Convert minutes to milliseconds
  const item = {
    value: value,
    expiry: expiryTime,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

// Function to retrieve data from localStorage and check if it has expired
export function getLocalStorageWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}

// Function to handle logout
export function handleLogout(key) {
  localStorage.removeItem(key);  // Remove the user data from localStorage
}

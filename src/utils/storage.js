export const saveData = (key, data) => {
  if (!key) return;
  localStorage.setItem(
    key,
    typeof data === "string" ? data : JSON.stringify(data)
  );
};

export const getData = (key) => {
  if (!key) return;
  return localStorage.getItem(key);
};

export const deleteData = (key) => {
  localStorage.removeItem(key);
};

export const formatWallet = (address) => {
  if (!address)
      return ''
  const length = address.length;
  const offset = 5;
  return `${address.substring(0, offset)}...${address.substring(length - offset, length)}`

}

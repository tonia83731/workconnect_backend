const getRandomRGBColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

const getRandomColor = () => {
  const randomHex = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomHex.padStart(6, "0")}`;
};

module.exports = {
  getRandomRGBColor,
  getRandomColor,
};

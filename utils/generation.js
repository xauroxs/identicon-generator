const shajs = require("sha.js");

const getGenerationMap = (bitsArray, config) => {
  const { size, isHorizontallySymmetrical, isVerticallySymmetrical } = config;

  const halfSize = Math.ceil(size / 2);

  const generationMap = [];
  for (let i = 0; i < size; i++) {
    generationMap.push(new Array(size).fill(0));
  }

  // filling only top left corner, others are filled symmetrically
  if (isHorizontallySymmetrical && isVerticallySymmetrical) {
    for (let i = 0; i < halfSize ** 2; i++) {
      const col = i % halfSize;
      const row = (i - col) / halfSize;

      const bit = bitsArray[i];

      generationMap[row][col] = bit;
      generationMap[row][size - 1 - col] = bit;
      generationMap[size - 1 - row][col] = bit;
      generationMap[size - 1 - row][size - 1 - col] = bit;
    }

    return generationMap;
  }

  // filling top left & top right corners
  if (isHorizontallySymmetrical) {
    for (let i = 0; i < size * halfSize; i++) {
      const col = i % size;
      const row = (i - col) / size;

      const bit = bitsArray[i];

      generationMap[row][col] = bit;
      generationMap[size - 1 - row][col] = bit;
    }

    return generationMap;
  }

  // filling top left & bottom left corners
  if (isVerticallySymmetrical) {
    for (let i = 0; i < size * halfSize; i++) {
      const col = i % halfSize;
      const row = (i - col) / halfSize;

      const bit = bitsArray[i];

      generationMap[row][col] = bit;
      generationMap[row][size - 1 - col] = bit;
    }

    return generationMap;
  }

  // asymmetrical generation map
  for (let i = 0; i < size ** 2; i++) {
    const col = i % size;
    const row = (i - col) / size;

    const bit = bitsArray[i];

    generationMap[row][col] = bit;
  }

  return generationMap;
};

const hashToBitsArray = (hash) => {
  let hashBits = "";

  for (let i = 0; i < hash.length; i += 2) {
    // number from 0 to 255
    const byte = parseInt(hash.slice(i, i + 2), 16);

    // string of 0 and 1, 8 symbols length
    const bits = ("00000000" + byte.toString(2)).slice(-8);

    hashBits += bits;
  }

  return hashBits.split("");
};

const generateHash = (stringToHash) => {
  if (stringToHash) {
    return shajs("sha256").update(stringToHash).digest("hex");
  }

  const symbols = "0123456789abcdef";
  const hashLength = 64;
  let hash = "";
  for (let i = 0; i < hashLength; i++) {
    hash += symbols[Math.floor(Math.random() * symbols.length)];
  }

  return hash;
};

module.exports = {
  getGenerationMap,
  hashToBitsArray,
  generateHash,
};

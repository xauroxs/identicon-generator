const { config } = require("./config");

const {
  saveSvg,
  convertSvgToPng,
  removeIdenticonsDirectory,
  createIdenticonsDirectory,
} = require("./utils/fs");

const {
  getGenerationMap,
  generateHash,
  hashToBitsArray,
} = require("./utils/generation");

const { generateSvg } = require("./utils/svg");

const { stringToHash, amount } = config;

removeIdenticonsDirectory();
createIdenticonsDirectory();

for (let i = 0; i < amount; i++) {
  const hash = generateHash(stringToHash);
  const bitsArray = hashToBitsArray(hash);

  const generationMap = getGenerationMap(bitsArray, config);

  const svg = generateSvg(generationMap, config, hash);

  saveSvg(svg, i);

  convertSvgToPng(i);
}

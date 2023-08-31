const fs = require("fs");
const path = require("path");

const sharp = require("sharp");

const createIdenticonsDirectory = () => {
  if (fs.existsSync(path.join(__dirname, "..", "identicons"))) {
    throw new Error(
      "Identicons directory already exists, cannot create it again."
    );
  } else {
    fs.mkdirSync(path.join(__dirname, "..", "identicons"));
  }
};

const removeIdenticonsDirectory = () => {
  if (fs.existsSync(path.join(__dirname, "..", "identicons"))) {
    fs.rmSync(path.join(__dirname, "..", "identicons"), {
      recursive: true,
      force: true,
    });
  }
};

const saveSvg = (svg, count) => {
  if (fs.existsSync(path.join(__dirname, "..", "identicons"))) {
    fs.writeFileSync(
      path.join(__dirname, "..", "identicons", `identicon-${count}.svg`),
      svg,
      () => {}
    );
  } else {
    throw new Error("Identicons directory does not exist, cannot save svg.");
  }
};

const convertSvgToPng = (count) => {
  sharp(path.join(__dirname, "..", "identicons", `identicon-${count}.svg`))
    .png()
    .toFile(path.join(__dirname, "..", "identicons", `identicon-${count}.png`))
    .then(() => {
      fs.unlink(
        path.join(__dirname, "..", "identicons", `identicon-${count}.svg`),
        () => {}
      );
    })
    .catch((err) => console.log(err));
};

module.exports = {
  createIdenticonsDirectory,
  removeIdenticonsDirectory,
  saveSvg,
  convertSvgToPng,
};

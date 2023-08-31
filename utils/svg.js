const xmlbuilder = require("xmlbuilder");

const generateSvg = (generationMap, config, hash) => {
  const { size, width } = config;

  const rectWidth = Math.floor(width / (size + 1));
  const marginWidth = Math.floor(rectWidth / 2 + (width % (size + 1)) / 2);

  const svg = xmlbuilder.create("svg");
  svg.att("width", width);
  svg.att("height", width);
  svg.att("viewBox", `0 0 ${width} ${width}`);
  svg.att("preserveAspectRatio", "xMinYMin");
  svg.att("xmlns", "http://www.w3.org/2000/svg");

  setBackground(svg, config);
  const color = config.color || `#${hash.slice(0, 6)}`;

  for (let i = 0; i < generationMap.length; i++) {
    for (let j = 0; j < generationMap[i].length; j++) {
      if (generationMap[i][j] === "1") {
        svg.ele("rect", {
          x: marginWidth + j * rectWidth,
          y: marginWidth + i * rectWidth,
          width: rectWidth,
          height: rectWidth,
          fill: color,
        });
      }
    }
  }

  return svg.end();
};

const setBackground = (svg, config) => {
  const { width, backgroundColor } = config;

  return svg.ele("rect", {
    x: 0,
    y: 0,
    width: width,
    height: width,
    fill: backgroundColor,
  });
};

module.exports = {
  generateSvg,
};

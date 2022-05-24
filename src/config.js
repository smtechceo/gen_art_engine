const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "Your Collection";
const description = "Remember to replace this description";
const baseUri = "ipfs://NewUriToReplace";

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.youtube.com/c/hashlipsnft",
  creators: [
    {
      address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
      share: 100,
    },
  ],
};

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    growEditionSizeTo: 20,
    layersOrder: [
      { name: "background"},
      { name: "body" },
      { name: "hair" },
      { name: "ears" },
      { name: "eyes" },
      { name: "nose", 
        options: {
          subGroup: true, // existance of sub folder corresponding to each kind of fur
          linkLayer: 1, // layer 1 of body
          rarities: [
            [100, []],
          ],
          // noResetRarities: true,
        },
      },
      { name: "mouth" },      
      { name: "clothes",
        options: {
          rarities: [70, []],
        }
      },
      { name: "tie",  
        options: {
          noneToReveal: ['tie3.png', 'tie4'], // list of ties
                          // revealed only when cloth is None
          linkLayer: 7, // layer 7 of cloth
          rarities: [100, [], []]
        }
      },
      { name: "necklace",
        options: {
          rarities: [60, []]
        }
      },
    ],
  },
];
  
const src_none_file = `${basePath}/utils/None.png`;

const shuffleLayerConfigurations = false;

const debugLogs = false;

const format = {
  width: 600,
  height: 400,
  smoothing: false,
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const extraMetadata = {};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  src_none_file,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
};

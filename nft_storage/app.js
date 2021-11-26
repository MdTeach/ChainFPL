// ipfs://bafyreiclzbgq6cdaau5fmspx5l54hmixb55q6kktb4zvrkzkbgby7vpjve/metadata.json
const { NFTStorage, File } = require("nft.storage");
const fs = require("fs");
const { apiKey } = require("./secrect.json");
const client = new NFTStorage({ token: apiKey });

async function storeMeta() {
  const image = fs.readFileSync(`./data/nft.jpeg`);
  const metadata = await client.store({
    name: "Chain FPL",
    description: "Receipt for joining the FPL Classical League on Kovan",
    image: new File([image], "nft.png", { type: "image/jpeg" }),
    properties: {
      league: "Classical Legue",
      network: "Kovan",
    },
  });

  console.log(metadata);
}

(async () => {
  await storeMeta();
})();

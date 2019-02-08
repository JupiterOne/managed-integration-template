import fs from "fs";

const packageContent = fs.readFileSync("../package.json").toJSON();
fs.writeFileSync(
  "dist/package.json",
  JSON.stringify(
    {
      ...packageContent,
      devDependencies: {},
      scripts: {}
    },
    null,
    2
  )
);

fs.copyFileSync("LICENSE", "dist/LICENSE");
fs.copyFileSync("README.md", "dist/README.md");

import fs from "fs-extra";

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

fs.writeFileSync(
  "dist/package.json",
  JSON.stringify(
    {
      dependencies: pkg.dependencies,
      description: pkg.description,
      license: pkg.license,
      main: pkg.main,
      name: pkg.name,
      peerDependencies: pkg.peerDependencies,
      repository: pkg.repository,
      version: pkg.version,
    },
    null,
    2,
  ),
);

fs.copySync("LICENSE", "dist/LICENSE");
fs.copySync("README.md", "dist/README.md");

fs.copySync("docs/jupiterone-io", "dist/docs");

fs.writeFileSync(
  "dist/docs/metadata.json",
  JSON.stringify(
    {
      version: pkg.version,
    },
    null,
    2,
  ),
);

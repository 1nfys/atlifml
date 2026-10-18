# atlifml

source of the atlifm landing and docs site, deployed to https://1nfys.github.io/atlifml/

react + vite, markdown docs live in `src/content/*.md`

then run locally:

```sh
npm install
npm run dev
```

production build (also builds 404.html for github pages copy):

```sh
npm run build
```

deploy: the Deploy to GitHub Pages workflow builds on every push to `main`, pages source must be set to github actions in the repo settings

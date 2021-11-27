import { readFileSync, writeFileSync, existsSync } from 'fs';
import axios from 'axios';

export async function checkIndex() {
  const indexFile = readFileSync(
    `${process.env.USERPROFILE}\\.lunarclient\\textures\\assets\\lunar\\cosmetics\\index`,
    'utf-8'
  );
  const index = await fetchIndex();
  if (index === false) {
    console.log('An error occured with the API. Aborting index process...');
    return;
  }
  if (indexFile != index.index) {
    console.log('Cosmetic index has changed, updating...');
    await updateIndex(index.index);
  } else {
    console.log('Cosmetic index has not changed, skipping...');
  }

  checkAssets(index.assetsList);
}

export async function fetchIndex() {
  try {
    return (await axios.get('http://localhost:8085/indexFile')).data;
  } catch (error) {
    return false;
  }
}

export async function updateIndex(index) {
  writeFileSync(
    `${process.env.USERPROFILE}\\.lunarclient\\textures\\assets\\lunar\\cosmetics\\index`,
    index,
    'utf-8'
  );
  console.log('Cosmetic index updated.');
}

export async function checkAssets(assetsList) {
  assetsList.forEach((asset, index) => {
    if (
      !existsSync(
        `${process.env.USERPROFILE}\\.lunarclient\\textures\\assets\\lunar\\${asset}`
      )
    ) {
      assetsList.splice(index, 1);
      console.log(`${asset} is missing, downloading...`);
    }
  });
  if (assetsList.length > 0) {
    console.log('All assets are valid, skipping...');
  } else {
    console.log('Downloading assets...');
  }
}

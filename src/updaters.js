import axios from 'axios';
import { getSetting, writeSetting } from './settings';

export async function checkForMappingsUpdates(callback) {
  console.log('Checking for mappings update...');
  const commits = (
    await axios.get(
      'https://api.github.com' +
        '/repos/Solar-Tweaks/SolarTweaks-Mappings/commits'
    )
  ).data;

  let updated = false;

  commits.forEach(async (commit) => {
    const message = commit.commit.message;
    if (updated) return;
    if (message.includes('Added mappings for LC')) {
      if (!message.includes('DEV')) {
        updated = true;
        const commitId = message.replace('Added mappings for LC ', '');

        console.log(`Checking installed mappings...`);
        if (getSetting('mappings').commit.id === commitId) {
          console.log(`Mappings are up to date.`);
          return;
        }
        console.log(`Mappings are outdated. Updating...`);
        callback('Mappings', commitId, getSetting('mappings').commit.id);
      } else {
        console.log('DEV Mappings skipped');
        return;
      }
    }
  });
}

export async function update(commitId) {
  console.log(`Fetching mappings for LC ${commitId}...`);
  const mappingsUrl = `https://raw.githubusercontent.com/Solar-Tweaks/SolarTweaks-Mappings/main/Mappings/SolarTweaks.Mappings.-.${commitId}.stm`;
  await writeSetting('mappings', (await axios.get(mappingsUrl)).data);
  console.log(`Mappings updated to LC ${commitId}`);

  window.location.reload();
}

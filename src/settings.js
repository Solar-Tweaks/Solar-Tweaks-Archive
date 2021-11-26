import fs from 'fs';
import process from 'process';

const settingsFile = `${process.env.LOCALAPPDATA}\\SolarTweaks\\settings.json`;

export function getSetting(key) {
  return JSON.parse(readSettings())[key]
}

export function setupSettings() {
  console.log(settingsFile);
  if (!fs.existsSync(settingsFile)) {
    fs.writeFileSync(settingsFile, '', { encoding: 'utf-8' });
    console.log("Settings file created");
  }
  if (String(readSettings()).match(/^\s*$/)) {
    const settings = JSON.stringify(defaultSettings, null, 4);
    fs.writeFileSync(settingsFile, settings, { encoding: 'utf-8' });
    console.log("Settings written");
  }
}

export function readSettings() {
  return fs.readFileSync(settingsFile, { encoding: 'utf-8' });
}

export async function writeSetting(key, value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let settings = JSON.parse(readSettings());
      settings[key] = value;
      fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 4), { encoding: 'utf-8' });
      resolve();
      console.log(`New value of ${key} written successfuly to the settings file`);
    }, 50);
  });
}

export const defaultSettings = {
  jrePath: `${process.env.USERPROFILE}\\.lunarclient\\jre\\zulu16.30.15-ca-fx-jre16.0.1-win_x64\\bin\\java.exe`,
  mappings: {
    "commit": {
      "id": "8d78a30",
      "fullId": "8d78a3066858c8b87e924b15c4d047a5ceae928b",
      "filePath": "lunar/ax/llIIIlllllIIIllllIIIIIIIl"
    },
    patchs: {
      freelook: [
        {
          patchType: "replace",
          scripts: {
            searchFor: "replace1.txt",
            replaceWith: "replace2.txt"
          },
          path: "lunar/dC/llIlIlIllIllIllIIIIIIIIlI",
          methodName: "llIIIlllllIIIllllIIIIIIIl(Lcom/google/gson/JsonObject;Ljava/util/function/Predicate;Llunar/aS/IIllIllIIIlIIIlIIIlIlllll;)V",
          searchFor: `LDC "enabled"`,
          replaceWith: `LDC "removedByLunarTweaks"`
        }
      ],
      pinnedServers: [
        {
          patchType: "replace",
          scripts: {
            searchFor: "replace1.txt",
            replaceWith: "replace2.txt"
          },
          path: "lunar/dC/llIlIlIllIllIllIIIIIIIIlI",
          methodName: "run()V",
          searchFor: `LDC "pinnedServers"`,
          replaceWith: `LDC "removedByLunarTweaks"`
        }
      ],
      blogPosts: [
        {
          patchType: "replace",
          scripts: {
            searchFor: "replace1.txt",
            replaceWith: "replace2.txt"
          },
          path: "lunar/dD/lIlIIIlllIlllllllIlllllII",
          methodName: "run()V",
          searchFor: `LDC "blogPosts"`,
          replaceWith: `LDC "removedBySolarTweaks"`
        }
      ],
      modspacket: [
        {
          patchType: "replace",
          scripts: {
            searchFor: "replace1.txt",
            replaceWith: "replace2.txt"
          },
          path: "com/lunarclient/bukkitapi/nethandler/LCPacket",
          methodName: "<clinit>()V",
          searchFor: `AD:
  LINE AD 56
  BIPUSH 31
  LDC Lcom/lunarclient/bukkitapi/nethandler/client/LCPacketModSettings;
  INVOKESTATIC com/lunarclient/bukkitapi/nethandler/LCPacket.addPacket(ILjava/lang/Class;)V
  AE:`,
          replaceWith: "AE:"
        }
      ],
      levelHead: [
        {
          patchType: "replace",
          scripts: {
            searchFor: "replace1.txt",
            replaceWith: "replace2.txt"
          },
          path: "lunar/br/llIIIlllllIIIllllIIIIIIIl",
          methodName: "llIIIlllllIIIllllIIIIIIIl(Llunar/aK/lllllIIllIIlllIlIlIlIIIll;)V",
          searchFor: `LDC "Level: "`,
          replaceWith: `LDC "$custom_text"`
        }
      ],
      autogg: [
        {
          patchType: "replace",
          scripts: {
            searchFor: "replace1.txt",
            replaceWith: "replace2.txt"
          },
          path: "lunar/br/llIIIlllllIIIllllIIIIIIIl",
          methodName: "llIIIlllllIIIllllIIIIIIIl(Llunar/aG/llIlIlIllIllIllIIIIIIIIlI;)V",
          searchFor: `LDC "/achat gg"`,
          replaceWith: `LDC "/achat $custom_text"`
        }
      ],
      nick: [
        {
          patchType: "replace",
          scripts: {
            searchFor: "replace1.txt",
            replaceWith: "replace2.txt"
          },
          path: "lunar/bB/llIIIIllIIlIlllllllIIllIl",
          methodName: "IlIIIlIIIllIllIIIllIIlIII(Z)Ljava/lang/String;",
          searchFor: `LDC "You"`,
          replaceWith: `LDC "$custom_text"`
        }
      ]
    }
  }
}
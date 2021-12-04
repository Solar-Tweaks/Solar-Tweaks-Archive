import fs from 'fs';
import process from 'process';

const settingsFile = `${process.env.LOCALAPPDATA}\\SolarTweaks\\settings.json`;

export function getSetting(key) {
  return JSON.parse(readSettings())[key];
}

export function setupSettings() {
  if (!fs.existsSync(settingsFile)) {
    fs.writeFileSync(settingsFile, '', { encoding: 'utf-8' });
    console.log('Settings file created');
  }
  if (String(readSettings()).match(/^\s*$/)) {
    writeDefaultSettings();
  }

  if (defaultSettings.settingsVersion > getSetting('settingsVersion')) {
    console.log('Settings file is out of date, updating...');
    writeDefaultSettings();
  }

  try {
    const settings = [
      'jrePath',
      'autoSelectFile',
      'checkForMappingsUpdates',
      'settingsVersion',
      'mappings',
    ];
    settings.forEach((setting) => {
      if (typeof getSetting(setting) == 'undefined') {
        throw new Error(`${setting} is undefined`);
      }
    });
  } catch (error) {
    console.log(
      'One or more value(s) are missing in the config, reseting to default config...'
    );
    writeDefaultSettings();
  }
}

export function writeDefaultSettings() {
  const settings = JSON.stringify(defaultSettings, null, 4);
  fs.writeFileSync(settingsFile, settings, { encoding: 'utf-8' });
  console.log('Settings written');
}

export function readSettings() {
  return fs.readFileSync(settingsFile, { encoding: 'utf-8' });
}

export async function writeSetting(key, value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let settings = JSON.parse(readSettings());
      settings[key] = value;
      fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 4), {
        encoding: 'utf-8',
      });
      resolve();
      console.log(
        `New value of ${key} written successfuly to the settings file`
      );
    }, 50);
  });
}

export const defaultSettings = {
  jrePath: `${process.env.JAVA_HOME}\\bin\\java.exe`,
  autoSelectFile: true,
  checkForMappingsUpdates: true,
  settingsVersion: 1,
  mappings: {
    commit: {
      id: '22a4952',
      fullId: '22a49523c471beb158eb335e5d5a63acf4fa4d52',
      filePath: 'lunar/ax/IIllIlIIIllIlIlIIIllIIllI',
    },
    patchs: {
      freelook: [
        {
          patchType: 'replace',
          scripts: {
            searchFor: 'script1.txt',
            replaceWith: 'script2.txt',
          },
          path: 'lunar/dM/lIIllIllIlIllIlIlIllIllll',
          methodName:
            'lIIllIllIlIllIlIlIllIllll(Lcom/google/gson/JsonObject;Ljava/util/function/Predicate;Llunar/aT/llIIllIIllIlIlIllIlllIIIl;)V',
          searchFor: 'LDC "enabled"',
          replaceWith: 'LDC "removedBySolarTweaks"',
        },
      ],
      pinnedServers: [
        {
          patchType: 'replace',
          scripts: {
            searchFor: 'script1.txt',
            replaceWith: 'script2.txt',
          },
          path: 'lunar/dM/lIIllIllIlIllIlIlIllIllll',
          methodName: 'run()V',
          searchFor: 'LDC "pinnedServers"',
          replaceWith: 'LDC "removedBySolarTweaks"',
        },
      ],
      blogPosts: [
        {
          patchType: 'replace',
          scripts: {
            searchFor: 'script1.txt',
            replaceWith: 'script2.txt',
          },
          path: 'lunar/dM/lIIllIllIlIllIlIlIllIllll',
          methodName: 'run()V',
          searchFor: 'LDC "blogPosts"',
          replaceWith: 'LDC "removedBySolarTweaks"',
        },
      ],
      modspacket: [
        {
          patchType: 'replace',
          scripts: {
            searchFor: 'script1.txt',
            replaceWith: 'script2.txt',
          },
          path: 'com/lunarclient/bukkitapi/nethandler/LCPacket',
          methodName: '<clinit>()V',
          searchFor:
            'AD:\nLINE AD 56\nBIPUSH 31\nLDC Lcom/lunarclient/bukkitapi/nethandler/client/LCPacketModSettings;\nINVOKESTATIC com/lunarclient/bukkitapi/nethandler/LCPacket.addPacket(ILjava/lang/Class;)V\nAE:',
          replaceWith: 'AE:',
        },
      ],
      mantle: [
        {
          patchType: 'replace',
          scripts: {
            searchFor: 'script1.txt',
            replaceWith: 'script2.txt',
          },
          path: 'lunar/a/lIIllIllIlIllIlIlIllIllll',
          methodName: '<clinit>()V',
          searchFor: 'LDC "http://s.optifine.net"',
          replaceWith: 'LDC "http://capes.mantle.gg"',
        },
      ],
      levelHead: [
        {
          patchType: 'replace',
          scripts: {
            searchFor: 'script1.txt',
            replaceWith: 'script2.txt',
          },
          path: 'lunar/bt/lIIIllIlIlIlIIIllIlIlIllI',
          methodName:
            'IIllIlIIIllIlIlIIIllIIllI(Llunar/aK/IIIIIlIIllIIIlIllIIIIIllI;)V',
          searchFor: 'LDC "Level: "',
          replaceWith: 'LDC "$custom_text"',
        },
      ],
      autogg: [
        {
          patchType: 'replace',
          scripts: {
            searchFor: 'script1.txt',
            replaceWith: 'script2.txt',
          },
          path: 'lunar/bt/lIIIllIlIlIlIIIllIlIlIllI',
          methodName:
            'IIllIlIIIllIlIlIIIllIIllI(Llunar/aG/IlIlIllIIllllIllllllIIlIl;)V',
          searchFor: 'LDC "/achat gg"',
          replaceWith: 'LDC "/achat $custom_text"',
        },
      ],
      nick: [
        {
          patchType: 'replace',
          scripts: {
            searchFor: 'script1.txt',
            replaceWith: 'script2.txt',
          },
          path: 'lunar/bD/lIlIIIIIIlIlIlIllIIlIlllI',
          methodName: 'IllIlIllIIIIllIlllllllIlI(Z)Ljava/lang/String;',
          searchFor: 'LDC "You"',
          replaceWith: 'LDC "$custom_text"',
        },
      ],
      fps: [
        {
          patchType: 'replace',
          scripts: {
            searchFor: 'script1.txt',
            replaceWith: 'script2.txt',
          },
          path: 'lunar/bn/IIllIlIIIllIlIlIIIllIIllI',
          methodName: 'IlIlIIIIIIlIIIlIlIllllllI()Ljava/lang/String;',
          searchFor: 'args["\\u0001 FPS"]',
          replaceWith: 'args["\\u0001 $custom_text"]',
        },
      ],
      websocket: [
        {
          patchType: 'replace',
          scripts: {
            searchFor: 'script1.txt',
            replaceWith: 'script2.txt',
          },
          path: 'lunar/au/IIllIlIIIllIlIlIIIllIIllI',
          methodName: '<init>(Ljava/util/Map;)V',
          searchFor:
            'GETSTATIC lunar/as/IlIlIllIIllllIllllllIIlIl.IIIllIlIIlIlIllllIlIIllll Ljava/lang/String;\nINVOKEDYNAMIC makeConcatWithConstants (Ljava/lang/String;)Ljava/lang/String; handle[H_INVOKESTATIC java/lang/invoke/StringConcatFactory.makeConcatWithConstants(Ljava/lang/invoke/MethodHandles$Lookup;Ljava/lang/String;Ljava/lang/invoke/MethodType;Ljava/lang/String;[Ljava/lang/Object;)Ljava/lang/invoke/CallSite;] args["wss://assetserver.\\u0001/connect"]\nINVOKESPECIAL java/net/URI.<init>(Ljava/lang/String;)V\nNEW org/java_websocket/drafts/Draft_6455\nDUP\nINVOKESPECIAL org/java_websocket/drafts/Draft_6455.<init>()V\nALOAD 1\nSIPUSH 30000\nINVOKESPECIAL org/java_websocket/client/WebSocketClient.<init>(Ljava/net/URI;Lorg/java_websocket/drafts/Draft;Ljava/util/Map;I)V',
          replaceWith:
            'LDC "$custom_text"\nINVOKESPECIAL java/net/URI.<init>(Ljava/lang/String;)V\nNEW org/java_websocket/drafts/Draft_6455\nDUP\nINVOKESPECIAL org/java_websocket/drafts/Draft_6455.<init>()V\nCHECKCAST org/java_websocket/drafts/Draft\nALOAD 1\nSIPUSH 30000\nINVOKESPECIAL org/java_websocket/client/WebSocketClient.<init>(Ljava/net/URI;Lorg/java_websocket/drafts/Draft;Ljava/util/Map;I)V',
        },
      ],
    },
  },
};

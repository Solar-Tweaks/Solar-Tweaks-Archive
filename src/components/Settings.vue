<template>
  <div>
    <v-dialog
      persistent
      v-model="$store.state.settingsOpened"
      max-width="750px"
    >
      <v-card>
        <v-card-title class="primary">Settings</v-card-title>
        <v-card-subtitle class="mb-5 primary"
          >Edit Solar Tweaks settings here. When it's done press
          <strong>Save</strong>.</v-card-subtitle
        >
        <div class="ml-5">
          <h4>Java File Path:</h4>
          <v-col cols="12" sm="11" class="mt-n5">
            <v-text-field
              v-model="settings.jrePath"
              @click="openFileChooser()"
            ></v-text-field>
          </v-col>
        </div>
        <div class="ml-5 mt-n5">
          <h4 class="mb-2">Mappings:</h4>
          <!-- <v-btn @click="fetchFromGithub()">
            <v-icon left>mdi-github</v-icon>
            <span>Fetch from GitHub</span>
          </v-btn>
          -->
          <v-btn color="green" class="ml-3" @click="setMappingsFromFile()">
            <v-icon left>mdi-file</v-icon>
            <span>Import from file</span>
          </v-btn>
          <span class="ml-2"
            >Actual mappings: Lunar Client
            <strong>{{ settings.mappings.commit.id }}</strong></span
          >
        </div>
        <div class="ml-5">
          <div class="flex">
            <h4 class="mr-2 mt-5">Auto select/save file:</h4>
            <v-switch v-model="settings.autoSelectFile"></v-switch>
          </div>
        </div>
        <div class="ml-5 mt-n5">
          <div class="flex">
            <h4 class="mr-2 mt-5">Check for mappings updates:</h4>
            <v-switch v-model="settings.checkForMappingsUpdates"></v-switch>
          </div>
        </div>
        <v-card-actions class="mt-3">
          <v-btn @click="resetToDefault()" color="error" outlined>Reset</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="save()" color="primary" :loading="saveLoading"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { getSetting, writeSetting, defaultSettings } from '../settings';
import electron from 'electron';
import fs from 'fs';

export default {
  name: 'Settings',

  data: () => ({
    saveLoading: false,
    settings: {
      jrePath: getSetting('jrePath'),
      mappings: getSetting('mappings'),
      autoSelectFile: getSetting('autoSelectFile'),
      checkForMappingsUpdates: getSetting('checkForMappingsUpdates'),
    },
  }),

  methods: {
    resetToDefault() {
      this.settings.jrePath = defaultSettings.jrePath;
      this.settings.mappings = defaultSettings.mappings;
      this.autoSelectFile = defaultSettings.autoSelectFile;
      this.checkForMappingsUpdates = defaultSettings.checkForMappingsUpdates;
    },
    async save() {
      this.saveLoading = true;
      for (const [key, value] of Object.entries(this.settings)) {
        await writeSetting(key, value);
      }
      this.$store.commit('markSettingsOpenedAs', false);
      this.saveLoading = false;
    },
    openFileChooser(title, defaultPath, filters) {
      const filePath = electron.remote.dialog.showOpenDialogSync({
        title: title,
        defaultPath: defaultPath,
        buttonLabel: 'Choose',
        properties: ['openFile', 'showHiddenFiles', 'dontAddToRecent'],
        filters: filters,
      });
      if (filePath) {
        return filePath[0];
      } else {
        return null;
      }
    },
    async fetchFromGithub() {
      console.log('How did you get here ?');
    },
    async setNewJrePath() {
      return new Promise((resolve) => {
        const newPath = this.openFileChooser(
          'Choose a Java executable...',
          getSetting('jrePath'),
          [{ name: 'EXE File', extensions: ['exe'] }]
        );
        if (newPath != null) {
          this.settings.jrePath = newPath;
        }
        resolve();
      });
    },
    async setMappingsFromFile() {
      const filePath = this.openFileChooser(
        'Choose a mappings file...',
        undefined,
        [{ name: 'Solar Tweaks Mappings File', extensions: ['stm'] }]
      );
      if (filePath != null) {
        console.log(filePath);
        this.settings.mappings = JSON.parse(fs.readFileSync(filePath));
      }
    },
  },
};
</script>

<style>
.flex {
  display: flex;
}
</style>

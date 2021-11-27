<template>
  <div>
    <v-btn class="full-centered" color="primary" @click="chooseFile"
      >Choose file</v-btn
    >
    <v-snackbar v-model="snackbar">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false"
          >Dismiss</v-btn
        >
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import electron from 'electron';
import { getSetting } from '../settings';
import process from 'process';

export default {
  name: 'FileChooser',

  data: () => ({
    snackbarText: '',
    snackbar: false,
  }),

  methods: {
    chooseFile() {
      let filePath;
      if (!getSetting('autoSelectFile')) {
        filePath = electron.remote.dialog.showOpenDialogSync({
          title: 'Choose a Lunar jar file...',
          defaultPath: `${process.env.USERPROFILE}\\.lunarclient\\offline\\1.8`,
          buttonLabel: 'Choose',
          properties: ['openFile', 'showHiddenFiles', 'dontAddToRecent'],
          filters: [{ name: 'JAR File', extensions: ['jar'] }],
        });
      } else {
        filePath = [
          `${process.env.USERPROFILE}\\.lunarclient\\offline\\1.8\\lunar-prod-optifine.jar`,
        ];
      }

      if (filePath) {
        if (filePath.length > 1) {
          this.snackbarText = 'You can only select one file';
          this.snackbar = true;
          return;
        }
        this.$store.commit('setLunarFilePath', filePath[0]);
        this.$store.commit('markFileAsChoosed', true);
      } else {
        this.snackbarText = 'Please select a file';
        this.snackbar = true;
      }
    },
  },
};
</script>

<style>
.full-centered {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>

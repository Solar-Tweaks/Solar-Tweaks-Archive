<template>
  <div>
    <v-dialog hide-overlay persistent v-model="updateFound" width="300px">
      <v-card>
        <v-card-title>
          <span>{{ type }} updater</span>
        </v-card-title>
        <v-card-text
          >A new version has been found!<br />New version:
          <b>{{ newVersion }}</b
          ><br />Current version: <b>{{ oldVersion }}</b></v-card-text
        >
        <v-card-actions>
          <v-btn @click="updateFound = false" color="error">
            <v-icon left>mdi-close</v-icon>
            <span>Ignore</span>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="interfaceUpdate()" color="success">
            <v-icon left>mdi-update</v-icon>
            <span>Update</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { getSetting } from '../settings';
import { checkForMappingsUpdates, update } from '../updaters';

export default {
  name: 'Updater',

  data: () => ({
    updateFound: false,
    type: 'Software',
    newVersion: '',
    oldVersion: '',
  }),

  methods: {
    showUpdate(type, newVersion, oldVersion) {
      this.updateFound = true;
      this.type = type;
      this.newVersion = newVersion;
      this.oldVersion = oldVersion;
    },
    interfaceUpdate() {
      update(this.newVersion);
    },
  },

  mounted() {
    if (getSetting('checkForMappingsUpdates')) {
      setTimeout(async () => {
        await checkForMappingsUpdates(this.showUpdate);
      }, 500);
    }
  },
};
</script>

<style></style>

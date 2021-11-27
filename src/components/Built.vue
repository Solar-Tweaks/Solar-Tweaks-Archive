<template>
  <div>
    <v-card id="card" elevation="5">
      <v-icon size="200" color="green" id="icon"
        >mdi-checkbox-marked-circle</v-icon
      >
      <v-card-title id="builded-title">Finished!</v-card-title>
      <v-card-subtitle id="subtitle" class="mt-2 child">
        Your Lunar File has been built in :
        <br /><strong>{{ $store.state.outputPath }}</strong
        ><br />
        Remember to launch the game using Lunar Client Lite
      </v-card-subtitle>
      <div id="two-buttons">
        <v-btn color="red" @click="exit()">
          <v-icon left>mdi-exit-to-app</v-icon>
          <span>Exit</span>
        </v-btn>
        <v-btn color="orange" class="ml-5" @click="clearCacheAndExit()">
          <v-icon left>mdi-delete</v-icon>
          <span>{{ cacheButtonText }}</span>
        </v-btn>
      </div>
      <v-btn color="primary" class="mb-5" @click="goToMainMenu()">
        <v-icon left>mdi-home</v-icon>
        <span>Main Menu</span>
      </v-btn>
    </v-card>
  </div>
</template>

<script>
import electron from 'electron';
import * as patcher from '../patcher';

export default {
  name: 'Built',

  data: () => ({
    cacheButtonText: 'Clear cache & Exit',
  }),

  methods: {
    exit() {
      electron.remote.getCurrentWindow().close();
    },
    async clearCacheAndExit() {
      await patcher.clearCache(this.$store.state.currentFolderPath);
      this.exit();
    },
    goToMainMenu() {
      this.$store.commit('markFileAsChoosed', false);
      this.$store.commit('markBuildedAs', false);
      this.$store.commit('setLunarFilePath', '');
      this.$store.commit('setCurrentFolderPath', '');
      this.$store.commit('setOutputFilePath', '');
    },
  },
};
</script>

<style>
#card {
  margin: auto;
  top: 80px;
  width: max-content;
  height: max-content;
  text-align: center;
}

#builded-title {
  font-size: 35px;
  text-align: center;
  margin-left: 120px;
}

#two-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 25px;
}
</style>

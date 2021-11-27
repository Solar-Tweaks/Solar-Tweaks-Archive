<template>
  <v-app>
    <AppBar />
    <v-main>
      <FileChooser v-if="!$store.state.fileChoosed && !$store.state.builded" />
      <Patcher v-else-if="$store.state.fileChoosed && !$store.state.builded" />
      <Built v-else />
    </v-main>
    <Updater />
  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue';
import FileChooser from './components/FileChooser.vue';
import Patcher from './components/Patcher.vue';
import Built from './components/Built.vue';
import Updater from './components/Updater.vue';

export default {
  name: 'App',

  components: {
    AppBar,
    FileChooser,
    Patcher,
    Built,
    Updater,
  },

  data: () => ({}),
};
</script>

<style>
* {
  font-family: 'Roboto', 'Franklin Gothic Medium', 'Arial Narrow', Arial,
    sans-serif;
  user-select: none;
}

::-webkit-scrollbar {
  display: none;
}
</style>

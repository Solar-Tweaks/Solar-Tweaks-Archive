<template>
  <div>
    <v-snackbar v-model="snackbar.enabled">
      {{
        `${snackbar.text} Going back to main screen in ${snackbar.countdown} seconds ...`
      }}
    </v-snackbar>
    <v-dialog v-model="errorDialog">
      <v-card>
        <v-card-title class="title-h5 red">An error occured</v-card-title>
        <v-card-text class="mt-5">
          <span
            >We are sorry for the inconvenience, if you don't know why this is
            happening, please open a ticket in our
          </span>
          <a @click="openLink('https://discord.gg/XDzgdRSWfn')"
            >Discord Server</a
          >
          <v-icon color="blue" size="20" class="ml-1">mdi-open-in-new</v-icon>
          <br /><br />
          <strong>Error :</strong>
          <br /><br />
          <span>{{ error }}</span>
        </v-card-text>
        <v-card-actions>
          <span></span>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="exitPatcher('An error occured.')"
            >Exit patcher</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card
      v-if="isLoading"
      id="loading-screen"
      class="full-centered"
      elevation="8"
    >
      <v-card-title>Loading your file ...</v-card-title>
      <v-card-subtitle
        >Please wait, we are making few things before you can edit the JAR
        file.</v-card-subtitle
      >
      <div v-for="(step, index) in steps" :key="index" class="loading-steps">
        <v-progress-circular
          v-if="step.inProgress"
          indeterminate
          color="green"
          width="3"
          size="25"
        ></v-progress-circular>
        <v-icon v-else-if="step.done" color="green" size="25"
          >mdi-check-circle</v-icon
        >
        <v-icon v-else-if="step.error" color="red" size="25"
          >mdi-alert-circle</v-icon
        >
        <v-icon v-else color="grey" size="25">mdi-check-circle</v-icon>
        <span class="step-title">{{ step.name }}</span>
      </div>
    </v-card>
    <v-card id="patcher-card" elevation="5" v-if="!isLoading">
      <v-card-title>Solar Tweaks Patcher</v-card-title>
      <v-btn
        :disabled="buildButtonDisabled == true"
        dark
        color="primary"
        id="save-btn"
        @click="saveBuild()"
      >
        <v-icon left>mdi-content-save</v-icon>
        Save build
      </v-btn>
      <v-tabs v-model="currentTab">
        <v-tab>
          <v-icon left>mdi-cog-outline</v-icon>
          <span>Tweaks</span>
        </v-tab>
        <v-tab>
          <v-icon left>mdi-auto-fix</v-icon>
          <span>Customizations</span>
        </v-tab>
        <v-tab disabled>
          <v-icon left>mdi-discord</v-icon>
          <span>Discord RPC</span>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="currentTab">
        <v-tab-item>
          <v-card flat class="card-item">
            <v-card-title>Patches</v-card-title>
            <v-card-subtitle
              >Select every patches you want to include in your build and click
              "Save Build"</v-card-subtitle
            >
            <div
              v-for="(patch, index) in patches"
              :key="index"
              class="patch-item"
            >
              <v-checkbox
                class="patch-checkbox mt-2"
                v-model="selectedPatches"
                :label="patch.name"
                :value="patch.internalName"
              ></v-checkbox>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-on="on"
                    v-bind="attrs"
                    color="grey"
                    size="22"
                    right
                    class="mb-3"
                    >mdi-help-circle</v-icon
                  >
                </template>
                <span>{{ patch.tooltip }}</span>
              </v-tooltip>
            </div>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat class="card-item">
            <v-card-title>Customizations</v-card-title>
            <v-card-subtitle
              >Customize your game, make your game look like
              you</v-card-subtitle
            >
            <div
              v-for="(customization, index) in customizations"
              :key="index"
              class="patch-item"
            >
              <span class="mt-2 ml-5">{{ customization.name }} :</span>
              <div class="ml-5 mr-2 customization-textfield">
                <v-text-field
                  v-model="customization.text"
                  outlined
                  dense
                  label="Value"
                ></v-text-field>
              </div>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-on="on"
                    v-bind="attrs"
                    color="grey"
                    size="22"
                    right
                    class="mb-6"
                    >mdi-help-circle</v-icon
                  >
                </template>
                <span>{{ customization.tooltip }}</span>
              </v-tooltip>
            </div>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat class="card-item">
            <v-card-text>
              <p>Bored of the default Discord RPC ? Make your own</p>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import * as patcher from "../patcher";

export default {
  name: "Patcher",

  data: () => ({
    isLoading: true,
    currentFolder: "",
    currentTab: "tab-Tweaks",
    steps: [
      {
        name: "Checking ST folder",
        done: false,
        inProgress: false,
        error: false,
      },
      {
        name: "Checking Java installation",
        done: false,
        inProgress: false,
        error: false,
      },
      {
        name: "Copying JAR file to temp",
        done: false,
        inProgress: false,
        error: false,
      },
      {
        name: "Converting classes",
        done: false,
        inProgress: false,
        error: false,
      },
      {
        name: "Checking commit ID",
        done: false,
        inProgress: false,
        error: false,
      },
    ],
    snackbar: {
      text: "",
      countdown: 5,
      enabled: false,
    },
    patches: [
      {
        name: "Freelook & AutoTextHotkey",
        internalName: "freelook",
        tooltip: "Get back Freelook and AutoTextHotkey on Hypixel",
      },
      {
        name: "Pinned servers",
        internalName: "pinnedServers",
        tooltip: "Remove any promoted/pinned servers from the server list",
      },
      {
        name: "Block server from disabling mods",
        internalName: "modspacket",
        tooltip: 'Completely remove the packet : "LCPacketModSettings"',
      },
      {
        name: "Disable blog posts",
        internalName: "blogPosts",
        tooltip: "Remove blog posts from bottom right of main menu screen",
      },
    ],
    customizations: [
      {
        name: "Level head prefix",
        internalName: "levelHead",
        tooltip: "Customize your Hypixel Level head prefix",
        text: "",
      },
      {
        name: "Auto GG",
        internalName: "autogg",
        tooltip: "Change the default 'gg' to whatever you like",
        text: "",
      },
      {
        name: "Nick hider",
        internalName: "nick",
        tooltip: "Customize the name of the Nick Hider",
        text: "",
      },
    ],
    selectedPatches: [],
    buildButtonDisabled: false,
    error: "",
    errorDialog: false,
  }),

  methods: {
    startStep(stepIndex) {
      this.steps[stepIndex].inProgress = true;
    },
    endStep(stepIndex) {
      this.steps[stepIndex].done = true;
      this.steps[stepIndex].inProgress = false;
    },
    errorOccuredOnStep(stepIndex, error) {
      this.steps[stepIndex].inProgress = false;
      this.steps[stepIndex].error = true;
      this.exitPatcher(error);
    },
    showErrorDialog(error) {
      console.error(error);
      this.error = error;
      this.errorDialog = true;
    },
    async setupPatcher() {
      this.startStep(0);
      const STFolderCheck = await patcher.checkSTFolder();
      if (typeof STFolderCheck === "object") {
        this.showErrorDialog(STFolderCheck.error);
        return;
      }
      this.endStep(0);

      this.startStep(1);
      const javaInstallation = await patcher.checkJavaInstallation();
      if (!javaInstallation) {
        this.errorOccuredOnStep(1, "Java is not installed on your computer");
        return;
      }
      this.endStep(1);

      this.startStep(2);
      this.currentFolder = await patcher.copyJarFileToTemp(
        this.$store.state.lunarFilePath
      );
      if (typeof this.currentFolder === "object") {
        this.showErrorDialog(this.currentFolder.error);
        return;
      }
      this.$store.commit("setCurrentFolderPath", this.currentFolder);
      this.endStep(2);

      this.startStep(3);
      const convertedClasses = await patcher.convertLclasses(
        this.currentFolder
      );
      if (typeof convertedClasses === "object") {
        this.showErrorDialog(convertedClasses.error);
        return;
      }
      this.endStep(3);

      this.startStep(4);
      const commitId = await patcher.findCommitId(this.currentFolder);
      if (commitId === null) {
        this.errorOccuredOnStep(
          4,
          "Wrong Lunar version. Try to update LunarClient/SolarTweaks."
        );
        return;
      }
      if (typeof commitId === "object") {
        this.showErrorDialog(commitId.error);
        return;
      }
      this.endStep(4);

      this.isLoading = false;
    },
    exitPatcher(reason) {
      this.errorDialog = false;
      this.snackbar.text = reason;
      this.snackbar.enabled = true;
      this.countDownExitTimer();
      setTimeout(() => {
        this.snackbar.enabled = false;
        this.$store.commit("setLunarFilePath", "");
        this.$store.commit("markFileAsChoosed", false);
        this.$store.commit("markBuildedAs", false);
      }, 5050);
    },
    countDownExitTimer() {
      if (this.snackbar.countdown > 0) {
        setTimeout(() => {
          this.snackbar.countdown -= 1;
          this.countDownExitTimer();
        }, 1000);
      }
    },
    async saveBuild() {
      this.buildButtonDisabled = true;
      const customizationList = [];
      this.customizations.forEach((customization) => {
        if (customization.text) {
          customizationList.push({
            internalName: customization.internalName,
            text: customization.text,
          });
        }
      });
      const patched = await patcher.saveBuild(
        this.currentFolder,
        this.selectedPatches,
        customizationList
      );
      if (typeof patched === "object") {
        this.showErrorDialog(patched.error);
        return;
      }
      if (!patched) {
        this.exitPatcher("Please select a destination path.");
        return;
      }
      this.buildButtonDisabled = false;
      this.$store.commit("markBuildedAs", true);
      this.$store.commit("setOutputFilePath", patched);
    },
    openLink(link) {
      require("electron").shell.openExternal(link);
    },
  },

  mounted() {
    setTimeout(() => {
      this.setupPatcher();
    }, 500);
  },
};
</script>

<style>
#loading-screen {
  width: auto;
  height: auto;
  padding: 20px;
}

.loading-steps {
  margin-left: 15px;
  margin-bottom: 10px;
}

.step-title {
  margin-left: 8px;
}

#save-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

#patcher-card {
  margin: 5ch;
  border-radius: 10px;
}

.patch-checkbox {
  margin-left: 15px;
}

.patch-item {
  display: flex;
}

.customization-textfield {
  width: 500px;
}
</style>
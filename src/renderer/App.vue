<template>

  <div :class="{ appQuit: quit }" id="app">

    <router-view></router-view>

  </div>

</template>

<script>

const { shell } = require('electron');

import { ipcRenderer } from 'electron'

export default {

    name: 'talexmusic',

    data() {

      return {

        windowX: 0,
        windowY: 0,

        quit: false,

      }

    },

  }
</script>

<style lang="scss">

::selection {

  color: var(--textnormalColor);
  background: rgba(69, 147, 196, 0.9);

}

.appQuit {

  animation: appQuit .25s

}

@keyframes appQuit {

  to {

    opacity: 0;
    transform: scaleY(0)

  }

}

.el-loading-mask {

  background-color: var(--mainColor) !important;

  opacity: 0.95;

}

#app {

  position: absolute;

  left: 1%;
  top: 1%;

  width: 98%;
  height: 98%;

  border-radius: 5px;

  opacity: 0.95;

  overflow: hidden;
  animation: appLoad .85s

}

@keyframes appLoad {

  0% {

    transform: scale(0.975);
    opacity: 0.75

  }

  100% {

    opacity: 0.95;
    transform: scale(1)

  }

}

</style>

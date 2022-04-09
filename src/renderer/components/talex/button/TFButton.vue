<template>

  <el-button class="TFButton-Page" @click="handleClick" v-bind="$attrs" v-on="$listeners" :type="type" :size="size" :icon="icon" :class="{ disabled }"
             :native-type="nativeType" :loading="loading" :plain="plain" :autofocus="autofocus" :round="round" :circle="circle">

    <slot></slot>

  </el-button>

</template>

<script>
export default {

  name: "TFButton",

  props: {

    type: {
      type: String,
      default: 'default'
    },

    size: String,

    icon: {

      type: String,
      default: ''

    },

    nativeType: {

      type: String,
      default: 'button'

    },

    loading: Boolean,

    disabled: Boolean,

    plain: Boolean,

    autofocus: Boolean,

    round: Boolean,

    circle: Boolean

  },

  methods: {

    handleClick(e) {

      if( this.disabled ) {

        e.preventDefault();

        return

      }

      setTimeout(async () => {

        this.$emit("clicker", e)

      }, 100)

    }

  }

}
</script>

<style lang="scss">

.TFButton-Page {

  * {

    color: var(--mainColor)

  }

  span {

    position: relative;

    left: -9px;

  }

}

</style>

<style lang="scss" scoped>

.TFButton-Page {

  position: relative;

  width: 100%;
  min-height: 32px;

  font-size: 16px;

  background-size: 400%;
  background-image: linear-gradient(to right, #25a4f5, #1b7cb9, #25a4f5, #5198de);

  border-radius: 5px;

  &:hover {

    animation: bubbleBgWaving 3.45s linear infinite;

  }

}

@keyframes bubbleBgWaving {

  0% {

    background-position: 0;

  }

  100% {

    background-position: -400%;

  }

}

.TFButton-Page::before {

  content: "";
  position: absolute;
  z-index: -1;

  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  border: 4px solid rgba(0,0,0,0);
  border-radius: 5px;

  transform: scale(1);
  transform-origin: center;

}

.TFButton-Page:hover::before {

  animation: bubbleIng 0.65s ease-out infinite;

}

@keyframes bubbleIng {

  to {

    border: 1px solid #1b7cb9;
    transform: scale(1.15, 1.5);

    opacity: 0;

  }

}

.BubbleButton:active::before {

  transition: all 0.35s ease-out;

  border: 1px solid #1b7cb9;
  transform: scale(1.5);
  filter: invert(50%) blur(10px);

  opacity: 0;

}

.BubbleButton:active {

  transition: all 0.15s;

  transform: scale(0.9);

}

.disabled {

  cursor: not-allowed;

  filter: invert(10%);

  border: 2px solid #1b7cb9;

  opacity: .75;

  &:hover::before {

    animation: unset;

  }

  &:hover {

    animation: unset;

    border: 2px solid #d32f2f;

  }

}

</style>

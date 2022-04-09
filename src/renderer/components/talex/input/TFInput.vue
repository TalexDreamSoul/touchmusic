<template>

  <div @mouseenter="hover = true" @mouseleave="hover = false" @focusin="focus = true" @focusout="focus = false"
       class="TFInput-Page" :class="{ 'pageFocus': focus, 'pageLoading': loading, 'pageError': error }">

    <p class="label">{{ label }}</p>

    <el-input v-bind="$attrs" v-on="$listeners" :type="type" :placeholder="placeholder" :prefix-icon="prefix_icon" :suffix-icon="suffix_icon">

      <template v-slot:prepend>

        <slot name="prepend"></slot>

      </template>

      <template v-slot:prefix>

        <slot name="prefix"></slot>

      </template>

      <template v-slot:suffix>

        <slot name="suffix"></slot>

      </template>

      <template v-slot:append>

        <slot name="append"></slot>

      </template>

    </el-input>

  </div>

</template>

<script>
export default {

  name: "TFInput",

  props: {

    type: {

      type: String,
      default: "primary"

    },

    prefix_icon: {

      type: String,
      default: ""

    },

    suffix_icon: {

      type: String,
      default: ""

    },

    placeholder: {

      type: String,
      default: ""

    },

    label: {

      type: String,
      default: ""

    },

    loading: {

      type: Boolean,
      default: false

    },

    error: {

      type: Boolean,
      default: false

    }

  },

  watch: {

    error: {

      handler(latest) {

        this.errorAnimation = latest

      }

    }

  },

  data() {

    return {

      hover: false,
      focus: false,
      errorAnimation: false,

    }

  }

}
</script>

<style lang="scss">

.TFInput-Page {

  position: relative;
  margin-bottom: 40px;

  input {

    position: relative;
    padding: 20px 5px;

    width: 100%;

    //border: 1px solid var(--color1) !important;
    background-color: var(--color1) !important;

    border-radius: 8px;
    color: var(--textnormalColor);
    font-size: 1.25em;
    filter: invert(5%);

    transition: all .35s;

  }

  .el-input__prefix {

    i {

      position: relative;

      top: 2px;

    }

  }

  .label {

    position: absolute;

    left: 2px;
    top: -40px;

    transform-origin: top left;
    transition: all .35s;

    //animation: labelShake .35s reverse;

  }

}

.pageFocus {

  * { color: var(--appColor) !important; }

  input {

    background-color: var(--color) !important;

  }

  .label {

    animation: labelShake .35s !important;

  }

}

@keyframes labelShake {

  0% {

    left: 0;
    opacity: 1;

  }

  35% {

    left: -5px;
    opacity: 0;

  }

  65% {

    left: 5px;
    opacity: 0;

  }

  100% {

    left: 0;
    opacity: 1;

  }

}

@keyframes shake {

  0% {

    transform: translateY(-20px) scale(.75);

  }

  25% {

    transform: translateY(-20px) scale(.75) translateX(-2px);

  }

  50% {

    transform: translateY(-20px) scale(.75);

  }

  100% {

    transform: translateY(-20px) scale(.75) translateX(2px);

  }

}
@keyframes shake2 {

  0% {

    transform: translateY(0);

  }

  25% {

    transform: translateX(-2px);

  }

  50% {

    transform: translateY(0);

  }

  100% {

    transform: translateX(2px);

  }

}

@keyframes inputBarLoading {

  0% {

    left: 0;
    width: 0;

  }

  25% {

    left: 25%;
    width: 50%;

  }

  50% {

    left: 50%;
    width: 100%;

  }

  75% {

    left: 75%;
    width: 50%;

  }

  100% {

    left: 100%;
    width: 0;

  }

}

</style>

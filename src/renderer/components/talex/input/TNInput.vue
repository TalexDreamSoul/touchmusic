<template>

  <div @mouseenter="hover = true" @mouseleave="hover = false" @focusin="focus = true" @focusout="focus = false"
       class="TNInput-Page">

    <p class="label" :class="{ 'labelFocus': focus, 'labelLoading': loading, 'labelError': !focus && error, 'labelFocusError': focus && error, 'labelErrorAnimation': errorAnimation }">{{ label }}</p>

    <el-input :class="{ 'InputHover': hover, 'InputFocus': focus, 'InputLoading': loading, 'InputError': error }"
              v-bind="$attrs" v-on="$listeners" :type="type" :placeholder="placeholder" :prefix-icon="prefix_icon" :suffix-icon="suffix_icon">

      <template v-slot:prepend>

        <!--        <div class="TAsideInput-Aside"></div>-->

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

  name: "TNInput",

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

.TNInput-Page {

  position: relative;
  margin-top: 5px;
  margin-bottom: 20px;

  input {

    position: relative;
    padding: 0;

    width: 100%;
    border: none !important;
    background-color: rgba(0, 0, 0, 0) !important;

    border-radius: 3px 3px 0 0;
    color: var(--textnormalColor);
    font-size: 1.25em;

    transition: all .35s;

    transform: translateY(5px);
    opacity: 0;

  }

  .label {

    position: absolute;

    left: 0;
    top: -12px;

    transform-origin: top left;
    transition: all .35s;

  }

  .labelErrorAnimation {

    animation: shake .25s 3 ease-out;

  }

  .labelError, .labelFocusError {

    color: #b04242 !important;

  }

  .labelFocusError {

    transform: translateY(-20px) scale(.75);

  }

  .labelFocus {

    color: var(--appColor);
    transform: translateY(-20px) scale(.75);

  }

  .labelLoading {

    transform: translateX(-20px);
    opacity: 0;

  }

  .el-input {

    &:after {

      content: "";
      position: absolute;

      top: 100%;
      left: 50%;

      width: 0;
      height: 2px;

      transform: translateX(-50%);
      background-color: var(--appColor);
      filter: invert(50%);
      opacity: 0.75;

      transition: all .35s;

    }

    &:before {

      content: "";
      position: absolute;

      top: 100%;
      left: 0;

      width: 100%;
      height: 2px;

      background-color: var(--appColor);
      filter: invert(50%);
      opacity: 0.75;

    }

  }

  .InputFocus {

    &:after {

      width: 100%;

      filter: invert(0%) !important;
      opacity: 1 !important;

    }

    input {

      color: var(--appColor);

      transform: translateY(0);
      opacity: 1;

    }

  }

  .InputLoading {

    &:after {

      filter: invert(0%) !important;
      opacity: 1 !important;

      animation: inputBarLoading .75s linear infinite;

    }

    input {

      pointer-events: none;

    }

  }

  .InputError {

    &:after {

      width: 100%;
      background-color: #b04242 !important;

      filter: invert(0%) !important;
      opacity: 1 !important;

    }

  }

  .InputHover {

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

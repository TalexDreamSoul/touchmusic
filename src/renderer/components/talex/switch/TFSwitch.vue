<template>

  <div class="TFSwitch-Page" @click="onClick" :class="value ? 'selected' : ''">

    <div class="TFSwitch-Main"></div>

    <p class="TFSwitch-Label"><slot></slot></p>

  </div>

</template>

<script>
export default {
  name: "TFSwitch",
  props: {

    value: {

      type: Boolean,
      required: true,

    },

    disabled: {

      type: Boolean,
      default: false,

    }

  },

  methods: {

    onClick(e) { this.$emit('click', e) }

  }

}
</script>

<style lang="scss" scoped>

.TFSwitch-Page {

  position: relative;
  margin: 8px 0;
  padding: 4px 0;

  &:hover {

    transition: all .25s;

    opacity: .9;

  }

  .TFSwitch-Main {

    position: relative;
    display: inline-block;

    width: 18px;
    height: 18px;

    border: solid 1px var(--textnormalColor);
    border-radius: 5px;

    &:after {

      content: "";
      position: absolute;

      left: 9px;
      top: 9px;

      width: 0;
      height: 0;

      border-radius: 50%;
      background-color: var(--appColor);

      transition: all .25s;

    }

  }

  .TFSwitch-Label {

    position: relative;
    display: inline-block;

    left: 3px;
    top: -5px;

    transition: all .25s;

  }

  cursor: pointer;
  user-select: none;

}

.selected {

  .TFSwitch-Main {

    border: solid 1px var(--appColor);

    &:after {

      left: 0;
      top: 0;

      height: 18px;
      width: 18px;

      border-radius: 3px;

    }

  }

  .TFSwitch-Label {

    color: var(--appColor)

  }

}

</style>

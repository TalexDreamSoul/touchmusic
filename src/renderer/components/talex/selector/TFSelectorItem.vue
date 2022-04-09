<template>

  <div class="TFSelectorItemPage" :class="selected ? 'selected' : ''" @click="handleClick" ref="TFSelectorItemRef">

    <i :class="icon"></i>
    <span class="label">{{ title }}</span>

  </div>

</template>

<script>
export default {
  name: "TFSelectorItem",

  props: {

    title: '',
    icon: '',

  },

  data() {

    return { selected: false, }

  },

  methods: {

    handleClick(e) {

      this.$emit('tf-selector-item-click', this.$refs.TFSelectorItemRef, e)

    },

    refreshSelect(select) {

      this.selected = select

    }

  }
}
</script>

<style lang="scss" scoped>

.TFSelectorItemPage {

  position: relative;

  left: 5px;

  margin: 20px auto;
  padding: 8px 10px;

  cursor: pointer;

  transition: all .45s;

  .label {

    position: relative;

    top: -3px;
    left: 15px;

    font-size: 15px;
    transition: all .45s;

  }

  i {

    font-size: 22px;
    transition: all .45s;

  }

}

.selected {

  i, .label { color: var(--appColor); }

  background-color: var(--hoverColor);

  opacity: 0.79;
  backdrop-filter: blur(10px);

}

</style>

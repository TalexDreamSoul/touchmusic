<template>

  <div class="TFSelectorPage">

    <div ref="PointerRef" class="TFSelectorPointer"></div>

    <slot></slot>

  </div>

</template>

<script>

import TFSelectorItem from "./TFSelectorItem";
export default {
  name: "TFSelector",
  components: {TFSelectorItem},
  mounted() {

    this.$nextTick(() => {

      let ind = 0;

      this.$slots.default.forEach((node) => {

        if( node.componentOptions && node.componentOptions.tag === 'TFSelectorItem' ) {

          const obj = { ind, node }

          this.tabs.push( obj )

          node.componentInstance.$on('tf-selector-item-click', (ref, e) => { if( this.animating ) return; this.selectIndex = obj.ind })

          ++ind;

        }

      })

      this.$nextTick(() => {

        this.selectIndex = 0

      })

    })

  },
  watch: {

    selectIndex: {

      handler(latest) {

        if( latest < 0 || latest > this.tabs.length - 1 ) {

          this.$refs.PointerRef.style.opacity = '0'
          return

        } else {

          this.$refs.PointerRef.style.opacity = '1'

        }

        this.refreshChildrenSelected()
        this.fixPointerPos(this.tabs[latest].node)

      }

    }

  },
  methods: {

    refreshChildrenSelected() {

      this.tabs.forEach((tab, ind) => {

        tab.node.componentInstance.refreshSelect(this.selectIndex === ind)

      })

    },

    fixPointerPos(vnode) {

      if( this.animating ) return

      this.animating = true

      setTimeout(() => {

        this.animating = false

      }, 500)

      const node = vnode.elm
      const el = this.$refs.PointerRef

      const y = el.clientTop || el.offsetTop
      const height = el.clientHeight
      const targetY = node.offsetTop
      const targetHeight = node.clientHeight

      if( y < targetY ) {

        const addHeight = targetY - y + (targetHeight * 1.5) - height

        el.style.height = addHeight + 'px'
        const posY = targetY + (targetHeight / 2) - (height / 2)

        setTimeout(() => {

          el.style.height = (targetHeight) + 'px'
          el.style.top = posY + 'px'

        }, 250)

      } else {

        const addHeight = (y + height) - (targetY + (targetHeight * 0.5))

        el.style.transition = 'height .15s, top .15s'
        el.style.top = (targetY + (targetHeight * 0.5)) + 'px'
        el.style.height = (addHeight) + 'px'

        setTimeout(() => {

          el.style.transition = 'height .15s, top .35s'

          const posY = targetY + (targetHeight / 2) - (height / 2)
          el.style.top = posY + 'px'

          el.style.height = (targetHeight) + 'px'

        }, 250)

      }

      setTimeout(() => {

        el.style.top = targetY + 'px'

      }, 350)

    }

  },
  data() {

   return {

     selectIndex: -1,
     tabs: [],
     animating: false,

   }

  }

}
</script>

<style lang="scss" scoped>

.TFSelectorPage {

  position: relative;

  height: auto;

  .TFSelectorPointer {

    position: absolute;

    top: 0;
    left: 0;

    width: 5px;
    height: 0;

    border-radius: 5px;
    opacity: 0;

    box-shadow: 1px 0 5px var(--appColor);
    background-color: var(--appColor);
    transition: height .35s, top .15s;

  }

  overflow: hidden;

}

</style>

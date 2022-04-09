<template>

  <div class="MusicMainPage" ref="MusicMainPageRef">

    <div class="MusicAsideBar">

      <TFSelector>

        <TFSelectorItem title="探索世界" icon="el-icon-discover"></TFSelectorItem>
        <TFSelectorItem title="我的曲库" icon="el-icon-suitcase-1"></TFSelectorItem>
        <TFSelectorItem title="上云存盘" icon="el-icon-cloudy"></TFSelectorItem>

      </TFSelector>

      <div class="footer">



      </div>

    </div>

    <div class="MusicMain">

      <router-view></router-view>

    </div>

  </div>

</template>

<script>
import TFSelector from "../../components/talex/selector/TFSelector";
import TFSelectorItem from "../../components/talex/selector/TFSelectorItem";
export default {
  name: "MusicMain",
  components: {TFSelectorItem, TFSelector},
  created() {

    setTimeout(async() => {

      try {

        const { body: back } = await this.$tmusic.userCloud()

        console.log(back)

        const data = back.data

        if( !data.account ) {

          const el =  this.$refs.MusicMainPageRef

          el.style.transform = 'translateY(-20%) scale(0.85)'
          el.style.opacity = '0'

          await this.$router.push('/login')

        }

      } catch(e) {

        const el =  this.$refs.MusicMainPageRef

        el.style.transform = 'translateY(-20%) scale(0.85)'
        el.style.opacity = '0'

        await this.$router.push('/login')

      }

    }, 1000)

  }
}
</script>

<style lang="scss" scoped>

.MusicAsideBar {

  .footer {

    position: absolute;

    bottom: 30px;

    width: 100%;
    height: 150px;

    background-color: red;

  }

  position: relative;

  width: 20%;
  height: 100%;

  background-color: var(--mainColor);

}

.MusicMainPage {

  position: absolute;

  width: 100%;
  height: 100%;

  //background-color: var(--mainColor);

  transition: all .45s;
  animation: pageLoad .35s;

}

@keyframes pageLoad {

  from {

    opacity: 0;
    transform: translate(0, -20%) scale(0.85);

  }

  to {

    opacity: 1;
    transform: translate(0, 0) scale(1);

  }

}

</style>

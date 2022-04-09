<template>

  <div class="MainChat-Page" ref="MainChatRef">

    <div class="aside-list">

      <ChatList :list="chatListArray" @classJoin="classJoin" @selectChat="selectChat" ref="chatList"></ChatList>

    </div>

    <div class="main-container" :class="chat ? 'main-container-join' : 'main-container-exit'">

      <div class="main-container__header">

        <span class="main-container__header__innerContent">{{ (chat && chat.name) || '' }}</span>

      </div>

      <div class="main-container__chat">

        <TalexLightChat :messages="nowChatMessages" @onViewImg="viewImg" ref="LightChat"></TalexLightChat>

      </div>

      <div class="main-container__input">

        <TalexChatInputer></TalexChatInputer>

      </div>

    </div>

    <TalexImgViewer @close="imgLookerVisible = false" :visible="imgLookerVisible" :src="imgLookerSrc"></TalexImgViewer>

  </div>

</template>

<script>

export default {

  name: "MainChat",

  data() {

    return {

      userQQ: this.$touchq.$userData.$nowUser,

      imgLookerVisible: false,
      imgLookerSrc: "",

      chatLists: new Map(),
      chatListArray: [],
      chat: null,

      chatMap: new Map(),
      nowChatMessages: [],

    }

  },

  created() {

    this.initial()

  },

  methods: {

    viewImg(img) {

      this.imgLookerSrc = img.src

      this.imgLookerVisible = true

    },

    classJoin(item) {

      item.join = true

    },

    selectChat(chat) {

      if( this.chat === chat ) return

      this.chat = null

      setTimeout(() => {

        this.nowChatMessages = this.chatMap.get(chat.key)
        this.chat = chat

      }, 300)

    },

    initial() {

      this.$touchq.$userData.onChatListEvent((list) => {

        switch( list.type ) {

          case 'group': {

            const groupId = list.group.groupId;
            const msgType = (this.userQQ === list.sender.user_id) ? 'right' : 'left'

            const obj = { key: groupId, msgType, url: `https://p.qlogo.cn/gh/${groupId}/${groupId}/640`, name: list.group.groupName, fixContent: list.sender.nickname + ": " + list.content, refresh: true, ...list }

            this.chatLists.set(groupId, obj)

            const msgs = this.chatMap.get(obj.key) || []

            msgs.push(obj)

            this.chatMap.set(obj.key, msgs)

            break

          }

          case 'private': {

            const userId = list.sender.user_id;
            const msgType = (this.userQQ === list.user_id) ? 'right' : 'left'

            const obj = { key: userId, msgType, url: `https://q1.qlogo.cn/g?b=qq&s=640&nk=${userId}`, name: list.sender.nickname, fixContent: list.content, refresh: true, ...list}

            this.chatLists.set(userId, obj)

            const msgs = [] || this.chatMap.get(obj.key)

            msgs.push(obj)

            this.chatMap.set(obj.key, msgs)

            break

          }

        }

        const array = Array.from(this.chatLists.values())

        array.sort((a, b) => {

          return b.time - a.time

        })

        this.chatListArray = [ ...array ]

      })

    }

  }

}
</script>

<style lang="scss">

.MainChat-Page {

  transition: all .25s;

}

::-webkit-scrollbar-thumb {

  background-color: var(--scrollColor) !important;
  border-radius: 3px;

  transition: all .25s;

}
::-webkit-scrollbar-track {

  border-radius: 1px;
  width: 10px !important;
  background-color: var(--containerBg) !important;

  transition: all .25s;

}

.main-container__chat {

  position: relative;

  margin-top: -11px;

  max-width: 80%;
  width: auto;

  height: 450px;

  overflow-y: hidden;

}

.main-container__input {

  position: relative;

  z-index: 500;

  //max-width: 80%;
  width: 80%;

  height: 170px;

  transform: translateX(5px);

}

.loadingDataDialog {

  .loading {

    position: relative;

    left: 50%;

    transform: translate(-50%, 50%);

    width: 32px;
    height: 32px;

    margin-bottom: 48px;

  }

}

.main-container__header__innerContent:hover {

  cursor: pointer;

  opacity: 0.75;

}

.main-container__header__innerContent {

  position: absolute;

  padding-left: 15px;

  top: 50%;

  transform: translateY(-50%);

  font-size: 20px;

  color: var(--textColor);

}

.main-container__header {

  position: relative;

  margin-bottom: 10px;

  height: 57px;

  border-bottom: 2px solid var(--hoverColor);

  background-color: var(--mainColor);

}

.main-container {

  position: relative;

  left: 20%;

  min-height: 100%;
  height: 100%;
  max-height: 100%;

  transition: all .25s;
  transform: scale(0.975) !important;

  animation: mainContainerLoad .5s

}

.main-container-join {

  opacity: 1 !important;

  transform: scale(1) !important

}

.main-container-exit {

  opacity: 0 !important;

  transform: scale(0.975) !important

}

@keyframes mainContainerLoad {

  from {

    opacity: 0;

    transform: scale(0.975)

  }

  to {

    opacity: 1;

    transform: scale(1)

  }

}

@keyframes listLoad {

  from {

    transform: translateX(-200%);

  }

}

.aside-list {

  position: absolute;
  z-index: 10;

  left: 0;

  min-height: 100%;
  height: 100%;
  max-height: 100%;

  width: 20%;

  border-right: 2px solid var(--hoverColor);

  animation: listLoad .25s;

}

</style>

<template>

  <div class="Login-Page" :class="!startUpLoading ? 'LoginPageJoiner' : ''" ref="LoginPageRef">

    <div class="Login-Background">

     <div class="AsideLiteImage">

       <LiteImage></LiteImage>

     </div>

      <div :class="startUpLoading ? 'StartUpProgressBarJoin' : 'StartUpProgressBarExit'" class="StartUpProgressBar">

        <div class="barbg"></div>
        <div class="bar" :style="`width: ${startUpProgress}%` + (startUpFail ? `;background-color: #e4666d` : '')"></div>
        <span :style="startUpFail ? 'color: #e4666d' : ''">{{ startUpText }}</span>

      </div>

      <div class="Bg-Bg">

        <img src="./../assets/TalexMusic-logo.png" /><span>TalexMusic</span>
        <TMusicCompose class="MusicCompose"></TMusicCompose>

      </div>

    </div>

    <div class="Login-Form_Container" :class="!startUpLoading ? 'FormJoiner' : ''">

      <div class="Login-Form_Wrapper">

        <div class="close"><i class="el-icon-close"></i></div>

        <br />

        <h1>Log in</h1>

        <br />

        <div class="Login-Form_real" ref="formRef1">

          <TFInput prefix_icon="el-icon-user" label="账号" placeholder="手机号/邮箱" v-model="form.account"></TFInput>
          <TFInput prefix_icon="el-icon-lock" label="密码" placeholder="输入你的密码" type="password" v-model="form.pass"></TFInput>

          <TFButton>登录</TFButton>

          <div class="Login-Form_justify">

            <TFSwitch v-model="form.rememberMe" @click="form.rememberMe = !form.rememberMe">记住密码</TFSwitch>

            <a>忘记密码？</a>

          </div>

        </div>

        <div class="Login-Form_real form2 formLeave"ref="formRef2" style="position:absolute">

          <TFInput prefix_icon="el-icon-user" label="手机号" placeholder="请输入 手机号码" v-model="form.phoneNumber"></TFInput>

          <div class="phone-verify-wrapper">

            <TFInput prefix_icon="el-icon-lock" label="验证码" placeholder="请输入 4位 验证码" v-model="form.verifyCode" class="verifyCode" :style="'width:' + (smsBtn.cooldown !== -1 ? '65%' : '80%')"></TFInput>
            <div class="verifyButton" :style="'width:' + (smsBtn.cooldown !== -1 ? '25%' : '10%')" @click="sendSMS" :class="{ 'verifyCodeDisabled': !form.phoneNumberConfirm || smsBtn.cooldown !== -1 }">{{ (smsBtn.cooldown !== -1 && smsBtn.cooldown + ' 秒后重试') || '发送' }}</div>

          </div>

          <TFButton @clicker="loginWithPhoneCode" :disabled="!form.phoneNumberConfirm || !smsBtn.codeInputted">登录</TFButton>

        </div>

        <div class="Login-Form_real form3 formLeave" ref="formRef3" style="position:absolute">

          <div class="CodeWrapper" :class="{ 'loading': qrCode.codeGetting, 'scanned': qrCode.scanned }">

            <div class="ScanInformation">

              <span class="Information-Label">{{ qrCode.scanned && qrCode.information.label }}</span>

              <div class="ScanAvatarWrapper">

                <img class="Information-Avatar" :src="qrCode.scanned && qrCode.information.avatar" />

              </div>

            </div>

            <div class="Container">

<!--              <img class="CodeGuideImg" src="https://s2.music.126.net/style/web2/img/qr_guide.png?a367711820ecdf97f0430e781112d15c" />-->

              <VueQr class="CodeImg" :logoBackgroundColor="mainColor" :text="qrCode.url"></VueQr>

              <span class="CodeTip" @click="inputCookie">使用<span style="color: #0c73c2;cursor: pointer">LoginCookie</span>直接登录</span>

            </div>

          </div>

        </div>

        <TipMentioner ref="tip"></TipMentioner>

        <div class="FormSelector">

          <el-tooltip content="账号密码登录">

            <div @click="formIndex = 0" :class="formIndex === 0 ? 'selected' : ''" class="FormSelectorItem"></div>

          </el-tooltip>

          <el-tooltip content="手机验证码登录">

            <div @click="formIndex = 1" :class="formIndex === 1 ? 'selected' : ''" class="FormSelectorItem"></div>

          </el-tooltip>

          <el-tooltip content="扫码登录">

            <div @click="formIndex = 2" :class="formIndex === 2 ? 'selected' : ''" class="FormSelectorItem"></div>

          </el-tooltip>

        </div>

        <span class="tipRegister">还没有账号？<span>注册一个</span></span>

      </div>

    </div>

  </div>

</template>

<script>

const logo = require("./../assets/talexmusic.png")
const mainColor = document.body.style.getPropertyValue("--mainColor")

import TFButton from "../components/talex/button/TFButton";
import TFInput from '../components/talex/input/TFInput'
import TMusicCompose from "../components/talex/tmusic/svg/TMusicCompose";
import TFSwitch from "../components/talex/switch/TFSwitch";
import TipMentioner from "../components/talex/mention/TipMentioner";

import VueQr from 'vue-qr'

import electron from 'electron'

export default {

  name: "Login",

  components: {TipMentioner, TFInput, TMusicCompose, TFButton, TFSwitch, VueQr },

  data() {

    return {

      sliderDialogVisible: false,
      sliderSrc: "",

      startUpLoading: true,
      startUpText: "正在初始化...",
      startUpProgress: 0,
      startUpFail: false,

      form: { account: "", pass: "", rememberMe: false, phoneNumber: "", verifyCode: "", phoneNumberConfirm: false },
      smsBtn: { cooldown: -1, codeInputted: false },
      formIndex: 0,

      qrCode: { key: "", url: "", codeGetting: false, interval: null, scanned: false }

    }

  },

  beforeDestroy() {

    clearInterval(this.qrCode.interval)

  },

  computed: {

    logo() {

      return logo;

    },

    mainColor() {

      return mainColor

    }

  },

  watch: {

    formIndex: {

      handler(latest, old) {

        const latestRef = this.$refs["formRef" + (latest + 1)]
        const oldRef = this.$refs["formRef" + (old + 1)]

        oldRef.className = oldRef.className.replace("formEnter", "")
        oldRef.classList.add("formLeave")

        setTimeout(() => {

          oldRef.style.position = "absolute"

          latestRef.style.position = "relative"

          latestRef.className = latestRef.className.replace(" formLeave", "")
          latestRef.classList.add("formEnter")

        }, 350)

        if( latest === 1 ) {

          this.$refs.tip.showTip("仅支持中国大陆手机号码", -1)

        } else {

          this.$refs.tip.closeTip()

        }

        if(latest === 2) {

          this.getQrCode()

        } else {

          if( this.qrCode.interval )
            clearInterval( this.qrCode.interval );

        }

      }

    },

    'form.phoneNumber': {

      handler(latest) {

        // China phone number regx
        this.form.phoneNumberConfirm = latest.length === 11 && /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(latest)

      }

    },

    'form.verifyCode': {

      handler(latest, old) {

        // Verify the code is 4 digits
        this.smsBtn.codeInputted = this.form.phoneNumberConfirm && latest.length === 4 && /^\d{4}$/.test(latest)

      }

    }

  },

  methods: {

    async sendSMS() {

      if( !this.form.phoneNumberConfirm ) {

        return

      }

      this.smsBtn.cooldown = 60

      const cd = () => {

        this.smsBtn.cooldown--;

        if( this.smsBtn.cooldown > 0 ) {

          setTimeout(() => {

            cd()

          }, 1000)

        } else {

          this.smsBtn.cooldown = -1

        }

      }

      cd()

      const { body: res } = await this.$tmusic.sendSMS( this.form.phoneNumber )

      if( res.code === 200 && res.data ) {

        this.$refs.tip.showTip("验证码已发送，请注意查收", -1)

      } else {

        this.$refs.tip.showTip("验证码发送失败，请稍后重试", -1)

      }

    },

    async loginWithPhoneCode() {

      if( !this.smsBtn.codeInputted ) return

      this.smsBtn.codeInputted = false
      const { phoneNumber, verifyCode } = this.form

      let res

      try {

        res = await this.$tmusic.loginByCellphone(phoneNumber, verifyCode)

        res = res.body

      } catch( err ) {

        res = err.body

      }

      if( res.code !== 200 ) {

        const msg = res.message + ( res.loginType ? '(' + res.loginType + ')' : '')

        this.$refs.tip.showTip( msg, -1 )

        // this.form.verifyCode = ''
        this.smsBtn.codeInputted = true

      } else {

        await this.loginSuccess()

      }

      console.log(res)

    },

    async loginSuccess() {

      this.$refs.LoginPageRef.classList.add('LoginPageSuccess')

      console.log(await this.$tmusic.loginStatus())

      setTimeout(() => {

         this.$router.push("/main")

      }, 350)

    },

    async getQrCode() {

      this.qrCode.codeGetting = true

      const obj = await this.$tmusic.createLoginQrKey()

      this.qrCode.key = obj.body.data.unikey

      const { body: res } = await this.$tmusic.createLoginQr(this.qrCode.key)

      this.qrCode.url = res.data.qrurl

      this.qrCode.codeGetting = false

      this.qrCode.interval = setInterval(async() => {

        const { body: back } = await this.$tmusic.checkLoginQrCode(this.qrCode.key)

        if( back.code !== 801 ) console.log( back.code )

        if( back.code === 800 ) {

          clearInterval( this.qrCode.interval );

          this.qrCode.scanned = false

          await this.getQrCode()

          return

        }

        if( back.code === 803 ) {

          clearInterval( this.qrCode.interval );

          console.log( JSON.stringify( back ) )

          if( !back.cookie ) {

            this.qrCode.scanned = false

            console.log( electron.session )

            this.$message.error('无法获取到 cookie')
            await this.getQrCode()

            return

          }

          await this.loginSuccess()

          return

        }

        if( back.code === 802 ) {

          this.qrCode.scanned = true

          this.qrCode.information = {

            label: back.nickname,
            avatar: back.avatarUrl

          }

        }

      }, 1000)

    },

    inputCookie() {

      this.$prompt('请输入 MusicCookie', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {

        clearInterval( this.qrCode.interval );

        this.$tmusic.subMitCookie(value)

        this.loginSuccess()

      }).catch(() => {
      });

    }

  },

  mounted() {

    setTimeout(() => {

      let deny = false

      this.$tmusic.initial((access, progress, msg) => {

        if( deny ) return

        this.startUpProgress = progress + 0
        this.startUpText = msg

        if( access ) {

          if( progress >= 100 ) {

            setTimeout(() => {

              this.startUpLoading = false

            }, 800)

          }

        } else {

          this.startUpFail = true
          this.startUpProgress = 100

          deny = true

        }

      })

    }, 1000)

  },

}
</script>

<style lang="scss" scoped>

.FormJoiner {

  top: 0 !important;
  left: 60% !important;

  width: 40% !important;
  height: 100% !important;

  background-color: var(--mainColor) !important;

  opacity: 1 !important;

}

.LoginPageJoiner {

  transition: all .35s;

  width: 100% !important;
  height: 100% !important;

  .Login-Background {

    background-color: var(--color) !important;

  }

  .Bg-Bg {

    transition: all .35s;

    opacity: 1 !important;

    left: 0 !important;

    span {

      left: calc(2% + 64px) !important;

      opacity: 1 !important;

    }

    img {

      left: 2% !important;

      opacity: 1 !important;

    }

  }

  .MusicCompose {

    transition: all .35s;

    opacity: 1 !important;

  }

  .AsideLiteImage {

    transform: translate(-50%, -57%) !important;
    opacity: 0 !important;

  }

}

.Login-Form_Container {

  overflow: hidden;

  .Login-Form_Wrapper {

    h1 {

      font-size: 2.75em

    }

    .formLeave {

      transform: translate(15%, 0);

      opacity: 0;

      pointer-events: none;

    }

    .formEnter {

      transform: translate(0, 0);

      opacity: 1;

    }

    padding: 10%;

    .FormSelector {

      position: absolute;
      padding: 0 5px;
      display: flex;

      justify-content: center;

      bottom: 110px;
      left: 50%;

      width: 40px;
      height: 24px;

      border-radius: 15px;

      transform: translate(-50%, 0) scale(1.001);
      background-color: var(--hoverColor);

      opacity: .7;

      .FormSelectorItem {

        position: relative;
        display: inline-block;

        margin: auto;

        width: 8px;
        height: 8px;

        border-radius: 50%;
        border: 1px solid black;

        cursor: pointer;

        &:after {

          content: "";
          position: absolute;

          left: 4px;
          top: 4px;

          width: 0;
          height: 0;

          border-radius: 50%;

          background-color: black;

          transition: all .35s;

        }

      }

      .selected {

        &:after {

          left: 0;
          top: 0;

          width: 8px;
          height: 8px;

          border-radius: 0;
          background-color: black;

        }

      }

    }

    .TipMentioner-Page {

      position: relative;

      top: 30px;

    }

    .close {

      position: absolute;

      top: -48px;
      right: -48px;

      width: 128px;
      height: 128px;

      background-color: var(--appColor);

      border-radius: 50%;
      cursor: pointer;

      transition: all .25s;

      .el-icon-close {

        position: absolute;

        top: 50%;
        left: 25%;

        color: var(--themeColor);

        font-size: 30px;

        transition: all .25s;

      }

      &:hover {

        top: -42px;
        right: -42px;

        .el-icon-close { color: red; }

      }

    }

    .Login-Form_real {

      position: relative;

      margin-top: 8%;

      .Login-Form_justify {

        margin-top: -10px;

        justify-content: space-between;

        .TFSwitch-Page {

          float: left;

        }

        a {

          position: relative;

          float: right;

          top: 21px;

          cursor: pointer;
          transition: all .35s;

          &:hover {

            color: var(--appColor);

            transform: translateX(-5px);

          }

        }

      }

      transition: all .35s;

    }

    .form2 {

      .phone-verify-wrapper {

        white-space: nowrap;

        //overflow: hidden;

      }

      .verifyButton {

        position: relative;
        display: inline-block;

        left: calc(5% - 10.5px);

        padding: 10.5px;

        width: 10%;

        border-radius: 5px;
        background-color: var(--appColor2);

        text-align: center;
        color: var(--themeColor);

        cursor: pointer;
        transition: all .25s;

        user-select: none;

        &:active {

          transform: scale(.85)

        }

      }

      .verifyCode {

        width: 80%;

        display: inline-block;

      }

      .verifyCodeDisabled {

        cursor: not-allowed;
        pointer-events: none;

        filter: invert(10%);

        opacity: .75;

      }

    }

    .form3 {

      .ScanInformation {

        position: absolute;

        opacity: 0;

        transform: translateY(-20%);

        transition: all .35s;

        .Information-Label {

          position: absolute;
          padding: 5px 10px;

          top: 92%;
          left: 50%;

          background-color: var(--hoverColor);
          border-radius: 15px;

          transform: translateX(-50%);

        }

        .ScanAvatarWrapper {

          position: relative;
          padding: 10px;

          top: -12%;
          left: 50%;

          width: 50%;

          background-color: var(--hoverColor);
          border-radius: 50%;

          transform: translateX(-50%);
          overflow: hidden;

          animation: breathing 2s infinite;

          .Information-Avatar {

            width: 100%;

            border-radius: 50%;

          }

          &:before {

            content: "";
            position: absolute;

            width: 100%;
            height: 100%;

            left: 50%;
            top: 50%;

            background-color: var(--textOpacityColor3);

            transform: translate(-50%, -50%);

          }

          &:after {

            content: "请确认授权";
            position: absolute;
            padding: 10px;

            left: 50%;
            top: 50%;

            font-size: 12px;

            background-color: var(--hoverColor);
            border-radius: 15px;
            opacity: .8;
            backdrop-filter: blur(15px);

            transform: translate(-50%, -50%);

          }

        }

      }

      .CodeWrapper {

        position: relative;
        display: flex;
        justify-content: center;

        top: -20px;

        .CodeImg {

          position: relative;

          width: 256px;

          transition: all .25s;

        }

        .CodeTip {

          position: relative;
          display: block;

          top: -25px;

          font-size: 13px;

          text-align: center;

          transition: all .25s;

        }

      }

      .scanned {

        .ScanInformation {

          position: relative;

          opacity: 1;

          transform: translateY(0);

          transition: all .35s;

        }

        .Container {

          position: absolute;

          transform: translateY(20%);

          opacity: 0;

        }

      }

      .loading {

        .CodeGuideImg {

          left: 50%;

          transform: translateX(-50%)

        }

        .CodeImg {

          transform: translateX(50%);
          opacity: 0;

        }

        .CodeTip {

          transform: translateX(50%);
          opacity: 0;

        }

      }

    }

    .tipRegister {

      position: absolute;

      left: 10%;
      bottom: 20px;

      span {

        color: var(--appColor)

      }

      cursor: pointer;
      transition: all .25s;

      &:hover {

        opacity: .9;
        transform: translateY(-5px);

      }

    }

  }

  z-index: 1;
  position: absolute;

  top: 50%;
  left: 100%;

  width: 70%;
  height: 20%;

  border-radius: 3px;
  background-color: var(--themeOpacityColor);
  backdrop-filter: saturate(100%) blur(5px);
  opacity: 0;

  box-shadow:
      2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
      6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
      12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
      22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
      41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
      100px 100px 80px rgba(0, 0, 0, 0.07);

  transition: all .45s;
  -webkit-app-region: no-drag

}

.StartUpProgressBarJoin {

  transform: translate(-50%, -50%) !important;
  opacity: 1 !important;

}

.StartUpProgressBar {

  position: absolute;

  width: 150px;
  height: 5px;

  left: 50%;
  top: 62%;

  transform: translate(-50%, 50%);
  border-radius: 3px;

  .bar {

    position: absolute;

    height: 5px;

    background-color: var(--mainColor);
    transition: all .45s;
    border-radius: 3px;

  }

  .barbg {

    content: "";
    position: absolute;

    width: 150px;
    height: 5px;

    background-color: var(--mainOpacityColor);
    border-radius: 3px;

  }

  span {

    position: absolute;

    width: 100%;

    left: 50%;

    text-align: center;
    transform: translate(-50%, 10px);

    color: var(--mainColor)

  }

  opacity: 0;
  transition: all .35s;

}

.Login-Background {

  .MusicCompose {

    position: absolute;

    top: 50%;
    left: 30%;

    width: 50%;
    height: 50%;

    transform: translate(-50%, -50%);
    opacity: 0;

  }

  .Bg-Bg {

    left: -20%;

    opacity: 0;

    img {

      position: absolute;

      left: calc(2% + 16px);
      top: 2%;

      width: 64px;
      opacity: 0;

      transition: all 1.35s;

    }

    span {

      position: absolute;

      left: 2%;
      top: calc(2% + 15px);

      font-size: 20px;
      color: var(--appColor);
      opacity: 0;

      transition: all 1.35s;

    }

  }

  z-index: 1;
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  border-radius: 5px;
  background-color: var(--appColor);

  .AsideLiteImage {

    position: absolute;

    left: 50%;
    top: 50%;

    height: 100%;
    width: 100%;

    transform: translate(-50%, -65%);
    transition: all .25s;

    opacity: 1;

  }

}

.Login-Page {

  position: absolute;

  left: 50%;
  top: 50%;

  width: 35%;
  height: 90%;

  box-shadow:
      2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
      6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
      12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
      22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
      41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
      100px 100px 80px rgba(0, 0, 0, 0.07);
  transform: translate(-50%, -50%);

  -webkit-app-region: drag

}

.LoginPageSuccess {

  transition: all .35s;

  opacity: 0;
  transform: translate(-50%, -80%) scale(0.85);

}

@keyframes breathing {

  0%, 100% {

    filter: drop-shadow(0 0 0 var(--themeOpacityColor));

  }

  50% {

    transform: translateX(-50%) scale(1.01) translateY(-2%);
    filter: drop-shadow(0 0 16px var(--themeOpacityColor));

  }

}

</style>

import Vue from 'vue'

import storage, { initial } from './datastore'
import axios from 'axios'

const { login_qr_key, login_qr_create, login_qr_check, login_status, login_refresh, user_cloud, captcha_sent, captcha_verify, login_cellphone } = require('NeteaseCloudMusicApi')

class TMusic {

    constructor() {

        this.$vue = this.__proto__.$vue
        this.$db = storage

        this.axios = axios

        axios.defaults.withCredentials = true

        console.log(this)

    }

    subMitCookie(cookie) {

        this.$cookie = cookie

        axios.defaults.headers.common['Cookie'] = cookie

        console.log( axios )

    }

    userCloud() {

        console.log( this.$cookie ? { cookie: this.$cookie } : {} )

        return user_cloud(this.$cookie)

    }

    loginRefresh() {

        return login_refresh(this.$cookie ? { cookie: this.$cookie } : {})

    }

    loginStatus() {

        return login_status(this.$cookie ? { cookie: this.$cookie } : {})

    }

    getUserDetail(uid) {

        const { user_detail } = require('NeteaseCloudMusicApi')

        return user_detail(this.$cookie ? { cookie: this.$cookie, uid } : { uid })

    }

    initial(callback) {

        initial(callback)

        this.$data = this.$db.getSync('system_setting')

        callback( true, 100, '加载完毕!')

    }

    createLoginQrKey() {

        return login_qr_key({ _t: new Date().getTime() })

    }

    createLoginQr(key) {

        return login_qr_create({ key, qrimg: true, _t: new Date().getTime() })

    }

    checkLoginQrCode(key) {

        return login_qr_check({ key, _t: new Date().getTime() })

    }

    getTime() {

        return new Date().getTime()

    }

    addTimeStampQuery(url) {

        return url + "&timestamp=" + Date.now()

    }

    sendSMS( phoneNumber ) {

        return captcha_sent({ phone: phoneNumber + '', ctcode: 86, cookie: this.$cookie  })

    }

    loginByCellphone( phoneNumber, code ) {

        return login_cellphone( { phone: phoneNumber, captcha: code } )

    }

}

TMusic.prototype.$Vue = Vue
TMusic.prototype.$vue = Vue.prototype

TMusic.prototype.$axios = axios

export default new TMusic()

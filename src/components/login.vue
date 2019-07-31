<template>
  <div id="login_frame">
    <form method="post" action="login.js">
      <p><label class="label_input">Username</label><input type="text" id="username" class="text_field" v-model="username"/>{{alert1}}</p>
      <p><label class="label_input">Password</label><input type="password" id="password" class="text_field" v-model="pass"/>{{alert2}}</p>
      <div id="login_control">
        <input type="button" id="btn_login" value="Login" @click="login()"/>
      </div>
    </form>
  </div>
</template>

<script>
import crypto from 'crypto'
export default {
  name: 'login',
  data () {
    return {
      username: null,
      pass: null,
      alert1: null,
      alert2: null
    }
  },
  methods: {
    login () {
      if ((this.username === null) || (this.username === '')) {
        this.alert1 = 'Please enter username'
      } else if ((this.pass === null) || (this.pass === '')) {
        this.alert2 = 'Please enter password'
      } else {
        var rand = new Date().getTime()
        var md5 = crypto.createHash('md5')
        md5.update(this.pass)// this.pw2这是你要加密的密码
        var password = md5.digest('hex')
        password = password + rand// this.pw这就是你加密完的密码，这个往后台传就行了
        this.$http.post('/api/user/checkPassword', {
          username: this.username,
          password: password
        }, {}).then((response) => {
          if (response.bodyText === '[]') {
            this.alert1 = 'Username and password do not match'
          } else {
            var id = JSON.parse(response.bodyText)[0].id
            var username = JSON.parse(response.bodyText)[0].username
            this.$cookies.set('uid', id, 3600)
            this.$cookies.set('username', username, 3600)
            alert('Login success')
            this.$router.go(-1)
          }
        })
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    window.location.reload()
  }
}
</script>

<style>
@import 'login.css';
</style>

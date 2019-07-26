<template>
  <div id="login_frame">
    <form method="post" action="login.js">
      <p><label class="label_input">UID</label><input type="text" id="username" class="text_field"/></p>
      <p><label class="label_input">PIN</label><input type="text" id="password" class="text_field"/></p>
      <div id="login_control">
        <input type="button" id="btn_login" value="Login" onclick="login();"/>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'login',
  methods: {
    login () {
      var username = document.getElementById('username')
      var pass = document.getElementById('password')
      if (username.value === '') {
        alert('Invalid UID')
      } else if (pass.value === '') {
        alert('Invalid PIN')
      } else if (username.value === 'admin' && pass.value === '123456') {
        window.location.href = 'welcome.html'
      } else {
        alert('UID and PIN does not match')
      }
    }
  }
}
</script>

<style>
@import 'login.css';
</style>

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form>
      <input type="text" name="username" v-model="userName"> <br>
      <input type="text" name="age" v-model="age"> <br>
      <a href="javascript:;" @click="searchUser" @update:count="changeCount">提交</a>
    </form>
    <pre>{{count}}</pre>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      userName: '',
      age: '',
      count: ''
    }
  },
  methods: {
    changeCount (data) {
      this.count = data
    },
    addUser () {
      var name = this.userName
      var age = this.age
      this.$http.post('/api/user/addUser', {
        username: name,
        age: age
      }, {}).then((response) => {
        console.log(response.bodyText)
        this.count = JSON.parse(response.bodyText)
      })
    },
    deleteUser () {
      var name = this.userName
      var age = this.age
      this.$http.post('/api/user/deleteUser', {
        username: name,
        age: age
      }, {}).then((response) => {
        console.log(response)
      })
    },
    searchUser () {
      var name = this.userName
      var age = this.age
      this.$http.post('/api/user/searchUser', {
        username: name,
        age: age
      }, {}).then((response) => {
        console.log(response.bodyText)
      })
    }
  }
}
</script>

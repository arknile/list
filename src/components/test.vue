<template>
  <div>
    <div id="ex"/>
    {{count}}
    {{ msg }}
    <tinymce-editor ref="editor"
      v-model="msg"
      :disabled="disabled"
      @onClick="onClick">
    </tinymce-editor>
    <a href="javascript:;" @click="addUser" @update:count="changeCount">提交</a>
    <a href="javascript:;" @click="getimg" @update:count="changeCount">get</a>
    <button @click="clear">清空内容</button>
    <button @click="disabled = true">禁用</button>
  </div>
</template>

<script>
import TinymceEditor from './tinymce-editor'
export default {
  components: {
    TinymceEditor
  },
  data () {
    return {
      msg: 'Welcome to Use Tinymce Editor',
      disabled: false,
      count: '',
      tmp: ''
    }
  },
  created: function () {
      this.$http.post('/api/user/getimg', {
        username: name
      }, {}).then((response) => {
        console.log(response.bodyText)
        this.tmp = JSON.parse(response.bodyText)[0].img
        document.getElementById('ex').innerHTML = this.tmp
      })
  },
  methods: {
    changeCount (data) {
      this.count = data
    },
    // 鼠标单击的事件
    onClick (e, editor) {
      console.log('Element clicked')
      console.log(e)
      console.log(editor)
    },
    // 清空内容
    clear () {
      this.$refs.editor.clear()
    },
    addUser () {
      var name = this.msg
      this.$http.post('/api/user/addimg', {
        username: name
      }, {}).then((response) => {
        console.log(response.bodyText)
        this.count = JSON.parse(response.bodyText)
      })
    },
    getimg () {
      this.$http.post('/api/user/getimg', {
        username: name
      }, {}).then((response) => {
        console.log(response.bodyText)
        this.tmp = JSON.parse(response.bodyText)[0].img
        document.getElementById('ex').innerHTML = this.tmp
      })
    }
  }
}
</script>

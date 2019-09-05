<template>
  <div class="form2">
    <table>
      <tr><td>Tool</td><td>{{name}}</td></tr>
      <tr><td colspan="2">Please rate these criteria</td></tr>
      <tr><td>Learnability</td>
        <td><select id="learning">
        <option value=5 selected>5</option>
        <option value=4>4</option>
        <option value=3>3</option>
        <option value=2>2</option>
        <option value=1>1</option>
        </select></td>
      </tr>
      <tr><td>Visual Quality</td>
        <td><select id="visual_quality">
        <option value=5 selected>5</option>
        <option value=4>4</option>
        <option value=3>3</option>
        <option value=2>2</option>
        <option value=1>1</option>
        </select></td>
      </tr>
      <tr><td>Speed</td>
        <td><select id="speed">
        <option value=5 selected>5</option>
        <option value=4>4</option>
        <option value=3>3</option>
        <option value=2>2</option>
        <option value=1>1</option>
        </select></td>
      </tr>
      <tr><td>Scalability</td>
        <td><select id="scalability">
        <option value=5 selected>5</option>
        <option value=4>4</option>
        <option value=3>3</option>
        <option value=2>2</option>
        <option value=1>1</option>
        </select></td>
      </tr>
      <tr><td>Customisability</td>
        <td><select id="customisability">
        <option value=5 selected>5</option>
        <option value=4>4</option>
        <option value=3>3</option>
        <option value=2>2</option>
        <option value=1>1</option>
        </select></td>
      </tr>
      <tr><td>Usability</td>
        <td><select id="usability">
        <option value=5 selected>5</option>
        <option value=4>4</option>
        <option value=3>3</option>
        <option value=2>2</option>
        <option value=1>1</option>
        </select></td>
      </tr>
      <tr>
        <td>Your review</td>
        <td/> </tr>
    </table>
    <tinymce-editor ref="editor"
      v-model="msg">
    </tinymce-editor>
    <div><input type="button" value="Submit" @click="submit()"/><input type="button" value="Clear editor" @click="clear()"/></div>
  </div>
</template>

<script>
import TinymceEditor from './tinymce-editor'
export default {
  name: 'reviewTemplate',
  components: {
    TinymceEditor
  },
  data () {
    return {
      name: null,
      msg: null
    }
  },
  created: function () {
    if (this.$cookies.get('review') !== '1') {
      alert('Session expired')
      this.$router.go(-1)
    }
    this.$http.post('/api/user/getToolName', {
      id: this.$route.params.id
    }, {}).then((response) => {
      this.name = JSON.parse(response.bodyText).name
    })
  },
  methods: {
    clear () {
      this.$refs.editor.clear()
    },
    submit () {
      if (this.msg !== null && this.msg !== '') {
        this.$http.post('/api/user/postReview', {
          learning: document.getElementById('learning').value,
          visual_quality: document.getElementById('visual_quality').value,
          speed: document.getElementById('speed').value,
          scalability: document.getElementById('scalability').value,
          customisability: document.getElementById('customisability').value,
          usability: document.getElementById('usability').value,
          tool_id: this.$route.params.id,
          user_id: this.$cookies.get('uid'),
          text: this.msg
        }, {}).then((response) => {
          console.log(response.bodyText)
          if (response.bodyText === '{"code":"1","msg":"Error"}') {
            alert('Unknown error')
          } else {
            alert('Submission succeeded')
            this.$router.go(-1)
          }
        })
      }
    }
  }
}
</script>

<style>
.form2 {
  width: 600px;
  text-align: left;
  margin: 0 auto;
}
.form2 div {
text-align: center;
}
</style>

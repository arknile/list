<template>
  <div class="form1">
    <table>
      <tr><td>Tool</td><td>{{name}}</td></tr>
      <tr><td colspan="2">Please rate your experience</td></tr>
      <tr><td>Rating</td>
        <td><select id="rating">
        <option value=5 selected>5</option>
        <option value=4>4</option>
        <option value=3>3</option>
        <option value=2>2</option>
        <option value=1>1</option>
        </select></td>
      </tr>
      <tr>
        <td>Your comment</td>
        <td><textarea name="feedback" class='' placeholder='Leave your feedback here' maxlength="140" onkeydown="if(this.value.length>=140) {event.returnValue=false}" v-model="comment"></textarea><br>Max. 140 characters</td>
      </tr>
    </table>
    <div><input type="button" value="Submit" @click="submit()"/></div>
  </div>
</template>

<script>
export default {
  name: 'feedbackTemplate',
  data () {
    return {
      name: null,
      comment: null
    }
  },
  created: function () {
    if (this.$cookies.get('feedback') !== '1') {
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
    submit () {
      if (this.comment !== null && this.comment !== '') {
        this.$http.post('/api/user/postFeedback', {
          tool_id: this.$route.params.id,
          rating: document.getElementById('rating').value,
          user_id: this.$cookies.get('uid'),
          text: this.comment
        }, {}).then((response) => {
          if (response.bodyText === '{code: "1", msg: "Error"}') {
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
.form1 {
  width: 300px;
  text-align: left;
  margin: 0 auto;
}
.form1 div {
text-align: center;
}
</style>

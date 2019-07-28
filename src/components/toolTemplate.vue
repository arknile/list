<template>
  <form name="form1" v-show="refresh">
    {{$cookies.get('uid')}}
    <table>
      <tr><td>Name</td><td><input type="text" id="name" class="text_field" v-model="name"/></td><td>{{alert1}}</td></tr>
      <tr><td>Author(s)</td><td><input type="text" id="author" class="text_field" v-model="author" placeholder="Please enter all authors, seprating by commas"/></td><td>{{alert2}}</td></tr>
      <tr><td>URL Link</td><td><input type="text" id="link" class="text_field" v-model="link" @blur="check30()"/></td><td>{{alert3}}</td></tr>
      <tr><td>Image URL</td><td><input type="text" id="link" class="text_field" v-model="imgUrl" @focus="clear()" @blur="check40()"/></td><td :v-if="alert4">{{alert4}}</td></tr>
    <ImageUpload @chileEvent='parentEvent' ref="child" :uploadUrl="uploadUrl"/>
      <tr v-for="(tagss,catagory) in tag" v-bind:key="catagory" :v-if="refresh">
        <td><b>{{catagory}}</b></td>
        <td><p v-for="(value,tag_name) in tagss" v-bind:key="tag_name"> <input type="checkbox" aria-hidden="true" class="el-checkbox__original" :id="tag_name" @click="change(catagory, tag_name)">{{tag_name}}</p></td>
      </tr>
    </table>
    <input type="button" value="Submit" @click="validate()"/><input type="submit" value="Preview" /><input type="" value="Cancel" />
  </form>
</template>

<script>
import ImageUpload from './ImageUpload/ImageUpload'
export default {
  name: 'toolTemplate',
  data () {
    return {
      tag: {'Data': {}, 'Licence': {}, 'Programming': {}, 'Type': {}, 'Platform': {}, 'Visualizations': {}, 'Interactivities': {}},
      name: null,
      author: null,
      link: null,
      show: false,
      tmp: null,
      refresh: false,
      imgUrl: '',
      alert1: '',
      alert2: '',
      alert3: '',
      alert4: '',
      upload: false,
      uploadUrl: null,
      submission: [],
      count: 0
    }
  },
  watch: {
    name: function () {
      if (this.name === '') {
        this.alert1 = 'Please enter username'
      } else {
        this.alert1 = ''
      }
    },
    author: function () {
      if (this.author === '') {
        this.alert2 = 'Please enter username'
      } else {
        this.alert2 = ''
      }
    },
    link: function () {
      if (this.link === '') {
        this.alert3 = 'Please enter an URL'
      }
    },
    imgUrl: function () {
      if (this.imgUrl === '') {
        this.alert4 = 'Please enter an URL or upload an image'
      } else {
        this.alert4 = ''
      }
    }
  },
  components: {
    ImageUpload
  },
  created: function () {
    this.$http.get('/api/user/getAllTag', {}).then((response) => {
      if (response.bodyText === '[]') {
        alert('fail to retrieve data')
        this.$router.push('/')
      } else {
        this.tmp = JSON.parse(response.bodyText)
        for (var i in this.tmp) {
          this.tag[this.tmp[i].tag_type][this.tmp[i].tag_name] = {'id': this.tmp[i].tag_id}
          this.tag[this.tmp[i].tag_type][this.tmp[i].tag_name]['status'] = 'null'
        }
      }
      this.refresh = true
    })
  },
  methods: {
    check30 () {
      if ((this.link !== '') && (this.link !== null)) {
        if (!this.match(this.link)) {
          this.alert3 = 'Please enter a valid URL'
        } else {
          this.alert3 = ''
        }
      }
    },
    check40 () {
      if ((!this.upload) && (this.imgUrl !== '') && (this.imgUrl !== null)) {
        if (!this.match(this.imgUrl)) {
          this.alert4 = 'Please enter a valid URL or upload an image'
        } else {
          this.uploadUrl = this.imgUrl
          this.alert4 = 'url valid'
        }
      }
    },
    clear () {
      this.uploadUrl = null
      this.upload = false
    },
    parentEvent (data) {
      this.imgUrl = data
      this.upload = true
    },
    change (catagory, name) {
      console.log(this.tag[catagory][name]['id'] + 'clicked')
      if (this.tag[catagory][name]['status'] === 'null') {
        this.tag[catagory][name]['status'] = 'in'
      } else {
        this.tag[catagory][name]['status'] = 'null'
      }
    },
    validate () {
      if (this.name === null) {
        this.alert1 = 'Please enter username'
      } else {
        this.alert1 = ''
      }
      if (this.author === null) {
        this.alert2 = 'Please enter username'
      } else {
        this.alert2 = ''
      }
      if (this.link === null) {
        this.alert3 = 'Please enter an URL'
      }
      if (this.imgUrl === null) {
        this.alert4 = 'Please enter an URL or upload an image'
      }
      if ((this.alert1 === '') && (this.alert2 === '') && (this.alert3 === '') && (this.alert4 === '')) {
        for (var i in this.tag) {
          for (var j in this.tag[i]) {
            console.log(this.tag[i][j]['status'])
            if (this.tag[i][j]['status'] === 'in') {
              console.log('get1')
              this.submission.push(this.tag[i][j]['id'])
              this.count = this.count + 1
            }
          }
        }
        if (this.count === 0) {
          alert('You must slect at least 1 tag')
        } else {
          this.$http.post('/api/user/addTool', {
            name: this.name,
            author: this.author,
            link: this.link,
            image: this.imgUrl
          }, {}).then((response) => {
            if (response.bodyText === '{code: "1", msg: "Error"}') {
              alert('Unknown error')
            } else {
              var tmp = JSON.parse(response.bodyText)
              console.log(this.submission)
              var toolId = tmp[0]['LAST_INSERT_ID()']
              console.log(toolId)
              this.$http.post('/api/user/addToolTags', {
                id: toolId,
                submission: this.submission
              }, {}).then((response) => {
                if (response.bodyText === '0') {
                  alert('Submission succeeded')
                  this.$router.go(-1)
                } else {
                  alert('Submission failed')
                }
              })
            }
          })
        }
      }
    },
    match (data) {
      /* eslint-disable */
      var re1 = /(\w+):\/\/([^\:|\/]+)(\:\d*)?(.*\/)([^#|\?|\n]+)?(#.*)?(\?.*)?/i
      var arr = String(data).match(re1)
      if (arr) {
        var domain = arr[2]
        var re2 = /^(.+\.)(com|edu|gov|int|mil|net|org|biz|info|name|museum|coop|aero|[a-z][a-z])$/
        if (!re2.test(domain)) {
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    }
  }
}
</script>

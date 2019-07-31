<template>
  <div class="form1" v-show="refresh">
    <table id="t1">
      <tr>
        <td class="leftTd" align="right">Name</td>
        <td align="left" class="rightTd"><input type="text" id="name" class="text_field" v-model="name" @blur="check10()"/></td>
        <td class="thirdTd">{{alert1}}</td>
      </tr>
      <tr>
        <td class="leftTd" align="right">Author(s)</td>
        <td align="left" class="rightTd"><input type="text" id="author" class="text_field" v-model="author" placeholder="Please enter all authors, seprating by commas"/></td>
        <td class="thirdTd">{{alert2}}</td>
      </tr>
      <tr>
        <td class="leftTd" align="right">URL Link</td>
        <td align="left" class="rightTd"><input type="text" id="link" class="text_field" v-model="link" @blur="check30()"/></td>
        <td class="thirdTd">{{alert3}}</td>
      </tr>
      <tr><td class="leftTd" align="right" style="vertical-align:text-top;">Image URL</td>
        <td align="left" alig class="rightTd" id="sepecial">
          <p>Please enter the URL of the external image or upload one from your computer.</p><br/>
          <input type="text" id="link" class="text_field" v-model="imgUrl1" @focus="clear()" @blur="check40()"/><br/>
          <ImageUpload @chileEvent='parentEvent' :uploadUrl="uploadUrl"/>
          <div class="cha" v-show="(imgUrl)">
          <!-- 删除icon -->
            <img style="width:100%;" :src="imgUrl">
            <input type="button" @click="delImg" value="delete">
          </div>
        </td>
        <td class="thirdTd">{{alert4}}</td>
      </tr>
    </table>
    <table>
      <tr v-for="(tagss,catagory) in tag" v-bind:key="catagory" :v-if="refresh">
        <td class="leftTd" align="right"><b>{{catagory}}</b></td>
        <td class="tagList"><p v-for="(value,tag_name) in tagss" v-bind:key="tag_name"> <input type="checkbox" aria-hidden="true" :id="tag_name" @click="change(catagory, tag_name)">{{tag_name}}</p></td>
      </tr>
    </table>
    <input type="button" value="Submit" @click="validate()"/><input type="button" value="Cancel" @click="cancel()"/>
  </div>
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
      imgUrl: null,
      imgUrl1: null,
      alert1: '',
      alert2: '',
      alert3: '',
      alert4: '',
      uploadUrl: false,
      submission: [],
      count: 0
    }
  },
  watch: {
    name: function () {
      if (this.name === '') {
        this.alert1 = 'Please enter a name'
      } else {
        this.alert1 = ''
      }
    },
    author: function () {
      if (this.author === '') {
        this.alert2 = 'Please enter an author'
      } else {
        this.alert2 = ''
      }
    },
    link: function () {
      if (this.link === '') {
        this.alert3 = 'Please enter an URL'
      }
    },
    imgUrl1: function () {
      if (this.imgUrl1 === '') {
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
        alert('No data retrieved. Database Error')
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
    check10 () {
      if (this.name !== null && this.name !== '') {
        this.$http.post('/api/user/checkDuplicate', {
          name: this.name
        }, {}).then((response) => {
          var tmp = JSON.parse(response.bodyText)
          var count = tmp[0]['count']
          if (count !== 0) {
            this.alert1 = 'Tool already exists.'
          }
        })
      }
    },
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
      if ((this.imgUrl1 !== '') && (this.imgUrl1 !== null)) {
        if (!this.match(this.imgUrl1)) {
          this.alert4 = 'Please enter a valid URL or upload an image'
        } else {
          this.imgUrl = this.imgUrl1
          this.alert4 = ''
        }
      }
      /* if ((!this.upload) && (this.imgUrl !== '') && (this.imgUrl !== null)) {
        if (!this.match(this.imgUrl)) {
          this.alert4 = 'Please enter a valid URL or upload an image'
        } else {
          this.uploadUrl = this.imgUrl
          this.alert4 = 'url valid'
        }
      } */
    },
    clear () {
      this.delImg()
      this.imgUrl = null
    },
    parentEvent (data) {
      this.imgUrl = data
      if (this.imgUrl1 !== null) {
        this.imgUrl1 = ''
      }
      this.uploadUrl = true
      this.alert4 = ''
    },
    delImg () {
      this.imgUrl = null
      this.uploadUrl = false
      this.alert4 = 'Please enter an URL or upload an image'
    },
    change (catagory, name) {
      if (this.tag[catagory][name]['status'] === 'null') {
        this.tag[catagory][name]['status'] = 'in'
      } else {
        this.tag[catagory][name]['status'] = 'null'
      }
    },
    validate () {
      if (this.name === null) {
        this.alert1 = 'Please enter a tool name'
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
            if (this.tag[i][j]['status'] === 'in') {
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
              var toolId = tmp[0]['LAST_INSERT_ID()']
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

<style>
.form1 {
margin: 0 auto;
width: 60%;
height: 100%;
top: 30px;
position: relative;
padding: 0 10vw;
} 
.tagList {
display: flex;
flex-wrap: wrap;
padding: 0 30px 50px 50px;
}
.text_field {
width: 280px;
}
.leftTd {
width: 20%;
position: relative;
padding: 0 25px 50px 0;
}
.rightTd {
position: relative;
padding: 0 25px 50px 50px;
}
.thirdTd {
padding: 0 0 50px 0;
position: relative;
width: 35%;
}
#t1 tr {
width: 100%;
}
</style>

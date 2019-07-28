<template>
  <form name="form1" method="post" action="" v-show="refresh">
    <table>
      <tr><td>Name</td><td>{{name}}</td></tr>
      <tr><td>Author(s)</td><td>{{author}}</td></tr>
      <tr><td>URL Link</td><td>{{link}}</td></tr>
      <tr v-for="(tagss,catagory) in tag" v-bind:key="catagory" :v-if="refresh">
        <td><b>{{catagory}}</b></td>
        <td><p v-for="(status,name) in tagss" v-bind:key="name"> <input type="checkbox" aria-hidden="true" class="el-checkbox__original" value="" :id="name" :checked="setChecked(catagory, name)">{{name}}</p></td>
      </tr>
    </table>
    <ImageUpload @chileEvent='parentEvent'/>
    {{imgUrl}}
    <input type="submit" value="Submit" /><input type="submit" value="Preview" /><input type="" value="Cancel" />
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
      imgUrl: null
    }
  },
  components: {
    ImageUpload
  },
  created: function () {
    var id = this.$route.params.id
    this.$http.post('/api/user/getTool', {
      id: id
    }, {}).then((response) => {
      if (response.bodyText === '[]') {
        console.log('fail to retrieve data')
        alert('You entered an invalid URL')
        this.$router.push('/')
      } else {
        var basicInfo = JSON.parse(response.bodyText)
        this.name = basicInfo[0].name
        this.author = basicInfo[0].author
        this.link = basicInfo[0].link
      }
    })

    this.$http.post('/api/user/getAdvancedInfo', {
      id: id
    }, {}).then((response) => {
      if (response.bodyText === '[]') {
        console.log('fail to retrieve data')
      } else {
        var collection = JSON.parse(response.bodyText)
        for (var i in collection) {
          this.tag[collection[i].tag_type][collection[i].tag_name] = 'in'
        }
      }
    })

    this.$http.get('/api/user/getAllTag', {}).then((response) => {
      if (response.bodyText === '[]') {
        console.log('fail to retrieve data')
      } else {
        this.tmp = JSON.parse(response.bodyText)
        for (var i in this.tmp) {
          if (this.tag[this.tmp[i].tag_type][this.tmp[i].tag_name] !== 'in') {
            this.tag[this.tmp[i].tag_type][this.tmp[i].tag_name] = 'null'
          }
        }
      }
      this.refresh = true
    })
  },
  methods: {
    parentEvent (data) {
      console.log(data)
      this.imgUrl = data
    },
    setChecked (catagory, name) {
      if (this.tag[catagory][name] === 'null') {
        return false
      }
      return true
    },
    check (name) {
      switch (this.tagStatus[name]) {
        case 'null':
          this.tagStatus[name] = 'add'
          break
        case 'add':
          this.tagStatus[name] = 'null'
          break
        case 'remove':
          this.tagStatus[name] = 'in'
          break
        case 'in':
          this.tagStatus[name] = 'remove'
      }
    },
    check2 (name) {
      switch (this.tagStatus[name]) {
        case 'null':
          return false
        case 'add':
          return true
        case 'remove':
          return false
        case 'in':
          return true
      }
    }
  }
}
</script>

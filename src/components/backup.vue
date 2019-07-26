<template>
  <form name="form1" method="post" action="">
    <table>
      <tr><td>Name</td><td>name</td></tr>
      <tr><td>Author(s)</td><td>author</td></tr>
      <tr><td>URL Link</td><td>url</td></tr>
      <tr v-for="(catagory,index1) in catagories" v-bind:key="index1">
        <td><b>{{catagory}}</b></td>
        <td><p v-for="(item,index2) in tags[catagory]" v-bind:key="index2"> <input type="checkbox" aria-hidden="true" class="el-checkbox__original" value="" :id="item">{{item}}</p></td>
      </tr>
    </table>
    <input type="submit" value="Submit" /><input type="submit" value="Preview" /><input type="" value="Cancel" />
  </form>
</template>

<script>
export default {
  name: 'toolTemplate',
  data () {
    return {
      tags: {'Data': [], 'Licence': [], 'Programming': [], 'Type': [], 'Platform': [], 'Visualizations': [], 'Interactivities': []},
      tnt: {'Data': [], 'Licence': [], 'Programming': [], 'Type': [], 'Platform': [], 'Visualizations': [], 'Interactivities': []},
      catagories: ['Data', 'Licence', 'Programming', 'Type', 'Platform', 'Visualizations', 'Interactivities'],
      tagStatus: {},
      checked: {}
    }
  },
  created: function () {
    var id = this.$route.params.id
    this.$http.get('/api/user/getAllTag', {}).then((response) => {
      if (response.bodyText === '[]') {
        console.log('fail to retrieve data')
      } else {
        var collection = JSON.parse(response.bodyText)
        for (var i in collection) {
          this.tagStatus[collection[i].tag_name] = 'null'
          for (var j in this.catagories) {
            if (String(collection[i].tag_type) === this.catagories[j]) {
              this.tags[this.catagories[j]].push(collection[i].tag_name)
            }
          }
        }
      }
    })
    this.$http.post('/api/user/getTool', {
      id: id
    }, {}).then((response) => {
      if (response.bodyText === '[]') {
        console.log('fail to retrieve data')
        alert('You entered an invalid URL')
        this.$router.go('/')
      } else {
        this.$http.post('/api/user/getAdvancedInfo', {
          id: id
        }, {}).then((response) => {
          if (response.bodyText === '[]') {
            console.log('fail to retrieve data')
          } else {
            console.log('ima')
            var collection = JSON.parse(response.bodyText)
            for (var i in collection) {
              this.tagStatus[collection[i].tag_name] = 'in'
              // this.checked[collection[i].tag_name] = true
              document.getElementById(collection[i].tag_name).checked = true
              console.log(this.checked[collection[i].tag_name])
              for (var j in this.catagories) {
                if (String(collection[i].tag_type) === this.catagories[j]) {
                  this.tnt[this.catagories[j]].push(collection[i].tag_name)
                }
              }
            }
          }
        })
      }
    })
  },
  methods: {
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

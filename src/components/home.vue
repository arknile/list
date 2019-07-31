<template>
  <div class="index">
    <left @childLV3Event="parentEvent"/>
    <div class="bar"/>
    <right :toolData="toolData" @rightChildEvent="parentEvent2"/>
  </div>
</template>

<script>
import left from './left'
import right from './right'
export default {
  name: 'home',
  components: {
    left,
    right
  },
  data () {
    return {
      filter: {'Data': [], 'Licence': [], 'Programming': [], 'Type': [], 'Platform': [], 'Visualizations': [], 'Interactivities': []},
      toolData: null,
      searchField: null
    }
  },
  created: function () {
    this.$http.post('/api/user/getToolBrief', {
      data: this.filter,
      searchField: this.searchField
    }).then((response) => {
      if (response.bodyText === '[]') {
        alert('Fail to retrieve data')
        this.$router.push('/')
      } else {
        this.toolData = JSON.parse(response.bodyText)
      }
    })
  },
  methods: {
    retrieveData () {
      this.$http.post('/api/user/getToolBrief', {
        data: this.filter,
        searchField: this.searchField
      }).then((response) => {
        if (response.bodyText === '[]') {
          alert('No tool found')
        } else {
          this.toolData = JSON.parse(response.bodyText)
        }
      })
    },
    parentEvent (data) {
      if (data[2] === 'remove') {
        var index = this.filter[data[0]].indexOf(data[1])
        if (index > -1) {
          this.filter[data[0]].splice(index, 1)
        }
      }
      if (data[2] === 'add') {
        this.filter[data[0]].push(data[1])
      }
      this.retrieveData()
    },
    parentEvent2 (data) {
      if (data[0] === null) {
        this.searchField = null
      } else {
        this.searchField = ' AND ' + data[0] + ' REGEXP "' + data[1] + '"'
      }
      this.retrieveData()
    }
  }
}
</script>

<style>
.index {
position: absolute;
display: flex;
flex-wrap: wrap;
width: 100%;
height:-webkit-calc(100% - 90px);
height:-moz-calc(100% - 90px);
height:calc(100% - 90px);
top: 90px;
overflow: hidden;
left:0;
}
.bar {
width: 2%;
height: 100%;
position: absolute;
left: 49%;
background-color: gray;
}
</style>

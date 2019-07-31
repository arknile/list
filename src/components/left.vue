<template>
  <div v-if="refresh" class="left">
    <table>
    <tr v-for="(tagss, catagory) in tag" v-bind:key="catagory">
      <td align="right"><b>{{catagory}}</b><td>
      </td><catagory  :catagory="catagory" :tagss="tagss" @childLV2Event="childLV3Event"/>
    </tr>
    </table>
    <div class="bottom"/>
  </div>
</template>

<script>
import catagory from './catagory'
export default {
  name: 'left',
  data () {
    return {
      tag: {'Data': {}, 'Licence': {}, 'Programming': {}, 'Type': {}, 'Platform': {}, 'Visualizations': {}, 'Interactivities': {}},
      refresh: false
    }
  },
  components: {
    catagory
  },
  created: function () {
    this.$http.get('/api/user/getAllTag', {}).then((response) => {
      if (response.bodyText === '[]') {
        alert('fail to retrieve data')
        this.$router.push('/')
      } else {
        this.tmp = JSON.parse(response.bodyText)
        for (var i in this.tmp) {
          this.tag[this.tmp[i].tag_type][this.tmp[i].tag_name] = {'tag_id': this.tmp[i].tag_id}
          this.tag[this.tmp[i].tag_type][this.tmp[i].tag_name]['tag_name'] = this.tmp[i].tag_name
          this.tag[this.tmp[i].tag_type][this.tmp[i].tag_name]['icon'] = this.tmp[i].icon
        }
      }
      this.refresh = true
    })
  },
  methods: {
    childLV3Event (data) {
      this.$emit('childLV3Event', data)
    }
  }
}
</script>

<style scope>
.left {
position: relative;
margin: 0 0 0 1vw;
width: 48vw;
height: 100%;
overflow-y: scroll;
overflow-x: hidden;
top: 0;
left: 0;
border: 10px hidden;
}
.title {
align-content: left;
}
.left tr {
padding:25px;
}
.left td {
border-right:0;
border-bottom:1px dotted #aaa;
padding:3px 15px;
text-align:center; color:#3C3C3C;
}
.bottom {
height: 2vw;
width: 1vw;
position: relative;
}
</style>

<template>
  <div>
      <div class='part1' id='navi2'>
        <div class='hr'>
          <img class='black' :src='image1' height=50px width=50px/><br/>
          <img class='black' :src='image2' height=50px width=50px/><br/>
          <img class='black' :src='image3' height=50px width=50px/><br/>
          <img class='black' :src='image4' height=50px width=50px/>
        </div>
        <div class='hr'>
          <img :src='image1' height=250px width=250px>
        </div>
        <div class='hr'>
          <table>
            <tr>
              <td><b>Name</b></td><td>{{name}}</td>
            </tr>
            <tr>
              <td><b>Author</b></td><td>{{author}}</td>
            </tr>
            <tr>
              <td><b>Link</b></td><td><a :href='link'>{{link}}</a></td>
            </tr>
            <!--tr><td><b>Description</b></td><td>" . $row['description'] . "</td></tr-->
          </table>

          <div v-show="bool2">
              <span class="stars-bg-o">
                <i class="star-active-o" :style="'width:'+rate0+'%'"></i>
              </span><br/>
              <p>{{number}} users rated the tool</p>
          </div>
        </div><br/>
      </div>
      <div><br/>
          <table border=1px>
            <tr v-for="(catagory,index1) in catagories" v-bind:key="index1">
              <td><b>{{catagory}}</b></td>
              <td><p v-for="(item,index2) in tags[catagory]" v-bind:key="index2"><router-link :to="'/tag/'+item" >{{item}}</router-link>   </p></td>
            </tr>
          </table>
       </div>
  </div>
</template>

<script>
export default {
  name: 'toolInfo',
  data () {
    return {
      name: null,
      author: null,
      link: null,
      image1: null,
      image2: null,
      image3: null,
      image4: null,
      bool2: false,
      rate0: null,
      tags: {'Data': [], 'Licence': [], 'Programming': [], 'Type': [], 'Platform': [], 'Visualizations': [], 'Interactivities': []},
      catagories: ['Data', 'Licence', 'Programming', 'Type', 'Platform', 'Visualizations', 'Interactivities'],
      number: 0
    }
  },
  created: function () {
    var id = this.$route.params.id
    this.$http.post('/api/user/getTool', {
      id: id
    }, {}).then((response) => {
      if (response.bodyText === '[]') {
        console.log('fail to retrieve data')
        alert('You entered an invalid URL')
        this.$router.go('/')
      } else {
        var basicInfo = JSON.parse(response.bodyText)
        this.name = basicInfo[0].name
        this.author = basicInfo[0].author
        this.link = basicInfo[0].link
        this.image1 = basicInfo[0].image1
        this.image2 = basicInfo[0].image2
        this.image3 = basicInfo[0].image3
        this.image4 = basicInfo[0].image4

        this.$http.post('/api/user/getAdvancedInfo', {
          id: id
        }, {}).then((response) => {
          if (response.bodyText === '[]') {
            console.log('fail to retrieve data')
          } else {
            var collection = JSON.parse(response.bodyText)
            for (var i in collection) {
              for (var j in this.catagories) {
                console.log('1')
                if (String(collection[i].tag_type) === this.catagories[j]) {
                  this.tags[this.catagories[j]].push(collection[i].tag_name)
                }
              }
            }
          }
        })

        this.$http.post('/api/user/getRatingBrief', {
          id: id
        }, {}).then((response) => {
          console.log(response.bodyText)
          if (response.bodyText === '[]') {
          } else {
            var result = JSON.parse(response.bodyText)
            var rate = result[0].rating * 20
            this.rate0 = String(rate)
            this.number = result[0].count
            this.bool2 = true
          }
        })
      }
    })
  }
}
</script>

<style>
@import 'rating.css';
@import 'tools.css';
</style>

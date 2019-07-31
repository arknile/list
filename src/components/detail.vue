<template>
  <div class="all">
    <div class="part1">
      <div class="A">
        <img :src='image1' height=250px width=250px id="toolImg">
      </div>
        <div class="B">
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
        <br/>
        <br/>
        <div v-if="number">
            <span class="stars-bg-o">
              <i class="star-active-o" :style="'width:'+rate0+'%'"></i>
            </span><br/>
            <p>{{number}} users rated the tool</p>
        </div>
      </div>
    </div>
    <div class="part2">
      <table border=1px id="table">
        <tr v-for="(catagory,index1) in catagories" :key="index1" v-show="check(tags[catagory])">
          <td class="leftcell"><b>{{catagory}}</b></td>
          <td class="rightcell"><p v-for="(item,index2) in tags[catagory]" v-bind:key="index2"><router-link :to="'/tag/'+item" >{{item}}</router-link>    </p></td>
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
      bool2: false,
      rate0: null,
      tags: {'Data': [], 'Licence': [], 'Programming': [], 'Type': [], 'Platform': [], 'Visualizations': [], 'Interactivities': []},
      catagories: ['Data', 'Licence', 'Programming', 'Type', 'Platform', 'Visualizations', 'Interactivities'],
      number: 0
    }
  },
  created: function () {
    this.$emit('type', 'Overview')
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
        this.image1 = basicInfo[0].image1

        this.$http.post('/api/user/getAdvancedInfo', {
          id: id
        }, {}).then((response) => {
          if (response.bodyText === '[]') {
            console.log('fail to retrieve data')
          } else {
            var collection = JSON.parse(response.bodyText)
            for (var i in collection) {
              for (var j in this.catagories) {
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
  },
  methods: {
    check (catagory) {
      if (JSON.stringify(catagory) === '[]') {
        return false
      }
      return true
    }
  }
}
</script>

<style scope>
@import 'rating.css';
@import 'variables.css';
@import url('https://fonts.googleapis.com/css?family=Sansita+One');

#toolImg {
  top:5vw;
  position: relative;
}
.all {
  width: 100%;
  height: 100%;
  position: relative;
}
.A {
  width: 250px;
  height: 250px;
}
.B {
  left: 10vw;
  top:5vw;
  position: relative;
  width: 400px;
  height: 500px;
  margin-right:0px;
  text-align: left
}
.part1 {
  width: 800px;
  height: 400px;
  display:flex;
  margin: 0 auto
}
.part2 {
  width:800px;
  display: flex;
  text-align: left;
  margin: 0 auto;
  padding-bottom: 2vw;
}

#table {
  width: 100%;
}
#table .leftcell {
  width: 100px;
}
#table .rightcell {
  display: flex;
  flex-wrap: wrap;
}
#table td {
  padding: 5px 25px;
}
#table td p{
  padding: 0 25px 0 0;
}
</style>

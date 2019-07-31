<template>
<div class="frame2">
  <span v-if="load">You have submitted review</span>
  <button @click="loadMyReview()" v-if="!load">+ Write my review</button>
  <hr/>
  <div v-for="(item, index) in reviews" v-bind:key="index" class="load">
    <div class="innerBlock">
      {{item.username}}<br/>
      <table>
      <tr><td><b>Learning:</b></td><td><span class="stars-bg-l"><i class="star-active-l" :style="trans(item.learning)"></i></span></td></tr>
      <tr><td><b>Visual Quality:</b></td><td><span class="stars-bg-v"><i class="star-active-v" :style="trans(item.visual_quality)"></i></span></td></tr>
      <tr><td><b>Speed:</b></td><td><span class="stars-bg-sp"><i class="star-active-sp" :style="trans(item.speed)"></i></span></td></tr>
      <tr><td><b>Scalability:</b></td><td><span class="stars-bg-sc"><i class="star-active-sc" :style="trans(item.scalability)"></i></span></td></tr>
      <tr><td><b>Customisability:</b></td><td><span class="stars-bg-c"><i class="star-active-c" :style="trans(item.customisability)"></i></span></td></tr>
      <tr><td><b>Usability:</b></td><td><span class="stars-bg-u"><i class="star-active-u" :style="trans(item.usability)"></i></span></td></tr>
      </table>
      <b>Review: </b><br/>
      <div v-html="item.text"/>
    </div>
    <hr>
  </div>
  <div class="load2" v-if="!empty">End</div>
  <div v-show="empty" v-if="empty">
    No rating records found.
  </div>
</div>
</template>

<script>
export default {
  name: 'toolReview',
  data () {
    return {
      name: null,
      reviews: null,
      empty: false,
      showMyReview: false,
      load: false,
      hidden: true
    }
  },
  created: function () {
    this.$emit('type', 'Reviews')
    var id = this.$route.params.id
    this.$http.post('/api/user/getReview', {
      id: id
    }, {}).then((response) => {
      if (response.bodyText === '[]') {
        console.log('fail to retrieve data')
        this.empty = true
      } else {
        this.reviews = JSON.parse(response.bodyText)
      }
    })

    if (this.$cookies.get('username')) {
      this.$http.post('/api/user/checkReview', {
        user_id: this.$cookies.get('uid'),
        tool_id: this.$route.params.id
      }, {}).then((response) => {
        var count = JSON.parse(response.bodyText)[0].count
        if (count !== 0) {
          this.load = true
        }
      })
    }
  },
  methods: {
    trans (rate1) {
      var rate = rate1 * 20
      var rate0 = String(rate)
      return ('width:' + rate0 + '%')
    },
    checkReview () {
      if (this.$cookies.get('username')) {
        this.$http.post('/api/user/checkReview', {
          user_id: this.$cookies.get('uid'),
          tool_id: this.$route.params.id
        }, {}).then((response) => {
          var count = JSON.parse(response.bodyText)[0].count
          if (count !== 0) {
            return false
          }
        })
      }
      return true
    },
    loadMyReview () {
      if (!this.$cookies.get('username')) {
        this.$router.push('/login')
      } else {
        this.$cookies.set('review', '1', 60)
        this.$router.push('/tool/' + String(this.$route.params.id) + '/writeReview')
      }
    }
  }
}
</script>

<style scope>
@import 'rating.css';
.frame2 {
  top: 50px;
  position: relative;
  width: 800px;
  margin: 0 auto;
  padding: 0 0 50px 0;
}
.frame2 .load {
  text-align: left;
  width: 600px;
  position: relative;
  word-wrap:break-word;
  margin: 0 auto;
  top: 30px;
}
.frame2 .innerBlock {
  padding:0 30px;
  width: 540px;
  position: relative;
}
.frame2 .innerBlock {
  margin: 0 auto;
  position: relative;
}
.frame2 .load2 {
  text-align: center;
  width: 600px;
  position: relative;
  word-wrap:break-word;
  margin: 0 auto;
  top: 30px;
}

</style>

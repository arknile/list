<template>
<div>
  <button @click="loadMyFeedback()">+ Write my feedback</button>
  <feedbackTemplate v-show="showMyFeedback" v-if="showMyFeedback" :feedbackData="feedbackData"/>
  <div v-for="(item, index) in ratings" v-bind:key="index">
      {{item.user_id}}
      <span class="stars-bg-o">
        <i class="star-active-o" :style="trans(item.rating)"></i>
      </span><br/>
      {{item.text}}
  </div>
  <div v-show="empty" v-if="empty">
    No rating history found.
  </div>
</div>
</template>

<script>
import feedbackTemplate from './feedbackTemplate'
export default {
  name: 'toolRatings',
  data () {
    return {
      name: null,
      ratings: null,
      empty: false,
      showMyFeedback: false,
      feedbackData: null
    }
  },
  components: {
    feedbackTemplate
  },
  created: function () {
    var id = this.$route.params.id
    this.$http.post('/api/user/getRating', {
      id: id
    }, {}).then((response) => {
      if (response.bodyText === '[]') {
        console.log('fail to retrieve data')
        this.empty = true
      } else {
        this.ratings = JSON.parse(response.bodyText)
        console.log(this.ratings[0].rating)
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
        var basicInfo = JSON.parse(response.bodyText)
        this.name = basicInfo[0].name
      }
    })
  },
  methods: {
    trans (rate1) {
      var rate = rate1 * 20
      var rate0 = String(rate)
      console.log('width:' + rate0 + '%')
      return ('width:' + rate0 + '%')
    },

    loadMyFeedback () {

    }
  }
}
</script>

<style>
@import 'rating.css';
</style>

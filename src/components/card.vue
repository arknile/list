<template>
  <router-link :to="url" v-if="url">
    <div class="card" >
      <img :src="image" class='toolImg'/>
      <p class="name">{{name}}</p>
      </div>
  </router-link>
</template>

<script>
export default {
  name: 'card',
  props: ['name', 'image', 'id'],
  data () {
    return {
      url: null
    }
  },
  created: function () {
    this.url = '/tool/' + String(this.id) + '/'
  },
  watch: {
    name: function () {
      this.url = '/tool/' + String(this.id) + '/'
    }
  }
}
</script>

<style>
.card {
background-color: white;
padding: 1vw;
margin: 10px 10px;
width: 10vw;
height: 10vw;
position: relative;
}
.toolImg {
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 2px;
}
.card .name {
position: absolute;
top: -20px;
left: 10px;
font-size: 26px;
word-wrap:break-word;
text-shadow: black 0.1em 0.1em 0.2em;
color: white
}
</style>

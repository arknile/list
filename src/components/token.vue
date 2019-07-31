<template>
  <div class="token" :v-show="update" @click="clicked(id)">
    <img v-bind:src="imgSrc" class='icon' :id="id"/><br/>
    <p>{{name}}</p>
  </div>
</template>

<script>
export default {
  name: 'token',
  props: ['value', 'name'],
  data () {
    return {
      update: false,
      imgSrc: require('./icons/WIP.png'),
      id: null
    }
  },
  computed: {
    imgGet () {
      return require('./icons/' + this.value.icon)
    }
  },
  created: function () {
    this.id = this.value.tag_id
    if (this.value.icon === null) {
    } else {
      this.imgSrc = this.imgGet
    }
    this.update = true
    this.name = this.value.tag_name
  },
  methods: {
    clicked (id) {
      if (document.getElementById(id).getAttribute('class') === 'icon') {
        document.getElementById(id).setAttribute('class', 'icon2')
        this.$emit('childLV1Event', [id, 'add'])
      } else {
        document.getElementById(id).setAttribute('class', 'icon')
        this.$emit('childLV1Event', [id, 'remove'])
      }
    }
  }
}
</script>

<style>
.token {
margin: 0;
width: 150px;
cursor: pointer;
display:block;
align-items: center;
margin-right: 10px;
}
.token .icon {
align-items: center;
width: 5vw;
height: 5vw;
border-radius: 5px;
margin: 0 auto;
padding: 2px;
border: 2px hidden;}
.token .icon2 {
width: 5vw;
height: 5vw;
border-radius: 5px;
border: 2px solid;
border-color: red;
margin: 0 auto;
}
.token p {
margin: 0 auto;
}
</style>

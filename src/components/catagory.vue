<template>
  <div class="catagory">
    <token v-for="(value,tag_name) in tagss" v-bind:key="tag_name" :value="value" :name="tag_name" @childLV1Event='childLV2Event'/>
  </div>
</template>

<script>
import token from './token'
export default {
  name: 'catagory',
  components: {
    token
  },
  props: ['catagory', 'tagss'],
  data () {
    return {
      refresh: false
    }
  },
  created: function () {
    this.refresh = true
  },
  methods: {
    childLV2Event (data) {
      this.$emit('childLV2Event', [this.catagory, data[0], data[1]])
    }
  }
}
</script>

<style>
.catagory {
width: 100%;
padding: 10px 0px;
display: flex;
flex-wrap: wrap;
}
</style>

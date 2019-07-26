<template>
  <div>
    <navigator :show='show'/>
    <div>
      <div role="navigation">
        <router-link :to="'/tool/'+$route.params.id+'/'"><div>Overview</div></router-link>
        <router-link :to="'/tool/'+$route.params.id+'/images'"><div class="link">Images</div></router-link>
        <router-link :to="'/tool/'+$route.params.id+'/ratings'"><div class="link">Ratings</div></router-link>
        <router-link :to="'/tool/'+$route.params.id+'/reviews'"><div class="link">Reviews</div></router-link>
        <router-link :to="'/tool/'+$route.params.id+'/tutorials'"><div class="link">Tutorials</div></router-link>
        <router-link :to="'/tool/'+$route.params.id+'/projects'"><div class="link">Projects</div></router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import navigator from './Head'
export default {
  name: 'toolNavigator',
  data () {
    return {
      show: false
    }
  },
  components: {
    navigator
  },
  methods: {
  }
}
</script>

<template>
  <div>
    <div>
      <div class="navigation">
        <router-link :to="'/tool/'+$route.params.id+'/'"><div :class="setClass('Overview')" id="Overview">Overview</div></router-link>
        <router-link :to="'/tool/'+$route.params.id+'/images'"><div :class="setClass('Images')" id="Images">Images</div></router-link>
        <router-link :to="'/tool/'+$route.params.id+'/ratings'"><div :class="setClass('Ratings')" id="Ratings">Ratings</div></router-link>
        <router-link :to="'/tool/'+$route.params.id+'/reviews'"><div :class="setClass('Reviews')" id="Reviews">Reviews</div></router-link>
        <router-link :to="'/tool/'+$route.params.id+'/tutorials'"><div :class="setClass('Tutorials')" id="Tutorials">Tutorials</div></router-link>
        <router-link :to="'/tool/'+$route.params.id+'/projects'"><div :class="setClass('Projects')" id="Projects">Projects</div></router-link>
      </div>
    </div>
    <router-view @type="setCondition"/>
  </div>
</template>

<script>
export default {
  name: 'toolNavigator',
  data () {
    return {
      selected: null
    }
  },
  components: {
    navigator
  },
  methods: {
    setCondition (data) {
      this.selected = data
    },
    setClass (data) {
      if (data === this.selected) {
        return 'link2'
      }
      return 'link'
    }
  }
}
</script>

<style scope>
.navigation {
  width: 800px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}

.navigation .link {
  display: inline-block;
  padding: 3px 8px;
  text-decoration: none;
  font-size: 1.125em; /* ~18px */
  color: blue;
}

.navigation .link2 {
  display: inline-block;
  padding: 3px 8px;
  text-decoration: none;
  font-size: 1.125em; /* ~18px */
  color: black;
  border-bottom:2px solid orange;
}
</style>

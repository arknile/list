<template>
  <div id='ex'>{{tmp}}
  </div>
</template>

<script>
export default {
  name: 'child',
  props: ['tmp'],
  watch: {
    tmp: function () {
      document.getElementById('ex').innerHTML = this.tmp
    }
  }
}
</script>

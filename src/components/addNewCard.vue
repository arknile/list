<template>
  <router-link to="/addTool">
    <div class="card" >
      <img src="./Image/addNew.png" class='toolImg'/>
      </div>
  </router-link>
</template>

<script>
export default {
  name: 'addNewCard'
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

</style>

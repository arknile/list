<template>
  <div class="card">
    <router-link to="/addTool">
      <img src="./Image/addNew.png" class='toolImg'/>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'addNewCard'
}
</script>

<style>
.card {
background-color: white;
padding: 20px;
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

<template>
  <div class="right" v-if="toolData">
    <div class="searchBox">
      <select id="select">
        <option value="name" selected>Name</option>
        <option value="author">Author</option>
      </select>
      <input type="text" id="searchPlaceholder" class="import" placeholder="Enter a keyword to search, e.g. partial tool name / author name" v-model="value"/>
      <input type="button" class="btn-search" value="Search" @click="validate()"/>
    </div>
    <div class="cards">
      <addNewCard/>
      <card v-for="(item, index) in toolData" :key="index" :name="item.name" :id="item.id" :image="item.image1"/>
      <div class="bottom"/>
    </div>
  </div>
</template>

<script>
import card from './card'
import addNewCard from './addNewCard'
export default {
  name: 'right',
  components: {
    card,
    addNewCard
  },
  props: {
    toolData: Array
  },
  data () {
    return {
      value: null,
      searchOption: [{'CODE': 'Name', 'VALUE': 'name'}, {'CODE': 'Author', 'VALUE': 'author'}],
      searchType: 'Name'
    }
  },
  methods: {
    validate () {
      if (this.value === '') {
        this.$emit('rightChildEvent', [null, null])
      } else if (this.value !== null) {
        this.$emit('rightChildEvent', [document.getElementById('select').value, this.value])
      }
    }
  }
}
</script>

<style>
.right {
margin: 0 1vw;
width: 47vw;
height: 100%;
position: relative;
left: 1vw;
border: 10px hidden;
}
.cards {
top:80px;
left:30px;
height:-webkit-calc(100% - 80px);
height:-moz-calc(100% - 80px);
height:calc(100% - 80px);
width: 100%;
position: relative;
display: flex;
flex-wrap: wrap;
overflow-x:hidden;
overflow-y:auto;
}
.searchBox {
position: absolute;
top: 20px;
margin: 0 auto;
display: flex;
left: 10vw
}
select {
width: 84px;
height: 40px;
}
.import {
  width: 15vw;
  height: 40px;
  margin-left: 0px;
  padding-left: 20px;
  border: none;
  outline: none;
}
.btn-search {
  position: relative;
  width: 100px;
  height: 40px;
  color: #fff;
  background-color: #444786;
  border: 0;
}
.bottom {
height: 2vw;
width: 100%;
position: relative;
}
</style>

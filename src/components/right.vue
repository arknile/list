<template>
  <div class="right" v-if="toolData">
    <div class="searchBox">
      <select id="select" @change="change()">
        <option value="name" selected>Tool name</option>
        <option value="author">Author</option>
      </select>
      <input type="text" id="searchPlaceholder" class="import" placeholder="Use drop-down menu to search author" v-model="value"/>
      <input type="button" class="btn-search" value="Clear" @click="validate()"/>
    </div>
    <div class="cards">
      <addNewCard/>
      <card v-for="(item, index) in jsonData" :key="index" :name="item.name" :id="item.id" :image="item.image1"/>
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
      searchType: 'Name',
      jsonData: [],
      select: 'Tool Name'
    }
  },
  methods: {
    validate () {
      this.value = ''
    },
    change () {
      if (this.value !== '' && this.value !== null) {
        this.jsonData = []
        for (var i in this.toolData) {
          var index = this.toolData[i][document.getElementById('select').value].toLowerCase().indexOf(this.value.toLowerCase())
          if (index > -1) {
            this.jsonData.push(this.toolData[i])
          }
        }
      } else {
        this.jsonData = this.toolData
      }
    }
  },
  created () {
    this.jsonData = this.toolData
  },
  watch: {
    toolData: function () {
      this.jsonData = this.toolData
      this.value = ''
    },
    value: function () {
      if (this.value !== '') {
        this.jsonData = []
        for (var i in this.toolData) {
          var index = this.toolData[i][document.getElementById('select').value].toLowerCase().indexOf(this.value.toLowerCase())
          if (index > -1) {
            this.jsonData.push(this.toolData[i])
          }
        }
      } else {
        this.jsonData = this.toolData
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
.right .cards {
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
.right .searchBox {
position: absolute;
top: 20px;
margin: 0 auto;
display: flex;
left: 10vw
}
.right select {
width: 84px;
height: 40px;
}
.right .import {
  width: 18vw;
  height: 40px;
  margin-left: 0px;
  padding-left: 20px;
  border: none;
  outline: none;
}
.right .btn-search {
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

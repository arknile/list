<template>
<div>
  <div class='root'>
    <div class='container'>
      <div class='Naviroot' role='navigation'>
        <!--a href='Tutorial.html'><div class='link'>Tutorial</div></a>
        <a href='About.html'><div class='link'>About</div></a>
        <a href='Contact.html'><div class='link'>Contact</div></a-->
        <router-link to="/login" class="link" v-show="$cookies.get('username') === null" v-if="!$cookies.get('username')"><img src="./Image/login.png" width=20px height=20px/>User Login</router-link>|
        <router-link to="/login" class="link" v-show="$cookies.get('username') === null" v-if="!$cookies.get('username')"><img src="./Image/login.png" width=20px height=20px/>Admin Login</router-link>
        <div class="link" v-show="!($cookies.get('username') === null)" v-if="$cookies.get('username')">Hello, {{this.$cookies.get('username')}}</div>
      </div>
      <router-link class='brand' to="/">
        <img src='./logo-small.png' srcset='./logo-small@2x.png 2x' width='38' height='38'/>
        <span class='brandTxt'>Vis Browser</span>
        <span class='brandSubText'>
          An Annotated Collection of Tools for Data Visualization
        </span>
      </router-link>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'navigator',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scope>
@import 'variables.css';
@import url('https://fonts.googleapis.com/css?family=Sansita+One');

html {
  color:#222;
  font-weight: 100;
  font-size: 1em; /* ~16px; */
  font-family: var(--font-family-base);
  line-height: 1.375; /* ~22px */
  background-color: #f6f1eb;
}

body {
    margin: 0;
    background-size: 100%;
    background-repeat: no-repeat;
}

.root .Naviroot {
  float: right;
  margin: 6px 0 0;
}

.root .link {
  display: inline-block;
  padding: 3px 8px;
  text-decoration: none;
  font-size: 1.125em; /* ~18px */
}

.root .link,
.root .link:active,
.root .link:visited {
  color: rgba(255, 255, 255, 0.6);
}

.root .link:hover {
  color: rgba(255, 255, 255, 1);
}

.root {
  background: #000;
  color: #fff;
}

.root .container {
  margin: 0 auto;
  padding: 20px 0;
  max-width: var(--max-content-width);
}

.root .brand {
  color: color(var(--brand-color) lightness(+10%));
  text-decoration: none;
  font-size: 1.75em; /* ~28px */
}

.root .brandTxt {
  margin-left: 10px;
  font-family: 'Sansita One', fantasy;
}

.root .brandSubText {
  margin-left: 10px;
  font-family: 'Sansita One', fantasy;
  font-size: 0.5em;
}
</style>

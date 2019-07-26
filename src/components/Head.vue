<template>
<div>
  <div class='root'>
    <div class='container'>
            <div class='Naviroot' role='navigation'>
                <a href='Tutorial.html'><div class='link'>Tutorial</div></a>
                <a href='About.html'><div class='link'>About</div></a>
                <a href='Contact.html'><div class='link'>Contact</div></a>
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
  <router-view v-show="show" v-if="show"/>
</div>
</template>

<script>
export default {
  name: 'navigator',
  props: ['show'],
  data () {
    return {
    }
  },
  created: function () {
    if (this.show == null) {
      this.show = true
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

.Naviroot {
  float: right;
  margin: 6px 0 0;
}

.link {
  display: inline-block;
  padding: 3px 8px;
  text-decoration: none;
  font-size: 1.125em; /* ~18px */
}

.link,
.link:active,
.link:visited {
  color: rgba(255, 255, 255, 0.6);
}

.link:hover {
  color: rgba(255, 255, 255, 1);
}

.hr {
    display: inline-block;
}

.root {
  background: #000;
  color: #fff;
}

.container {
  margin: 0 auto;
  padding: 20px 0;
  max-width: var(--max-content-width);
}

.login {
    display: inline-block;
    color: color(var(--brand-color) lightness(+10%));
    text-decoration: none;
    float: right;
    position:fixed;
    right:20px;
    top:20px;
}

.brand {
  color: color(var(--brand-color) lightness(+10%));
  text-decoration: none;
  font-size: 1.75em; /* ~28px */
}

.brandTxt {
  margin-left: 10px;
  font-family: 'Sansita One', fantasy;
}

.brandSubText {
  margin-left: 10px;
  font-family: 'Sansita One', fantasy;
  font-size: 0.5em;
}
</style>

<template>
  <div id="app">
    <tab></tab>
    <router-view></router-view>
    <foot-nav></foot-nav>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
  </div>
</template>
<script>
   import tab from './components/tab.vue';
   import footNav from './components/footNav.vue';
    export default {
        components:{
           tab,
           footNav 
        },
    }
</script>
<style>
  
</style>

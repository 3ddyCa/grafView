<script setup lang="ts">
    // import router from  'vue-router'  
    import Navbar from '../components/Navbar.vue'
    import Footer from '../components/Footer.vue'

</script>
<template>
  
  <Navbar />
  <main class="m-0 p-0 bg-base-100" >
    <router-view />
  </main>
  <Footer />
  
 </template>
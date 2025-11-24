<template>
	<HeaderPage/>
  <router-view/>
</template>

<script setup>
import HeaderPage from '@/components/HeaderPage.vue';
</script>

<style>
#app { 
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

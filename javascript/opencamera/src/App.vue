<template>
  <div id="app">
    <ui-camera />
  </div>
</template>

<script>
import Camera from '@/components/Camera.vue'

export default {
  name: 'App',
  components: {
    'ui-camera': Camera
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

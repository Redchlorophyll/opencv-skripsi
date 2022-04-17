<template>
  <div id="app">
    <ui-camera />
  </div>
</template>

<script>
import Camera from '@/components/Camera.vue'

export default {
  name: 'CameraProto',
  components: {
    'ui-camera': Camera,
  }
}
</script>

<style>
</style>

<template>
  <div class="loader-screen">
    <div v-lang.loader.title></div>
  </div>
</template>
<script>


export default {
  name: 'Loader'
}
</script>

<style>
.loader-screen{
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
}
</style>

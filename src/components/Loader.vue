<template>
  <div class="loader-screen">
    <img src="@/assets/tutty/13tutti1.png" />
  </div>
  <!-- <div class="loader-screen">
    <img src="" alt="">
  </div> -->
</template>
<script>


export default {
  name: 'Loader'
}
</script>

<style scoped>
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

img{
  height: 50vh;
}
</style>

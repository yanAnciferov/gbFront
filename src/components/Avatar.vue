<template>
    <div class="image-wrapper">
          <div class="image-border">
              <img :src="image" alt="avatar">
          </div>
    </div>
</template>

<script>
export default {
  props:["image"]
}
</script>


<style>
.image-wrapper{
      width: 96px;
      height: 96px;
  }
  .image-wrapper img{
      width: 100%;
  }

  .image-border{
      border-radius: 50%;
      height: 100%;
      width: 100%;
      overflow: hidden;
  }
</style>


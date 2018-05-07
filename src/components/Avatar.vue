<template>
     <div class="result-avatar">
        <div class="circle">
            <img class="circle-img" src="@/assets/frame-05.svg" alt="">
            <div class="avatar">
                <img :src="image" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props:["image"]
}
</script>


<style scoped>

  .result-avatar{
    width: 8em;
}


.circle{
    width: 7.3em;
    height: 7.3em;
  
    margin-top: 1em;
    margin-left: 1em;

    position: relative;
  
}

.circle-img{
    z-index: 2;
}

.avatar{
    z-index:-1;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    width: 7em;
    height: 7em;
    overflow: hidden;
    margin-top: .3em;
    margin-left: .15em;
}

.avatar img{
    width: 100%;
}
</style>


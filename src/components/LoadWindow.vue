 <template>
 <div class="wrap">
     <div class="window">
         <div class="content">
             <span>Пожалуйста подождите...</span>
         </div>
     </div>
 </div>
</template>


<script>


export default {
  name: 'loadWindow',
  data () {
      return {
        
      }
  }
}
</script>

<style scoped>
  .wrap{
      position: fixed;
      background-color: #181818a8;
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0;
      left: 0;

  }

  .window{
      background-color: white;
      padding: 1em;
      box-shadow: 0px 1px 6px #000;
  }
</style>

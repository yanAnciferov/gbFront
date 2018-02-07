 <template>
 <div class="wrap">
     <form id="uploadForm" name="uploadForm" enctype="multipart/form-data">

      <input id="file" type="file" @change="processFile">

      <input v-if="imageUrl" type=button value=Upload @click="uploadFiles">

    </form>
 </div>
</template>


<script>

import { mapActions } from "vuex"

export default {
  name: 'search',
  data () {
      return {
        correctlyImage: false
      }
  }, 
   methods:{
        
    ...mapActions(["uploadFiles"]),
    processFile(event) {
        this.loadImage = event.target.files[0];
        var imageName = this.loadImage.name;
        if(imageName.includes(".jpg") || imageName.includes(".jpeg" || imageName.includes(".png"))){
            alert("Изображение успешно загружено");
            this.correctlyImage = true;
        }else {
            alert("Загружаемый файл должен быть формата изображения: .jpg или .png");
            this.correctlyImage = false;
        }
    }
  },
  computed:{
      imageUrl(){
          console.log(this.correctlyImage)
        return this.correctlyImage;
      }
  }
}
</script>

<style scoped>
  
</style>

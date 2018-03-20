 <template>
 <div class="wrap">
     <div class="window">
         <button v-on:click="$emit('close')" class="close">X</button>
         <div class="content">
             <h4>Добавление нового аудио для {{category.Name}}</h4>
             <form>
                 <p>                 
                    <label for="performer">Исполнитель</label>
                    <br>
                    <input v-model="addAudioFormModel.performer"
                     name="performer"
                     type="text">
                 </p>

                 <p> 
                    <label for="title">Название</label>
                    <br>
                    <input v-model="addAudioFormModel.tittle"
                     name="title"
                      type="text">
                 </p>
                 <p>
                    <label for="file"></label>
                    <input name="file" id="audio" type="file">
                 </p>
                 <p>
                     <input type="button" 
                     v-on:click="load" 
                     :disabled="validate"
                     value="Отправить"/>
                 </p>

             </form>
         </div>
     </div>
 </div>
</template>


<script>
import { mapActions,mapGetters } from "vuex"

export default {
  name: 'addAudioWindow',
  props: ['category'],
  data () {
      return {
        correctlyAudio: false,
        addAudioFormModel: {
            category: this.category,
            title: "", 
            performer: "" 
        }
      }
  },
  methods: {
       ...mapActions(["loadAudio"]),
       load(){
         this.$store.dispatch("loadAudio", this.addAudioFormModel);
       },
       processFile(event) {
        this.loadImage = event.target.files[0];
        var imageName = this.loadImage.name;
        if(imageName.includes(".mp3")) {
            alert("Изображение успешно загружено");
            this.correctlyImage = true;
        }else {
            alert("Загружаемый файл должен быть формата .mp3");
            this.correctlyImage = false;
        }
    }
  },
  computed:{
      ...mapGetters(["getLoadState"]),
      validate(){
          return this.addAudioFormModel.title == "" && 
                this.addAudioFormModel.performer == "";
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

.close{
    position: absolute;
    top: 1em;
    right: 1em;
}
    
  .window{
      position: relative;
      background-color: white;
      padding: 1em;
      box-shadow: 0px 1px 6px #000;
  }

  form{
      display: flex;
      flex-direction: column;
  }
</style>

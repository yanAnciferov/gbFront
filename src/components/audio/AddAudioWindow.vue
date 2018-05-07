 <template>
 <div class="wrap">
     <div v-if="loadNow == false" class="window">
         <div class="bg">
           <img src="@/assets/profil.png" alt="bg">
        </div>
         <button v-on:click="$emit('close')" class="close">X</button>
         <div class="content">
             <h4>Добавление нового аудио</h4>
             <form id="uploadForm" name="uploadForm">
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
                <label for="title">Выберите категорию</label>
                <div class="categs">
                    <div v-bind:class="{cat: true, active: addAudioFormModel.category != null && addAudioFormModel.category.Id == item.Id}" @click="addAudioFormModel.category = item" v-for="(item, index) in getCategories" :key='index'>
                        <img :src="item.ImageUrl" :alt="item.Name">
                    </div>
                </div>
                 <p>
                    <input type="file" name="audio" id="file" class="inputfile" 
                     @change="processFile" />
                   
                    <label for="file" id="fileLabel">
                        <strong>
                            Выберите файл...
                        </strong>
                    </label>
                    <span class="error" v-if="error">Формат файла должен быть .mp3</span>
                 </p>
           
                

             </form>

              <p>
                     <button class="button" 
                     v-on:click="load" 
                     :disabled="validate"
                     >Отправить</button>
                 </p>
         </div>
     </div>

    <div class="loading" v-if="loadNow == true">
        <div class="result-bg">
            <img src="@/assets/prof_mini-04.png" alt="">
        </div>
        <div class="text">
             {{message}}
        </div>
    </div>
 </div>
</template>


<script>

import { mapActions,mapGetters } from "vuex"

export default {
  name: 'addAudioWindow',
  data () {
      return {
        correctlyAudio: false,
        addAudioFormModel: {
            category: null,
            title: "", 
            performer: "",
           
            callback: (msg) => {
                this.message = msg;
                setTimeout(() => {this.$emit("close")}, 1000);
            }
        },
        message: "Идет загрузка...",
        error: false,
        loadNow: false
      }
  },
  methods: {
       ...mapActions(["loadAudio"]),
       load() {
           this.loadNow = true;
         this.$store.dispatch("loadAudio", this.addAudioFormModel);
       },
       processFile(event) {
        this.loadImage = event.target.files[0];
        var imageName = this.loadImage.name;
        if(imageName.includes(".mp3")) {
            fileLabel.innerText = imageName;
            this.correctlyAudio = true;
            this.error = false;
        }else {
            fileLabel.innerText = 'Выберите файл...';
            this.correctlyAudio = false;
            this.error = true;
        }
    }
  }, 
  computed:{
      ...mapGetters(["getLoadState", 'getCategories']),
      validate(){
          return this.addAudioFormModel.title == "" && 
                this.addAudioFormModel.performer == "" && this.correctlyAudio == false;
      }
  },
}
</script>

<style scoped>

.text{
    color: white; 
    font-family: slimamif;
    font-weight: bold;
    font-size: 1.4em;

}

.loading{
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 7em;
    width: 20em;
}

.result-bg{
    z-index: -10;
    position: absolute;
    top: 0;
    left: 0; 
    height: 7em;
    width: 20em;

}

.result-bg img{
    width: 100%;
}

.error{
   color: #581515;
   display: block;
    font-family: slimamif;
    font-weight: bold;
}

.categs{
    display: block;
    overflow: scroll;
    max-width: 400px;
    background-color: transparent;
    height: 99px;

    overflow-y: auto;
    white-space: nowrap;
}

.cat{
    display: inline-block;
    width: 5em;
    height: 5em;
    list-style: none;
    background-color: transparent;
    cursor: pointer;
    position: relative;
}


.active{
    border: 1px solid white;
}

.cat:hover{
    background-color: #552152;
    
}

.cat img{
    width: 100%;
    height: 100%;
}


  .wrap{
      position: fixed;
      background-color: #05050581;
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0;
      left: 0;

  }


.inputfile {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
    z-index: -1;
    outline: none;
}

.inputfile + label {
    font-size: 1.25em;
    font-weight: 700;
    color: white;
    background-color: transparent;
    display: inline-block;
    outline: none;
}

.inputfile:focus + label,
.inputfile + label:hover {
    color:#552152;
    outline: none;
}

.inputfile + label {
	cursor: pointer; /* "hand" cursor */
}


.inputfile:focus + label {
	outline: 1px dotted #000;
	outline: -webkit-focus-ring-color auto 5px;
}

.inputfile + label * {
	pointer-events: none;
}

.close:hover{
    color:#552152;
}

.close{
    position: absolute;
    top: .5em;
    right: 1.5em;
    background: none;
    border: none;
    outline: none;
    color: white;
    cursor: pointer;
    font-family: LifelsRU;
    font-size: 1.5em;
}
    
  .window{
      position: relative;
      padding: 4em;
      box-sizing: border-box;
  }


.button{
    /* border: 2px solid #552152;
    padding: 6px;
 */
    outline: none;
    cursor: pointer;

    background-color: transparent;
    border: none;
    font-family: LifelsRU;
    font-weight: bold;
    color: white;
    font-size: 1.5em;
}

.button:hover{
    color: #552152;
}

.bg{
    position: absolute;
    top: -1em;
    left: 0em;
    height: 34em;
    width: 100%;
    z-index: -10;
}

.bg img{
    width: 100%;
    height: 100%;
}

  form{
      display: flex;
      flex-direction: column;
  }

  h4{
    font-family: LifelsRU;
    font-weight: bold;
    color: #552152;
    font-size: 1.3em;
    margin: 0;
  }

  label{
    color: rgb(194, 194, 194);
    font-family: slimamif;
    font-weight: bold;
    font-size: 1.2em;
  }

  p{
      margin: 1em 0;
  }

  input[type="text"]{
      border: none;
      padding: .2em;
      border-radius: 4px;
      outline: none;
      width: 400px;
      box-sizing: border-box;
      margin-top: .5em;
  }
</style>

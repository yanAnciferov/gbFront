 <template>
 <div class="wrap">
    <div class="mbg" id="scene" >
        <img data-depth="0.1" src="@/assets/bg-profil/fon_profili1.png" alt="bg">
        <img data-depth="0.2" src="@/assets/bg-profil/fon_profili2.png" alt="bg">
    </div>
    <h2></h2>
     


     <div class="block main-block">
         <div class="bg-block main-block">
            <img src="@/assets/audio-bg.png" alt="bg">
        </div>

        <div class="column-wrapper">
            <div class="left">
                <h3>Сменить аватар</h3>


                <div class="result-avatar">
                   
                    <avatar :image="user.AvatarImage"/>
                </div>


                <form id="uploadForm" name="uploadForm" enctype="multipart/form-data">

                <input type="file" name="img" id="file" class="inputfile"
                            @change="processFile" />

                <label for="file" id="fileLabel">
                    <strong>
                        Выберите файл...
                    </strong>
                </label>
                <!-- <span class="error" v-if="error">Формат файла должен быть .mp3</span> -->

                <div class="uploadWrapper">
                    <input class="uploadAvatar" v-if="imageUrl" type=button value=Загрузить @click="uploadAvatar">
                </div>
                
                </form>
            </div>

            <div class="right">
                <h3>Основная информация</h3>
                <form>
                    <div class="horiz">
                        <p class="formRow">
                            <label for="firstName">Имя</label>
                            <input @blur="firstnameChange" type="text" v-model="user.Firstname" name="firstName" id="">
                        </p>
                        <p class="formRow">
                            <label for="firstName">Фамилия</label>
                            <input type="text" @blur="lastnameChange" v-model="user.Lastname" name="lastName" id="">
                        </p>
                    </div>
                    <div class="location">
                        <label for="">Локация</label>
                        <div class="horiz">
                             <p class="formRow">
                            <select @change="countryClick(selectedCountry)" v-model="selectedCountry">
                                <option disabled value="">Страна</option>
                                <option v-for="(item, index) in countries" :key='index'
                                :class="{ active: item.isSelected }"
                            >
                                {{item.Name}}</option>
                            </select>
                             </p>
                             <p class="formRow">
                            <select @change="cityClick()"
                                v-model="selectedCity"
                                :disabled='selectedCountry == "Страна"'>
                                <option value="Город" disabled>Город</option>
                                <option :value="item.name" v-for="(item, index) in city" :key='index'
                                :class="{ active: item.isSelected }"
                            >
                                {{item.Name}}</option>
                            </select>
                             </p>
                        </div>
                    </div>
                    <div class="phone">
                         <label for="">Номер телефона</label>
                        <div class="horiz">
                            <p class="formRow">
                                <input @blur="phoneChange" v-model="user.Phone" type="text">
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
     </div>
     <div v-if="false" class="block">
        <h3>Сменить пароль</h3>
        <form id="uploadForm" name="uploadForm" enctype="multipart/form-data">

            <p class="formRow">
                <label for="currentPassword">Введите ваш текущий пароль</label>
                <input name="currentPassword" type="text">
            </p>
            <p class="formRow">
                <label for="newPassword">Введите новый пароль</label>
                <input name="newPassword"  type="text">
            </p>
            <p class="formRow">
                <label for="confirmPassword">Подтвердите новый пароль</label>
                <input name="confirmPassword" type="text">
            </p>

            <input type=button value=Подтвердить>

        </form>
     </div>

    <div v-if="false" class="block">
        <button class="button">Удалить аккаунт</button>
    </div>

    <div class="block">
        <div class="bg-block">
            <img src="@/assets/audio-bg.png" alt="bg">
        </div>
         <h3>
            <span>Социальные сети</span>
            <span class="state">{{stateModel.social}}</span>
        </h3>

        <div class="social">
            <div class="name">
                <img src="" alt="">
                <span>Facebook</span>
            </div>
            <div class="link">
                <div v-if="(user.SocNetworks == null || user.SocNetworks.FaceBook == null)  && !socialModel.fb.inputActive" class="add">
                    <button class="close" @click="socialModel.fb.inputActive = true">+</button>
                </div>

                <div class="input" v-if="socialModel.fb.inputActive">
                    <div class="text">
                        <input v-model="socialModel.fb.text" id="fbUrl" type="text">
                    </div>
                    <button class="close" @click="set( {newLink: socialModel.fb.text, socName: 'Facebook', stateModel} ); 
                    user.SocNetworks.FaceBook = socialModel.fb.text;  socialModel.fb.inputActive = false">Подтвердить</button>
                    <button class="close" @click="socialModel.fb.inputActive = false">X</button>
                </div>

                <div v-if="user.SocNetworks != null  && user.SocNetworks.FaceBook != null" class="drop">
                    
                    <span class="link">{{user.SocNetworks.FaceBook}}</span>
                    <button class="close" @click="drop({socName: 'Facebook', stateModel}); user.SocNetworks.FaceBook = null; socialModel.fb.text = ''">X</button>
                </div>
            </div>
        </div>

       <div class="social">
            <div class="name">
                <img src="" alt="">
                <span>Instagram</span>
            </div>
            <div class="link">
                <div v-if="(user.SocNetworks == null || user.SocNetworks.Instagram == null)  && !socialModel.inst.inputActive" class="add">
                    <button class="close" @click="socialModel.inst.inputActive = true">+</button>
                </div>

                <div class="input" v-if="socialModel.inst.inputActive">
                    <div class="text">
                        <input v-model="socialModel.inst.text" id="instUrl" type="text">
                    </div>
                    <button class="close" @click="set( {newLink: socialModel.inst.text, socName: 'Instagram', stateModel} ); 
                    user.SocNetworks.Instagram = socialModel.inst.text;  socialModel.inst.inputActive = false">Подтвердить</button>
                    <button class="close" @click="socialModel.inst.inputActive = false">X</button>
                </div>

                <div v-if="user.SocNetworks != null  && user.SocNetworks.Instagram != null" class="drop">
                    
                    <span class="link">{{user.SocNetworks.Instagram}}</span>
                    <button class="close" @click="drop({socName: 'Instagram', stateModel}); user.SocNetworks.Instagram = null; socialModel.inst.text = ''">X</button>
                </div>
            </div>
        </div>


        <div class="social">
            <div class="name">
                <img src="" alt="">
                <span>YouTube</span>
            </div>
            <div class="link">
                <div v-if="(user.SocNetworks == null || user.SocNetworks.YouTube == null)  && !socialModel.tube.inputActive" class="add">
                    <button class="close" @click="socialModel.tube.inputActive = true">+</button>
                </div>

                <div class="input" v-if="socialModel.tube.inputActive">
                    <div class="text">
                        <input v-model="socialModel.tube.text" id="tubeUrl" type="text">
                    </div>
                    <button class="close" @click="set( {newLink: socialModel.tube.text, socName: 'YouTube', stateModel} ); 
                    user.SocNetworks.YouTube = socialModel.tube.text;  socialModel.tube.inputActive = false">Подтвердить</button>
                    <button class="close" @click="socialModel.tube.inputActive = false">X</button>
                </div>

                <div v-if="user.SocNetworks != null  && user.SocNetworks.YouTube != null" class="drop">
                    
                    <span class="link">{{user.SocNetworks.YouTube}}</span>
                    <button class="close" @click="drop({socName: 'YouTube', stateModel}); user.SocNetworks.YouTube = null; socialModel.tube.text = ''">X</button>
                </div>
            </div>
        </div>

        <div class="social">
            <div class="name">
                <img src="" alt="">
                <span>iTunes</span>
            </div>
            <div class="link">
                <div v-if="(user.SocNetworks == null || user.SocNetworks.iTunes == null)  && !socialModel.tunes.inputActive" class="add">
                    <button class="close" @click="socialModel.tunes.inputActive = true">+</button>
                </div>

                <div class="input" v-if="socialModel.tunes.inputActive">
                    <div class="text">
                        <input v-model="socialModel.tunes.text" id="tunesUrl" type="text">
                    </div>
                    <button class="close" @click="set( {newLink: socialModel.tunes.text, socName: 'iTunes', stateModel} ); 
                    user.SocNetworks.iTunes = socialModel.tunes.text;  socialModel.tunes.inputActive = false">Подтвердить</button>
                    <button class="close" @click="socialModel.tunes.inputActive = false">X</button>
                </div>

                <div v-if="user.SocNetworks != null  && user.SocNetworks.iTunes != null" class="drop">
                    
                    <span class="link">{{user.SocNetworks.iTunes}}</span>
                    <button class="close" @click="drop({socName: 'iTunes', stateModel}); user.SocNetworks.iTunes = null; socialModel.tunes.text = ''">X</button>
                </div>
            </div>
        </div>

        <div class="social">
            <div class="name">
                <img src="" alt="">
                <span>SoundCloud</span>
            </div>
            <div class="link">
                <div v-if="(user.SocNetworks == null || user.SocNetworks.SoundCloud == null)  && !socialModel.cloud.inputActive" class="add">
                    <button class="close" @click="socialModel.cloud.inputActive = true">+</button>
                </div>

                <div class="input" v-if="socialModel.cloud.inputActive">
                    <div class="text">
                        <input v-model="socialModel.cloud.text" id="cloudUrl" cloud="text">
                    </div>
                    <button class="close" @click="set( {newLink: socialModel.cloud.text, socName: 'SoundCloud', stateModel} ); 
                    user.SocNetworks.SoundCloud = socialModel.cloud.text;  socialModel.cloud.inputActive = false">Подтвердить</button>
                    <button class="close" @click="socialModel.cloud.inputActive = false">X</button>
                </div>

                <div v-if="user.SocNetworks != null  && user.SocNetworks.SoundCloud != null" class="drop">
                    
                    <span class="link">{{user.SocNetworks.SoundCloud}}</span>
                    <button class="close" @click="drop({socName: 'SoundCloud', stateModel}); user.SocNetworks.SoundCloud = null; socialModel.cloud.text = ''">X</button>
                </div>
            </div>
        </div>

    </div>

    <div class="block">
        <div class="bg-block">
            <img src="@/assets/audio-bg.png" alt="bg">
        </div>
        <h3>
            <span>О себе</span>
            <span class="state">{{stateModel.about}}</span>
        </h3>
        <textarea @change="updateAbout(stateModel)"  maxlength="512" cols="30" rows="10" v-model="user.About" ></textarea>
     </div>


      <div class="block pass">
        <div class="bg-block bg-block-pass">
            <img src="@/assets/audio-bg.png" alt="bg">
        </div>
        <h3>Сменить пароль</h3>
        <form id="uploadForm" name="uploadForm" enctype="multipart/form-data">

            <p class="formRow">
                <label for="currentPassword">Введите ваш текущий пароль</label>
                <input name="currentPassword" type="text">
            </p>
            <p class="formRow">
                <label for="newPassword">Введите новый пароль</label>
                <input name="newPassword" type="text">
            </p>
            <p class="formRow">
                <label for="confirmPassword">Подтвердите новый пароль</label>
                <input name="confirmPassword" type="text">
            </p>

            <button type=button class="close save"> Подтвердить </button>

        </form>
     </div>
 </div>
</template>


<script>

import { mapActions, mapGetters } from "vuex"
import Avatar from "@/components/Avatar"
import LoadWindow from "@/components/LoadWindow"
import Parallax from 'parallax-js'

export default {
  name: 'settings',
  components: {
      Avatar,
      LoadWindow
  },
  data () {
      
      return {
        selectedCountry: 'Страна',
        selectedCity: 'Город',
        correctlyImage: false,
        error: false,
        saveAbout: false,
        socialModel: {
            fb: {
                text: '',
                inputActive: false
            },
             inst: {
                text: '',
                inputActive: false
            },
             tube: {
                text: '',
                inputActive: false
            },
             tunes: {
                text: '',
                inputActive: false
            },
             cloud: {
                text: '',
                inputActive: false
            }
        },
        stateModel:{
            about: "",
            social: ""
        }
      }
  },
   methods:{

    ...mapActions(["uploadAvatar", 'set','drop', 'updateAbout']),
    processFile(event) {
        this.loadImage = event.target.files[0];
        var imageName = this.loadImage.name;
        if(imageName.includes(".jpg") || imageName.includes(".jpeg" || imageName.includes(".png"))){
            //alert("Изображение успешно загружено");
            this.correctlyImage = true;
        }else {
           // alert("Загружаемый файл должен быть формата изображения: .jpg или .png");
            this.correctlyImage = false;
        }
    },
    countryClick(country){    
        this.$store.dispatch('changeCountry', this.countries.find((el) => {return el.Name == country}))
    },
    cityClick(){    
        this.$store.dispatch('updateCity', this.city.find((el) => {return el.Name == selectedCity}))
    },
    firstnameChange(){
        if(this.user.Firstname != '')
            this.$store.dispatch('updateFirstName',this.user.Firstname)
    },
     lastnameChange(){
        if(this.user.Lastname != '')
            this.$store.dispatch('updateLastName',this.user.Lastname)
    }, 
    phoneChange(){
        
    }
  },
  computed:{
      ...mapGetters({user: "getUser", countries: "getCountryList", city: 'getCityList'}),
      imageUrl(){
          console.log(this.correctlyImage)
        return this.correctlyImage;
      }
  },
  beforeCreate(){
      this.$store.dispatch('loadCountries');
  }, 
  created(){
        setTimeout(()=>{                
            var scene = document.getElementById('scene');
            var parallaxInstance = new Parallax(scene);
        }, 500)
    }
}
</script>

<style scoped>

.uploadWrapper{
    margin-top: 1em;
    margin-left: -1em;
}

.uploadAvatar{
 background-color: transparent;
    font-family: LifelsRU;
    border: none;
    color: white;
    font-size: 1.3em;
    margin: 0 .5em;
    cursor: pointer;
    
}

.uploadAvatar:hover{
    color: #552152;
}

h3{
    display: flex;
    justify-content: space-between;
}

.state{
    color: white;
    font-family: slimamif;
    border: none;
    color: white;
    font-size: .8em;
}

select{
     border: none;
    outline: none;
    width: 15em;
    border-radius: 5px;
}

.horiz{
    display: flex;
    margin-top: -1em;
}

.horiz > .formRow{
    margin-right: 2em;
}

.right{
    margin-left: 3em;
}

.column-wrapper{
    display: flex;
}

textarea{
    max-width: 100%;
    min-width: 100%;
    max-height: 10em;
    min-height: 10em;
    padding: .5em;
    box-sizing: border-box;
    border-radius: 5px;
}

.close{
    background-color: transparent;
    font-family: LifelsRU;
    border: none;
    color: white;
    font-size: 1.3em;
    margin: 0 .5em;
    cursor: pointer;
}

.save{
    padding: 0;
    margin: 0;
}

.close:hover{
    color:#552152;
}

.pass{
    margin-top: 6em;
}

.input{
    display: flex;
    align-items: center;
}

.text{
    display: flex;
    flex-direction: column;
}


label{
    font-family: slimamif;
    font-weight: bold;
    color: white;
}

.formRow label, .location label{
    margin-bottom: .2em;
}

span.link{
    max-width: 25em;
    overflow: hidden;
    display: inline-block;
    height: 1.1em;
     font-family: slimamif;
    font-weight: bold;
    color: white;

}


.name{
    font-family: LifelsRU;
    font-weight: bold;
    color: #552152;
}

.result-avatar{
    width: 8em;
    margin-left: -1em;
    margin-bottom: 1em;
}

div.social{
    margin: .7em 0;
    display: flex;
    justify-content: space-between;
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
    background-color: white;
}

.avatar img{
    width: 100%;
}


.mbg{
    z-index: -10;
    position: fixed;
    top: -1em;
    left: -1em;
}

.mbg img{
    z-index: -10;
    width: 100em;
}


input[type="text"]{
    box-sizing: border-box;
    border: none;
    padding: 1em;
    outline: none;
    width: 15em;
    border-radius: 5px;
}


h2, h3{
    font-family: LifelsRU;
    font-weight: bold;
    color: #552152;
}


.wrap{
    padding: 1em 16em;
}
.block{
    padding: 1em 3em;
    margin-bottom: 3em;
    position: relative;
}



.bg-block{
    z-index: -10;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 17em;
}

  
.bg-block-pass{
    height: 21em;
}

.main-block{
    height: 19em;
}

.bg-block img{
    width: 100%;
    height: 100%;
}

.formRow {
    display: flex;
    flex-direction: column;
}

input[type="text"], select{
    padding: .4em .6em;
    max-width: 15em;
   
}

input[type='text'], textarea, select{
     font-family: LifelsRU;
    font-size: 1em;
}

.button{
    background-color: #333;
    color: white;
    border: none;
    padding: .5em 1em;
    cursor: pointer;
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
    font-family: slimamif;
    font-weight: bold;
}


.inputfile:focus + label {
	outline: 1px dotted #000;
	outline: -webkit-focus-ring-color auto 5px;
}

.inputfile + label * {
	pointer-events: none;
}

h3{
    font-size: 1.5em;
    margin: .5em 0;
}
</style>

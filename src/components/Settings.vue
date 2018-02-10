 <template>
 <div class="wrap">
     <h2>Настройки профиля</h2>
     <div class="block">
         <h3 for="uploadForm">Сменить аватар</h3>
         <Avatar :image="user.AvatarImage" />
        <form id="uploadForm" name="uploadForm" enctype="multipart/form-data">

        <input id="file" type="file" @change="processFile">

        <input v-if="imageUrl" type=button value=Upload @click="uploadFiles">

        </form>
     </div>
     <div class="block">
        <h3 for="uploadForm">Сменить пароль</h3>
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

            <input type=button value=Подтвердить>

        </form>
     </div>
    
    <div class="block">
        <button class="button">Удалить аккаунт</button>
    </div>
 </div>
</template>


<script>

import { mapActions, mapGetters } from "vuex"
import Avatar from "@/components/Avatar"
import LoadWindow from "@/components/LoadWindow"

export default {
  name: 'settings',
  components: {
      Avatar,
      LoadWindow
  },
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
      ...mapGetters({user: "getUser"}),
      imageUrl(){
          console.log(this.correctlyImage)
        return this.correctlyImage;
      }
  }
}
</script>

<style scoped>
  .wrap{
      padding: 1em;
  }
  .block{
      box-shadow: 0px 2px 4px #888;
      padding: 1em;
      margin-bottom: 1em;
  }

  .formRow {
      display: flex;
      flex-direction: column;
  }

  input[type="text"]{
      padding: .2em;
      max-width: 15em;
  }

  .button{
      background-color: #333;
      color: white;
      border: none;
      padding: .5em 1em;
      cursor: pointer;
  }
</style>

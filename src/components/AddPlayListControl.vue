<template>
<div class="wrapper">
    <div class="border" @click="onClick">
        Добавить новый плейлист
    </div>

    <div class="add-play-list-window" v-if="showWindow">
        <div class="window">
            <button class="button" @click="close()">X</button>
            <h2>Добавление новой категории</h2>
            <ul>
                <li :class="{selected: selectedItems.indexOf(item) != -1}"
                 @click="liClick(item)" 
                 v-for="(item, index) in categories" :key='index'>
                    {{item.Name}}
                </li>
            </ul>
            <div class="buttons">
                <button class="button" @click="add">Добавить</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"
export default {
  name: 'AddPlayList',
  data () {
     return {
         showWindow: false,
         selectedItems: []
    }
  },
  methods:{
     
      onClick(){
          this.$store.dispatch("getCategories");
          this.showWindow = true;
          
      }, 
      add(){
          this.$store.dispatch("bindCategory", this.selectedItems.map(element => {
              return element.Id
          }));
         
      },
      close(){
          this.showWindow = false;
          this.selectedItems = [];
      },
      liClick(item){
          var index = this.selectedItems.indexOf(item);
          if(index == -1)
            this.selectedItems.push(item)
          else this.selectedItems.splice(index,1);

          console.log(this.selectedItems);
      }
  },
  computed:{
      ...mapGetters({
          categories: "getCategories"
      })
  }
 
}
</script>


<style scoped>

.buttons{
    display: flex;
    justify-content: flex-end;
}

.button{
    cursor: pointer;
    background-color: transparent;
    padding: .5em 1em ;
    border: 1px solid black;
}

ul{
    padding: 0;
    display: flex;
    flex-wrap: wrap;
}

li{
    list-style: none;
    padding: 1em;
    border: 1px solid #333;
    margin: .5em;
    cursor: pointer;
}

li.selected{
    background-color: #888;
}


li:hover{
    background-color: #333;
    color: white;
}

.window{
    background-color: white;
    padding: 1em;
    z-index: 3;
    max-width: 50vw;
}


.add-play-list-window{
    position: fixed;
    top: 0;
    left: 0;
    background-color: #33333333;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
}



.border{
    border: 1px solid #333;
    width: 300px;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.border:hover{
    cursor: pointer;
    background-color: #333;
    color: white;
}
</style>

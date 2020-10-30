<template>
  <div class="w-full h-screen overflow-hidden bck">
    <div class="formpnl" v-show="showLoginForm">
      <div v-if="this.error" class="h-12 rounded-lg w-full px-4 py-2 bg-red-600">
         <p class="font-lato font-bold text-white">Invalid Credentials, try again</p>
      </div>
      <div class="absolute top-0 right-0 h-32 w-32 ">
        <img src="@/assets/svg/loginPage/Group 75.svg">
      </div>
      <div class="absolute top-0 left-0 h-24 w-24 ">
        <img src="@/assets/svg/loginPage/dot svg.svg">
      </div>
       
      <div class="mx-4 text-white font-bold font-muli text-3xl mt-10">Welcome<br class="mx-4 text-white font-bold font-muli text-3xl" />Back!</div>
      <div class="mx-4 text-gray-500 font-lato text-md ">Enter your email address or mobile number to get access your account</div>
      <div class="w-auto mx-8 mt-8 h-16 bgc rounded-tl-lg rounded-tr-lg border-b border-gray-700">
          <i class="fa fa-user-circle mt-6 text-white ml-4" aria-hidden="true"></i>
        <input
        class="outline-none bg-transparent ml-4 text-gray-500 font-muli"
        type="text" name="account_id"  placeholder="Mobile Number" v-model="account_id">
      </div>
      <div class="w-auto mx-8 h-16 border-none bgc rounded-bl-lg rounded-br-lg">
          <i class="fa fa-key mt-6 text-white ml-4" aria-hidden="true"></i>
        <input
        class="outline-none bg-transparent ml-4 text-gray-500 font-muli"
        type="password" name="password"  placeholder="Password" v-model="password">
      </div>

      <div class="flex flex-row justify-between m-12">
        <h1><a @click="$router.push('/resetpassword/search_account')" class="mt-0 text-white font-bold text-md font-lato">Forget? </a></h1>
        <div @click="login" class="bg-blue-500 font-muli font-bold focus:outline-none text-center text-white rounded-lg py-2 px-4 focus:bg-blue-300"><h1 class="px-4">Login</h1></div>
      </div>
      <div class="ml-8 mr-8 text-gray-600 mt-12">
        <div class="text-md">Don't have any account?</div>
        <h1><a @click="$router.push('/auth/register')" class="mt-0 text-white font-bold text-md font-lato">CREATE ACCOUNT</a></h1>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions,mapState} from "vuex";
import FrozenStorage from "@/static/js/local_storage"
export default {
  mounted(){
    this.checkVintroViewed();
  },
  data() {
      return {
        login_message: 'Please enter your credentials to login.',
        loginStage: 'login100-form',
        currentForm: 'login',
        account_id:undefined,
        password: undefined,
      }
    },
  computed: {
    ...mapState("auth/login",['error']),
        showRegisterForm() {
        return this.currentForm === 'register';
    },
    showLoginForm() {
        return this.currentForm === 'login';
    }
  },
    methods : {
      ...mapActions("auth/login",['loginAction']),
        toggleForm() {
            this.currentForm = this.currentForm === 'login' ? 'register' : 'login';
        },
        login: function(){
          if(this.account_id != undefined && this.password != undefined && this.account_id.length > 0 && this.password.length > 0){
            if(this.account_id.includes('+91')){
              this.account_id = this.account_id.replace("+91","")
            }
            this.loginAction({account_id:this.account_id, password: this.password});
          }
        },
        checkVintroViewed: function(){
          let storage = new FrozenStorage();
          let vintro = storage.get('vintro');
          if(vintro === null || vintro != '1'){
            this.$router.push('/intro')
          }else{
            let token = storage.get('token');
            if(token != null){
              this.$router.push('/')
            }
          }
        }
  }
}
</script>

<style scoped>
.formpnl {
  margin: auto;
  margin-top: 15%;
  overflow: hidden;
}



.bgc{
  background-color: #262630;
}

.bck{
  background: rgb(16, 17, 21);
  
  /* background: rgb(32, 32, 32); */
}


</style>

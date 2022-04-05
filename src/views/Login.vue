<template>
  <div class="login">
    <div>
        <div class="formLogin" >
            <h2>Administration Section</h2>
            
            <div class="rowLabel" style="justify-content: center; margin-bottom:10px;">
                <span class="material-icons" style="font-size:30px;margin-bottom:10px;">grain</span>
                <h4 style="margin-top:0px;margin-bottom:0px;">DeepReSPred</h4>
            </div> 
            
            <form>
                <div class="rowLabel">
                    <label>User</label>
                    <input type="text" class="form-control" v-model="usuarioIn" placeholder="Insert user" @input="verificarUsuario">
                    <span class="msgErrorSpan">{{errorUsuario}}</span>
                </div>
                
                <div class="rowLabel">
                    <div >
                        <label>Password</label>    
                    </div>

                    <div class="inputContainer">
                        <input type="password" :class="['form-control','noFormControl']" ref="inputPass" 
                         v-model="contrasenaIn" placeholder="Insert password" @input="verificarContrasena">
                        <span ref="visibility" class="material-icons" @click="revelarContraseña()">visibility_off</span>
                    </div>
                    <span class="msgErrorSpan">{{errorContrasena}}</span>
                </div>                
                <button type="button" :class="['btn']" @click="ingresar">Sign in</button>

                <h2 class="subLabels" href='#' style="cursor:pointer;text-decoration: underline dotted;text-underline-offset: 5px;">Forgot my password</h2>
                <span class="msgErrorSpan mt-2">{{errorGeneral}}</span>
            </form>
        </div>

    </div>
  </div>
</template>

<script>

import { mapState, mapActions} from 'vuex'
import MainHeader from '@/components/MainHeader.vue'

export default {
  name: 'Login',
  components: {
    MainHeader
  },
  props: {
    msg: String
  },
  data(){
      return {
          usuarioIn:'',
          contrasenaIn:'',
          errorUsuario:'',
          errorContrasena:'',
          errorGeneral:''
      }
  },
  mounted(){    
    this.changeFlagWatchTags(false);
  },
  computed:{
    ...mapState(['flagWatchTabs']),    
  },
  methods:{
    ...mapActions(['changeFlagWatchTags']),
    verificarUsuario: function(){
        this.errorUsuario="";
        if (this.usuarioIn=="")this.errorUsuario="Insert an user";
        else if (this.usuarioIn.length>9)this.errorUsuario="Máx 9 caracters";
    },
    verificarContrasena: function(){
        this.errorContrasena="";
        if (this.contrasenaIn.length<1)this.errorContrasena="Insert a password";
        else if (this.contrasenaIn.length<3)this.errorContrasena="Min. 3 caracters";
        else if (this.contrasenaIn.length>12)this.errorContrasena="Máx. 12 caracters";
    },
    verificarCampos: function(){
        this.errorGeneral="";

        this.verificarUsuario();
        this.verificarContrasena();
        if(this.errorContrasena=="" && this.errorUsuario=="") return true;
        else return false;
    },
    ingresar: function(){
        console.log("Signing in");
        
        if(this.verificarCampos()){
            console.log("Log success");
            var attemp={
                aUsuario:this.usuarioIn,
                aContrasena:this.contrasenaIn
            }

            if((this.usuarioIn=="admin")&&(this.contrasenaIn==this.adminsecurity)){
                this.$router.push('/administration');
            }
        }
    },
    revelarContraseña: function(){
        var pass=this.$refs.inputPass;
        var visibilityToggle=this.$refs.visibility;
        if (pass.type === "password") {
            pass.type = "text";
            visibilityToggle.innerHTML='visibility';
        } else {
            pass.type = "password";
            visibilityToggle.innerHTML='visibility_off';
        }
      }
  }
}
</script>

<style scoped>
.infoPredictionContent{
  color:#341731;
  background-color:#ffffff;
  padding:25px 35px;
  border-radius:8px;
  text-align:left;
}
.noFormControl{
    border: 0px solid;
}
.inputContainer{
    display:flex;
    align-items: center;
    border:1px solid #ced4da;
    border-radius: .25rem;
    width:100%;
}
span{
    margin:0 10px;
    cursor:pointer;
}
label{
    font-size:12px;
    color: #cacaca;
}
h2{
    font-size:26px;
    font-weight: bold;
    text-align: center;
}
h2{
    font-size:26px;
    font-weight: bold;
    text-align: center;
}
.subLabels{
    font-size:12px;
    color: #cacaca;   
    font-weight: normal; 
    text-align: center;
}
form{
    margin-top:30px;
    margin-bottom:40px;
}
.login{
    font-family: 'Nunito Sans', sans-serif;
}
.formLogin{    
    position: fixed;
    top: 50%;
    left: 50%;  
    transform: translate(-50%, -50%);
}
h5{
    color: #cacaca;
    display:inline-block;
    margin-right:100px;
    font-size:19px;
}
h6{
    color: #9e9d9d;
    font-family: 'Open Sans', sans-serif;
    display:inline-block;
    margin-right:100px;
    font-size:15px;
}
.heading{
    background-color:hsla(0, 0%, 100%, 0.8);
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 6px;
    padding-bottom: 6px;
}
.footing{
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 6px;
    padding-bottom: 6px;
    position:absolute;
    bottom:0px;
}

#principalImg{
    width:100%;
}
#heading{
    width:12%;
    display:inline-block;
    margin-right: 13px;
}


.btn{    
  background-color: #341731;
  border-color: #341731;
  color:#FFFFFF;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 15px;
  width:100%;
}
.btn-warning:hover {
    color: #341731;
    background-color: #341731;
    border-color: #341731;
}

.btn-warning:enabled {
    color: #ffffff;
    background-color: #341731;
    border-color: #341731;
}

.btn-warning:disabled {
    color: #ffffff;
    background-color: #C4C4C4;
    border-color: #C4C4C4;
}
#world{
    margin-right:10px;
}
.english{
    position: relative;
    right:-780px;
}
.msgErrorSpan{
  color:#ED0131;
  font-size: small;
}
.rowLabel{
  justify-content: space-between;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;  
  margin-bottom:10px;
}

</style>

<template>
  <header class="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar">      
        <div class="heading">
          <span class="material-icons" style="font-size:30px;">grain</span>
          <h5>DeepReSPred</h5>
        </div>  
        <div class="groups">
          <div class="group">
            <div class="project-header" @click="goHome">Home DeepReSPred</div>
            <div class="rectangle" :class="['activeRectangle']"></div> <!-- v-bind:class="{activeRectangle: isActive1}"></div-->
          </div> 
          <div class="group">
            <div class="project-header" href="#toolInstTab" @click="goSearchPred">Search Prediction</div>
            <div class="rectangle"></div> <!-- v-bind:class="{activeRectangle: isActive1}"></div-->
          </div>
          <div class="group">
            <div class="project-header" href="#toolInstTab" @click="goToolInst">Tool Instructions</div>
            <div class="rectangle"></div><!-- v-bind:class="{activeRectangle: isActive1}"></div-->
          </div>
          <div class="group">
            <div class="project-header" href="#toolInstTab" @click="goBibliography">Bibliography</div>
            <div class="rectangle"></div><!-- v-bind:class="{activeRectangle: isActive1}"></div-->
          </div>
          <!--div class="group">
            <div class="project-header" @click="goProjInf">Project Information</div>
            <div class="rectangle"></div>
          </div--> 
        </div>         
  </header>

</template>

<script>

import { mapState, mapActions} from 'vuex'

export default {
  name: 'MainHeader',
  props: {
    isActiveTag1: Boolean,
    isActiveTag2: Boolean,
    isActiveTag3: Boolean,
    isActiveTag4: Boolean
  },
  data(){
    return{
      isActive1:true,
      isActive2:false,
      isActive3:false,
      isActive4:false
    }
  },
  computed:{
    ...mapState(['flagWatchTabs','isActive1_','isActive2_','isActive3_','isActive4_']),
    returnValueActive1(){
      return this.isActive1_;
    },
    returnValueActive2(){
      return this.isActive2_;
    },
    returnValueActive3(){
      return this.isActive3_;
    },
    returnValueActive4(){
      return this.isActive4_;
    }
  },
  methods:{    
    ...mapActions(['changeFlagWatchTags','changeIsActive1','changeIsActive2','changeIsActive3','changeIsActive4']),
      goHome: function(){
        this.$router.push('/');        
        this.changeIsActive1(true);
        this.changeIsActive2(false);
        this.changeIsActive3(false);
        this.changeIsActive4(false);
        this.isActive1=this.isActive1_;
        this.isActive2=this.isActive2_;
        this.isActive3=this.isActive3_;
        this.isActive4=this.isActive4_;
        //window.scrollTo(0,650); //elemento.getBoundingClientRect();
        this.changeFlagWatchTags(true);
      },
      goSearchPred: function(){
        this.$router.push('/');
        /*this.isActive1=false;
        this.isActive2=true;
        this.isActive3=false;
        this.isActive4=false;*/
        this.changeIsActive1(false);
        this.changeIsActive2(true);
        this.changeIsActive3(false);
        this.changeIsActive4(false);
        this.isActive1=this.isActive1_;
        this.isActive2=this.isActive2_;
        this.isActive3=this.isActive3_;
        this.isActive4=this.isActive4_;
        window.scrollTo(0,900); //elemento.getBoundingClientRect();
        this.changeFlagWatchTags(true);
      },
      goToolInst: function(){
        this.$router.push('/toolInstructions');
        /*this.isActive1=false;
        this.isActive2=false;
        this.isActive3=true;
        this.isActive4=false;*/
        this.changeIsActive1(false);
        this.changeIsActive2(false);
        this.changeIsActive3(true);
        this.changeIsActive4(false);
        this.isActive1=this.isActive1_;
        this.isActive2=this.isActive2_;
        this.isActive3=this.isActive3_;
        this.isActive4=this.isActive4_;
        window.scrollTo(0,900); //elemento.getBoundingClientRect();
        this.changeFlagWatchTags(true);
      },
      goBibliography: function(){
        this.$router.push('/bibliography');
        /*this.isActive1=false;
        this.isActive2=false;
        this.isActive3=false;
        this.isActive4=true;*/
        this.changeIsActive1(false);
        this.changeIsActive2(false);
        this.changeIsActive3(false);
        this.changeIsActive4(true);
        this.isActive1=this.isActive1_;
        this.isActive2=this.isActive2_;
        this.isActive3=this.isActive3_;
        this.isActive4=this.isActive4_;
        window.scrollTo(0,900); //elemento.getBoundingClientRect();
        this.changeFlagWatchTags(true);
      },
      goProjInf: function(){
        this.$router.push('/projectInformation');
        /*this.isActive1=false;
        this.isActive2=false;
        this.isActive3=false;
        this.isActive4=true;*/
        this.changeIsActive1(false);
        this.changeIsActive2(false);
        this.changeIsActive3(false);
        this.changeIsActive4(true);
        this.isActive1=this.isActive1_;
        this.isActive2=this.isActive2_;
        this.isActive3=this.isActive3_;
        this.isActive4=this.isActive4_;
        window.scrollTo(0,900); //elemento.getBoundingClientRect();
        this.changeFlagWatchTags(true);
      }
  }
}
</script>

<style scoped>
.rectangle{
  background-color: #c4c4c466;
  height: 3px;
  margin-right: 3px;
  margin-top: 8px;
  width: 91px;
}

.activeRectangle{
  background-color: #56276d;
}

#headingLogo{
    width:6%;
    display:inline-block;
    margin-right: 13px;
    margin-bottom:6px;
}

.heading{    
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 6px;
    padding-bottom: 6px;
    margin-left: 25px;    
}
.groups{
  justify-content: flex-end;
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
  -ms-flex-pack: justify;    
  padding: .5rem 1rem;
}

h5{    
    color: #57276D;
    font-family: 'Montserrat', sans-serif;
    display:inline-block;
    margin-right:100px;
    font-size:30px;
}
.group{
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: 30px;
  width:150px;
}

.project-header{
  color: #56276d;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0;
  min-height: 19px;
  min-width: 152px;
  text-align: center;
  cursor:pointer;
}

.bd-navbar {
    min-height: 4rem;
    background-color:hsla(0, 0%, 100%, 0.8);
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 2%), inset 0 -1px 0 rgb(0 0 0 / 0%);
    top: 0;
    margin-bottom:10px;
}

.navbar {
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
    -ms-flex-pack: justify;
    justify-content: space-between; 
    padding: .5rem 1rem;
    padding-bottom: unset;
    margin-bottom: unset;
}
.material-icons{
  transform:translate(0%,20%);
}
</style>
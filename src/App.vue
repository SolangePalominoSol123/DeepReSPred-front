<template>
  <MainHeader/> <!-- :isActiveTag1="returnValueActive1()" :isActiveTag2="returnValueActive2()" :isActiveTag3="returnValueActive3()" :isActiveTag4="returnValueActive4()"-->
  
  <!-- Header with Slideshow -->
  <header class="mainHeader" v-if="returnValueFlag">
    
    <div class="headerPicture" width="1300">
      <img class="mainPicture" src="@/assets/mainPicture.jpg" alt="DeepReSPred_Background" style="min-width:500px" width="1380" height="650">
      
      <div class="infoProjectDiv" style="width:32%">
        <div class="infoProjectContent">
          <div class="title">
            <span class="material-icons" style="font-size:50px;">grain</span>
            <h5>DeepReSPred</h5>
          </div>
          <p class="subTitle">Deep Repeat Protein Structure Prediction</p>
        </div>
      </div>

      <div class="infoPredictionDiv" style="width:55%;height:150%">
        <div class="infoPredictionContent">
          <h1 class="h1_1">Structure Prediction</h1>
          <p class="p_1">In order to predict a repeat protein 3D structure from its sequence, complete the information below</p>

          <div class="form-group">
            <div class="rowLabel">
              <div>
                <label for="inputSequence" class="labels">Repeat protein sequence or PFAM ID 
                  <i class="red-message" data-toggle="tooltip" data-placement="top" title="Required">*</i></label>
              </div>
              <div>
                <label class="labels button" v-if="dataSeqContent.length!=0" @click="clearSeqInput">Clear</label>
                <span class="material-icons" v-if="dataSeqContent.length!=0" @click="clearSeqInput" style="cursor:pointer;" data-toggle="tooltip" data-placement="top" title="Clear data">backspace</span>
              </div>
            </div>
            <textarea class="form-control" id="inputSequence" rows="5" placeholder="Insert a protein sequence or PFAM ID" v-model="dataSeqContent" @input="verifySeqInput" :disabled="flagFile"></textarea>
            <span class="msgErrorSpan">{{errorSeqInput}}</span>
          </div>

          <div class="uploadSection">
            <h5 class="labels">or</h5>
              <button @click="$refs.fileInput.click()" class="buttonInside"><span class="material-icons">file_upload</span></button>
            <h5 @click="$refs.fileInput.click()" class="labels button">Upload a Fasta, Stockholm or Text file</h5>
            <input ref="fileInput" type="file" name="nameFile" style="display: none;" accept=".fasta,.txt,.sto" :v-model="fileName"
                @change="uploadFile"/>
            <span class="msgErrorSpan" v-if="flagFile" style="margin-left:10px;">Filename: {{fileName}}{{fileFormat}}</span>
          </div>

          <div class="rowLabel" style="margin-top:10px; margin-bottom:10px;">
            <div class="ExampleSection">
              <div class="ExampleSection">
                <h5 class="labels" style="font-size:12px; line-height:18px">An example PFAM ID is able to test the service</h5>
                <h5 @click="addexampleInputPFAMID" class="labels button" style="font-size:12px; font-weight:bold;">Use example PFAM ID</h5>
              </div>
              <div class="ExampleSection">
                <h5 class="labels" style="font-size:12px; line-height:18px">An example sequence is able to test the service</h5>
                <h5 @click="addexampleInputSeq" class="labels button" style="font-size:12px; font-weight:bold;">Use example sequence</h5>
              </div>
            </div>
            <button class="btn btn-warning" style="padding-left:30px; padding-right:30px;" @click="openModalPrediction" :disabled="dataSeqContent.length==0">Start</button>
          </div>          
        </div>        

      </div>

      <div class="arrowDiv">
        <span class="material-icons" @click="goMiddlePage" style="cursor:pointer;font-size:33px;color:#FFFFFF;">keyboard_double_arrow_down</span>
      </div>

    </div>
  </header>  

  <!-- Modal Prediction -->
  <div v-if="myModalPrediction">
      <transition name="model">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">            
                                
                <div class="infoPredictionContent">
                  <div class="rowLabel">
                    <div>
                      <h1 class="h1_1" style="margin-bottom:0px;">Structure Prediction Request</h1>
                      <p class="p_1" >Summary</p>
                    </div>
                    <div @click="closeModalPrediction"><h3 style="font-weight:bold; font-size:17px;padding-bottom:375%; cursor:pointer;">X</h3></div>
                  </div>

                  <div class="form-group">
                    <div class="rowLabel">
                      <div>
                        <label for="inputSequence" class="labels">Repeat protein sequence or PFAM ID 
                          <i class="red-message" data-toggle="tooltip" data-placement="top" title="Required">*</i></label>
                      </div>
                      <div>
                        <label class="labels button" v-if="dataSeqContent.length!=0" @click="clearSeqInput">Clear</label>
                        <span class="material-icons" v-if="dataSeqContent.length!=0" @click="clearSeqInput" style="cursor:pointer;" data-toggle="tooltip" data-placement="top" title="Clear data">backspace</span>
                      </div>
                    </div>
                    <textarea class="form-control" id="inputSequence" rows="5" placeholder="Insert a protein sequence or PFAM ID" v-model="dataSeqContent" @input="verifySeqInput" :disabled="flagFile"></textarea>
                    <span class="msgErrorSpan">{{errorSeqInput}}</span>
                  </div>

                  <div class="uploadSection">
                    <h5 class="labels">or</h5>
                    <button @click="$refs.fileInput.click()" class="buttonInside"><span class="material-icons">file_upload</span></button>
                    <h5 @click="$refs.fileInput.click()" class="labels button">Upload a Fasta, Stockholm or Text file</h5>
                    <input ref="fileInput" type="file" name="nameFile" style="display: none;" accept=".fasta,.txt,.sto" :v-model="fileName" @change="uploadFile"/>
                    <span class="msgErrorSpan" v-if="flagFile" style="margin-left:10px;">Filename: {{fileName}}{{fileFormat}}</span>
                  </div>

                  <p class="p_1" style="margin-top:10px;">Enter an identification ID to find your request and an email to send its results:</p>
                  <div class="aditionalInputData rowLabel2" style="margin-bottom:35px;">

                    <div class="rowLabel">
                      <div class="rowLabelItem">
                        <label class="labels" for="inputIDSequence">Prediction identification<i class="red-message" data-toggle="tooltip" data-placement="top" title="Required">*</i></label>
                        <input type="text" id="inputIDSequence" class="form-control form-control-sm" v-model="IDPredictionReq" @input="verifyIDReq"/>
                        <span class="msgErrorSpan">{{errorIDReq}}</span>
                      </div>
                      <div class="rowLabelItem">
                        <span class="material-icons" v-if="IDPredictionReqSuggestion!=IDPredictionReq" @click="reloadIDrecommended" style="cursor:pointer;font-size: 18px;" data-toggle="tooltip" data-placement="top" title="Reload recommended ID">refresh</span>
                      </div>                     
                    </div> 
                    
                    <div style="width: 30%;">
                      <label class="labels" for="inputEmailSequence">Email</label>
                      <input type="text" id="inputEmailSequence" class="form-control form-control-sm" placeholder="i.e. name@example.com" v-model="emailPredictionReq" @input="verifyEmail"/>
                      <span class="msgErrorSpan">{{errorEmail}}</span>
                    </div>
                  </div>

                  <div class="rowLabel" style="margin-top:10px; margin-bottom:10px;">
                    <div class="ExampleSection">
                      <div class="ExampleSection">
                        <h5 class="labels" style="font-size:12px; line-height:18px">An example PFAM ID is able to test the service</h5>
                        <h5 @click="addexampleInputPFAMID" class="labels button" style="font-size:12px; font-weight:bold;">Use example PFAM ID</h5>
                      </div>
                      <div class="ExampleSection">
                        <h5 class="labels" style="font-size:12px; line-height:18px">An example sequence is able to test the service</h5>
                        <h5 @click="addexampleInputSeq" class="labels button" style="font-size:12px; font-weight:bold;">Use example sequence</h5>
                      </div>
                    </div>
                    <button class="btn btn-warning" style="padding-left:30px; padding-right:30px;" @click="sendPredictionProcess" :disabled="dataSeqContent.length==0">Send request</button>
                  </div>
                  
                </div>
                        
              
              </div>
            </div>
          </div>
        </div>
      </transition>
  </div>

  <div v-if="seeSpinner">
      <transition name="model">
        <div class="modal-mask">
          <div class="modal-wrapper">

            <div class="d-flex flex-column" style="height:100%;weight:100%;transform:translate(47%,320%);z-index:99999;" :class="['spinner']">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">...</span>
              </div>
              <span class="spinnerText" style="height:100%;weight:100%;transform:translate(-48%,0%);z-index:99999;">Sending request...</span>
            </div>

          </div>
        </div>
      </transition>
    </div>



  <div class="secondMainPart">
    <div  v-bind:class="{secondFuntionality:!returnValueFlag,secondMainPartContent:returnValueFlag}" >
 
      <div v-if="returnValueFlag">
        <h2>Repeat Proteins and DeepReSPred</h2>
        <p style="margin-left:15%; margin-right:15%;">Deep Repeat Protein Structure Predictor (DeepReSPred) is a user-friendly tool that offer the tertiary structure from a repeat protein sequence using a Deep Learning algorithm. This project take advantage of peculiar characteristics of repeat proteins existing in the world.</p>
      </div>

      <div id="nav" v-if="returnValueFlag">
        <router-link to="/" id="searchTab" @click="goSearchPred">Search prediction</router-link> |
        <router-link to="/toolInstructions" id="toolInstTab" @click="goToolInst">Tool instructions</router-link> |
        <!--router-link to="/projectInformation" id="projInfTab" @click="goProjInf">Project Information</router-link> |-->
        <router-link to="/bibliography" id="biblioTab">Bibliography</router-link>
      </div>

      <div>
        <router-view/>  
      </div>
      
    </div>

    <footer v-if="returnValueFlag">          
        <div class="rowLabel">
          <div class="rowLabel">
                <div class="heading">
                    <span class="material-icons" style="font-size:30px;">grain</span>
                    <h3 style="color: #57276D;font-family: 'Montserrat', sans-serif;display:inline-block;margin-right:100px;font-size:30px;">DeepReSPred</h3>
                </div>           
          </div>
          <div>
            <span class="material-icons" @click="goInitPage" style="cursor:pointer;font-size:33px;transform: translate(-40px, 0px);">keyboard_double_arrow_up</span>
          </div>
          <div>
            <button @click="adminLogin" class="btn btn-warning" style="width=140%;">Admin Login</button>
          </div>
        </div>
    </footer>

  </div>

  <!-- Modal Message -->
  <div v-if="myModalMessage">
      <transition name="model">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">            
                                
                <div class="infoPredictionContent">
                  <div class="rowLabel">
                    <div>
                      <h1 class="h1_1" style="margin-bottom:0px;font-weight: bold;">{{messageTitleModal}}</h1>
                    </div>
                    <div @click="closeModalMessage"><h3 style="font-weight:bold; font-size:17px;padding-bottom:375%; cursor:pointer;">X</h3></div>
                  </div>

                  <div class="rowLabel" style="justify-content: center;margin-bottom:20px;">
                    <span class="material-icons" v-if="successPred && symbolShow" style="color:#109E2A;font-size:40px;margin-left:20%;margin-right:20%; margin-bottom:10px;">check_circle</span>
                    <span class="material-icons" v-if="!successPred && symbolShow" style="color:#ED0131;font-size:40px;margin-left:20%;margin-right:20%; margin-bottom:10px;">error</span>
                    <p style="margin-left:15%; margin-right:15%;font-size:20px;">{{messageModal}}</p>
                  </div>
                  
                  <div v-if="successPred">
                    <div class="rowLabel" style="margin-bottom:20px;justify-content: center;" v-if="emailPredictionReq!=''">
                      <h3 class="labels" style="color:#6C757D;">The prediction request results will be sent to the submitted email:</h3>
                      <h3 class="labels" style="font-weight: bold; color:#6C757D;">{{emailPredictionReq}}</h3>
                    </div>
                    <div class="rowLabel" style="margin-bottom:20px;justify-content: center;">
                      <h3 class="labels" style="color:#6C757D;">Review your request status or results in</h3>
                      <h3 class="labels" style="font-weight: bold; color:#6C757D;">Search Prediction Request Tab</h3>
                      <h3 class="labels" style="color:#6C757D;"> just entering the following ID:</h3>
                    </div>

                    <div class="rowLabel" style="margin-bottom:20px;justify-content:center;">
                      <div>
                        <h3 class="labels" style="font-weight: 600;">Request Identification: </h3>
                      </div>
                      <div class="rowLabelItem">
                        <input type="text" class="form-control form-control-sm" disabled v-model="IDPredictionReq"/>
                      </div>
                    </div>
                  </div>

                  <div class="rowLabel" style="justify-content: center; margin-top:40px; margin-bottom:20px;">
                    <button class="btn btn-warning" style="padding-left:30px; padding-right:30px;margin-right:5px;" @click="goSearchPred" v-if="successPred">Search request</button>
                    <button class="btn btn-warning" style="padding-left:30px; padding-right:30px;margin-left:5px;" @click="closeModalMessage">Accept and return</button>
                  </div>
                  
                </div>
                        
              </div>
            </div>
          </div>
        </div>
      </transition>
  </div>

</template>

<script>


import MainHeader from '@/components/MainHeader.vue'
import { mapState, mapActions} from 'vuex'

export default {
  name: 'App',
  components: {
    MainHeader
  },
  props: {
  },
  data(){
    return{
      isActive1:true,
      isActive2:false,
      isActive3:false,
      isActive4:false,
      tipoModal: 'form',
      myModalPrediction: false,
      myModalMessage: false,
      messageTitleModal:'Prediction Message',
      messageModal: 'Prediction request sent successfully.',
      btnSendEmailDisabled: true,
      typeInput: 'pfamCode',
      flagFile: false,
      formData: '',
      file: '',
      fileName: '',
      fileFormat: '',
      dataSeqContent:'',
      exampleInputSeq: 'MADRYIPEHRRTQFKAKSAFKPDELRRRREEQQVEIRKAKREENLAKRRGIGAGDSRPGASLGAAPDSDDENPPTESQLSEDLPKMVEGVFSSEIDKQIQATTKFRKLLSKERNPPIEEVIKTGVVGRFVEFLRSPHTLVQFEAAWALTNIASGSATQTQVVIEAGAVPIFVELLGSPEPDVREQAVWALGNIAGDSPQCRDYVLSCGALRPLLTLLGDSRKLSMLRNATWTLSNFCRGKTPQPDWNTIAPALPVLAKLVYSLDDEVLIDACWAISYLSDGSNDKIQAVIEAGIPRRLVELLMHASTSVQTPALRSVGNIVTGDDVQTQVIINCGALPCLLSLLSSNKDGIRKEACWTISNITAGNSAQIQSVIDANIIPPLIHLLSHADLKTRKEACWAISNATSGGLQKPDQIRYLVAQGCIKPLCDLLACPDNKIIQVALDGLENILKVGELDKNAAGDGPDSINRYALFIEECGGMEKIHDCQTNANEEIYMKAYNIIEKYFSDEDEAGDEAMGAQQQFGFGASGGAQQGGFNFGANGTESMDM',//'NKYDALTQVLSRADILKIACHDCAAHALQAVLDYEQVFRQRGFARADIIKITGNGGGAQALKAVVVHGPTLNECGFSQADIVRIADNIGGAQALKAVLEHGPTLNERDYSGADIVKIAGNGGGARALKAVVMHGPTLCESGYSGADIVKIASNGGGAQALEAVAMHGSTLCERGYCRTDIAKIAGNGGGAQALKAIVMHGPTLCERGYSRTDIVKIADNNGGAQALKAVFEHGPALTQAGRSN', //BAT3_MYCRK
      exampleInputPFAMID: 'PF18773', //Importin-rep
      emailPredictionReq:'',
      IDPredictionReq:'',
      IDPredictionReqSuggestion:'',
      errorIDReq: '',
      errorSeqInput:'',
      errorEmail:'',
      symbolShow:true,
      successPred:true,
      seeSpinner:false,
      ipClientCurrent:'190.187.147.146'
    }
  },
  mounted(){    
    console.log("--------------Go to main-------------");
    fetch('https://api.ipify.org/?format=json').then(results=>results.json()).then(
      data=>{
        console.log("Current IPClient: "+data.ip);
        this.ipClientCurrent=data.ip;
      });
  },
  computed:{
    ...mapState(['flagWatchTabs','isActive1_','isActive2_','isActive3_','isActive4_','predIDsearch']),
    returnValueFlag() {
      return this.flagWatchTabs;
    },
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
    ...mapActions(['changeFlagWatchTags','changeIsActive1','changeIsActive2','changeIsActive3','changeIsActive4','changePredIDsearch']),
      goHome: function(){    
        this.changeIsActive1(true);
        this.changeIsActive2(false);
        this.changeIsActive3(false);
        this.changeIsActive4(false);
        this.isActive1=this.isActive1_;
        this.isActive2=this.isActive2_;
        this.isActive3=this.isActive3_;
        this.isActive4=this.isActive4_;
        window.scrollTo(0,0);
        this.changeFlagWatchTags(true);
      },
      goSearchPred: function(){

        this.changePredIDsearch(this.IDPredictionReq);
        this.changeIsActive1(false);
        this.changeIsActive2(true);
        this.changeIsActive3(false);
        this.changeIsActive4(false);
        this.isActive1=this.isActive1_;
        this.isActive2=this.isActive2_;
        this.isActive3=this.isActive3_;
        this.isActive4=this.isActive4_;
        this.$router.push('/'); 
        this.closeModalMessage();
        window.scrollTo(0,900);
        this.changeFlagWatchTags(true);
        
      },
      goToolInst: function(){
        this.changeIsActive1(false);
        this.changeIsActive2(false);
        this.changeIsActive3(true);
        this.changeIsActive4(false);
        this.isActive1=this.isActive1_;
        this.isActive2=this.isActive2_;
        this.isActive3=this.isActive3_;
        this.isActive4=this.isActive4_;
      },
      goProjInf: function(){
        this.changeIsActive1(false);
        this.changeIsActive2(false);
        this.changeIsActive3(false);
        this.changeIsActive4(true);
        this.isActive1=this.isActive1_;
        this.isActive2=this.isActive2_;
        this.isActive3=this.isActive3_;
        this.isActive4=this.isActive4_;
      },
      adminLogin: function(){
        console.log("Go to admin login");
        this.$router.push('/adminLogin');
      },
      changeLanguage: function(){
        console.log("Changing Language");
      },
      goInitPage: function(){
        window.scrollTo(0,0);
      },
      goMiddlePage: function(){
        window.scrollTo(0,620);
      },
      clearSeqInput: function(){
        this.dataSeqContent='';
        this.file='';
        this.flagFile=false;
      },
      openModalPrediction: function(){
          this.IDPredictionReq="";
          this.emailPredictionReq="";
          this.myModalPrediction=true;
          this.axios.get('/idrequest/').then(response=>{   
                 
            var dataRsp=response.data;
            console.log(dataRsp);
            this.IDPredictionReqSuggestion=dataRsp.newId;
            this.IDPredictionReq=this.IDPredictionReqSuggestion;
          }).catch(e=>{
            console.log(e);
          });
        
      },
      closeModalPrediction: function(){
        this.myModalPrediction=false;
      },
      openModalMessage: function(){
        this.myModalMessage=true;
      },
      closeModalMessage: function(){
        this.myModalMessage=false;
      },
      addexampleInputSeq: function(){
        this.dataSeqContent=this.exampleInputSeq;
        this.errorSeqInput='';
        this.flagFile=false;
      },
      addexampleInputPFAMID: function(){
        this.dataSeqContent=this.exampleInputPFAMID;
        this.errorSeqInput='';
        this.flagFile=false;
      },
      isValidFile: function(){
        if((this.fileFormat!=".fasta") && (this.fileFormat!=".txt") && (this.fileFormat!=".sto")){
          this.mensajeModal="File extension is not valid.";
          return false;
        }else if(this.fileName=="" || this.fileName==null){
          this.mensajeModal="File name is not valid";
          return false;
        }else return true;
      },
      uploadFile: function(){
        
        //forma 1
        this.file=this.$refs.fileInput.files[0]; 
        console.log(this.file);
        
        console.log("aqui")
        var fullPathFile=this.file.name;
        var posDot=fullPathFile.indexOf('.');
        this.fileName=fullPathFile.slice(0,posDot);        
        this.fileFormat=(fullPathFile.slice((fullPathFile.length-posDot)*-1)).toLowerCase();

        if(!this.isValidFile()){
          //comentar
          /*console.log("no cumple con formato de archivo");
          this.cerrarModal(0);
          console.log("error");
          this.tipoModal='mensaje';      
          this.flagError=false;
          this.abreModal();     */
          //comentar   
        }else{
          
          const reader=new FileReader();

          reader.onload=(e)=>{        
            var formDataAux = new FormData();
            this.flagFile=true;
            this.dataSeqContent=reader.result;
          }

          reader.onerror=(e)=>{       
            console.log("Error reading file...");
            this.flagFile=false;
            /*
            //comentar 
            this.mensajeModal="Ocurrió un error con la carga del archivo de pedidos.";
            this.flagError=true;
            this.abreModal();  
            //comentar
            */
          }

          reader.readAsText(this.file);
        }
        
      },
      verifySeqInput: function(){
        this.errorSeqInput='';
        this.dataSeqContent=this.dataSeqContent.toUpperCase();

        if(this.dataSeqContent.length==0){
          this.errorSeqInput='Field empty. Insert a sequence or a PFAM ID.';
          return;
        }

        var posSto=this.dataSeqContent.indexOf('#');
        var posFasta=this.dataSeqContent.indexOf('>');
        if (posSto>=0)
          this.typeInput="seqSto";
        if (posFasta>=0)
          this.typeInput="seqFasta";

        var indexSep=this.dataSeqContent.indexOf('\n');
        var seqContentSeq=this.dataSeqContent;
        var expressionGen = /^((([\.\-])*([GAPVLMFYWSTCNQKHRDEI])+([\.\-])*)+|PF(\d){5})$/g;

        if((!this.flagFile) && (posSto<0) && (posFasta<0)){
          //preprocessing
          if (indexSep>=0){
            seqContentSeq=this.dataSeqContent.substring(indexSep+1,this.dataSeqContent.length)
          }
          seqContentSeq=seqContentSeq.replaceAll('\n','');

          var finded = seqContentSeq.match(expressionGen);
          if(!finded){
            this.errorSeqInput='Invalid sequence input. Verify correct residues symbols.';
          }else{
            var expressionPFAM = /^(PF(\d){5})$/g;
            var findedPFAM = seqContentSeq.match(expressionPFAM);
            if(!findedPFAM){
              this.typeInput="seqOnly";
            }else{
              this.typeInput="pfamCode";
            }
          }
        }
      },
      verifyEmail: function(){
        this.errorEmail='';
        if(this.emailPredictionReq!=''){
          var expression = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,})$/g;
          var finded = this.emailPredictionReq.match(expression);
          if(!finded){
            this.errorEmail='Invalid email format';
          }
        }
      },
      verifyIDReq: function(){
        this.errorIDReq='';
        this.IDPredictionReq=this.IDPredictionReq.toUpperCase();
        if(this.IDPredictionReq=="") {
          this.errorIDReq='Request ID required';
          return;
        }

        if(this.IDPredictionReq.length<5) {
          this.errorIDReq='Minimum 5 caracters';
          return;
        }
        if(this.IDPredictionReq.length>10) {
          this.errorIDReq='Maximum 10 caracters';
          return;
        }

        if(this.IDPredictionReqSuggestion!=this.IDPredictionReq){
          var dataSend={
            "id": this.IDPredictionReq
          }
          this.axios.post('/idrequest/',dataSend).then(response=>{                    
              var dataRsp=response.data;
              console.log(dataRsp);
              if(dataRsp.existsID){
                this.errorIDReq='This request ID already exists. Reload recommended ID.';
              }
              if(this.IDPredictionReqSuggestion==''){
                this.IDPredictionReqSuggestion=dataRsp.recommendedID;
              }
            }).catch(e=>{
              console.log(e);
            });
        }
      },
      reloadIDrecommended: function(){
        this.errorIDReq='';
        this.IDPredictionReq=this.IDPredictionReqSuggestion;
      },
      getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      },
      sendPredictionProcess: function(){
        this.verifySeqInput();
        this.verifyEmail();
        this.verifyIDReq();

        if((this.errorSeqInput=='') && (this.errorEmail=='') && (this.errorIDReq=='')){
          
          this.seeSpinner=true;

          var pfamID=null;
          if(this.typeInput=="pfamCode"){
            pfamID=this.dataSeqContent;
          }

          //Info request
          var dataSend={
              "idRequest" : this.IDPredictionReq,
              "email" : this.emailPredictionReq,
              "pfamID" : pfamID,
              "typeInput" : this.typeInput,
              "ipClient" : this.ipClientCurrent
          }

          //send data input - not from file
          if(this.typeInput!="pfamCode"){           
                var formDataAux = new FormData();
                formDataAux.append('filename', this.IDPredictionReq);  
                var auxDataContent=this.dataSeqContent;
                                 
                //determining extension
                switch(this.typeInput){
                  case 'seqSto':
                    formDataAux.append('extension', ".sto");
                    break;
                  case 'seqFasta':
                    formDataAux.append('extension', ".fasta");
                    break;
                  default:
                    formDataAux.append('extension', ".txt");
                    auxDataContent=">>tr|DEEPRESPREDSEQ\n"+auxDataContent;
                    break;
                }

                formDataAux.append('data', auxDataContent);    

                this.formData=formDataAux;            
          }

          this.sendRequestandFile(dataSend);
                 
        }
      },
      sendRequestandFile : async function(dataSend){
        console.log("Sending prediction data:");
        console.log(dataSend);

        try{
          const response=await this.axios.post('/request/', dataSend);
          console.log(response)
          if(!response.data.error){

            if(this.typeInput!="pfamCode"){
              this.formData.append('idRequest', this.IDPredictionReq);

              const responseFile=await this.axios.post('/file/',this.formData,{headers: {'Content-Type': 'multipart/form-data'}});
              console.log(responseFile)
              this.messageTitleModal="Success Message";
              this.messageModal="Prediction request sent successfully";
              this.successPred=true;
              this.symbolShow=true;
              this.recommendedID="";
            }

          }else{
            this.messageTitleModal="Error Message";
            this.messageModal=response.data.errorMsg;
            this.successPred=false; 
            this.symbolShow=true;
          }

        } catch (e){
          console.log(e);
          this.messageTitleModal="Error Message";
          this.messageModal="The prediction request was not sent. Review the data input and try again.";
          this.successPred=false; 
          this.symbolShow=true;
        } finally{
          this.seeSpinner=false;
          this.closeModalPrediction();
          this.openModalMessage();
          if(this.successPred){
            this.clearData();
          }
        }
      },
      clearData: function(){
        this.dataSeqContent='';
        this.flagFile= false;
        this.formData= '';
        this.file= '';
        this.fileName= '';
        this.fileFormat= '';
        this.dataSeqContent='';
      }
  }  
}
</script>

<style>
#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #341731;
}

#nav {
  padding-top: 30px;
  padding-bottom: 0px;
}

#nav a {
  color:#6C757D;
  font-weight: 400;
  font-size: var(--font-size-m);
  font-family: 'Nunito Sans', sans-serif;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #6C757D;
  font-weight: bold;
  text-decoration: underline;
  text-underline-offset: 5px;
}

.modal-footer{
  justify-content: center;
}
.modal-mask{
  position:fixed;
  z-index:9998;
  top:0;
  left: 0;
  width:100%;
  height:100%;
  background-color:rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity .3s ease;
  width:100%;
}
.modal-wraper{
  display:table-cell;
  vertical-align:middle;
  
}
.modal-dialog{
  width:100%;
}

.mainPicture{
  max-width:97%;
  max-height:90%;
  vertical-align:middle;
  opacity:0.5;
}

.mainHeader{
  position:relative;
  text-align:center!important;
}

.headerPicture{
  margin-left: 2%;
  background-color:#682F62;
  max-width: 96%;
}

.infoProjectDiv{
  position:absolute;
  top:60%;
  left:0%;
  transform:translate(25%,-120%);
  -ms-transform:translate(25%,-120%);
}

.infoProjectContent{
  color:#ffffff!important;
  padding:12px 14px!important;
  margin-left:2%;
  border-radius:8px;
  text-align:left;
}

.arrowDiv{
  position:absolute;
  width:100%;
  top:22%;
  left:0%;
  transform:translate(0%,930%);
  -ms-transform:translate(0%,600%);
}

.infoPredictionDiv{
  position:absolute;
  top:35%;
  left:0%;
  transform:translate(70%,-15%);
  -ms-transform:translate(70%,-15%);
}

.infoPredictionContent{
  color:#341731;
  background-color:#ffffff;
  padding:25px 35px;
  border-radius:8px;
  text-align:left;
}
.w3-hover-opacity-off:hover{
  opacity:1
}

h5{    
  color: #ffffff;
  font-family: 'Montserrat', sans-serif;
  display:inline-block;
  margin-right:100px;
  font-size:45px;
}

.subTitle{    
  color: #ffffff;
  font-family: 'Montserrat', sans-serif;
  display:inline-block;    
  font-size:20px;
}
.title{
  align-items: baseline;
  justify-content: center;
  position: relative;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
}

.btn{    
  background-color: #341731;
  border-color: #341731;
  color:#FFFFFF;
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 700;
  font-size: 14px;
}

.btnDisabled{    
  background-color: #C4C4C4;
  border-color: #C4C4C4;
  color:#FFFFFF;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 15px;
}

.secondMainPart{
  background-color: #CABEC9;
}

.secondMainPartContent{
  background-color: #ffffff;
  margin-left: 3.5%;
  max-width: 93%;
  border-radius:16px;
  transform:translate(0%,-2%);
  -ms-transform:translate(0%,-2%);
  padding:30px;
}
.secondFuntionality{
  background-color: #ffffff;
  margin-left: 3.5%;
  max-width: 93%;
  border-radius:16px;
  transform:translate(0%,480%);
  -ms-transform:translate(0%,480%);
  padding:30px;
}

footer{
  padding-bottom:30px;
  padding-right:5%;
  padding-left:5%; 
}

.h1_1{
  font-style: normal;
  font-weight: normal;
  font-size: 25px;
  line-height: 34px;
}

.p_1{
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;
  color: #636363;
}
.labels{
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 140%;
  color: #19072F;
  margin:3px;
}

.button{
  padding-bottom: 10px;
  text-decoration: underline dotted;
  cursor:pointer;
}
.buttonInside{
  border:none;
  background: none;
  color: #341731;
}

.red-message{
  color:#ED0131;
  font-weight: bold;
}

.form-control{
  line-height: 1.5;
  font-weight: 400;
  font-size: .7rem;
  color:#141414;
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
}

.rowLabel2{
  justify-content: space-evenly;
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
}

.material-icons{
  transform:translate(0%,20%);
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

h2{
  color:#682F62;
  font-family: 'Nunito Sans', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 44px;
}
.btnLanguage{
  background-color:#CABEC9;
  color:#341731;
  border: none;
  cursor:pointer;
  text-decoration: underline;
  text-underline-offset: 5px;
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 700;
  font-size: 14px;
}

.msgErrorSpan{
  color:#ED0131;
  font-size: small;
}

.spinner-border {
    display: inline-block;
    width: 4rem;
    height: 4rem;
    color: #ffffff;
}
.spinnerText{
    color: #ffffff;
    margin-top:5px;
}
</style>

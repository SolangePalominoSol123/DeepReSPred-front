<template>
  <div class="tabSection">
    <h1>Search Prediction Requests</h1>
    <p>The DeepReSPred server is able to process many prediction requests simultaneously. Here you could find the requests you has sent, its processing status and, when it has been finished, its resulted 3D models.</p>

    <div class="rowLabel">
      <div class="rowLabelText">
        <h6 style="margin-bottom:0px;">PREDICTION IDENTIFICATION</h6>
      </div>
      <div class="rowLabelItem">
        <input type="text" class="form-control form-control-sm" placeholder="i.e. PRED000001" v-model="setgetPredIDsearch">
      </div>
      <div class="rowLabelItem">
        <button @click="searchPrediction" class="btn btn-warning sm-6">
          <span class="fas fa-search"></span>
        </button>
      </div>
    </div>

    <div class="resulRequest">   
      <div class="rowTitleSearch">
        <div>
          <h3 class="titleBold">Prediction Request</h3>
        </div>
        <div class="rowStatusearch">
          <h3 class="titleSingle">Processing Status: </h3>
          <h3 class="statusSingle" v-bind:class="{NoStatusClass:statusReqId==0,registeredStatusClass:statusReqId==1,inProcessStatusClass:statusReqId==3,completedStatusClass:statusReqId==4,errorStatusClass:statusReqId==5}">{{statusReqDesc}}</h3>
        </div>
      </div>
      <div class="container">
        <div class="row align-items-start">
          
          <div class="col">
            <div class="rowSequenceSearch">
              <label for="inputSequence" class="labels">Requested repeat protein sequence or PFAM ID</label>
              <textarea class="form-control" id="inputSequence" rows="5" placeholder="Requested sequence" v-model="dataSeqContentReq" :disabled="true"></textarea>
            </div>
            <div class="rowStatusearch" style="justify-content: right;">
              <!--h3 class="labels">Residues quantity: </h3-->
              <!--h3 class="littleBold">{{numResiduesReq}}</h3-->
            </div>
            <div style="margin-top:20px;">
              <h3 class="titleBold">Prediction Results</h3>
            </div>
            <div style="margin-bottom:20px;">

              <h3 class="labels">Download the predicted 3D protein models (PDB files)</h3>
              <h3 class="labels" style="color: #109E2A;font-weight: bold;text-align: center;" v-if="flagMessageResults">---  Loading...  ---</h3>
              <h3 class="littleBold" style="margin-top:40px;margin-bottom:40px;" v-if="unfinishedProcess">No generated results yet</h3>
              <h3 class="littleBold" style="margin-top:40px;margin-bottom:40px;" v-if="(!unfinishedProcess) && (filesResult.length<=0)">No predictions have been generated from the entered repeat protein family</h3>
              
              <!--div>  MODELOS GENERADOS     </div-->  
              <div class="rowLabel2" v-for="(item,index) in filesResultShowed" :key="index">
                <div><h3 class="labels" style="font-weight: 600;">R{{(((page-1)*perPage)+index+1)}}.</h3></div>
                <div><h3 class="labels" style="font-weight: 600;">{{item.nameFile}} </h3></div>
                <div><h3 class="labels" style="font-weight: 600;margin-left:20px;margin-right:20px;" v-if="item.tmscore!=0">TM-score: {{item.tmscore}}</h3></div>
                <div class="rowLabelItem" style="cursor:pointer;font-size: 12px;font-weight: 200; text-decoration: underline dotted;text-underline-offset: 3px;" @click="onClickLinkFile(item)">
                  <span class="material-icons" style="cursor:pointer;" @click="onClickLinkFile(item)">file_download</span>Download PDB</div>
                <div class="rowLabelItem" style="cursor:pointer;font-size: 12px;font-weight: 200; text-decoration: underline dotted;text-underline-offset: 3px;" @click="onClickLinkFileFasta(index)">
                  <span class="material-icons" style="cursor:pointer;" @click="onClickLinkFileFasta(index)">file_download</span>Download Fasta</div>
                <div class="rowLabelItem" style="cursor:pointer;font-size: 12px;font-weight: 200; text-decoration: underline dotted;text-underline-offset: 3px;" @click="onClickSeeResult(item)">
                  <span class="material-icons" style="cursor:pointer;" @click="onClickSeeResult(item)">preview</span>Preview</div>
              </div>

              <!--div>  PAGINATION </div-->  
              <nav aria-label="Page navigation example" v-if="(!unfinishedProcess) && (filesResult.length>0)">
                  <ul class="pagination" style="place-content: center;align-items: center;">
                      <li class="page-item">              
                      <button type="button" class="page-link" @click="page=1;actualiza(page);" style="border-style: none;"> 
                          <i class="fas fa-angle-double-left"></i> </button>
                      </li>
                      <li class="page-item">              
                      <button type="button" class="page-link" @click="if(page>1){page--;actualiza(page);}" style="border-style: none;"> 
                          <i class="fas fa-angle-left"></i> </button>
                      </li>
                      <li class="page-item">               
                      <input type="text" class="page-link" @input="page = page.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1');" 
                      @change="if(page>=1||page<=pages.length)actualiza(page);" v-model="page" style="width:50px;border-style: none; color:#341731;background: unset;">
                      </li>
                      <li class="page-item">
                      <input type="text" class="page-link" style="width:50px;border-style: none; color:#341731;background: unset;" value="de" disabled>
                      </li>
                      <li class="page-item">
                      <input type="text" class="page-link" :value="pages.length" style="width:50px;border-style: none; color:#341731;background: unset;" disabled>
                      </li>
                      <li class="page-item">
                      <button type="button" @click="if(page<pages.length){page++;actualiza(page);}" class="page-link" style="border-style: none;">
                          <i class="fas fa-angle-right"></i> </button>
                      </li>
                      <li class="page-item">
                      <button type="button" @click="page=pages.length;actualiza(page);" class="page-link" style="border-style: none;"> 
                          <i class="fas fa-angle-double-right"></i> </button>
                      </li>
                  </ul>
              </nav>




            </div>


            <div>
              <h3 class="labels">Re-send generated results to email</h3>
            </div>

            <div class="rowLabel2" style="margin-bottom:20px;">
              <div>
                <h3 class="labels" style="font-weight: 600;">Insert an email: </h3>
              </div>
              <div class="rowLabelItem" style="width: 50%;">
                <input type="text" class="form-control form-control-sm" placeholder="i.e. name@example.com" v-model="emailPredictionReq" @input="verifyEmail" :disabled="unfinishedProcess || (filesResult.length==0)"/>
                <span class="msgErrorSpan">{{errorEmail}}</span>
              </div>
              <div class="rowLabelItem">
                <button @click="resendPrediction" class="btn btn-warning" :disabled="(emailPredictionReq.length==0) || (emailPredictionReq=='')">Send</button>
              </div>
            </div>

          </div>

          <div class="col" style="margin-left:5%;padding-top:1%;">
            <div class="rowTitleSearch">
              <div class="colViewer">
                <h3 class="littleBold">3D Prediction Viewer</h3>
              </div>
            </div>
            <div style="margin-top:20px;margin-bottom:20px;clear: both;margin:10px;position:relative;height:500px;">
              <img class="viewPredict" v-bind:class="{opaqueClass:true}" src="@/assets/rasmol_align.png"/>
              <!--pdbe-molstar id="pdbeMolstarComponent" custom-data-url="http://192.168.1.13:9997/api/s3file/?code=prueba" custom-data-format="pdb" hide-controls="true"></pdbe-molstar-->         
              <pdbe-molstar ref="pdbeMolstarComponent" :key="componentKey" :custom-data-url="returnShowPDBFlag" custom-data-format="pdb" hide-controls="true"></pdbe-molstar>
            </div>
            <div class="rowTitleSearch">
              <div>
                <div class="rowLabel">
                  <div><h3 class="labels littleBold">Tool used: PDBe Mol*</h3></div>
                  <div><h3 class="labels" style="font-weight: 600;color: #ED0131;font-weight: 300;" v-if="errorView!=''"> ---{{errorView}}</h3></div>
                </div>
        
              </div>
              <div class="rowStatusearch" style="cursor:pointer;">
                <span class="material-icons" @click="goToolInst">info</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>


    <!-- Modal Message -->
  <div v-if="myModalMessageSearch">
      <transition name="model">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">            
                                
                <div class="infoPredictionContent">
                  <div class="rowLabelMessageTitle">
                    <div>
                      <h1 class="h1_1" style="margin-bottom:0px;font-weight: bold;">{{messageTitleModal}}</h1>
                    </div>
                    <div @click="closeModalMessageSearch"><h3 style="font-weight:bold; font-size:17px;padding-bottom:375%; cursor:pointer;">X</h3></div>
                  </div>

                  <div class="rowLabel" style="justify-content:center;margin-bottom:20px;">
                    <span class="material-icons" style="color:#ED0131;font-size:40px;margin-left:20%;margin-right:20%;">error</span>
                    <p style="margin-top:20px;margin-left:15%; margin-right:15%;font-size:20px;">{{messageModal}}</p>
                  </div>
                  
                  <div>                    
                    <div class="rowLabel" style="justify-content: center;">
                      <h3 class="labels" style="color:#6C757D;">Review the confirmation email submitted in the prediction request</h3>
                    </div>                    
                  </div>

                  <div class="rowLabel" style="justify-content: center; margin-top:40px; margin-bottom:20px;">                    
                    <button class="btn btn-warning" style="padding-left:30px; padding-right:30px;margin-left:5px;" @click="closeModalMessageSearch">Accept and return</button>
                  </div>
                  
                </div>
                        
              
              </div>
            </div>
          </div>
        </div>
      </transition>
  </div>

  </div>
  
</template>




<script>

import { mapState, mapActions} from 'vuex'

export default {
  name: 'Home',
  components: {   
   
  },
  props: {
  },
  data(){
    return{
      statusReqDesc: 'No Status',
      statusReqId: 0,
      status:{
        0:'No Status',
        1:'Registered',
        3:'Processing',
        4:'Completed',
        5:'Error'
      },
      dataSeqContentReq: 'No requested sequence',
      exampleInputSeq: 'NKYDALTQVLSRADILKIACHDCAAHALQAVLDYEQVFRQRGFARADIIKITGNGGGAQALKAVVVHGPTLNECGFSQADIVRIADNIGGAQALKAVLEHGPTLNERDYSGADIVKIAGNGGGARALKAVVMHGPTLCESGYSGADIVKIASNGGGAQALEAVAMHGSTLCERGYCRTDIAKIAGNGGGAQALKAIVMHGPTLCERGYSRTDIVKIADNNGGAQALKAVFEHGPALTQAGRSN', //BAT3_MYCRK
      exampleInputPFAMID: 'PF00806', //Pumilio-family,
      typeInputPred:'',
      inputRequestPred:'',
      disabledReq: true,  //disable until a request is searched
      unfinishedProcess: true, //disable until a searched request is completed
      numResiduesReq: 0,
      myModalMessageSearch:false,
      messageTitleModal:'',
      messageModal:'',
      showPicture:false,
      filename:'1aho.pdb',
      viewerInstance:'',
      link:"",
      componentKey: 0,
      emailPredictionReq:'',
      predIDsearchAux:'',
      filesInput:[],
      filesMiddle:[],
      filesResult:[],
      filesResultShowed:[],
      numberResultsShow:5,
      errorView:"",
      flagMessageResults:false,
      errorEmail:'',
      page: 1,
      perPage: 10,
      pages: [1]
    }
  },
  computed:{
    ...mapState(['predIDsearch','showPDBImage']),   
    setgetPredIDsearch:{
      get(){
        ///this.predIDsearchAux=this.predIDsearch;
        return this.predIDsearch;
      },
      set(value){
        this.changePredIDsearch(value);
      }
    },
    returnShowPDBFlag() {
      console.log("Reloading Mol*");
      return this.showPDBImage;       
    }
  },
  mounted(){
    var idRequestURL=this.$route.params.idRequest;   
    if(idRequestURL!="" && idRequestURL!='' && idRequestURL!=undefined){
      console.log("Looking for idRequest: "+idRequestURL);
      this.changePredIDsearch(idRequestURL);
      this.searchPrediction();
    }
  },
  methods:{
    ...mapActions(['changePredIDsearch','changeShowPDBImage']),
    forceRerender() { 
      this.componentKey += 1;
    },
      adminLogin: function(){
        this.$router.push('/adminLogin');
      },
      goToolInst: function(){
        this.$router.push('/toolInstructions');
        window.scrollTo(0,620);
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
      resendPrediction: async function(){
        this.verifyEmail()
        if((this.emailPredictionReq!="") && (this.errorEmail=='')){
          console.log("Resending email results to email: "+ this.emailPredictionReq);

          //var list_files_to_send_email=[];
          if(this.filesResult.length!=0){
            /*for(var resultFile of this.filesResult){
              console.log(resultFile);
              var nameResultFile=resultFile["nameFile"];
              var urls3=this.getUrlS3(nameResultFile,2);

              try{
                var responseResult=await this.axios.get(urls3);
                var responseData=responseResult.data;
                console.log(responseResult.data);

                if(!responseData["error"]){
                  var filenameDownloaded=responseData["fullNamePath"];
                  list_files_to_send_email.push(filenameDownloaded);
                }
              }catch(e){
                console.log("error downloading result files to resend");
              }
            }*/

            //send email
            /*if(list_files_to_send_email.length!=0){
              var dataSend={
                "listFilesLocal":list_files_to_send_email,
                "email":this.emailPredictionReq,
                "idRequest":this.predIDsearch
              }
              try{
                var responseResult=await this.axios.post('/sendEmail/', dataSend);
                var responseData=responseResult.data;
                console.log(responseResult.data);
              }catch(e){
                console.log("error downloading result files to resend");
              }
            }*/
            var dataSend={
                "email":this.emailPredictionReq,
                "idRequest":this.predIDsearch,
                "inputType" : this.typeInputPred,
                "inputContent" : this.dataSeqContentReq
            }

            try{
                var responseResult=await this.axios.post('/sendEmail/', dataSend);
                this.emailPredictionReq="";
            }catch(e){
                console.log("error downloading result files to resend");
            }
          }
        }

      },
      processStatus: function(){

        switch (this.statusReqId) {
                  case 0:                      
                    this.openModalMessageSearch();
                    this.messageTitleModal="Error Message";
                    this.messageModal="The Prediction request entered not exists. Search again using another request ID.";
                    this.unfinishedProcess=true;
                    this.dataSeqContentReq='No requested sequence';
                    this.numResiduesReq=0;
                    break;
                  case 1:
                    this.unfinishedProcess=true;
                    this.dataSeqContentReq=this.inputRequestPred;
                    
                    if(this.typeInputPred=="pfamCode")this.numResiduesReq=0;
                    else this.numResiduesReq=this.dataSeqContentReq.length;

                    break;
                  case 3:
                    this.unfinishedProcess=true;
                    this.dataSeqContentReq=this.inputRequestPred;
                    
                    if(this.typeInputPred=="pfamCode")this.numResiduesReq=0;
                    else this.numResiduesReq=this.dataSeqContentReq.length;

                    break;
                  case 4:
                    console.log("Case: Finalized");
                    this.unfinishedProcess=false;
                    this.dataSeqContentReq=this.inputRequestPred;
                    
                    if(this.typeInputPred=="pfamCode")this.numResiduesReq=0;
                    else this.numResiduesReq=this.dataSeqContentReq.length;

                    if(this.filesResult.length!=0){
                      var elementAux=this.filesResult[0];
                      this.onClickSeeResult(elementAux);
                    }

                    break;    
                  case 5:                      
                    this.openModalMessageSearch();
                    this.messageTitleModal="Error Message";
                    this.messageModal="The Prediction request presented some errors. Please try sending your prediction request again.";
                    this.unfinishedProcess=true;
                    this.dataSeqContentReq=this.inputRequestPred;
                    if(this.typeInputPred=="pfamCode")this.numResiduesReq=0;
                    else this.numResiduesReq=this.dataSeqContentReq.length;        
                }

                this.statusReqDesc = this.status[this.statusReqId];

      },
      searchPrediction: async function(){
        this.changeShowPDBImage("");
        this.forceRerender();
        console.log("Look for: "+this.predIDsearch);
        this.filesResult=[]
        this.filesResultShowed=[]

        if(this.predIDsearch!=''){

              var dataSend={
                  "idRequest" : this.predIDsearch
              }
              //console.log("sending:")
              //console.log(dataSend);
          
          try{
            const response=await this.axios.post('/searchpred/',dataSend);
            //console.log(response)
            var dataRsp=response.data;
            this.statusReqId=dataRsp.idStatus;

            if(this.statusReqId!=0){
                this.typeInputPred=dataRsp.typeInput;
              
                //consultar DB files
                const response2=await this.axios.post('/allFilesxReq/',dataSend);
                
                var dataFiles=response2.data;
                console.log(dataFiles);
                var filesInput=dataFiles["filesInput"]
                var filesMiddle=dataFiles["filesMiddle"]
                var filesResult=dataFiles["filesResult"]

                this.filesInput=filesInput;
                this.filesMiddle=filesMiddle;
                this.filesResult=filesResult;
                this.setPages();
                this.filesResultShowed=this.paginate();

                console.log(filesInput.length);

                if(dataRsp.typeInput=="pfamCode"){
                  this.inputRequestPred=dataRsp.pfamID;
                }else{

                  //get input file
                  if(filesInput.length>0){
                      var nameFull=filesInput[0]["nameFile"];
                      var posDot=nameFull.indexOf('.');
                      var fileName=nameFull.slice(0,posDot);
                      var extension=nameFull.slice(posDot+1,nameFull.length);
                      try{
                        const responseInput=await this.axios.get('/s3file/?code='+fileName+'&ext='+extension+'&typed=1');
                        this.inputRequestPred=responseInput.data;
                        console.log(responseInput.data)
                      }catch(e){
                        console.log("error getting input file");
                      }
                  }

                }
                              
              }

              this.processStatus();

          }catch(e){
            console.log("error")
            console.log(e);
            this.statusReqId= 0;                        
            this.openModalMessageSearch();
            this.messageTitleModal="Error Message";
            this.messageModal="An error has occurred in searching the prediction request. Review the request ID and try again.";
            this.unfinishedProcess=true;
            this.dataSeqContentReq='No requested sequence';
            this.numResiduesReq=0;
          }finally{

          }

        }
      },
      closeModalMessageSearch:function(){
        this.myModalMessageSearch=false;
      },
      openModalMessageSearch:function(){
        this.myModalMessageSearch=true;
      },
      onClickLinkFile(item) {
          this.flagMessageResults=true;
          console.log("downloading...");
              var nameFull=item.nameFile;
              var urls3=this.getUrlS3(nameFull,1);

              this.axios({
                    url: urls3,
                    method: 'GET',
                    responseType: 'blob',
                }).then((response) => {
                     var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                     var fileLink = document.createElement('a');
   
                     fileLink.href = fileURL;
                     fileLink.setAttribute('download', nameFull);
                     document.body.appendChild(fileLink);
   
                     fileLink.click();
                     this.flagMessageResults=false;
                }).catch(e=>{
                    console.log(e);
                    console.log("error");
                    this.flagMessageResults=false;
                });  
              
      },
      onClickLinkFileFasta(index) {

        var posItem = (((this.page-1)*this.perPage)+index)*3

        var item = this.filesMiddle[posItem];
        
          this.flagMessageResults=true;
          console.log("downloading...");
              var nameFull=item.nameFile;
              var urls3=this.getUrlS3(nameFull,1);

              this.axios({
                    url: urls3,
                    method: 'GET',
                    responseType: 'blob',
                }).then((response) => {
                     var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                     var fileLink = document.createElement('a');
   
                     fileLink.href = fileURL;
                     fileLink.setAttribute('download', nameFull);
                     document.body.appendChild(fileLink);
   
                     fileLink.click();
                     this.flagMessageResults=false;
                }).catch(e=>{
                    console.log(e);
                    console.log("error");
                    this.flagMessageResults=false;
                });
              
      },
      onClickSeeResult(item) {
        console.log("downloading...");
        var nameFull=item.nameFile;
        this.errorView="";
        this.flagMessageResults=true;
        if(this.isWatcheable(nameFull)){
            var urls3=this.getUrlS3(nameFull,1);

            this.changeShowPDBImage('http://deeprespred-back.duckdns.org:9997/api'+urls3);

            this.forceRerender();
            try{
              var pdbeMolstarComponent=this.$refs.pdbeMolstarComponent;
              this.viewerInstance = pdbeMolstarComponent.viewerInstance;
              this.flagMessageResults=false;
              //this.viewerInstance.visual.toggleSpin(true);
            }catch (e){
              console.log("Error con Mol*");
              console.log(e);
              this.errorView="There has been some errors with the viewer";
            }
        }else{
          this.errorView="This files is not admitted in the viewer";
        }
      },
      getUrlS3(name, type){
        var nameFull=name;
        var posDot=nameFull.indexOf('.');
        var fileName=nameFull.slice(0,posDot);
        var extension=nameFull.slice(posDot+1,nameFull.length);

        return '/s3file/?code='+fileName+'&ext='+extension+'&typed='+type;
      },
      isWatcheable(name){
        var nameFull=name;
        var posDot=nameFull.indexOf('.');
        var extension=nameFull.slice(posDot+1,nameFull.length);
        var admitted=['pdb','sup_atm'];
        if (admitted.includes(extension))
          return true;
        else
          return false;

      },
      setPages () {
        let numberOfPages = Math.ceil(this.filesResult.length / this.perPage);
            console.log("número de pags:", numberOfPages);
            this.pages=[];
            
          for (let index = 1; index <= numberOfPages; index++) {
            this.pages.push(index);
          }
      },
      paginate () {
          let page = this.page;
          let perPage = this.perPage;
          let from = (page * perPage) - perPage;
          let to = (page * perPage);
          return  this.filesResult.slice(from, to);
      },
      toListFileResults () { //a este se le llama despues de buscar
          this.filesResultShowed=this.paginate(this.filesResult);
          console.log("ver: ",this.filesResult);
       },
      actualiza(pagina){
          console.log(pagina);
          this.page=pagina;
          this.toListFileResults();
      }

  }
}
</script>

<style scoped>
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
}

p{
  margin:40px;
}

.resulRequest{
  background-color: #c4c4c450;  
  border-radius:16px;
  margin-top:20px;
  padding:20px 50px 20px 50px;
}

.tabSection{
  margin:40px;
  margin-left: 90px;
  margin-right: 90px;
}

h1{
  font-family: 'Nunito Sans', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 41px;
  text-align: center;
  color: #57276D;
}
.rowLabelMessageTitle{
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
.rowLabel{
  justify-content: center;
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
.rowLabelItem{
  margin:2px 4px 2px 4px;
  align-items: center;
}

.rowLabelText{
  margin:2px 4px 2px 4px;
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-weight:bold;
  font-size: 11px;
  line-height: 22px;
  color: #19072F;
}
.rowTitleSearch{
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

.rowStatusearch{
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
.labels{
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 140%;
  color: #19072F;
  margin:3px;
  text-align: initial;
}
.titleBold{
  font-style: normal;
  font-weight: normal;
  font-size: 25px;
  line-height: 34px;
  color: #341731;
  text-align: initial;
}
.titleSingle{
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 27px;
  color: #341731;
}
.statusSingle{
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 34px;
  text-align: right;
  color: #57276D;
  margin-left:10px;
}
.NoStatusClass{
  color: #B8BCCA;
}
.RegisteredStatusClass{
  color: #0e32b6;
}
.inProcessStatusClass{
  color: #57276D;
}
.completedStatusClass{
  color: #109E2A;
}
.errorStatusClass{
  color: #ED0131;
}
.rowSequenceSearch{
  justify-content: flex-start;
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
  margin-top:20px;
}
.col{
  padding:0px;
}

.form-control:disabled{
  color:#B8BCCA;
}
.form-control {
  line-height: 1.5;
  font-weight: 400;
  font-size: .7rem;
  color:#141414;
}
.littleBold{
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  color: #341731;
  margin-bottom:0px;
  margin-left:10px;
  margin-right:20px;
}

.colViewer{
  justify-content: center;
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
.viewPredict{
  max-width:100%;
}
.opaqueClass{
  opacity:0.5;
}

/*MODAL*/

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
.infoPredictionContent{
  color:#341731;
  background-color:#ffffff;
  padding:25px 35px;
  border-radius:8px;
  text-align:center;
}
.msgErrorSpan{
  color:#ED0131;
  font-size: small;
}

/*PAGINATION*/
button.page-link {
	display: inline-block;
  font-size: 20px;
  color: #341731;
  font-weight: 500;
  background: unset;
}

#inputSequence:disabled {
    color: #37383d;
}


</style>

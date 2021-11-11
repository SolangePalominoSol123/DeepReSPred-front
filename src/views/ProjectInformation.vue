<template>
  <div class="tabSection">
    <h1>Project Information</h1>
    <p>The DeepReSPred server is able to process many prediction requests simultaneously. Here you could find the requests you has sent, its processing status and, when it has been finished, its resulted 3D models.</p>

    <div class="resulRequest" v-if="false">
      <div class="rowTitleSearch">
        <div>
          <h3 class="titleBold">Prediction Request</h3>
        </div>
        <div class="rowStatusearch">
          <h3 class="titleSingle">Processing Status: </h3>
          <h3 class="statusSingle">{{statusReq}}</h3>
        </div>
      </div>
      <div class="container">
        <div class="row align-items-start">
          
          <div class="col">
            <div class="rowSequenceSearch">
              <label for="inputSequence" class="labels">Requested repeat protein sequence or PFAM ID</label>
              <textarea class="form-control" id="inputSequence" rows="3" placeholder="Requested sequence" v-model="dataSeqContentReq" :disabled="true"></textarea>
            </div>
            <div class="rowStatusearch" style="justify-content: right;">
              <h3 class="labels">Residues quantity: </h3>
              <h3 class="littleBold">{{numResidueReq}}</h3>
            </div>
            <div>
              <h3 class="titleBold">Prediction Results</h3>
            </div>
            <div>
              <h3 class="labels">Download the predicted 3D protein models (PDB files)</h3>
              <h3 class="littleBold" style="margin-top:40px;margin-bottom:40px;" v-if="disabledResend">No generated results yet</h3>
              <!--div>FALTAN LOS MODELOS GENERADOS</div-->
            </div>
            <div>
              <h3 class="labels">Re-send generated results to email</h3>
            </div>

            <div class="rowLabel" style="margin-bottom:20px;">
              <div>
                <h3 class="labels" style="font-weight: 600;">Insert email: </h3>
              </div>
              <div class="rowLabelItem">
                <input type="text" class="form-control form-control-sm" placeholder="i.e. name@example.com" v-model="emailPredictionReq"/>
              </div>
              <div class="rowLabelItem">
                <button @click="searchPrediction" class="btn btn-warning" :disabled="disabledResend">Send</button>
              </div>
            </div>

          </div>

          <div class="col" style="margin-left:5%;padding-top:1%;">
            <div class="rowTitleSearch">
              <div class="colViewer">
                <h3 class="littleBold" >3D Prediction Viewer</h3>
              </div>
            </div>
            <div class="rowTitleSearch">
              <div>
                <h3 class="littleBold">Tool used: Visualization Mol*</h3>
              </div>
              <div class="rowStatusearch" style="cursor:pointer;">
                <span class="material-icons" @click="goToolInst">info</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'ProjectInformation',
  components: {    
  },
  props: {
  },
  data(){
    return{
      statusReq: 'No Status',
      statusReqId: 1,
      status:{
        1:'No status',
        2:'Processing',
        3:'Completed'
      },
      dataSeqContentReq: 'No requested sequence',
      disabledReq: true,  //disable until a request is searched
      disabledResend: true, //disable until a searched request is completed
      numResidueReq: 0
    }
  },
  methods:{
      adminLogin: function(){
        console.log("Go to admin login");
        this.$router.push('/adminLogin');
      },
      goToolInst: function(){
        this.$router.push('/toolInstructions');
        window.scrollTo(0,620);
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
.statusSingle:disabled{
  color: #B8BCCA;
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
}
.col{
  padding:0px;
}

.form-control:disabled{
  color:#B8BCCA;
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

</style>

<template>
  <div class="tabSection">
    <h1>Tool Instructions</h1>
    <p>With a few clicks you can generate a prediction request to get predicted models from a repeat protein. To use DeepReSPred server you must follow the following steps:</p>

    <div class="container">
            <div class="row" style="margin-bottom: 35px; margin-top: 25px;">
              <div class="col-sm">
                <h3 class="statusSingle">1</h3>
                <h3 class="titleBold" style="margin-bottom:40px;"> Enter the repeat protein data</h3>
                <label class="labels">From main page, you are able to enter the repeat protein data in three formats.</label>
                <label class="labels"><label style="font-weight: bold;">First</label>, you can enter in the text field a PFAM ID directly, the fragments of a repeat protein family or a complete sequence of a repeat protein.</label>
                <label class="labels"><label style="font-weight: bold;">Second</label>, you can upload repeat protein family data in a plain text, fasta or Stockholm file.</label>
                <label class="labels"><label style="font-weight: bold;">Third</label>, you can select one of the two example input: PFAM ID or a repeat protein sequence.</label>
                <label class="labels" style="font-weight: bold;justify-content: center;text-align: center;margin-top:13px;font-size:12px;">For new ones, we recommend using the third option...</label>
              </div>
              <div class="col-sm">
                <h3 class="statusSingle">2</h3>
                <h3 class="titleBold" style="margin-bottom:40px;">Let's start</h3>
                <label class="labels">Only if you insert data in the text field of the form, the button <label style="font-weight: bold;">"Start"</label> will be available.</label>
                <label class="labels">After pressing it, DeepReSPred will show you the summary of the information you have entered. Please check it and make sure it corresponds to the data you want to send.</label>
              </div>
              <div class="col-sm">
                <h3 class="statusSingle">3</h3>
                <h3 class="titleBold" >Fill additional data: Request Identifier</h3>
                <label class="labels">In the same summary form, DeepReSPred will automatically assign an <label style="font-weight: bold;">unique and random </label> identifier to the prediction request you are going to register.</label>
                <label class="labels">You can change it as long as the identifier has not been registered before. The system will advise you is your ID is invalid or no.</label>
                <label class="labels">In case, this happen an your ID is invalid, you could reload the recommended DeepReSPred Identifier.</label>
              </div>
            </div>

            <div class="row" style="margin-bottom: 35px; margin-top: 25px;">
              <div class="col-sm">
                <h3 class="statusSingle">4</h3>
                <h3 class="titleBold" style="margin-bottom:40px;"> Fill additional data: Email</h3>
                <label class="labels">DeepReSPred will send you important information in two cases:</label>
                <label style="font-weight: bold;font-size:13px;">* Your prediction request has been successfully registered</label>
                <label class="labels">It is optional but you also will received your request identifier for asking for the status processing later.</label>
                <label style="font-weight: bold;font-size:13px;">* Your prediction request has already finished</label>
                <label class="labels">DeepReSPred will notify you about the status of you prediction request.</label>
                <label class="labels" style="justify-content: left;">Addittionally, it will send you the PDB results.</label>
              </div>
              <div class="col-sm">
                <h3 class="statusSingle">5</h3>
                <h3 class="titleBold" style="margin-bottom:40px;">Send Request</h3>
                <label class="labels">If there is no any error in the input you have entered, the <label style="font-weight: bold;">"Send request"</label> option will be available.</label>
                <label class="labels">Note that only the input data field and the request identifier field are check with a red asterisk, that means they are mandatory.</label>
                <label class="labels">After pressing it, DeepReSPred will show you a confirmation/error message about your request registration.</label>
                <label class="labels">You could see the information you have registered and two options. Press <label style="font-weight: bold;">"Search request"</label> to redirect you to the search section and so that you can consult for your request</label>
              </div>
              <div class="col-sm">
                <h3 class="statusSingle">6</h3>
                <h3 class="titleBold" style="margin-bottom:40px;">Check the status and results</h3>
                <label class="labels">You must go to the <label style="font-weight: bold;">Search section</label>  in the bottom of the page to look for your request.</label>
                <label class="labels">All you need to insert in the PREDICTION IDENTIFICATION is the generated ID. If you entered an email, check it there.</label>
                <label class="labels">Press the button with a magnifying glass icon to ask for your request.</label>
              </div>
            </div>



            <div class="row" style="margin-bottom: 35px; margin-top: 25px;">
              <div class="col-sm">
                <h3 class="statusSingle">7</h3>
                <h3 class="titleBold">Understand your status request</h3>
                <label class="labels">After inserting the request ID and press the button, DeepReSPred will show you its status. This can take four values: <label style="font-weight: bold;">No Status</label>, means some error in retrieving the information or the request does not exists.</label>
                <label class="labels">The value <label style="font-weight: bold;">Error</label> means that there has been some issues in the processing request and it will not be finished.</label>
                <label class="labels"><label style="font-weight: bold;">Registered</label> and <label style="font-weight: bold;">Processing</label> are good signals that your request is being or it will be attended.</label>
                <label class="labels">In the same way, the <label style="font-weight: bold;">Completed</label> means that the prediction process has finished. In this case you will be able to see a list of the results generated by the algorithm.</label>
              </div>
              <div class="col-sm">
                <h3 class="statusSingle">8</h3>
                <h3 class="titleBold">Visualize or download your results</h3>
                <label class="labels">When your prediction requested is completed, you will be able to visualize the generated 3D structures of the repeat protein registered.</label>
                <label class="labels">DeepReSPred uses the <label style="font-weight: bold;">Mol*</label> component to get it. This tool has more functinalities availables as viewer in full scren, zoom in, zoom out, a spin option and more.</label>
                <label class="labels">You can also download the files generated. You just have to select the buttons corresponding to the structure you want.</label>
              </div>
              <div class="col-sm">
                <h3 class="statusSingle">9</h3>
                <h3 class="titleBold">Resend the results to your email</h3>
                <label class="labels">Finally but not least, even you have registered or not an email for the prediction request, you could get <label style="font-weight: bold;">all the result files</label> in your email. Just insert a valid email.</label>
                <p style="font-weight: bold;font-size:25px; margin-top:40px;">Are you ready?</p>
              </div>
            </div>

      </div>
  </div>
</template>

<script>

export default {
  name: 'toolInstructions',
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
  text-align: center;
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
  text-align: left;
  color: #57276D;
  text-decoration: underline dotted;
  text-underline-offset: 5px;
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

<template>
  <div class="login">
    <div>
        <div class="formAdmin" >

            <h2>Administration Console</h2>
            
            <div class="parameters">
                
                <div class="container">
                    <div class="d-flex flex-row-reverse">
                        <button @click="goHome" class="btn" :class="'btnOut'">
                            <span class="fas fa-sign-out-alt"></span> 
                            Sign out                           
                        </button>
                        <button @click="habilitarEdicion" class="btn btn-warning" :class="'btnPequeño'" :disabled="flagEdicion">
                            <span class="fas fa-cogs"></span>
                            Set up
                        </button>                        
                    </div>
                </div>    

                <div class="container rowsData">
                    <label class="subSeccion">General Parameters</label> 
                    <div :class="['row','filaModalInf']">
                        <div class="col">                                                                     
                            <label>Number of CPU's used</label>                          
                            <input type="number" class="form-control form-control-sm" v-model="cpuNumber" :disabled="true" @input="validaCpuNumber" >
                            <span class="mensajeError">{{errorNumberCpu}}</span>
                        </div>   
                        <div class="col">
                            <label>Max. residues</label>
                            <input type="number" class="form-control form-control-sm" v-model="maxResidues" :disabled="true" @input="validaMaxResidues" disable>
                            <span class="mensajeError">{{errorMaxResidues}}</span>
                        </div> 
                        <div class="col">
                            <label>Max. Number of requests per day</label>
                            <input type="number" class="form-control form-control-sm" v-model="maxRequests" :disabled="!flagEdicion" @input="validaMaxRequests">
                            <span class="mensajeError">{{errorMaxRequests}}</span>
                        </div>                  
                    </div>                   
                </div>

                <div class="container mt-1">
                    <div class="d-flex flex-row-reverse">
                        <button @click="cancelConfig" class="btn btn-warning" :class="'btnGrande'" v-if="flagEdicion">
                            Cancel
                        </button>
                        <span class="border border-5  border-white"></span>  
                        <button @click="setUpConfig" class="btn btn-warning" :class="'btnGrande'" v-if="flagEdicion">
                            Set up
                        </button>
                    </div>
                </div>   
                
            </div>
            <div class="access">
                
                <div class="container">
                    <label class="subSeccion">Access Administration</label> 
                    <div class="rowsFilter">
                        <div class="col">
                            <div class="row align-items-start">
                            <div class="col">
                                <label>IP Client</label>
                                <input type="text" class="form-control form-control-sm" v-model="IPIn" placeholder="Enter a IP Client">
                            </div> 
                            <div class="col">
                                <label>Status</label>
                                <select class="form-select form-select-sm" ref="statusFilter" @change="updateStatusIn">
                                <option v-for="(option,index) in optionsStatusIn" :selected="selectedStatusIn==option.value" :key="index">{{option.text}}</option>
                                </select>
                            </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="row align-items-start">
                            <div class="col-3">
                                <button @click="searchAccess" class="btn btn-warning" :class="'btnPequeño'">
                                <span ref="btnSearch" class="fas fa-search"></span>
                                </button>
                                <span class="border border-1  border-white"></span>              
                                <button @click="cleanFilters" class="btn btn-warning" :class="'btnPequeño'">
                                <span ref="btnClean" class="fas fa-sync-alt"></span>
                                </button>
                            </div>              
                            </div>
                        </div>
                    </div>
                </div>   

                <div class="container">
                    
                    
                        <div class="container table-responsive">
                            <table class="table table-striped table-hover">
                        <thead>
                            <tr class="table-success">
                            <th scope="col" class="text-center col-sm-1">#</th>
                            <th scope="col" class="text-center col-sm-1">IP Client</th>
                            <th scope="col" class="text-center col-sm-1">Country</th>
                            <th scope="col" class="text-center col-sm-3">Browser</th>
                            <th scope="col" class="text-center col-sm-2">Last Access</th>
                            <th scope="col" class="text-center col-sm-1"># Requests</th>
                            <th scope="col" class="text-center col-sm-1">Status</th>              
                            <!--th scope="col" class="text-center col-sm-1">Actions</th-->
                            </tr>
                        </thead>
                        <tbody v-if="listedAccesses.length>0">
                            <tr v-for="(item,index) in listedAccesses" :key="index">
                            <th scope="row" class="text-center">{{(((page-1)*perPage)+index+1)}}</th>
                            <td class="text-center">{{item.IPClient}}</td>
                            <td class="text-center">{{item.countryName}}</td>
                            <td class="text-center">{{item.browser}}</td>
                            <td class="text-center">{{item.lastAccess}}</td>
                            <td class="text-center">{{item.numRequests}}</td>
                            <td class="text-center">{{item.status}}</td>
                            <!--td class="text-center" :class="'botonTabla'">
                                <button type="button" class="btn" :class="'botonTabla'" @click="lock(item)" v-if="item.status=='ENABLED'" data-toggle="tooltip" data-placement="top" title="Lock client"><i class="fas fa-door-closed"></i></button>                                
                                <button type="button" class="btn" :class="'botonTabla'" @click="unlock(item)" v-if="item.status!='ENABLED'" data-toggle="tooltip" data-placement="top" title="Unlock client"><i class="fas fas fa-door-open"></i></button>
                            </td-->
                            </tr>
                        </tbody>          
                        </table>
                            <h6 v-if="listedAccesses.length==0" class="text-center">No requests registered today</h6>
                        </div>         
                        
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
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
                                @change="if(page>=1||page<=pages.length)actualiza(page);" v-model="page" style="width:50px;border-style: none; color:#341731;">
                                </li>
                                <li class="page-item">
                                <input type="text" class="page-link" style="width:50px;border-style: none; color:#341731;" value="de" disabled>
                                </li>
                                <li class="page-item">
                                <input type="text" class="page-link" :value="pages.length" style="width:50px;border-style: none; color:#341731;" disabled>
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
                
            </div>

            <div v-if="myModel">
                <transition name="model">
                    <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog modal-lg" :class="['modalDialogMensaje']">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h3>{{tituloModal}}</h3>
                            </div>                
                            
                            <div :class="['modal-body','centrarModalMensaje']">
                            <label class="mensajeModal">{{mensajeModal}}</label>                  
                            </div>

                            <div :class="['modal-footer']">
                                <button type="button" v-if="flagConfirma" @click="sendConfig()" class="btn btn-warning" :class="'btnGrande'">Set up</button>                      
                                <button type="button" v-if="!flagConfirma" @click="cerrarModal()" class="btn btn-warning" :class="'btnGrande'">Accept</button>                      
                                <button type="button" v-if="flagCancela"  @click="cancelConfig()" class="btn btn-warning" :class="'btnGrande'">Cancel</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </transition>
            </div>



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
        flagEdicion:false,
        myModel:false,
        flagConfirma: true,
        flagCancela:true,
        flagError:false,
        //errores 
        errorNumberCpu:'',
        errorMaxRequests:'',
        errorMaxResidues:'',
        //tipo modal
        tituloModal:"Confirmation Message",      
        mensajeModal:'',
        listAccesses:[],
        listedAccesses:[],
        //tabla
        page: 1,
        perPage: 4,
        pages: [1],
        //filters
        IPIn:"",
        selectedStatusIn:'0',
        valorSelectedStatusIn:'GENERAL',
        optionsStatusIn:[
            {id:1, value:0, text:"GENERAL"},
            {id:2, value:1, text:"ENABLED"},
            {id:3, value:2, text:"DISABLED"}
        ],
        cpuNumber:5,
        maxResidues:380,
        maxRequests:10,
        tempCpuNumber:0,
        tempMaxRequests:0,
        tempMaxResidues:0
      }
  },
  created(){
    this.getParameters();
    this.getAccesses();
  },
  mounted(){    
    this.changeFlagWatchTags(false);
  },
  computed:{
    ...mapState(['flagWatchTabs']),    
  },
  methods:{
    ...mapActions(['changeFlagWatchTags']),
    abreModal: function(){
      this.myModel=true;
    },
    cerrarModal: function(){
      this.myModel=false;
      this.flagEdicion=false;
      this.flagConfirma=true;
      if(this.flagError){
        this.cpuNumber=this.tempCpuNumber;
        this.maxRequests=this.tempMaxRequests;
        this.maxResidues=this.tempMaxResidues;
        this.errorNumberCpu="";
        this.errorMaxRequests="";
        this.errorMaxResidues="";
      }
      this.flagCancela=true;
      //si hubo error cargar los valores iniciales
    },
    updateStatusIn: function(){
        var value=this.$refs.statusFilter.value;
        this.valorSelectedStatusIn=value;

        for(var i=0;i<this.optionsStatusIn.length;i++){
            if(this.optionsStatusIn[i]["text"]==value){
                this.selectedStatusIn=i;
                break;
            }
        }
        console.log(this.selectedStatusIn);
        console.log(this.valorSelectedStatusIn);

    },
    cleanFilters:function(){
        this.selectedStatusIn=0;
        this.valorSelectedStatusIn="GENERAL";
        this.IPIn="";
    },
    searchAccess: function(){
        this.getAccesses();
    },
    cancelConfig:function(){
      this.cerrarModal();
      this.cpuNumber=this.tempCpuNumber;
      this.maxRequests=this.tempMaxRequests;
      this.maxResidues=this.tempMaxResidues;
      this.errorNumberCpu="";
      this.errorMaxRequests="";
      this.errorMaxResidues="";
    },
    setUpConfig: function(){      
        this.tituloModal = 'Confirmation Message';
        this.mensajeModal="¿Are you sure to set up these system parameters?";
        this.abreModal();       
    },
    habilitarEdicion:function(){
      //habilitar campos a editar
      this.flagEdicion=true;
    },
    sendConfig: function(){
        //enviar parametros
        this.flagConfirma=false;
        
        this.validaCpuNumber();
        this.validaMaxRequests();
        this.validaMaxResidues();

        if(this.errorNumberCpu=="" && this.errorMaxRequests=="" && this.errorMaxResidues==""){

            var datos={
                "cpuNumber":this.cpuNumber,
                "maxRequests":this.maxRequests,
                "maxResidues":this.maxResidues
            }
            console.log("enviando");
            console.log(datos);
            this.axios.put('/parameter/', datos).then(response=>{
                var rpta=response.data;
                this.flagEdicion=false;
                console.log("exito: "+response);
                this.tituloModal="Success Message";
                this.mensajeModal="System parameters configured successfully.";
                this.flagCancela=false;
                this.abreModal();  
                this.flagError=false;
            }).catch(e=>{
                console.log(e);
                this.flagEdicion=false;
                console.log("error");
                this.tituloModal="Error Message";                
                this.mensajeModal="There has been a problem in the parameter configuration. Please try again.";
                this.flagCancela=false;
                this.abreModal();  
                this.flagError=true;  
            });     
        } 
    },
    getParameters: function(){
      this.axios.get('/parameter/').then(response=>{
          var rpta=response.data.parameters;
          console.log("rpta: ",rpta);  
          this.cpuNumber=rpta[2]["value"];
          this.maxResidues=rpta[1]["value"];
          this.maxRequests=rpta[0]["value"];
          this.tempCpuNumber=this.cpuNumber;
          this.tempMaxRequests=this.maxRequests;
          this.tempMaxResidues=this.maxResidues;
      }).catch(e=>{
          console.log(e);
          this.tempCpuNumber=this.cpuNumber;
          this.tempMaxRequests=this.maxRequests;
          this.tempMaxResidues=this.maxResidues;
      }); 
    },
    getAccesses: function(){
        var dataSend={
            "status":this.valorSelectedStatusIn,
            "ipSearch":this.IPIn
        };
        console.log("Consulting...");
        console.log(dataSend);
        this.axios.post('/access/', dataSend).then(response=>{
            this.listAccesses=response.data.accesses;
            console.log(this.listAccesses);
            this.setPages();
            this.listedAccesses=this.paginate();
        }).catch(e=>{
            console.log(e);
        });
    },
    validaCpuNumber: function(){     
      this.errorNumberCpu=""; 
      if(this.cpuNumber=='' || this.cpuNumber==null){
        this.errorNumberCpu="This value is required";
      }else if(this.cpuNumber<=0){
        this.errorNumberCpu="Minimum value: 1";
      }else if(this.cpuNumber>4){
        this.errorNumberCpu="Maximum value: 4";
      }
    },
    validaMaxRequests: function(){     
      this.errorMaxRequests=""; 
      if(this.maxRequests<0 || this.maxRequests=="" ||this.maxRequests==null){
        this.errorMaxRequests="This value is required";
      }
    },
    validaMaxResidues: function(){     
      this.errorMaxResidues=""; 
      if(this.maxResidues=='' || this.maxResidues==null){
        this.errorMaxResidues="This value is required";
      }else if(this.maxResidues<=0){
        this.errorMaxResidues="Minimum  value: 1";
      }
    },
    setPages () {
		let numberOfPages = Math.ceil(this.listAccesses.length / this.perPage);
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
			return  this.listAccesses.slice(from, to);
	},
    toListAccess () { //a este se le llama despues de buscar
      this.listedAccesses=this.paginate(this.listAccesses);
      console.log("ver: ",this.listedAccesses);
	},
    actualiza(pagina){
      console.log(pagina);
      this.page=pagina;
      this.toListAccess();
    },
    goHome: function(){
        console.log("Go to admin login");
        this.$router.push('/adminLogin');
    }
  }
}
</script>

<style scoped>
.rowsData{
    display: flex;
    align-items: stretch;
    flex-direction: column;
}
.rowsFilter{
    display: flex;
    align-items: stretch;
    flex-direction: initial;
    align-items: flex-end;
    margin:0px 0px 15px 15px;
}
span{
    margin:0 10px;
    cursor:pointer;
}
label{
    font-size:12px;
    color: #cacaca;
    display:flex;
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
.formAdmin{    
    position: fixed;
    width:100%;
    top: 50%;
    left: 50%;  
    transform: translate(-50%, -45%);
}
h5{
    color: #cacaca;
    display:inline-block;    
    font-size:19px;
    padding:0px;
    margin:0px;
}
h6{
    color: #9e9d9d;
    font-family: 'Open Sans', sans-serif;
    display:inline-block;
    margin-right:100px;
    font-size:15px;
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
    color: rgb(255, 255, 255);
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


/** -----------------------*/

.modal-footer{
  justify-content: center;
}
.btnGrande{
    background-color:#341731;
    border-color: #341731;
    color:#FFFFFF;
    padding-left:5px;
    padding-right:5px;
    font-size:100%;
    width:15%;
}
.btnPequeño{
    background-color:#341731;
    border-color: #341731;
    color:#FFFFFF;
    position: relative;
    padding-left:15px;
    padding-right:15px;
    font-size:100%;
    width:15%;
}
.btnOut{
    background-color:#FFFFFF;
    border-color: #ffffff;
    color:#341731;
    position: relative;
    font-size:100%;
    width:12%;
}
.col{
  margin-right: 5px;
  margin-bottom:0px;
  padding-bottom:0px;
}
.subSeccion{
  margin-bottom: 10px;
  font-weight: bold;
  font-size:16px;
  color: #341731;
}
.filaModalInf{
  margin-bottom: 30px;
  justify-content: space-between;
}
.mensajeError{
  color:#ED0131;
  font-size: small;
}
.mensajeModal{
  font-size: large;
  color:#575656;
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
button.page-link {
	display: inline-block;
}
button.page-link {
    font-size: 20px;
    color: #341731;
    font-weight: 500;
}
.offset{
  width: 500px !important;
  margin: 20px auto;  
}
.centrarModalMensaje{
  align-self: center;
}
.modalDialogMensaje {
    width: 40%;
}

.table>:not(:last-child)>:last-child>* {
    border-bottom-color: #ffffff;
    background-color:#CABEC9;
}
.col-3 {
    flex: 0 0 auto;
    width: 75%;
    min-block-size: fit-content;
    text-align: start;
    margin-left:20px;
}
.botonTabla{
    color:#ffffff;
    font-size:100%;
    max-width: max-content;
}
.botonTabla:hover{
    color: #341731;
    background-color: #fd842200;
    border-color: #fd842200;
}
</style>

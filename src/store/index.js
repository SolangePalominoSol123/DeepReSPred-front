import { createStore } from 'vuex'

export default createStore({
  state: {
    flagWatchTabs: true,
    isActive1_: true,
    isActive2_: false,
    isActive3_: false,
    isActive4_: false,
    predIDsearch: "",
    showPDBImage: ""
  },
  mutations: {
    chFlagWatchTags(state, status) {
      state.flagWatchTabs = status;
    },
    chIsActive1(state, status) {
      state.isActive1_ = status;
    },
    chIsActive2(state, status) {
      state.isActive2_ = status;
    },
    chIsActive3(state, status) {
      state.isActive3_ = status;
    },
    chIsActive4(state, status) {
      state.isActive4_ = status;
    },
    chPredIDsearch(state, value){
      state.predIDsearch = value;
    },
    chShowPDBImage(state, status) {
      state.showPDBImage = status;
    }
  },
  actions: {
    changeFlagWatchTags(context, status) {
      context.commit("chFlagWatchTags", status);
    },
    changeIsActive1(context, status) {
      context.commit("chIsActive1", status);
    },
    changeIsActive2(context, status) {
      context.commit("chIsActive2", status);
    },
    changeIsActive3(context, status) {
      context.commit("chIsActive3", status);
    },
    changeIsActive4(context, status) {
      context.commit("chIsActive4", status);
    },
    changePredIDsearch(context, value){
      context.commit("chPredIDsearch", value);
    },
    changeShowPDBImage(context, value){
      context.commit("chShowPDBImage", value);
    }
  },
  modules: {},
});

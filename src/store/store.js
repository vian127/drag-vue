import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        // lastColIndex: 1,
        // lastRowIndex: 0,
        dragNum: 0,
    },
    mutations: {
        // 记录表头最后一列的索引值
        // changeColIndex(state,colInd){
        //     state.lastColIndex = colInd;
        // },
        //  // 记录行数的索引值
        // changeRowIndex(state,rowInd){
        //     state.lastRowIndex = rowInd;
        // },
        // 记录合并次数
        changeDragNum(state,num){
            state.dragNum = state.dragNum + num;
        },
        clearStore(state){
            // state.lastColIndex = 1;
            // state.lastRowIndex = 0;
            state.dragNum = 1;
        }
    }
});
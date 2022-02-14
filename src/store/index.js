import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    quizLength: "0",
    rightAnswerResult: [],
    wrongAnswerResult: [],
  },
  mutations: {
    SET_QUIZ_LENGTH(state, length) {
      state.quizLength = length
    },

    SET_RIGHT_ANSWER_RESULT(state, payload) {
      state.rightAnswerResult.push(payload)
    },

    SET_WRONG_ANSWER_RESULT(state, payload) {
      state.wrongAnswerResult.push(payload)
    },

    RESET_RESULT(state) {
      state.rightAnswerResult = []
      state.wrongAnswerResult = []
    },
  },
  actions: {},
  modules: {},
})

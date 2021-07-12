import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import global from '../api/global'
import AES from '../api/aes'
import message from "../components/Message/index";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showModal: false,
    showEmoji: false,
    loading: false,
    soundOpen: true,
    audioUrl: require("../api/default.wav"),
    OneToOneChatRecord: [],
    AutoReplyChatRecord: [],
    inRoom: {},
    customerInfo: {
      customerId: "",
      customerImgUrl: "",
      customer_nickname: "",
      imgUrl: "",
      level: "",
      name: "",
      nickname: "",
      token: "",
      userId: ""
    },
  },
  getters: {
    //audio sound getter
    soundOpen: state => {
      return state.soundOpen;
    },
  },
  mutations: {
    //play audio
    play(state, payload) {
      let audio = new Audio(state.audioUrl);
      state.soundOpen = payload
      audio.play();
      // audio.autoplay()
    },
    //pause audio
    pause(state, payload) {
      let audio = new Audio(state.audioUrl);
      state.soundOpen = payload
      audio.pause();
    },
    //for loading spinner
    Loading_Spinner(state, payload) {
      state.loading = payload
    },
    ToggleEmoji(state) {
      state.showEmoji = !state.showEmoji
    },
    // GET_CLIENTINFO(state,data) {
    //   console.log(data);
    // }
    setOneToOneChatRecord(state, payload) {
      state.OneToOneChatRecord = payload;
    },
    setAutoReplyChatRecord(state, payload) {
      state.OneToOneChatRecord = payload;
    },
    setInRoom(state, payload) {
      state.inRoom = payload;
    },
  },
  actions: {
    get_ClientInfo( query) {
      var en = global.en;
      return new Promise((resolve, reject) => {
        // console.log(query);
        axios.post(query.url, query.query).then((res) => {
          // console.log("response data is *************", res);
          var body = res.data;
          // console.log("ressssssssssssssssssss", body);
          if (body.result == "ok") {
            // commit('Loading_Spinner',false)
            global.customerInfo.customerId = body.customer_id;
            global.customerInfo.customerImgUrl = body.customer_imgUrl;
            global.customerInfo.customer_nickname =
              body.customer_nickname;
            global.customerInfo.imgUrl = body.imgUrl;
            global.customerInfo.level = body.level;
            global.customerInfo.name = body.name;
            global.customerInfo.nickname = body.nickname;
            global.customerInfo.token = body.token;
            global.customerInfo.userId = body.userId;

            window.localStorage.setItem("c", AES.encrypt(JSON.stringify(body), en));
            // this.Loading();
            console.log(global.customerInfo);
            return resolve()
          } else {
            message.error(body.reason);
            reject()
          }
          // commit('GET_CLIENTINFO', body)
        })
      }).catch(e => {
        reject(e)
      })

    }
  },
  modules: {
  }
})

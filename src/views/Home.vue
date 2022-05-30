<template>
  <!-- <div 
   :class="[{home: true}, {phonee: Screenwidth > 1000 ? true: false}]"
   > -->
  <div class="home">
    <Header></Header>
    <Chatsection></Chatsection>
    <Loader v-if="loading"></Loader>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import AES from "../api/aes";

import Header from "@/components/Header.vue";
import Chatsection from "@/components/Chatsection.vue";
import Loader from "@/components/Loader.vue";
import { mapState } from "vuex";
import pomelo from "../api/pomelo";
import {AgentLogin} from '../api/user'
// import RightSide from "@/components/RightSide.vue";

export default {
  name: "Home",
  components: {
    Header,
    Chatsection,
    Loader,
    // RightSide,
  },
  data() {
    return {
      Screenwidth: "",
      Screenheight: "",
    };
  },
  computed: {
    ...mapState({ loading: (state) => state.loading }),
  },

  methods: {
    Loading() {
      this.$store.commit("Loading_Spinner", false);
    },
    NotLoading() {
      this.$store.commit("Loading_Spinner", true);
    },

    getClientInfo(query) {
      console.log("inside of first time get client ******", query);
      // var url =
      //   window.g.ip +
      //   "/client_signIn";
      var en = this.$Global.en;
      let endata = AES.encrypt(JSON.stringify(query), en);
      console.log("endata is", endata);
      // this.axios
      //   .post(url, { data: endata })
      AgentLogin({data:endata})
        .then((res) => {
          // console.log("ressssssssssssssssssss", res);
          var body = res.data;
          console.log("ressssssssssssssssssss", body);
          var msg = JSON.parse(AES.decrypt(body, en));
          // this.NotLoading();
          console.log("msg decry ***", msg);
          if (msg.result == "false") {
            this.$message.error(msg.reason);
          } else {
            this.$store.state.customerInfo.customerId = msg.customer_id;
            this.$store.state.customerInfo.customerImgUrl = msg.customer_imgUrl;
            this.$store.state.customerInfo.customer_nickname =
              msg.customer_nickname;
            this.$store.state.customerInfo.imgUrl = msg.imgUrl;
            this.$store.state.customerInfo.level = msg.level;
            this.$store.state.customerInfo.name = msg.name;
            this.$store.state.customerInfo.nickname = msg.nickname;
            this.$store.state.customerInfo.token = msg.token;
            this.$store.state.customerInfo.userId = msg.userId;
            localStorage.setItem("c", AES.encrypt(JSON.stringify(msg), en));
            // this.Loading();
            this.$pomelo.conn((err, res) => {
              // console.log(res);
              if (err) console.error(err);
              if (res.code == 200) {
                this.getChatMessage();
                this.getAutoReplyInfo();
                // this.Loading();
                // console.log(res);
              }
            });
          }
        })
        .catch((e) => {
          console.log(e.toString());
          // this.Loading();
          this.$message.error(e.toString());
        });
    },

    // getClientInfo(query) {
    //   var url =
    //     "http://" +
    //     window.g.ip +
    //     ":" +
    //     window.g.pomelo_http_port +
    //     "/client_signIn";
    //    console.log("inside of first time get client info client ******", query);
    //   this.$store
    //     .dispatch("get_ClientInfo", { query, url })
    //     .then(() => {
    //       this.$pomelo.conn((err, res) => {
    //         console.log(res);
    //         if (err) console.error(err);
    //         if (res.code == 200) {
    //           this.Loading();
    //           this.getChatMessage();
    //           // console.log(res);
    //         }
    //       });
    //     })
    //     .catch((e) => {
    //       // console.log(e.toString());
    //       this.Loading();
    //       this.$message.error(e.toString());
    //     });
    // },

    getAlreadyClientInfo(query) {
      console.log("inside of getAlreadyClientInfo client ******", query);
      // var url =
      //   window.g.ip +
      //   "/client_signIn";
      var en = this.$Global.en;
      let endata = AES.encrypt(JSON.stringify(query), en);
      console.log("getAlreadyClientInfo endata is", endata);

      // this.NotLoading();
      // this.axios
      //   .post(url, { data: endata })
      AgentLogin({data:endata})
        .then((res) => {
          console.log("ressssssssssssssssssss of created", res);
          var body = res.data;
          var msg = JSON.parse(AES.decrypt(body, en));
          console.log("ressssssssssssssssssss decry", msg);
          if (msg.result == "false") {
            this.$message.error(msg.reason);
          } else {
            this.$store.state.customerInfo.customerId = msg.customer_id;
            this.$store.state.customerInfo.customerImgUrl = msg.customer_imgUrl;
            this.$store.state.customerInfo.customer_nickname =
              msg.customer_nickname;
            this.$store.state.customerInfo.imgUrl = msg.imgUrl;
            this.$store.state.customerInfo.level = msg.level;
            this.$store.state.customerInfo.name = msg.name;
            this.$store.state.customerInfo.nickname = msg.nickname;
            this.$store.state.customerInfo.token = msg.token;
            this.$store.state.customerInfo.userId = msg.userId;
            localStorage.setItem("c", AES.encrypt(JSON.stringify(msg), en));
            // this.Loading();
            this.$pomelo.conn((err, res) => {
              // console.log(res);
              if (err) console.error(err);
              if (res.code == 200) {
                this.getChatMessage();
                this.getAutoReplyInfo();
                // this.Loading();
                // console.log(res);
              }
            });
          }
        })
        .catch((e) => {
          console.log(e);
          // this.Loading();
          return this.$message.error(e.toString());
        });
    },

    encryptLocalStorage() {
      var en = this.$Global.en;
      const data = localStorage.getItem("c");
      const dedata = JSON.parse(AES.decrypt(data, en));
      this.$store.state.customerInfo.customerId = dedata.customer_id;
      this.$store.state.customerInfo.customerImgUrl = dedata.customer_imgUrl;
      this.$store.state.customerInfo.customer_nickname =
        dedata.customer_nickname;
      this.$store.state.customerInfo.imgUrl = dedata.imgUrl;
      this.$store.state.customerInfo.level = dedata.level;
      this.$store.state.customerInfo.name = dedata.name;
      this.$store.state.customerInfo.nickname = dedata.nickname;
      this.$store.state.customerInfo.token = dedata.token;
      this.$store.state.customerInfo.userId = dedata.userId;
      return dedata;
    },

    getChatMessage() {
      var memberId = this.$store.state.customerInfo.userId;
      var customerId = this.$store.state.customerInfo.customerId;

      let sendData = {
        router: "getChatMessage",
        JsonData: {
          memberId: memberId,
          customerId: customerId,
        },
      };
      // console.log("senddata is ", sendData);
      pomelo.send(sendData);
    },
    //get auto reply info
    getAutoReplyInfo() {
      var customerId = this.$store.state.customerInfo.customerId;
      let sendData = {
        router: "getAutoAnswer",
        JsonData: {
          customerId: customerId,
        },
      };
      // console.log("senddata is ", sendData);
      pomelo.send(sendData);
    },
    alreadyLogin() {
      var param = {
        visiter_id: this.encryptLocalStorage().customer_id,
        nick_name: this.encryptLocalStorage().name,
        avatar: "",
        business_id: this.$route.query.business_id,
        groupid: this.$route.query.groupid,
        special: this.$route.query.special,
      };
      this.$Global.isMe = this.$route.query.special;
      this.getAlreadyClientInfo(param);
    },

    // testArray() {
    //   let array = [
    //     {
    //       from_id: "340",
    //       message: "二娃",
    //       msgType: 0,
    //       msg_id: 3751,
    //       time: "2021-06-30 20:39:56",
    //       to_id: "330",
    //     },
    //   ];
    //   console.log("test array is", array[0]);
    // },
  },

  created() {
    let query;
    ///nick name include in url
    if (window.location.href.indexOf("nick_name") > -1) {
      console.log("contains nick name");
      // include visitor name in nick_name
      if (this.$route.query.nick_name !== "") {
        console.log("visitor name 277 *************");
        if (
          localStorage.getItem("c") !== null &&
          this.$route.query.nick_name == this.encryptLocalStorage().name
        ) {
          this.alreadyLogin();
        } else {
          query = this.$route.query;
          console.log(" query is **************** 284", query);
          this.getClientInfo(query);
          this.$Global.isMe = this.$route.query.special;
        }
      }
      //
      //not include visitor name
      else {
        if (localStorage.getItem("c") == null) {
          query = this.$route.query;
          console.log(" query is **************** 292", query);
          this.getClientInfo(query);
          this.$Global.isMe = this.$route.query.special;
        } else {
          console.log("visitor name 295", this.encryptLocalStorage().name);
          if (this.encryptLocalStorage().name.indexOf("游客") !== -1) {
            console.log("303 ***********");
            this.alreadyLogin();
          } else {
            localStorage.removeItem("c");
            query = this.$route.query;
            console.log(" query is **************** 301", query);
            this.getClientInfo(query);
            this.$Global.isMe = this.$route.query.special;
          }
        }
      }
    } 
    //not include nick name in url
    else {
        if (localStorage.getItem("c") == null) {
          query = this.$route.query;
          console.log(" query is **************** 292", query);
          this.getClientInfo(query);
          this.$Global.isMe = this.$route.query.special;
        } else {
          console.log("visitor name 295", this.encryptLocalStorage().name);
          if (this.encryptLocalStorage().name.indexOf("游客") !== -1) {
            console.log("303 ***********");
            this.alreadyLogin();
          } else {
            localStorage.removeItem("c");
            query = this.$route.query;
            console.log(" query is **************** 301", query);
            this.getClientInfo(query);
            this.$Global.isMe = this.$route.query.special;
          }
        }
    }
  },
};
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #f7f7f7;
  padding: 0;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  // width: 100%;
  // height: 100%;
  // position: absolute;
  // pointer-events: none;
}
.phonee {
  max-width: 400px;
}
.disablePage {
  pointer-events: none;
}
</style>

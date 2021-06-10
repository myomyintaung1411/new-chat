<template>
  <div class="home" :class="{ disablePage: loading == true }">
    <Header></Header>

    <Chatsection></Chatsection>
    <!-- <RightSide></RightSide> -->

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
// import RightSide from "@/components/RightSide.vue";

export default {
  name: "Home",
  components: {
    Header,
    Chatsection,
    Loader,
    // RightSide,
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
      var url =
        // "http://" +
        window.g.ip +
        // ":" +
        // window.g.pomelo_http_port +
        "/client_signIn";
      var en = this.$Global.en;
      this.axios
        .post(url, query)
        .then((res) => {
          // console.log("ressssssssssssssssssss", res);
          var body = res.data;
           console.log("ressssssssssssssssssss", body);
          // this.NotLoading();
          if (body.result == "ok") {
            this.$store.state.customerInfo.customerId = body.customer_id;
            this.$store.state.customerInfo.customerImgUrl =
              body.customer_imgUrl;
            this.$store.state.customerInfo.customer_nickname =
              body.customer_nickname;
            this.$store.state.customerInfo.imgUrl = body.imgUrl;
            this.$store.state.customerInfo.level = body.level;
            this.$store.state.customerInfo.name = body.name;
            this.$store.state.customerInfo.nickname = body.nickname;
            this.$store.state.customerInfo.token = body.token;
            this.$store.state.customerInfo.userId = body.userId;

            localStorage.setItem("c", AES.encrypt(JSON.stringify(body), en));
            // this.Loading();
          } else {
            this.$message.error(body.reason);
          }
        })
        .then(() => {
          this.$pomelo.conn((err, res) => {
            // console.log(res);
            if (err) console.error(err);
            if (res.code == 200) {
              this.getChatMessage();
              // this.Loading();
              // console.log(res);
            }
          });
        })
        .catch((e) => {
          console.log(e.toString());
          // this.Loading();
          this.$message.error(e.toString());
        })
        .catch((e) => {
          console.log(e);
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
      var url =
        // "http://" +
        window.g.ip +
        // ":" +
        // window.g.pomelo_http_port +
        "/client_signIn";
      var en = this.$Global.en;
      // this.NotLoading();
      this.axios
        .post(url, query)
        .then((res) => {
           console.log("ressssssssssssssssssss of created", res);
          var body = res.data;
          //  console.log("ressssssssssssssssssss created", body);

          if (body.result == "ok") {
            this.$store.state.customerInfo.customerId = body.customer_id;
            this.$store.state.customerInfo.customerImgUrl =
              body.customer_imgUrl;
            this.$store.state.customerInfo.customer_nickname =
              body.customer_nickname;
            this.$store.state.customerInfo.imgUrl = body.imgUrl;
            this.$store.state.customerInfo.level = body.level;
            this.$store.state.customerInfo.name = body.name;
            this.$store.state.customerInfo.nickname = body.nickname;
            this.$store.state.customerInfo.token = body.token;
            this.$store.state.customerInfo.userId = body.userId;

            localStorage.setItem("c", AES.encrypt(JSON.stringify(body), en));
            // this.Loading();
          } else {
            this.$message.error(body.reason);
          }
        })
        .then(() => {
          this.$pomelo.conn((err, res) => {
            // console.log(res);
            if (err) console.error(err);
            if (res.code == 200) {
              // this.Loading();
              // console.log(res);
              this.getChatMessage();
            }
          });
        })
        .catch((e) => {
          console.log(e);
          // this.Loading();
          return this.$message.error(e.toString());
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
      //console.log("senddata is ", sendData);
      pomelo.send(sendData);
    },
  },

  created() {
    // this.encryptLocalStorage();
    let query;
    if (localStorage.getItem("c") == null) {
      query = this.$route.query;
      // console.log(" query is ****************", query);
      this.getClientInfo(query);
      //get special query for s
      this.$Global.isMe = query.special;
    } else {
      query = {
        visiter_id: this.encryptLocalStorage().customer_id,
        visiter_name: this.encryptLocalStorage().name,
        avatar: "",
        business_id: this.$route.query.business_id,
        groupid: this.$route.query.groupid,
        special: this.$route.query.special,
      };
      this.$Global.isMe = this.$route.query.special;
      this.getAlreadyClientInfo(query);
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
  // width: 100%;
  // height: 100%;
  // position: absolute;
  // pointer-events: none;
}
.disablePage {
  pointer-events: none;
}
</style>

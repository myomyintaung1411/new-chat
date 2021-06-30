login() {
      if (this.loginLoading === true) {
        return
      }
      if(this.account == "" || this.password == "") return
      this.loginLoading = true
      var url =
        "http://" + settings.ip + ":" + settings.pomelo_http_port + "/signIn";
        // console.log("http: ", url)
      let pw = this.$md5(this.password);
      let userName = this.account;
      let self = this;
      let sendStr = {
        router: "Login",
        JsonData: { name: userName, password: pw, ip: this.$store.state.ip, terminal: "pc" },
      };
      let en = this.$Global.en; 
      this.$http.post(url, sendStr).then((response) => {
        // console.log(response)
        var body = response.bodyText;
        var msg = JSON.parse(AES.decrypt(body, en));
        if (msg.router == "LoginErr") {
          this.$message.info(msg.reason);
          this.loginLoading = false;
          // this.$message.info("登录失败");
          return;
        }
        if (msg.JsonData.enable == 0) {
          this.$message.info("帐户锁定, 不能登录");
          this.loginLoading = false;
          return;
        }
        // console.log("response ", msg)
        this.$ws.doData(response.bodyText); //响应成功回调
        this.$Global.optioner.UserName = msg.JsonData.name;
        this.$Global.optioner.Id = msg.JsonData.Id;
        this.$Global.selectInfo.selectAgent = msg.JsonData.name;
        this.$Global.optioner.xmb_s = msg.JsonData.xmb_s;
        this.$Global.optioner.xmb_d = msg.JsonData.xmb_d;
        this.$Global.optioner.zcb = msg.JsonData.zcb;
        this.$Global.optioner.gx = msg.JsonData.gx;
        this.$Global.optioner.xmType =
          msg.JsonData.xmType == 0 ? "双边" : "单边";
        this.$Global.optioner.arrJxb = msg.JsonData.jxb.split(",");
        this.$Global.optioner.level = msg.JsonData.level;
        this.$Global.optioner.webSit = msg.JsonData.webSit;
        this.$Global.optioner.token = msg.JsonData.token;
        this.$Global.optioner.customerId = msg.JsonData.customerId;
        // console.log("info", msg.JsonData.gx)
        this.$Global.gxLength = msg.JsonData.gx.split("^").length
        msg.JsonData.gx.split("^")[2] == "20338" && (this.$Global.isWL = true ) //判断是否是万利的代理
        this.$pomelo.conn(function (err, res) {
          // console.log("this", res)
          self.loginLoading = false
          if (res.code == "200") {
            self.$Global.Pass = self.password;
            self.$router.push("/home");
            let ht_info = {
              account: self.account,
              password: self.password
            }
            localStorage.setItem("ht_info", AES.encrypt(JSON.stringify(ht_info), en))
            self.setInof("auth", true)
            let haha = self.getCookie("auth")
          }
        });
      });
    },


  //   <swiper  class="swiper-list" :indicator-dots="true">
  //   <swiper-item >
  //     <view class="swiper-item" v-for="(item, index) in getEXP()" :key="index">
  //           <image src="" mode=""
  //      :src="'https://tysq666.cn/emotion/' + item.file"
  //      :data="item.code"
  //      @click="emojiSelect(item.code)"
  //      :title="item.title"
  //      class="emoji-image"
  //      >
  //     </image>
  //     </view>
  //   </swiper-item>
  // </swiper>
  	 /* emoji code */
  //    .emoji-view {
  //     height: 300upx;
  //     background-color: red;
  //     position: fixed;
  //     bottom: 0;
  //     left: 0;
  //     right: 0;
  //     overflow: hidden;
  //     box-shadow: 0 0 20px rgb(0, 0, 0 / 20%);
  //     width: 100%;
  //   }
  //   .swiper-list{
  //    padding-top: 20upx;
  //    background-color: red;
  //  }
  //  .swiper-item {
  //    display: flex;
  //    align-items: center;
  //    flex-wrap: wrap;
  //  }
  //  .emoji-image{
  //    width: 40upx;
  //    height: 40upx;
  //  }
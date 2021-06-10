<template>
  <div class="layui-row chat-header" style="background: #1e9fff">
    <div class="layui-col-xs2 chat-header-avatar">
      <img
        src="../assets/chatimg/service.png"
        class="agent-avatar"
        draggable="false"
      />
    </div>
    <!--  -->
    <div
      class="layui-col-xs9 chat-header-title"
      v-if="this.$store.state.customerInfo.customer_nickname"
    >
      {{ this.$store.state.customerInfo.customer_nickname }}
    </div>
    <!-- <div class="layui-col-xs9 chat-header-title" v-else>上分客服01</div> -->

    <div class="layui-col-xs1 chat-header-tool" id="operatorVoice">
      <span
        class="iconfont"
        style="font-size: 20px"
        id="openVoice"
        @click.prevent="soundState == true ? pause() : play()"
      >
        <!-- <iframe
          src="audio/source.mp3"
          allow="autoplay"
          style="display: none"
          id="iframeAudio"
        >
        </iframe> -->
        <img
          src="../assets/chatimg/sound.png"
          alt=""
          class="centerimg"
          v-if="soundState"
          draggable="false"
        />
        <img
          src="../assets/chatimg/nosound.png"
          alt=""
          class="centerimg"
          v-else
          draggable="false"
        />
      </span>

      <!-- <span
        class="iconfont"
        style="font-size: 20px; display: none"
        id="closeVoice"
        ></span
      > -->
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      // soundOpen: true,
      // audioUrl: require("../api/default.wav"),
    };
  },
  computed: {
    ...mapGetters(["soundOpen"]),
    ...mapState({ soundState: (state) => state.soundOpen }),
  },
  watch: {
    soundOpen: function (state) {
      console.log(state);
    },
  },
  methods: {
    // ToggleSound() {
    //   this.soundOpen = !this.soundOpen;
    //   let audio = new Audio(this.audioUrl);
    //   if (this.soundOpen == true) {
    //     audio.play();
    //   } else {
    //       // audio = new Audio(this.audioUrl);
    //     audio.paused();
    //   }
    // },

    play() {
      // let audio = new Audio(this.audioUrl);
      // this.soundOpen = true;
      // audio.play();
      this.$store.commit("play", true);
    },
    pause() {
      // let audio = new Audio(this.audioUrl);
      // audio.pause();
      // this.soundOpen = false;
      this.$store.commit("pause", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.chat-header {
  height: 60px;
  background: #1e9fff;
  position: sticky;
  top: 0;
}
.layui-row:after,
.layui-row:before {
  content: "";
  display: block;
  clear: both;
}
.chat-header .chat-header-avatar {
  height: 100%;
}
.layui-col-xs2 {
  width: 16.66666667%;
  float: left;
}
.agent-avatar {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  // box-shadow: 0 3px 3px 0 rgb(0 0 0 / 10%);
}

.chat-header-title {
  height: 100%;
  line-height: 60px;
  text-align: left;
  color: #fff;
}

.layui-col-xs9 {
  width: 75%;
  float: left;
}

.chat-header-tool {
  height: 100%;
  line-height: 60px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  // background: red;
  // align-self: center;
}
.layui-col-xs1 {
  width: 8.33333333%;
  // background: red;
  float: left;
}
.centerimg {
  // background: white;
  height: 20px;
  margin-top: 20px;
  // align-self: center;
  // text-align: center;
}
</style>
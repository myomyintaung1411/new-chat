<template>
  <div class="loading_box">
    <div class="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="loading_txt">装货..</div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      required: false,
      type: String,
      default: "Loading",
    },
  },
};
</script>

<style lang="scss" scoped>
.loading_box {
  position: absolute;
  height: auto;
  width: 100px;
  background: rgba(0, 0, 0, 0.966) !important;
  top: 50%;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  box-shadow: -200px -200px 5px -75px rgba(0, 0, 0, 0.836);
  -webkit-box-shadow: -200px -200px 5px -75px rgba(0, 0, 0, 0.36);
  -moz-box-shadow: -200px -200px 5px -75px rgba(0, 0, 0, 0.36);
  text-align: center;
  padding: 10px;
  word-break: break-all;
  word-wrap: break-word;
  border-radius: 10%;
}
.loading_txt {
  font-size: 15px;
  color: #fff;
  margin-top: -5px;
}
.lds-spinner {
  color: #fff;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-spinner div {
  transform-origin: 40px 40px;
  animation: lds-spinner 1.2s linear infinite;
}
.lds-spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 15px;
  left: 37px;
  width: 3px;
  height: 12px;
  border-radius: 20%;
  background: rgb(255, 255, 255);
}
.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}
.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}
.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}
.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}
.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}
.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}
.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}
.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}
.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}
.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}
.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}
.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}
@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
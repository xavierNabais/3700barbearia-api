<template>

<div class="background-overlay" :style="{ opacity: overlayOpacity }" v-if="isLoading"></div>

    <div class="loader-background" v-if="isLoading">
      <div class="loader">
        <div class="circle"></div>
        <div class="scissor"></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isLoading: true,
      };
    },
    mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500); 
  },
    name: 'loadingIcon',
  };
  </script>
  
  <style scoped>
.loader-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow: hidden;
}

.loader {
  position: relative;
  width: 100px;
  height: 100px;
}

.circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border: 4px solid #333333;
  border-top: 4px solid #F2B709;
  border-radius: 50%;
  animation: spin 2s linear infinite;
}
.no-scroll {
  overflow: auto;
overflow-y: hidden;}
.scissor {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background-image: url('..//assets/images/loading-01.png'); 
  background-size: cover;
}

@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  50% {
    transform: translate(-50%, -50%) rotate(180deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}


.background-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #333333;
  z-index: 1000; 
  transition: opacity 1s, height 1s; 

}
  </style>
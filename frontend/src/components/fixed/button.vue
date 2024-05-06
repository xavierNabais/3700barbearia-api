<template>
    <div class="fixed-button" :style="{ right: buttonHover ? '0' : '' }" @mouseover="buttonHover = true" @mouseleave="buttonHover = false">
        <button> &#8592; AGENDAR CORTE</button>
    </div>

    <div v-if="showPopup" class="popup">
  <Popup />
</div>
</template>

<script>
  import Popup from '../../components/PopupModal.vue';

export default {
    name: 'FixedButton',
    data() {
        return {
            buttonHover: false,
            showPopup: false,
            currentTab: 0,
        };
    },
    methods: {
      openPopup() {
        this.showPopup = true;
        document.body.classList.add('no-scroll');
      },
      closePopup() {
        this.showPopup = false;
        document.body.classList.remove('no-scroll');
        this.currentTab = 0; 
      },
    },
    componente: {
        Popup,

    }
}
</script>
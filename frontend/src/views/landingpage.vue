<template>


<Loader />


<Header />



<div class="desktop">
    <div class="section">
      <div class="content">
        <div class="text">

            <img src="../assets/images/logo.png" style="width: 50%;">
            <p><span style="font-size: 24px;color: #F2B802;">Fresh & Clean</span></p>
            <p><span style="font-weight: bold;font-size: 48px;">BARBEARIA 3700</span></p>
            <p><span style="font-size: 24px; ">Descobre a Barberia 3700, o novo espaço de cortes de cabelo e barbas feito à medida para jovens da cidade. Ambiente moderno, estilo autêntico.</span></p>
            <p><span style="font-size: 24px; font-weight: bold;">Marca já o teu horário!</span></p>
            <button class="botao" @click="openPopup">AGENDA O TEU CORTE</button>

    <!-- Elemento de fundo escuro -->
    <div v-if="showPopup" class="modal-background" @click="closePopup"></div>

    <!-- Popup -->
    <div v-if="showPopup" class="popup">
      <span class="close" @click="closePopup">&times;</span>
      <Popup />
    </div>

        </div>
        <div class="image">
          <img src="../assets/images/main.jpg" alt="Entry Photo" style="width: 478px;">
        </div>
      </div>
    </div>

    <div class="fixed-button" :style="{ right: buttonHover ? '0' : '' }" @mouseover="buttonHover = true" @mouseleave="buttonHover = false">
            <button @click="openPopup"> &#8592; AGENDAR CORTE</button>
    </div>
</div>



<div class="mobile" style="width:100vw">
        <div class="image" style="padding:20px">
          <img src="../assets/images/main.jpg" alt="Entry Photo" style="width: 100%;margin-top: 25%;">
        </div>
        <div class="text" style="text-align: center;padding: 20px;color: white;">

            <img src="../assets/images/logo.png" style="width: 50%;">
            <p><span style="font-size: 24px;color: #F2B802;">Fresh & Clean</span></p>
            <p><span style="font-weight: bold;font-size: 36px;">BARBEARIA 3700</span></p>
            <p><span style="font-size: 16px;">Descobre a Barberia 3700, o novo espaço de cortes de cabelo e barbas feito à medida para jovens da cidade. Ambiente moderno, estilo autêntico.</span></p>
            <button class="botao" @click="openPopup" style="margin:10% 0px">AGENDA O TEU CORTE</button>

    <!-- Elemento de fundo escuro -->
    <div v-if="showPopup" class="modal-background" @click="closePopup"></div>

    <!-- Popup -->
    <div v-if="showPopup" class="popup">
      <span class="close" @click="closePopup">&times;</span>
      <Popup />
    </div>

      </div>

    <div class="fixed-button" style="bottom:0; width:100%; right: 0">
            <button @click="openPopup" style="width:100%; height:50px">AGENDAR CORTE</button>
    </div>
</div>







<Roller />


<Barbearia />


<Servicos />


<Portfolio />


<Testemunhos />



<Contactos />



<Footer />

  </template>
  
  <script>
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';
  import Popup from '../components/PopupModal.vue';
  import Barbearia from '../components/sections/barbearia.vue';
  import Roller from '../components/sections/roller.vue';
  import Contactos from '../components/sections/contactos.vue';
  import Portfolio from '../components/sections/portfolio.vue';
  import Testemunhos from '../components/sections/testemunhos.vue';
  import Servicos from '../components/sections/servicos.vue';
  import Loader from '../components/loader.vue';

  export default {
    data() {
      return {
        isLoading: true,
        showPopup: false,
        currentTab: 0,
        buttonHover: false,
        };
    },
    components: {
      Header,
      Footer,
      Popup,
      Barbearia,
      Roller,
      Contactos,
      Portfolio,
      Testemunhos,
      Servicos,
      Loader,
    },
    name:'LandingPage',
    methods: {
      openPopup() {
        this.showPopup = true;
        // Adicione a classe ao body para desativar o scroll
        document.body.classList.add('no-scroll');
      },
      closePopup() {
        this.showPopup = false;
        // Remova a classe do body para reativar o scroll
        document.body.classList.remove('no-scroll');
        this.currentTab = 0; // Reinicie a guia atual ao fechar o popup
      },
    },


  }
  </script>
  
  

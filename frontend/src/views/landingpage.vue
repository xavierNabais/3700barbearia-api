<template>


<Loader />


<Header />

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


<Certificados />


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
  import Contactos from '../components/sections/contactos.vue';
  import Portfolio from '../components/sections/portfolio.vue';
  import Testemunhos from '../components/sections/testemunhos.vue';
  import Servicos from '../components/sections/servicos.vue';
  import Certificados from '../components/sections/certificados.vue';
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
      Contactos,
      Portfolio,
      Testemunhos,
      Servicos,
      Certificados,
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
  
  

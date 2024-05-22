<template>
<section class="testemunhos-block desktop">

    <p style="font-size: 32px; color: black; font-weight: bold;">TESTEMUNHOS</p>
    
    <div class="separador">
        <img src="../../assets/images/bigode_line.png" alt="Bigode" style="width:10%;">
    </div>

    <swiper
      :cssMode="true"
      :navigation="true"
      :pagination="true"
      :mousewheel="true"
      :keyboard="true"
      :modules="modules"
      :slidesPerView="3"
      class="mySwiper"
    >
      <swiper-slide>
        <div class="cada_testemunho">
          <p style="color: #F2B802;font-size: 20px;">Ricardo Soares</p>
          <p style="font-size: 16px;">há um ano</p>
          <p style="color: #F2B802;font-size:20px;">★★★★</p>
          <p>Excelente trabalho!</p>
          <p>Barbeiro bem profissional e ótima pessoa!</p>
          <a href="https://g.co/kgs/8EDgSwp" target="_blank" style="color:#F4B604;font-size: 14px;">Ver Crítica »</a>
        </div>
      </swiper-slide>

      <swiper-slide>
        <div class="cada_testemunho">
          <p style="color: #F2B802;font-size: 20px;">Gustavo Ferreira</p>
          <p style="font-size: 16px;">há um mês</p>
          <p style="color: #F2B802;font-size:20px;">★★★★</p>
          <p>Bom staff!</p>
          <a href="https://g.co/kgs/31MXBHt" target="_blank" style="color:#F4B604;font-size: 14px;">Ver Crítica »</a>
        </div>
      </swiper-slide>

      <swiper-slide>
        <div class="cada_testemunho">
          <p style="color: #F2B802;font-size: 20px;">BaZ</p>
          <p style="font-size: 16px;">há um ano</p>
          <p style="color: #F2B802;font-size:20px;">★★★★</p>
          <p style="font-size: 14px;">Serviços: Aparar os pelos das sobrancelhas, Corte a desvanecer, Cortar a barba</p>
          <p>Atendimento top! Melhor barbearia de São João da madeira</p>
          <a href="https://g.co/kgs/8EDgSwp" target="_blank" style="color:#F4B604;font-size: 14px;">Ver Crítica »</a>
        </div>
      </swiper-slide>

      <swiper-slide>
        <div class="cada_testemunho">
          <p style="color: #F2B802;font-size: 20px;">Diogo Soares</p>
          <p style="font-size: 16px;">há um ano</p>
          <p style="color: #F2B802;font-size:20px;">★★★★</p>
          <p>Bom espaço e excelentes cortes</p>
          <a href="https://g.co/kgs/8EDgSwp" target="_blank" style="color:#F4B604;font-size: 14px;">Ver Crítica »</a>
        </div>
      </swiper-slide>

      <swiper-slide>
        <div class="cada_testemunho">
          <p style="color: #F2B802;font-size: 20px;">José Lopes</p>
          <p style="font-size: 16px;">há 7 meses</p>
          <p style="color: #F2B802;font-size:20px;">★★★★</p>
          <p>Pessoa espetacular e bom professional</p>
          <a href="https://g.co/kgs/8EDgSwp" target="_blank" style="color:#F4B604;font-size: 14px;">Ver Crítica »</a>
        </div>
      </swiper-slide>

      <swiper-slide>
        <div class="cada_testemunho">
          <p style="color: #F2B802;font-size: 20px;">João Pedro Ribeiro</p>
          <p style="font-size: 16px;">há um ano</p>
          <p style="color: #F2B802;font-size:20px;">★★★★</p>
          <p>Excelente serviço!</p>
          <a href="https://g.co/kgs/8EDgSwp" target="_blank" style="color:#F4B604;font-size: 14px;">Ver Crítica »</a>
        </div>
      </swiper-slide>

      <swiper-slide>
        <div class="cada_testemunho">
          <p style="color: #F2B802;font-size: 20px;">Gonçalo Correia</p>
          <p style="font-size: 16px;">há um ano</p>
          <p style="color: #F2B802;font-size:20px;">★★★★</p>
          <p>Melhor Barbearia</p>
          <a href="https://g.co/kgs/8EDgSwp" target="_blank" style="color:#F4B604;font-size: 14px;">Ver Crítica »</a>
        </div>
      </swiper-slide>

      <swiper-slide>
        <div class="cada_testemunho">
          <p style="color: #F2B802;font-size: 20px;">Hugo Paiva</p>
          <p style="font-size: 16px;">há um ano</p>
          <p style="color: #F2B802;font-size:20px;">★★★★</p>
          <a href="https://g.co/kgs/8EDgSwp" target="_blank" style="color:#F4B604;font-size: 14px;">Ver Crítica »</a>
        </div>
      </swiper-slide>

      <swiper-slide>
        <div class="cada_testemunho">
          <p style="color: #F2B802;font-size: 20px;">2MuchHQ</p>
          <p style="font-size: 16px;">há 4 meses</p>
          <p style="color: #F2B802;font-size:20px;">★★★★</p>
          <a href="https://g.co/kgs/8EDgSwp" target="_blank" style="color:#F4B604;font-size: 14px;">Ver Crítica »</a>
        </div>
      </swiper-slide>
      
    </swiper>
</section>

</template>
  
  <script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';
  
  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  
  // import required modules
  import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
  
  export default {
    name: 'SectionTestemunhos',
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      return {
        modules: [Navigation, Pagination, Mousewheel, Keyboard],
      };
    },
  };
  </script>
  
  <style scoped>
  .swiper {
    width: 100%;
    height: 100%;
  }
  
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }


  </style>
  
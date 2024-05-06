<template>
    <section class="roller">
      <div class="roller-container" ref="rollerContainer">
        <div class="roller-content">
          <div class="item"><i class="fas fa-scissors"></i>DEGRADÊ</div>
          <div class="item"><i class="fas fa-scissors"></i>TOPETE</div>
          <div class="item"><i class="fas fa-scissors"></i>UNDERCUT</div>
          <div class="item"><i class="fas fa-scissors"></i>QUIFF</div>
          <div class="item"><i class="fas fa-scissors"></i>POMPADOUR</div>
          <div class="item"><i class="fas fa-scissors"></i>BUZZ</div>
          <div class="item"><i class="fas fa-scissors"></i>MILITAR</div>
          <div class="item"><i class="fas fa-scissors"></i>CAESAR</div>
          <div class="item"><i class="fas fa-scissors"></i>SURFISTA</div>
          <div class="item"><i class="fas fa-scissors"></i>DREADLOCKS</div>
          <div class="item"><i class="fas fa-scissors"></i>FRANJA</div>
          <div class="item"><i class="fas fa-scissors"></i>MOHAWK</div>
          <div class="item"><i class="fas fa-scissors"></i>MOICANO</div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'RollerSection',
    mounted() {
      this.startRoller();
    },
    methods: {
      // Método para iniciar o roller
      startRoller() {
        const rollerContainer = this.$refs.rollerContainer;
        const rollerContent = rollerContainer.querySelector('.roller-content');
        // Clona o conteúdo do roller
        const clonedContent = rollerContent.cloneNode(true);
        // Adiciona o conteúdo clonado ao final do conteúdo original
        rollerContent.appendChild(clonedContent);
        let scrollAmount = 1; 
        const scrollDelay = 20; 
        // Inicia um intervalo para fazer o roller
        setInterval(() => {
          rollerContainer.scrollLeft += scrollAmount;
          // Verifica se o roller chegou ao final do conteúdo
          if (rollerContainer.scrollLeft >= rollerContent.offsetWidth / 2) {
            // Se chegou ao final, volta ao início
            rollerContainer.scrollLeft = 0;
          }
        }, scrollDelay);
      }
    }
  }
  </script>
  
  
  
  
  <style scoped>
  .roller {
    overflow: hidden;
    width: 100%;
    background-color:rgb(5, 5, 5);
    padding:30px 0px;
  }
  
  .roller-container {
    display: flex;
    animation: roll 60s linear infinite; 
  }
  
  .roller-content {
    display: inline-flex;
  }
  
  .item {
    font-size: 26px;
    color:white;
    font-weight: bold;
    align-items: center;
    width:max-content;
    margin: 0px 15px;
  }
  
  .item i{
    color:#F4B604;
    margin: 0px 10px;
    font-size:26px;
  }

  @keyframes roll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }
  </style>
  
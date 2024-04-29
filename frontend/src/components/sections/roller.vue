<template>
    <section class="roller">
      <div class="roller-container" ref="rollerContainer">
        <div class="roller-content">
          <!-- Conteúdo da seção aqui -->
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

          <!-- Adicione mais itens conforme necessário -->
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'RollerSection',
    mounted() {
      // Função para iniciar a animação de rolagem
      this.startRoller();
    },
    methods: {
      startRoller() {
        const rollerContainer = this.$refs.rollerContainer;
        const rollerContent = rollerContainer.querySelector('.roller-content');
        // Clone o conteúdo para garantir que ele seja contínuo ao rolar
        const clonedContent = rollerContent.cloneNode(true);
        rollerContent.appendChild(clonedContent);
        // Inicia a animação de rolagem
        let scrollAmount = 1; // Ajuste a velocidade de rolagem conforme necessário (aqui está definido como 1)
        const scrollDelay = 20; // Ajuste o intervalo de rolagem conforme necessário
        setInterval(() => {
          // Atualiza a posição de rolagem
          rollerContainer.scrollLeft += scrollAmount;
          // Verifica se a animação atingiu o final do conteúdo original
          if (rollerContainer.scrollLeft >= rollerContent.offsetWidth / 2) {
            // Retorna para a posição inicial
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
    animation: roll 60s linear infinite; /* Defina a duração e a repetição da animação */
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

  /* Animação de rolagem */
  @keyframes roll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }
  </style>
  
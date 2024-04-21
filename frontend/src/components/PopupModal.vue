<template>



        <div class="popup-section section-left">
        <!-- Indicador de progresso -->
        <div class="progress-indicator">
            <div class="progress-ball filled step"></div>
            <div class="progress-ball step"></div>
            <div class="progress-ball step"></div>
            <div class="progress-ball step"></div>
        </div>

        <!-- Título e descrição -->
        <div class="section-content">
            <h2 class="popup-title-left">SERVIÇO</h2>
            <p class="popup-description">Nesta seção, os clientes podem escolher o serviço específico que desejam agendar na barbearia.</p>
        </div>
        <!-- Conteúdo da Seção 1 -->
        </div>

        <div class="popup-section section-middle">
        <form>


        <div class="tab" v-show="currentTab === 0">

            <h2 class="popup-title">Selecione o serviço</h2>
            <div class="service-info">
            <button class="highlight-button">Destaque</button>

            <div v-for="dados in servicos" :key="dados.id" class="ag-courses_item">
                <a href="#" class="ag-courses-item_link">
                <div class="ag-courses-item_bg"></div>
                <div class="ag-courses-item_title">
                    {{ dados.Nome }} <span style="float: right;font-size: 14px;">A partir de: <span>{{ dados.Preco }}€</span></span>
                </div>
                </a>
            </div>
            
            </div>
        </div>


            <div class="tab" v-show="currentTab === 1">

            <h2 class="popup-title">Selecione o profissional</h2>
                <div class="service-info">
                    <div v-for="dados in barbeiros" :key="dados.id" class="ag-courses_item">
                        <a href="#" class="ag-courses-item_link">
                        <div class="ag-courses-item_bg"></div>
                            <div class="ag-courses-item_title" style="text-align: center;">
                                <img src="../assets/images/main.jpg" style="width: 100%;">
                                <br>
                                {{ dados.Nome }}
                            </div>
                        </a>
                    </div>
                </div>
            </div>


            <div class="tab" v-show="currentTab === 2">
                <h2 class="popup-title">Selecione o horário</h2>
                <div class="service-info">
                    <!-- Botão de destaque opcional -->
                    <!-- <button class="highlight-button">Destaque</button> -->

                    <!-- Seletor de data e hora -->
                    <flat-pickr v-model="selectedDateTime" :config="flatpickrConfig"></flat-pickr>
                </div>
            </div>


            <div class="tab" v-show="currentTab === 3">

            <h2 class="popup-title">Selecione o serviço</h2>
            <div class="service-info">
            <button class="highlight-button">Destaque</button>

            <div v-for="dados in servicos" :key="dados.id" class="ag-courses_item">
                <a href="#" class="ag-courses-item_link">
                <div class="ag-courses-item_bg"></div>
                <div class="ag-courses-item_title">
                    {{ dados.Nome }} <span style="float: right;font-size: 14px;">A partir de: <span>{{ dados.Preco }}€</span></span>
                </div>
                </a>
            </div>
            </div>
            </div>




        <button type="button" id="prevBtn" @click="prevStep">Previous</button>
        <button class="next-button" @click.prevent="nextStep(1)">Próximo -></button>


        </form>
        </div>

        <div class="popup-section section-right">
        <div class="vertical-rectangle"></div>
        <h2 class="popup-title third">RESUMO</h2>
        <div class="summary-info">
            <p>Serviço: Corte</p>
        </div>
        </div>
</template>
        <script>
        export default {
        name: 'PopupModal',
        data() {
      return {
        showPopup: false,
        currentTab: 0,
        servicos: [], // Propriedade para armazenar os dados dos serviços
        barbeiros: [], // Propriedade para armazenar os dados dos barbeiros
        };
    },
    methods: {
      async fetchServicos() {
        try {
          const response = await fetch('http://localhost:5000/painel/servicos');
          const data = await response.json();
          this.servicos = data;
        } catch (error) {
          console.error('Erro ao buscar os dados dos serviços:', error);
        }
      },
      async fetchBarbeiros() {
        try {
            const response = await fetch('http://localhost:5000/painel/barbeiros');
            const data = await response.json();
            this.barbeiros = data; // Use uma propriedade diferente para os barbeiros
        } catch (error) {
            console.error('Erro ao buscar os dados dos barbeiros:', error);
        }
      },
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
      nextStep() {
        if (this.currentTab < 3) {
          this.currentTab++;
        }
      },
      prevStep() {
        if (this.currentTab > 0) {
          this.currentTab--;
        }
      }
    },
    mounted() {
      this.fetchServicos();
      this.fetchBarbeiros(); // Chama o método para buscar os dados dos barbeiros ao montar o componente

    },

    
    }
  
  </script>



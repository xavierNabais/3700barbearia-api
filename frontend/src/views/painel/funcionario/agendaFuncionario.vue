<template>
  <div>
    <Header />
    <div class="section2">
      <div class="content2">
        <span class="title2">AGENDA</span>
      </div>
    </div>
    <div style="width: 72%; height: auto; background-color: white; margin:auto; margin-top:5%;">

      <vue-cal
        @event-click="openEventPopup"
        style="height: 750px"
        :events="eventList"
        :config="calConfig"
        :disable-views="['years', 'year']"
        hide-weekends
        :locale="ptPTLocale"
        :time-from="7 * 60"
        :time-to="22 * 60"
        class="vuecal--blue-theme"
      >
        <!-- Remover hora do evento -->
        <template #event="{ event }">
          <div>{{ event.title }}</div>
        </template>
      </vue-cal>

    <!-- Popup de detalhes da marcação -->
    <div v-if="isEventPopupOpen" class="popup">
      <div class="popup-content">
          <p><b>Nome do Cliente:</b> {{ this.utilizadorNome }}</p>
          <p><b>Serviço:</b> {{ this.servicoNome }}</p>
          <p><b>Notas:</b> {{ this.notas }}</p>
          <p><b>Data e Hora:</b> {{ this.data }}</p>
        <button @click="closeEventPopup">Fechar</button>
      </div>
    </div>
    
    </div>
    <Footer />
  </div>
</template>

<script>
import VueCal from 'vue-cal';
import { jwtDecode } from 'jwt-decode';
import Header from '../../../components/Header.vue';
import Footer from '../../../components/Footer.vue';
import 'vue-cal/dist/vuecal.css';

const ptPTLocale = {
  week: 'Semana',
  month: 'Mês',
  day: 'Dia',
  "weekDays": ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
  "months": ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
};

export default {
  data() {
    return {
      marcacoes: [],
      eventList: [],
      selectedMarcacaoId: null,
      calConfig: {
        displayMode: 'week', 
        editable: false, 
      },
      ptPTLocale: ptPTLocale,
      isEventPopupOpen: false,
      utilizadorNome: null,
      servicoNome: null,
      data: null,
      notas: null,
    };
  },
  methods: {
    async fetchMarcacaoDetails(id) {
      try {
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        const userId = decoded.userId;
        if (!userId) {
          console.error('UserId não encontrado na sessionStorage.');
          return;
        }
        const url = `http://localhost:5000/painel/marcacoes/${id}`;
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        this.utilizadorNome = data.utilizador.Nome;
        this.servicoNome = data.servico.Nome;
        this.notas = data.dados.Notas;
        this.data = data.dados.Data;
        console.log(data);
      } catch (error) {
        console.error('Erro ao buscar os detalhes da marcação:', error);
      }
    },
    async fetchMarcacoes() {
      try {
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        const userId = decoded.userId;
        if (!userId) {
          console.error('UserId não encontrado na sessionStorage.');
          return;
        }
        const url = `http://localhost:5000/painel/marcacoes/barbeiro/${userId}`;
        const response = await fetch(url);
        const data = await response.json();
        this.marcacoes = data;
        if (Array.isArray(this.marcacoes)) {
          this.eventList = this.marcacoes.map(marcacao => {
            const dataHora = new Date(marcacao.Data); 
            const dataFormatadaInicial = `${dataHora.getFullYear()}-${(dataHora.getMonth() + 1).toString().padStart(2, '0')}-${dataHora.getDate().toString().padStart(2, '0')} ${dataHora.getHours().toString().padStart(2, '0')}:${dataHora.getMinutes().toString().padStart(2, '0')}:${dataHora.getSeconds().toString().padStart(2, '0')}`;
            const endDate = new Date(dataHora.getTime() + 45 * 60000);
            const dataFormatadaFinal = `${endDate.getFullYear()}-${(endDate.getMonth() + 1).toString().padStart(2, '0')}-${endDate.getDate().toString().padStart(2, '0')} ${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}:${endDate.getSeconds().toString().padStart(2, '0')}`;
            return {
              start: dataFormatadaInicial, 
              end: dataFormatadaFinal,
              title: `Marcação com ${marcacao.nomeUtilizador}`,
              id: marcacao.Id,
            };
          });
        } else {
          console.error('Dados das marcações não estão no formato esperado.');
        }
      } catch (error) {
        console.error('Erro ao buscar os dados das marcações:', error);
      }
    },
    openEventPopup(event) {
      this.selectedMarcacaoId = event.id;
      this.isEventPopupOpen = true;
      this.fetchMarcacaoDetails(event.id);
    },
    closeEventPopup() {
      this.isEventPopupOpen = false;
    },
  },
  mounted() {
    this.fetchMarcacoes();
  },
  components: {
    Header,
    Footer,
    VueCal,
  },
};
</script>


<style scoped>
/* Estilo do popup */
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 20px;
  max-width: 400px;
  width: 90%;
  z-index: 1000;
  height:auto;
}

/* Estilo do overlay de fundo */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo semi-transparente */
  z-index: 999; /* Acima do conteúdo, mas abaixo do popup */
}

/* Estilo do título do popup */
.popup-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

/* Estilo dos detalhes da marcação */
.popup-details {
  margin-bottom: 10px;
}

/* Estilo dos botões de ação */
.popup-buttons {
  text-align: right;
}

/* Estilo dos botões do popup */
.popup-button {
  background-color: #007bff;
  color: #ffffff;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* Estilo dos botões do popup quando hover */
.popup-button:hover {
  background-color: #0056b3;
}


</style>

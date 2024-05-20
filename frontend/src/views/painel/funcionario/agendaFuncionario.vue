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
      >


        <!-- Remover hora do evento -->
        <template #event="{ event }">
          <div>{{ event.title }}</div>
        </template>
      </vue-cal>

      <!-- Popup de detalhes da marcação -->
      <div v-if="isEventPopupOpen" class="popup">
        <div class="popup-content">
          <span class="close-icon" @click="closeEventPopup"><i class="fas fa-times"></i></span>
          <p><b>Nome do Cliente:</b> {{ utilizadorNome }}</p>
          <p><b>Serviço:</b> {{ servicoNome }}</p>
          <p><b>Notas:</b> {{ notas }}</p>
          <p><b>Data e Hora:</b> {{ data }}</p>
          <p><b>Pontos:</b> {{ utilizadorPontos }}</p>
          <div class="popup-buttons">
            <!-- Adicione a diretiva :disabled ao botão de confirmação -->
            <button class="popup-button" @click="confirmarEvento(utilizadorId)" :disabled="disabled">Confirmar Marcação <i class="fas fa-check"></i></button>
            <p style="font-style:italic;font-size:14px;">Quando confirmar a marcação irá incrementar 1 ponto ao utilizador.</p>
            <div v-if="confirmMessage" style="background-color: #F4B604;color: white; padding:20px">Marcação confirmada com sucesso!</div>
          </div>
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
      utilizadorPontos: null,
      utilizadorId: null,
      servicoNome: null,
      data: null,
      notas: null,
      disabled: false,
      confirmMessage: false,
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
        this.utilizadorPontos = data.utilizador.Pontos;
        this.servicoNome = data.servico.Nome;
        this.notas = data.dados.Notas;
        this.data = data.dados.Data;
        this.utilizadorId = data.utilizador.Id;
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
              title: `${marcacao.nomeUtilizador}`,
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
      this.confirmMessage = false,
      this.isEventPopupOpen = false;
    },
    async confirmarEvento(userId) {
      console.log(userId);
      try {
        this.disabled = true;
        const response = await fetch(`http://localhost:5000/utilizador/complete/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          this.confirmMessage = true; 
          this.fetchMarcacoes();
        }
        else {
          console.error('Erro ao confirmar o evento');
        }
      } catch (error) {
        console.error('Erro ao confirmar o evento:', error);
      }
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
  width: 80%;
  z-index: 1000;
  height: auto;
}

.popup-content{
  width:100%;
}

/* Estilo do ícone de fechar */
.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
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
  text-align: center;
}

/* Estilo dos botões do popup */
.popup-button {
  background-color: #F4B604;
  color: #ffffff;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

/* Estilo dos botões do popup quando hover */
.popup-button:hover {
  background-color: #F2B709;
}

</style>

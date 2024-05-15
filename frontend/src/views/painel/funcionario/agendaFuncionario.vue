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
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from '../../../components/Header.vue';
import Footer from '../../../components/Footer.vue';
import VueCal from 'vue-cal';
import {jwtDecode} from 'jwt-decode';

import 'vue-cal/dist/vuecal.css';
const ptPTLocale = {
  week: 'Semana',
  month: 'Mês',
  day: 'Dia',
  "weekDays": ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
  "months": ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
  selectedEvent: null,
  isEventPopupOpen: false,
  selectedMarcacaoId: null

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
  };
},
methods: {
  async fetchMarcacoes() {
  try {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const userId =  decoded.userId;
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
      console.log(event.id);
      this.selectedMarcacaoId = event.id;
      this.isEventPopupOpen = true;
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
name: 'agendaFuncionario',
};
</script>

<style scoped>



</style>

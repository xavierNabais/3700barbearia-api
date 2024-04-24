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

      <div v-for="dados in servicos" :key="dados.id" class="ag-courses_item" @click="selectService(dados)" :class="{ 'selected': selectedService === dados }">
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
            <div v-for="dados in barbeiros" :key="dados.id" class="ag-courses_item" @click="selectBarber(dados)" :class="{ 'selected': selectedBarber === dados }">
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
  <div class="date-container">
    <!-- Exibe o mês e o ano -->
    <p style="color:black;">{{ monthYear }}</p>
    <p style="color:black; margin-left: auto;">{{ nextMonthYear ? `${months[nextMonth - 1]} ${nextMonthYear}` : '' }}</p>
  </div>
  <div class="pagination-wrapper">
    <!-- Botões de navegação do calendário -->
    <button class="pagination-button" @click.prevent="prevPage">&lt;</button>
    <div class="day-pagination">
      <!-- Botões para seleção de dias -->
      <button v-for="day in daysInMonth" :key="day" @click.prevent="selectDay(day)">{{ day.day }}</button>
    </div>
    <button class="pagination-button" @click.prevent="nextPage">&gt;</button>
  </div>
  <!-- Exibe as horas disponíveis para o dia selecionado -->
  <div class="available-times">
    <div class="hour-row">
      <button v-for="time in availableTimes" :key="time.time" class="hour-button" 
        :class="{ 'selected': selectedTime === time.time, 'blocked': time.blocked }"  
        @click.prevent="selectDateTime(time.time)">
    {{ time.time }}
</button>
    </div>
  </div>
</div>
</div>

<div class="tab" v-show="currentTab === 3">
    <h2 class="popup-title">Resumo da reserva</h2>
    <div class="service-info" style="color:black;">
        <p>Serviço selecionado: {{ selectedService ? selectedService.Nome : 'Nenhum serviço selecionado' }}</p>
        <p>Barbeiro selecionado: {{ selectedBarber ? selectedBarber.Nome : 'Nenhum barbeiro selecionado' }}</p>
        <p>Data e hora selecionadas:<br> {{ selectedDay ? selectedDay + '/' + selectedMonth + '/' + selectedYear + ' ' + this.selectedTime : 'Nenhuma data e hora selecionadas' }}</p>
    </div>
    <button class="next-button" @click.prevent="submitBooking">Enviar Reserva</button>
</div>



<div class="button-container">
  <button type="button" id="prevBtn" @click="prevStep">Previous</button>
  <button class="next-button" @click.prevent="nextStep(1)">Próximo -></button>
</div>


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
marcacoes: [],
servicos: [],
barbeiros: [],
currentPage: 1,
currentMonth: new Date().getMonth() + 1,
currentYear: new Date().getFullYear(),
months: [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
],
daysInMonth: [],
selectedTime: "",
totalPages: 0,
nextMonthYear: null,
selectedDay: null,
availableTimes: [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", 
  "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", 
  "17:30", "18:00", "18:30", "19:00" ],
selectedService: null,
selectedBarber: null,
selectedDateTime: null,


};
},
computed: {
monthYear() {
return `${this.months[this.currentMonth - 1]} ${this.currentYear}`;
},
},
methods: {
async fetchMarcacoes() {
try {
  const response = await fetch('http://localhost:5000/painel/marcacoes');
  this.marcacoes = await response.json();
} catch (error) {
  console.error('Erro ao buscar as marcações:', error);
}
},
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
  this.barbeiros = data;
} catch (error) {
  console.error('Erro ao buscar os dados dos barbeiros:', error);
}
},
nextMonth() {
if (this.currentMonth === 12) {
  this.currentMonth = 1;
  this.currentYear++;
} else {
  this.currentMonth++;
}
this.updateDaysInMonth();
},
prevMonth() {
if (this.currentMonth === 1) {
  this.currentMonth = 12;
  this.currentYear--;
} else {
  this.currentMonth--;
}
this.updateDaysInMonth();
},
updateDaysInMonth() {
  const daysInMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();
  const startDay = (this.currentPage - 1) * 7 + 1;
  const endDay = Math.min(this.currentPage * 7, daysInMonth);
  const days = [];

  // Adiciona dias do mês anterior, se necessário
  const prevMonthDays = new Date(this.currentYear, this.currentMonth - 1, 0).getDate();
  const prevMonth = this.currentMonth === 1 ? 12 : this.currentMonth - 1; // Verifica se o mês atual é janeiro
  for (let i = startDay; i <= Math.min(endDay, prevMonthDays); i++) {
    days.push({ day: i, month: prevMonth });
  }

  // Adiciona dias do mês atual
  for (let i = Math.max(startDay, prevMonthDays + 1); i <= endDay; i++) {
    days.push({ day: i, month: this.currentMonth });
  }

  // Adiciona dias do próximo mês, se necessário
  const nextMonthDays = 7 - days.length % 7;
  if (nextMonthDays < 7) {
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push({ day: i, month: this.currentMonth});
    }
    // Define o próximo mês e ano
    this.nextMonthYear = this.currentYear + (this.currentMonth === 12 ? 1 : 0);
    this.nextMonth = this.currentMonth === 12 ? 1 : this.currentMonth + 1;
  } else {
    // Se não houver dias do próximo mês, limpa os valores
    this.nextMonthYear = null;
    this.nextMonth = null;
  }

  this.daysInMonth = days;
  this.totalPages = Math.ceil(daysInMonth / 7);

},




async selectDay(day) {
  this.availableTimes = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", 
  "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", 
  "17:30", "18:00", "18:30", "19:00" ];
  this.selectedDay = day.day;
  this.selectedMonth = day.month+1;
  this.selectedYear = this.currentYear;  

  try {
    const response = await fetch(`http://localhost:5000/painel/marcacoes?data=${this.currentYear}-${day.month+1}-${day.day}`);
    const data = await response.json();
    // Extrai os horários das marcações e formata-os para corresponder ao formato dos botões de horas
    const blockedTimes = data.map(marcacao => {
      const hora = new Date(marcacao.Data).getHours();
      const minutos = new Date(marcacao.Data).getMinutes();
      return `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
    });
    // Desabilita os botões de horas correspondentes aos horários das marcações
    this.availableTimes = this.availableTimes.map(time => {
      return {
        time: time,
        blocked: blockedTimes.includes(time)
      };
    });
  } catch (error) {
    console.error('Erro ao buscar as marcações:', error);
  }
},


nextPage() {
if (this.currentPage < this.totalPages) {
  this.currentPage++;
} else {
  this.currentPage = 1;
  if (this.currentMonth === 12) {
    this.currentMonth = 1;
    this.currentYear++;
  } else {
    this.currentMonth++;
  }
}
this.updateDaysInMonth();
},

prevPage() {
if (this.currentPage > 1) {
  this.currentPage--;
  this.updateDaysInMonth();
} else {
  if (this.currentMonth === 1) {
    this.currentMonth = 12;
    this.currentYear--;
  } else {
    this.currentMonth--;
  }
  // Atualiza a página inicial para exibir os dias do mês anterior
  const daysInMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();
  this.currentPage = Math.ceil(daysInMonth / 7);
  this.updateDaysInMonth();
}
},
openPopup() {
this.showPopup = true;
document.body.classList.add('no-scroll');
},
closePopup() {
this.showPopup = false;
document.body.classList.remove('no-scroll');
this.currentTab = 0;
},
nextStep() {
if (this.currentTab < 4) {
  this.currentTab++;
}
},
prevStep() {
if (this.currentTab > 0) {
  this.currentTab--;
}
},



selectService(service) {
    this.selectedService = service;
  },

  selectBarber(barber) {
    this.selectedBarber = barber;
  },

  selectDateTime(time) {
    this.selectedTime = time;
    // Verifica se um dia foi selecionado anteriormente
    if (this.selectedDay !== null && this.selectedMonth !== null && this.selectedYear !== null) {
        // Concatena a hora selecionada ao dia, mês e ano selecionados
        const selectedDateTime = `${this.selectedYear}-${this.selectedMonth}-${this.selectedDay} ${time}`;
        // Define o valor completo da data e hora selecionadas
        this.selectedDateTime = selectedDateTime;
    } else {
        // Se nenhum dia foi selecionado, exibe uma mensagem de erro
        console.error('Por favor, selecione um dia antes de selecionar a hora.');
    }
},

  async submitBooking() {
    // Verifica se todas as seleções foram feitas
    if (this.selectedService && this.selectedBarber && this.selectedDateTime) {
      try {
        // Constrói o objeto de dados a ser enviado
        const dataToSend = {
          service: this.selectedService,
          barber: this.selectedBarber,
          dateTime: this.selectedDateTime,
          utilizador: localStorage.getItem('userId')
        };

        // Envia os dados para o servidor usando o método PUT
        const response = await fetch('http://localhost:5000/painel/marcacoes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });

        // Verifica se a requisição foi bem-sucedida
        if (response.ok) {
          // Limpa as seleções do usuário
          this.selectedService = null;
          this.selectedBarber = null;
          this.selectedDateTime = null;

          // Exibe uma mensagem de sucesso para o usuário
          alert('Sua reserva foi enviada com sucesso!');
        } else {
          // Exibe uma mensagem de erro se a requisição falhar
          alert('Houve um erro ao enviar sua reserva. Por favor, tente novamente mais tarde.');
        }
      } catch (error) {
        console.error('Erro ao enviar reserva:', error);
        // Exibe uma mensagem de erro se ocorrer um erro inesperado
        alert('Houve um erro ao enviar sua reserva. Por favor, tente novamente mais tarde.');
      }
    } else {
      // Se alguma seleção estiver faltando, exibe uma mensagem para o usuário
      alert('Por favor, selecione um serviço, um barbeiro e um horário antes de enviar sua reserva.');
    }
  },



















},
mounted() {
this.fetchMarcacoes();
this.fetchServicos();
this.fetchBarbeiros();
this.updateDaysInMonth();

}
};

</script>


<style>
.pagination-wrapper {
display: flex;
align-items: center;
width: 18vw;
}

.pagination-button {
border: 2px solid transparent;
border-radius: 50%;
background-color: transparent;
width: 30px;
height: 30px;
display: flex;
justify-content: center;
align-items: center;
font-size: 16px;
cursor: pointer;
transition: all 0.3s ease;
outline: none;
}

.pagination-button:hover {
background-color: #f0f0f0;
border-color: #ccc;
}

.day-pagination {
display: flex;
flex-wrap: wrap;
gap: 10px;
}

.day-pagination button {
border: 2px solid transparent;
border-radius: 50%;
background-color: transparent;
width: 30px;
height: 30px;
display: flex;
justify-content: center;
align-items: center;
font-size: 16px;
cursor: pointer;
transition: all 0.3s ease;
outline: none;
border-color: #ccc;
}

.day-pagination button:hover {
background-color: #F2B709;
border-color: #ccc;
}


.hour-row {
display: flex;
flex-wrap: wrap;
justify-content: space-between;
gap: 20px; /* Espaço entre as horas */
}

.time-slot {
width: calc(25% - 10px); /* Calcula a largura para quatro horas por linha com espaço entre elas */
text-align: center;
}

.button-container {
position: fixed;
bottom: 20px; /* distância do fundo */
right: 18vw; /* distância da direita */
}

.hour-row {
display: flex;
flex-wrap: wrap;
justify-content: space-between;
gap: 10px; /* Espaço entre as horas */
margin-top:35%;
}

.hour-button {
width: calc(25% - 10px); /* Calcula a largura para quatro horas por linha com espaço entre elas */
text-align: center;
padding: 10px;
border: 1px solid #ccc; /* Borda sólida */
border-radius: 10px; /* Borda arredondada */
background-color: #f0f0f0; /* Cor de fundo */
cursor: pointer; /* Cursor do mouse */
}

.hour-button:hover {
background-color: #F4B604; /* Cor de fundo ao passar o mouse */
}

.date-container {
display: flex;
justify-content: space-between;
}

.blocked{
cursor: not-allowed; 
pointer-events: none; 
background-color: #e0e0e0;

}

.selected {
    background-color: #F2B709!important;
}

</style>
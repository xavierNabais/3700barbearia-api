<template>



  <div class="popup-section section-left" style="padding:20px">
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

    <div class="service-selection">
          <h2 v-if="currentTab == 0" class="popup-title" style="color:black;">Selecione o serviço</h2>
          <h2 v-if="currentTab == 1" class="popup-title" style="color:black;">Selecione o barbeiro</h2>
          <h2 v-if="currentTab == 2" class="popup-title" style="color:black;">Selecione o horário</h2>
          <h2 v-if="currentTab == 3" class="popup-title" style="color:black;">Concluir Marcação</h2>
          <h2 v-if="currentTab == 4" class="popup-title" style="color:black;">Autenticação</h2>


          <div class="button-scroll-container" v-if="currentTab == 0">
            <button class="highlight-button" :class="{ filterActive: categoriaAtiva === 'Em destaque' }" @click="filterServicosPorCategoria('Em destaque')">Em destaque</button>
            <button class="highlight-button" :class="{ filterActive: categoriaAtiva === 'Adicionais' }" @click="filterServicosPorCategoria('Adicionais')">Adicionais</button>
            <button class="highlight-button" :class="{ filterActive: categoriaAtiva === 'Trabalhos técnicos' }" @click="filterServicosPorCategoria('Trabalhos técnicos')">Trabalhos técnicos</button>
            <button class="highlight-button" :class="{ filterActive: categoriaAtiva === 'Combo' }" @click="filterServicosPorCategoria('Combo')">Combo</button>
          </div>
    </div>



    <div class="padding-container">
    <form>


    <div class="tab" v-show="currentTab === 0">

      <div class="service-info">

        <div v-for="dados in servicos" :key="dados.id" @click="selectService(dados)" :class="{ 'selected': selectedService === dados }">
            <a href="#">
            <div class="btn">
                {{ dados.Nome }} <span style="float: right;font-size: 12px;text-align:center">A partir de:<br> <span>{{ dados.Preco }}€</span></span>
            </div>
            </a>
        </div>
        
        </div>
    </div>


        <div class="tab" v-show="currentTab === 1">

        <h2 class="popup-title">Selecione o profissional</h2>
            <div class="service-info">

              <div v-for="dados in barbeiros" :key="dados.id" @click="selectBarber(dados)" :class="{ 'selected': selectedBarber === dados }">
                <a href="#">
                    <div class="btn" style="display: flex; align-items: center;">
                        <img src="../assets/images/about_logo.jpg" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 10px;" />
                        <span style="font-size: 18px;">{{ dados.Nome }}</span>
                        <span style="font-size: 12px;flex:2;text-align:right">Especialização: <span>{{ dados.Especializacao }}</span></span>
                    </div>
                </a>
            </div>


            </div>
        </div>


        <div class="tab" v-show="currentTab === 2">
  <h2 class="popup-title" style="color:black;">Selecione dia e a hora</h2>
  <div class="loading-container" v-if="loadingGif">
    <Loading />
  </div>
  <div class="service-info">
    <div class="date-container">
      <!-- Exibe o mês e o ano -->
      <p style="color:black; border-bottom:1px solid #F2B709;">{{ monthYear }}</p>
      <p style="color:black; margin-left: auto;border-bottom:1px solid #F2B709;">{{ nextMonthYear ? `${months[nextMonth - 1]} ${nextMonthYear}` : '' }}</p>
    </div>
    <div class="pagination-wrapper">
      <!-- Botões de navegação do calendário -->
      <button class="pagination-button prevB" @click.prevent="prevPage">&lt;</button>
      <div class="day-pagination">
        <div class="day-buttons">
          <button v-for="day in daysInMonth" :key="day.day" @click.prevent="selectDay(day)"
            :class="{ 'dayActive': selectedDay === day.day }">
            {{ day.day }}
          </button>
        </div>
        <div class="day-of-week">
          <span v-for="(day, index) in daysInMonth" :key="index" class="day-of-week-item">{{ getDayOfWeek(day.month, day.day) }}</span>
        </div>
      </div>



      <button class="pagination-button nextB" @click.prevent="nextPage">&gt;</button>
    </div>
    <!-- Exibe as horas disponíveis para o dia selecionado -->
    <div class="available-times">
      <div class="hour-row">
        <button v-for="time in availableTimes" :key="time.time" class="hour-button btn" 
          :class="{ 'selected': selectedTime === time.time, 'blocked': time.blocked }"  
          @click.prevent="selectDateTime(time.time)">
         {{ time.time }}
  </button>
      </div>
    </div>
  </div>
  </div>

  <div class="tab" v-show="currentTab === 3" style="padding:10px">
      <h2 class="popup-title" style="color:black;">BARBEARIA 3700</h2>
      <div class="service-info concluir">
          <img src="../assets/images/about_logo.jpg" style="width:60%;">
          <p style="color:Black;">5.0 ★ ★ ★ ★ ★ (17)</p>
          <p style="color:Black;">R. Gago Coutinho 9 R/C, 3700-261 São João da Madeira</p>
          <br>
          <p style="color:Black;">FORMA DE PAGAMENTO</p>
          <button class="pay">PAGAR NO ESTABELECIMENTO</button>
          <br>
          <p style="color:Black;">Observações sobre a marcação</p>
            <textarea style="width:20vw;height:5vh"></textarea>

      </div>
        <button class="submitAgenda" @click.prevent="submitBooking">ENVIAR RESERVA</button>
  </div>

  <div class="tab" v-show="currentTab === 4" style="padding:10px;color:black;">


    <h2 class="popup-title" style="color:black;font-size:16px;  ">Entre ou registe-se</h2>
    <p style="font-size:14px">Entre ou cadastre-se para concluir a sua reserva</p>

<div v-show="!showRegistrationForm">    
    <!-- Botões de login social -->
    <button class="social-login">
      <i class="fab fa-facebook" style="color:#1D1D1D;font-size:24px;float:left;"></i> <span style="vertical-align: sub;font-size:16px">Continuar com Facebook</span>
    </button>
    <button class="social-login">
      <i class="fab fa-google" style="color:#1D1D1D;font-size:24px;float:left;"></i><span style="vertical-align: sub;font-size:16px">Continuar com Google</span>
    </button>

    <div class="horizontal-line-container">
    <hr>
</div>
OU
<div class="horizontal-line-container">
    <hr>
</div>


    <!-- Formulário de login -->
    <form @submit.prevent="login()">
      <input type="email" placeholder="Nome de utilizador ou email" v-model="email" id="email" style="border: 1px solid black;width:100%;padding: 0px 10px">
      <br>
      <input type="password" placeholder="Password" v-model="password" id="password" style="border: 1px solid black;width:100%;padding: 0px 10px">
      <br>
      <button type="submit" class="submitAgenda" style="width:100%;">CONTINUAR</button>
      <p style="text-align:center">Não tem conta? <a href="#" style="color: #F4B604;" @click="showRegistrationForm = true">Registe-se</a></p>
    </form>

</div>

<div v-show="showRegistrationForm">
  <form @submit.prevent="registo()">
      <input type="email" placeholder="Email" v-model="r_email" id="email" style="border: 1px solid black;width:100%;padding: 0px 10px">
      <br>
      <input type="password" placeholder="Password" v-model="r_password" id="password" style="border: 1px solid black;width:100%;padding: 0px 10px">
      <br>
      <button type="submit" class="submitAgenda" style="width:100%;">REGISTAR</button>
      <p style="text-align:center">Já tem uma conta? <a href="#" style="color: #F4B604;" @click="showRegistrationForm = false">Faça login</a></p>
    </form>
</div>


  </div>

    </form>
  </div>
  <div class="button-container" style="margin-top:auto">
    <button class="button left " @click="prevStep">- Anterior</button>
    <button class="button right " @click.prevent="nextStep(1)" :disabled="disabledNext">Próximo -></button>
  </div>
  </div>

  <div class="popup-section section-right" style="padding:20px">
  <div class="vertical-rectangle"></div>
  <h2 class="popup-title third">
    RESUMO
  </h2>
  <div class="summary-info" v-if="summary.selectedService">



        <h2 style="font-size:16px; color:#F2B709">
          SERVIÇO
          <a href="#" @click="gotoStep(0)">
            <i class="fas fa-redo" style="margin: 0px 5px;color:grey;font-size: 10px"></i>
          </a>
        </h2>
      {{ summary.selectedService }}




   </div>
   <div class="summary-info" v-if="summary.selectedBarber">
    <h2 style="font-size:16px; color:#F2B709">
          BARBEIRO
          <a href="#" @click="gotoStep(1)">
            <i class="fas fa-redo" style="margin: 0px 5px;color:grey;font-size: 10px"></i>
          </a>
    </h2>

    {{ summary.selectedBarber }}
   </div>
   <div class="summary-info" v-if="summary.selectedDateTime">
    <h2 style="font-size:16px; color:#F2B709">
          DATA
          <a href="#" @click="gotoStep(2)">
            <i class="fas fa-redo" style="margin: 0px 5px;color:grey;font-size: 10px"></i>
          </a>
    </h2>
    {{ summary.selectedDateTime }}
   </div>
  </div>
</template>






<script>
import Loading from '../components/loading.vue';

export default {
name: 'PopupModal',
components: {
    Loading,
  },
data() {
return {
disabledNext: false,
email: '',
password: '',
r_email: '',
r_password: '',
showRegistrationForm: false,
loadingGif: false, // Variável para controlar a exibição do GIF
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
summary: {
        selectedService: '',
        selectedBarber: '',
        selectedDateTime: ''
      },
categoriaAtiva: ''


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
getDayOfWeek(month, day) {
  const date = new Date(this.currentYear, month, day);
  const dayOfWeek = date.toLocaleDateString('pt-PT', { weekday: 'short' }).slice(0, 3); // Abreviar para três letras
  return dayOfWeek;
},

filterServicosPorCategoria(categoria) {
  // Restaura a lista completa de serviços
  this.servicos = [];
  // Busca novamente todos os serviços
  this.fetchServicos().then(() => {
    // Aplica o filtro com base na categoria selecionada
    this.servicos = this.servicos.filter(servico => servico.Categoria === categoria);
    this.categoriaAtiva = categoria; // Atualiza a categoria ativa
  });
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

async login() {
  try {
    const dataToSend = {
          email: this.email,
          password: this.password,

        };
    const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('userId', data.userId); // Use sessionStorage se preferir que os dados sejam perdidos quando o navegador for fechado
      localStorage.setItem('userName', data.userName);
      localStorage.setItem('type', data.type);
      this.currentTab = 3;
    } else {
      console.error('Erro ao buscar os dados dos barbeiros:', response.status);
    }
  } catch (error) {
    console.error('Erro ao buscar os dados dos barbeiros:', error);
  }
},
async registo() {
            try {
              const response = await fetch('http://localhost:5000/registo', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  email: this.r_email,
                  password: this.r_password
                })
              });
              const data = await response.json();
              
              // Verifique se o login foi bem-sucedido
              if (response.ok) {
                localStorage.setItem('userId', data[0].Id); // Use sessionStorage se preferir que os dados sejam perdidos quando o navegador for fechado
                localStorage.setItem('type', 0);
                this.currentTab = 3;
              } else {
                this.registo_error = true;
                console.log(data); // Se o login não foi bem-sucedido, imprima os dados do erro no console
              }
            } catch (error) {
              console.error('Erro ao efetuar login:', error);
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
  if (!this.currentMonth || !this.currentYear) {
    this.currentMonth = new Date().getMonth() + 1;
    this.currentYear = new Date().getFullYear();
  }
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

  // Chama a função selectDay com o dia atual
  const today = new Date();
  const currentDay = today.getDate();
  this.selectDay({ day: currentDay, month: this.currentMonth-1, year: this.currentYear });
},





async selectDay(day) {
  this.selectedTime = "",
  this.loadingGif = true;
  await new Promise(resolve => setTimeout(resolve, 500));
  this.loadingGif = false;
  this.availableTimes = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", 
  "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", 
  "17:30", "18:00", "18:30", "19:00" ];
  this.selectedDay = day.day;
  this.selectedMonth = day.month+1;
  this.selectedYear = this.currentYear; 
  try {
    const response = await fetch(`http://localhost:5000/painel/marcacoes?data=${this.currentYear}-${day.month+1}-${day.day}&barbeiro=${this.barbeiro}`);
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
gotoStep(step) {
  this.currentTab = step;
},
openPopup() {
this.showPopup = true;
document.documentElement.classList.add('no-scroll');
},
closePopup() {
this.showPopup = false;
document.html.classList.remove('no-scroll');
this.currentTab = 0;
},
nextStep() {
  if (this.currentTab < 4) {
    // Incrementa o currentTab
    this.currentTab++;

    // Verifica se está no terceiro passo
    if (this.currentTab === 3) {
      // Verifica se há um userId no localStorage
      if (localStorage.getItem('userId')) {
        // Se houver userId, permanece no popup 3 e desativa o botão "Próximo"
        this.disabledNext = true;
      } else {
        // Se não houver userId, avança para o popup 4 e habilita o botão "Próximo"
        this.currentTab = 4;
        this.disabledNext = false;
      }
    } else {
      // Em outros passos que não sejam o terceiro, o botão "Próximo" deve estar habilitado
      this.disabledNext = false;
    }
  }

  // Verifica se está na última aba e se há um userId
  if (this.currentTab === 4 && localStorage.getItem('userId')) {
    // Se estiver na última aba e houver um userId, ajusta o currentTab para evitar voltar para a página de login
    this.currentTab = 3;
    // Desabilita o botão "Próximo" para evitar que o usuário avance além da última aba
    this.disabledNext = true;
  }
},
prevStep() {
  this.disabledNext = false;
  if (this.currentTab > 0) {
    if (this.currentTab === 3) {
      // Se estiver no popup 3 e voltar para trás, volta para o popup 2
      this.currentTab = 2;
    } else if (this.currentTab === 4) {
      // Se estiver no popup 4 e voltar para trás, volta para o popup 2
      this.currentTab = 2;
    } else {
      // Em outros casos, apenas decrementa o currentTab
      this.currentTab--;
    }
  }
},



selectService(service) {
    this.selectedService = service;
    this.summary.selectedService = service.Nome;
  },

  selectBarber(barber) {
    this.barbeiro = barber.Id;
    this.selectedBarber = barber;
    this.summary.selectedBarber = barber.Nome;
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
    this.summary.selectedDateTime = this.selectedDay+'/'+this.selectedMonth+'/'+this.selectedYear+'-'+time;

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
          alert('A sua reserva foi enviada com sucesso!');
        } else {
          // Exibe uma mensagem de erro se a requisição falhar
          alert('Houve um erro ao enviar a sua reserva. Por favor, tente novamente mais tarde.');
        }
      } catch (error) {
        console.error('Erro ao enviar reserva:', error);
        // Exibe uma mensagem de erro se ocorrer um erro inesperado
        alert('Houve um erro ao enviar a sua reserva. Por favor, tente novamente mais tarde.');
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

  const today = new Date();
  const currentDay = today.getDate();

  // Definir o dia atual como selecionado
  this.selectedDay = currentDay;

  // Calcular a página que contém o dia atual
  const dayPosition = currentDay % 7 === 0 ? 7 : currentDay % 7; // Posição do dia na semana
  this.currentPage = Math.ceil((currentDay + (7 - dayPosition)) / 7);

  // Atualizar os dias do mês para a página que contém o dia atual
  this.updateDaysInMonth();
}

};

</script>


<style>
.pagination-wrapper {
display: flex;
justify-content: center;
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



.day-pagination {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.day-buttons {
  display: flex;
  gap: 20px;
}

.day-buttons button {
  border: 1px solid rgba(255, 255, 255, 0.418);
  border-radius: 50%;
  background-color: transparent;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  border-color: #ccc;
}

.day-buttons button:hover {
  background-color: #FCD666;
  border-color: #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}

.day-of-week {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  width: 100%;
  gap:20px;
}

.day-of-week span {
  font-size: 14px;
  color: #555;
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



.hour-row {
display: flex;
flex-wrap: wrap;
justify-content: space-between;
gap: 10px; /* Espaço entre as horas */
margin-top:10%;
}

.hour-button {
width: calc(25% - 10px); /* Calcula a largura para quatro horas por linha com espaço entre elas */
text-align: center;
padding: 10px;
border: 1px solid #ccc; /* Borda sólida */
border-radius: 10px; /* Borda arredondada */
cursor: pointer; /* Cursor do mouse */
}



.date-container {
display: flex;
justify-content: space-between;
margin-top:10%;
}

.blocked{
cursor: not-allowed; 
pointer-events: none; 
background-color: #2626264d;
    color: #747272;

}
.selected {
    background-color: #ffc506!important;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    border-radius:10px;
}

.button-container {
  position: sticky;
  bottom: 0;
  width: 100%;
  background-color: #ffffff; /* Cor de fundo dos botões */
  padding: 10px 0; /* Espaçamento interno */
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.1); /* Sombra para separar dos elementos abaixo */
  z-index: 2; /* Garante que os botões fiquem na parte superior */
  text-align:center;
  gap:10%;
}

.button {
  color: #000000; /* Cor do texto */
  padding: 10px 20px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Adicionando a transição para a propriedade transform */
  border: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* Sombra para separar dos elementos abaixo */
  background-color:white;
  border:1px solid #FCD666;
  margin: 0 50px; /* Margem horizontal de 10 pixels */
}

.button:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  background-color: #FCD666;
}


.pay{
  background-color:white;
  border:1px solid black;
  border-radius:10px;
  padding:20px 100px;
  cursor: none;
  pointer-events: none;
}

.submitAgenda{
  cursor:pointer;
  background-color: #FCD666;
  border:none;
  border-radius:10px;
  padding:10px 150px;
  margin-top:5%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); 
  font-weight: bold;
}
.submitAgenda:hover{
  transform: translatey(-5px);
  transition:0.2s;
}

.prevB:hover {
transform: translateX(-5px); /* Move o botão 5 pixels para cima */
}
.nextB:hover {
transform: translateX(5px); /* Move o botão 5 pixels para cima */
}
.left:hover {
transform: translateX(-5px); /* Move o botão 5 pixels para cima */
}
.right:hover {
transform: translateX(5px); /* Move o botão 5 pixels para cima */
}
.dayActive{
  transform: translateY(-5px); /* Move o botão 5 pixels para cima */
  background-color:#F2B709!important;
}




.concluir p{
  font-size:14px;
}





.loading-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999; /* Garante que o GIF de carregamento esteja acima de outros elementos */
}

.loading-container img {
  width: 50px; /* Ajuste o tamanho conforme necessário */
  height: 50px; /* Ajuste o tamanho conforme necessário */
}


.social-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.social-login, .input-container, .button-container {
  width: 100%;
  margin-bottom: 10px;
  font-family: "Inter", sans-serif; /* Altere para o font-family desejado */
}

.social-login {
  padding: 10px;
  border: 1px solid #000000;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  background-color:white;
  color:black;
}

.social-login img {
  width: 20px;
  margin-right: 10px;
  vertical-align: middle;
}
.horizontal-line-container {
    display: inline-block;
    margin: 0 10px; /* Ajuste a margem conforme necessário */
    width: 10vw;
}

</style>
<template>



  <div class="popup-section section-left desktop" style="padding:20px">
  <div class="progress-indicator">
      <div class="progress-ball filled step"></div>
      <div class="progress-ball step"></div>
      <div class="progress-ball step"></div>
      <div class="progress-ball step"></div>
  </div>

  <div class="section-content">
      <h2 class="popup-title-left">SERVIÇO</h2>
      <p class="popup-description">Nesta seção, os clientes podem escolher o serviço específico que desejam agendar na barbearia.</p>
  </div>
  </div>





  <div class="popup-section section-middle mobile" >

<div class="service-selection">
      <h2 v-if="currentTab == 0" class="popup-title" style="color:black;padding:20px">Selecione o serviço</h2>
      <h2 v-if="currentTab == 1" class="popup-title" style="color:black;padding:20px">Selecione o barbeiro</h2>
      <h2 v-if="currentTab == 2" class="popup-title" style="color:black;padding:20px">Selecione o horário</h2>
      <h2 v-if="currentTab == 3" class="popup-title" style="color:black;padding:20px">Concluir Marcação</h2>
      <h2 v-if="currentTab == 4" class="popup-title" style="color:black;padding:20px">Autenticação</h2>
      <h2 v-if="showSuccess" class="popup-title" style="color:black;padding:20px">MARCAÇÃO CONCLUÍDA</h2>


      <div class="button-scroll-container" style="text-align:left;padding:0% 2%" v-if="currentTab == 0">
        <button style="margin: 2% 1%" class="highlight-button" :class="{ filterActive: categoriaAtiva === 'Em destaque' }" @click="filterServicosPorCategoria('Em destaque')">Em destaque</button>
        <button style="margin: 2% 1%" class="highlight-button" :class="{ filterActive: categoriaAtiva === 'Adicionais' }" @click="filterServicosPorCategoria('Adicionais')">Adicionais</button>
        <button style="margin: 2% 1%" class="highlight-button" :class="{ filterActive: categoriaAtiva === 'Trabalhos técnicos' }" @click="filterServicosPorCategoria('Trabalhos técnicos')">Trabalhos técnicos</button>
        <button style="margin: 2% 1%" class="highlight-button" :class="{ filterActive: categoriaAtiva === 'Combo' }" @click="filterServicosPorCategoria('Combo')">Combo</button>
      </div>
</div>



<div class="padding-container">
<form>


<div class="tab" v-show="currentTab === 0">

  <div class="service-info" style="text-align:left">

    <div v-for="dados in servicos" :key="dados.id" @click="selectService(dados)" :class="{ 'selected': selectedService === dados }">
        <a href="#">
        <div class="btn" style="font-size:14px">
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
<div class="service-info" style="overflow-x:hidden">
<div class="date-container">
  <p style="color:black; border-bottom:1px solid #F2B709;">{{ monthYear }}</p>
  <p style="color:black; margin-left: auto;border-bottom:1px solid #F2B709;">{{ nextMonthYear ? `${months[nextMonth - 1]} ${nextMonthYear}` : '' }}</p>
</div>
<div class="pagination-wrapper">
  <button class="pagination-button prevB" @click.prevent="prevPage">&lt;</button>
  <div class="day-pagination">
    <div class="day-buttons" style="gap:5px">
      <button v-for="day in daysInMonth" :key="day.day" @click.prevent="selectDay(day)"
        :class="{ 'dayActive': selectedDay === day.day }">
        {{ day.day }}
      </button>
    </div>
    <div class="day-of-week" style="gap:5px">
      <span v-for="(day, index) in daysInMonth" :key="index" class="day-of-week-item">{{ getDayOfWeek(day.month, day.day) }}</span>
    </div>
  </div>



  <button class="pagination-button nextB" @click.prevent="nextPage">&gt;</button>
</div>

<div class="available-times">
  <div v-if="dayUnavailable">
    <p style="color:black;margin-top:20%;text-align:center">Dia indisponível</p>
  </div>
  <div v-else class="hour-row">
    <button v-for="time in availableTimes" :key="time.time" class="hour-button btn" 
      :class="{ 'selected': selectedTime === time.time, 'blocked': time.blocked }"  
      @click.prevent="selectDateTime(time.time)">
     {{ time.time }}
    </button>
  </div>
</div>
</div>
</div>

<div class="tab" v-show="currentTab === 3">
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
        <textarea style="width:65vw;height:5vh" v-model="selectedNotas"></textarea>
  </div>
  <button class="submitAgenda" @click.prevent="submitBooking">ENVIAR RESERVA</button>
  <p v-if="updateStatus"><b>Ocorreu um erro ao enviar a marcação.</b></p>
  <p v-if="updateStatus">{{ this.updateError }}</p>
</div>

<div class="tab" v-show="currentTab === 4" style="padding:10px;color:black;">


<h2 class="popup-title" style="color:black;font-size:16px;  ">Entre ou registe-se</h2>
<p style="font-size:14px">Entre ou cadastre-se para concluir a sua reserva</p>

<div v-show="!showRegistrationForm">    
<GoogleLogin :callback="googleCallback" prompt/>

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


<div class="tab" v-show="showSuccess" style="text-align:center;color:black">
  <h2 class="popup-title">MARCAÇÃO CONCLUÍDA</h2>
  <div class="service-info">
    <div class="circle">
      <i class="fas fa-check-circle"></i>
    </div>
    <p style="font-weight: bold;">Sucesso!</p>
    <p>Obrigado pela sua marcação.</p>
    <p>Iremos enviar um email de confirmação a confirmar a sua reserva.</p>
    <button class="btn-close" onclick="window.location.href = '/'">FECHAR</button>
  </div>
</div>





</div>
<div class="button-container" style="margin-top:auto" >
<button class="button left " style="margin: 0px 5%" @click="prevStep">« Anterior</button>
<button class="button right " @click.prevent="nextStep(1)" :disabled="disabledNext" style="margin: 0px 5%">Próximo »</button>
</div>
</div>








  <div class="popup-section section-middle desktop">

    <div class="service-selection">
          <h2 v-if="currentTab == 0" class="popup-title" style="color:black;">Selecione o serviço</h2>
          <h2 v-if="currentTab == 1" class="popup-title" style="color:black;">Selecione o barbeiro</h2>
          <h2 v-if="currentTab == 2" class="popup-title" style="color:black;">Selecione o horário</h2>
          <h2 v-if="currentTab == 3" class="popup-title" style="color:black;">Concluir Marcação</h2>
          <h2 v-if="currentTab == 4" class="popup-title" style="color:black;">Autenticação</h2>
          <h2 v-if="showSuccess" class="popup-title" style="color:black;">MARCAÇÃO CONCLUÍDA</h2>


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
      <p style="color:black; border-bottom:1px solid #F2B709;">{{ monthYear }}</p>
      <p style="color:black; margin-left: auto;border-bottom:1px solid #F2B709;">{{ nextMonthYear ? `${months[nextMonth - 1]} ${nextMonthYear}` : '' }}</p>
    </div>
    <div class="pagination-wrapper">
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

    <div class="available-times">
      <div v-if="dayUnavailable">
        <p style="color:black;margin-top:20%;text-align:center">Dia indisponível</p>
      </div>
      <div v-else class="hour-row">
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
            <textarea style="width:20vw;height:5vh" v-model="selectedNotas"></textarea>

      </div>
        <button class="submitAgenda" @click.prevent="submitBooking">ENVIAR RESERVA</button>
        <p v-if="updateStatus" style="color:black;text-align:center"><b>Ocorreu um erro ao enviar a marcação.</b></p>
        <p v-if="updateStatus" style="color:black;text-align:center">{{ this.updateError }}</p>
  </div>

  <div class="tab" v-show="currentTab === 4" style="padding:10px;color:black;">


    <h2 class="popup-title" style="color:black;font-size:16px;  ">Entre ou registe-se</h2>
    <p style="font-size:14px">Entre ou cadastre-se para concluir a sua reserva</p>

<div v-show="!showRegistrationForm">    
    <GoogleLogin :callback="googleCallback" prompt/>

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


    <div class="tab" v-show="showSuccess" style="text-align:center;color:black">
      <h2 class="popup-title">MARCAÇÃO CONCLUÍDA</h2>
      <div class="service-info">
        <div class="circle">
          <i class="fas fa-check-circle"></i>
        </div>
        <p style="font-weight: bold;">Sucesso!</p>
        <p>Obrigado pela sua marcação.</p>
        <p>Iremos enviar um email de confirmação a confirmar a sua reserva.</p>
        <button class="btn-close" onclick="window.location.href = '/'">FECHAR</button>
      </div>
    </div>





  </div>
  <div class="button-container" style="margin-top:auto" v-show="!showSuccess">
    <button class="button left " @click="prevStep">« Anterior</button>
    <button class="button right " @click.prevent="nextStep(1)" :disabled="disabledNext">Próximo »</button>
  </div>
  </div>

  <div class="popup-section section-right desktop" style="padding:20px">
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
import { decodeCredential } from 'vue3-google-login';
import {jwtDecode} from 'jwt-decode';

export default {
name: 'PopupModal',
components: {
    Loading,
  },
data() {
return {
updateStatus: false,
updateError: '',
dayUnavailable: false,
showSuccess: false,
disabledNext: false,
email: '',
password: '',
r_email: '',
r_password: '',
showRegistrationForm: false,
loadingGif: false, 
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
// Método assíncrono para obter as marcações
async fetchMarcacoes() {
try {
  const response = await fetch('http://localhost:5000/painel/marcacoes');
  this.marcacoes = await response.json();
} catch (error) {
  console.error('Erro ao obter as marcações:', error);
}
},
// Método assíncrono para obter os serviços
  async fetchServicos() {
  try {
    const response = await fetch('http://localhost:5000/painel/servicos');
    const data = await response.json();
    this.servicos = data;
  } catch (error) {
    console.error('Erro ao obter os dados dos serviços:', error);
  }
  },
// Método para obter o dia da semana
getDayOfWeek(month, day) {
  const date = new Date(this.currentYear, month, day);
  const dayOfWeek = date.toLocaleDateString('pt-PT', { weekday: 'short' }).slice(0, 3); 
  return dayOfWeek;
},
// Método para filtrar os serviços por categoria
filterServicosPorCategoria(categoria) {
  this.servicos = [];
  this.fetchServicos().then(() => {
    this.servicos = this.servicos.filter(servico => servico.Categoria === categoria);
    this.categoriaAtiva = categoria; 
  });
},
// Método assíncrono para obter os barbeiros
async fetchBarbeiros() {
try {
  const response = await fetch('http://localhost:5000/painel/barbeiros');
  const data = await response.json();
  this.barbeiros = data;
} catch (error) {
  console.error('Erro ao obter os dados dos barbeiros:', error);
}
},
// Método para callback do Google Login
async googleCallback(response) {
            const accessData = decodeCredential(response.credential);


              try {
              const response = await fetch('http://localhost:5000/login/google', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  accessData
                })
              });              
              if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                this.currentTab = 3;
              } else {
                console.error('Erro ao efetuar login:', response.status);
              }
            } catch (error) {
              console.error('Erro ao efetuar login:', error);
            }
},
// Método assíncrono para fazer login
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
      localStorage.setItem('userId', data.userId); 
      localStorage.setItem('userName', data.userName);
      localStorage.setItem('type', data.type);
      this.currentTab = 3;
    } else {
      console.error('Erro ao obter os dados do utilizador:', response.status);
    }
  } catch (error) {
    console.error('Erro ao obter os dados do utilizador:', error);
  }
},
// Método assíncrono para o registo
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
              
              if (response.ok) {
                localStorage.setItem('userId', data[0].Id); 
                localStorage.setItem('type', 0);
                this.currentTab = 3;
              } else {
                this.registo_error = true;
                console.log(data); 
              }
            } catch (error) {
              console.error('Erro ao efetuar registo:', error);
            }
},
// Método para avançar para o próximo mês
nextMonth() {
if (this.currentMonth === 12) {
  this.currentMonth = 1;
  this.currentYear++;
} else {
  this.currentMonth++;
}
this.updateDaysInMonth();
},
// Método para retroceder para o mês anterior
prevMonth() {
if (this.currentMonth === 1) {
  this.currentMonth = 12;
  this.currentYear--;
} else {
  this.currentMonth--;
}
this.updateDaysInMonth();
},
// Método para atualizar os dias no mês atual
updateDaysInMonth() {
    // Verifica se o mês e o ano estão definidos; se não estiverem, utiliza o mês e o ano atuais
  if (!this.currentMonth || !this.currentYear) {
    this.currentMonth = new Date().getMonth() + 1;
    this.currentYear = new Date().getFullYear();
  }

    // Obtém o número de dias no mês atual
  const daysInMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();

    // Calcula o dia de início e fim na página atual do calendário
  const startDay = (this.currentPage - 1) * 7 + 1;
  const endDay = Math.min(this.currentPage * 7, daysInMonth);

    // Array para armazenar os dias
  const days = [];

    // Obtém o número de dias no mês anterior
  const prevMonthDays = new Date(this.currentYear, this.currentMonth - 1, 0).getDate();
  const prevMonth = this.currentMonth === 1 ? 12 : this.currentMonth - 1; 

    // Adiciona os dias do mês anterior à lista de dias
  for (let i = startDay; i <= Math.min(endDay, prevMonthDays); i++) {
    days.push({ day: i, month: prevMonth });
  }
    // Adiciona os dias do mês atual à lista de dias
  for (let i = Math.max(startDay, prevMonthDays + 1); i <= endDay; i++) {
    days.push({ day: i, month: this.currentMonth });
  }

    // Calcula o número de dias do mês seguinte para preencher a última semana
  const nextMonthDays = 7 - days.length % 7;
    // Adiciona os dias do mês seguinte à lista de dias, se necessário
  if (nextMonthDays < 7) {
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push({ day: i, month: this.currentMonth});
    }
    // Determina o ano e mês do próximo mês
    this.nextMonthYear = this.currentYear + (this.currentMonth === 12 ? 1 : 0);
    this.nextMonth = this.currentMonth === 12 ? 1 : this.currentMonth + 1;
  } else {
    this.nextMonthYear = null;
    this.nextMonth = null;
  }

    // Atualiza a lista de dias, o número total de páginas e seleciona o dia atual
  this.daysInMonth = days;
  this.totalPages = Math.ceil(daysInMonth / 7);

  const today = new Date();
  const currentDay = today.getDate();
    // Seleciona o dia atual no calendário
  this.selectDay({ day: currentDay, month: this.currentMonth-1, year: this.currentYear });
},




// Método assíncrono para lidar com a seleção do dia pelo utilizador
async selectDay(day) {
    // Obtém a data atual
  const currentDate = new Date();
    // Calcula a data selecionada pelo utilizador
  const selectedDate = new Date(this.currentYear, day.month, day.day+1);

  // Verifica se a data selecionada é anterior à data atual
  if (selectedDate < currentDate) {
    this.dayUnavailable = true; // Define que o dia está indisponível para seleção
  }
  else{
    this.dayUnavailable = false; // Define que o dia está disponível para seleção
  }

    // Define o estado inicial para a seleção do tempo e exibe o ícone de loading
  this.selectedTime = "",
  this.loadingGif = true;

    // Simulação de loading
  await new Promise(resolve => setTimeout(resolve, 500));

    // Após o loading, desativa o ícone de loading e define os horários disponíveis
  this.loadingGif = false;
  this.availableTimes = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", 
  "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", 
  "17:30", "18:00", "18:30", "19:00" ];

    // Guarda o dia, mês e ano selecionados
  this.selectedDay = day.day;
  this.selectedMonth = day.month+1;
  this.selectedYear = this.currentYear; 

  try {
        // Obtém as marcações do servidor para o dia selecionado
    const response = await fetch(`http://localhost:5000/painel/marcacoes?data=${this.currentYear}-${day.month+1}-${day.day}&barbeiro=${this.barbeiro}`);
    const data = await response.json();

        // Converte as marcações em horários bloqueados
    const blockedTimes = data.map(marcacao => {
      const hora = new Date(marcacao.Data).getHours();
      const minutos = new Date(marcacao.Data).getMinutes();
      return `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
    });

        // Atualiza os horários disponíveis, marcando aqueles que estão bloqueados
    this.availableTimes = this.availableTimes.map(time => {
      return {
        time: time,
        blocked: blockedTimes.includes(time)
      };
    });
  } catch (error) {
    console.error('Erro ao obter as marcações:', error);
  }
},

// Método para avançar para a próxima página do calendário ou para o próximo mês se a última página atual for atingida
nextPage() {
    // Verifica se há mais páginas disponíveis
if (this.currentPage < this.totalPages) {
  this.currentPage++; // Avança para a próxima página
} else {
    // Se a última página foi atingida, reinicia a contagem para a primeira página
  this.currentPage = 1;

    // Se o mês atual for dezembro, avança para o próximo ano e define o mês como janeiro
  if (this.currentMonth === 12) {
    this.currentMonth = 1;
    this.currentYear++;
  } else {
    // Caso contrário, avança para o próximo mês
    this.currentMonth++;
  }
}
  // Atualiza os dias do mês conforme a mudança de página ou mês
this.updateDaysInMonth();
},

// Método para voltar para a página anterior do calendário ou para o mês anterior se a primeira página atual for atingida
prevPage() {
    // Verifica se a página atual é maior que a primeira página
if (this.currentPage > 1) {
  this.currentPage--; // Volta para a página anterior
  this.updateDaysInMonth(); // Atualiza os dias do mês
} else {
      // Se a primeira página foi atingida, ajusta o mês e o ano
  if (this.currentMonth === 1) {
    this.currentMonth = 12; // Define o mês como dezembro
    this.currentYear--; // Volta para o ano anterior
  } else {
    this.currentMonth--; // Volta para o mês anterior
  }
      // Obtém o número de dias no mês anterior para calcular a última página
  const daysInMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();
  this.currentPage = Math.ceil(daysInMonth / 7); // Define a página como a última página do mês anterior
  this.updateDaysInMonth(); // Atualiza os dias do mês
} 
},
gotoStep(step) {
  this.currentTab = step;
},
openPopup() {
this.showPopup = true;
},
closePopup() {
this.showPopup = false;
},

// Método para avançar para a próxima etapa do popup de marcação
nextStep() {
  this.updateStatus = false; // Desativa a mensagem de erro
    // Verifica se a etapa atual é menor que 4 (número total de etapas)
  if (this.currentTab < 4) {
    this.currentTab++; // Avança para a próxima etapa

    // Verifica se a etapa atual é a etapa de seleção de data e hora
    if (this.currentTab === 3) {
      // Verifica se há um utilizador autenticado
      if (localStorage.getItem('token')) {
        this.disabledNext = true; // Desativa o botão "Próximo" se o utilizador estiver autenticado
      } else {
        // Se não houver utilizador autenticado, avança para a etapa de login/registo
        this.currentTab = 4;
        this.disabledNext = false; // Ativa o botão "Próximo"
      }
    } else {
      this.disabledNext = false; // Ativa o botão "Próximo" para outras etapas
    }
  }

  // Se estiver na etapa de confirmação e houver um utilizador autenticado, retrocede para a etapa de seleção de data e hora
  if (this.currentTab === 4 && localStorage.getItem('token')) {
    this.currentTab = 3;
    this.disabledNext = true; // Desativa o botão "Próximo"
  }
},

// Método para retroceder para a etapa anterior do popup de marcação
prevStep() {
  this.updateStatus = false; // Desativa a mensagem de erro
    // Verifica se a mensagem de sucesso está exibida
  if (this.showSuccess === true) {
    this.disabledNext = true; // Desativa o botão "Próximo" se a mensagem de sucesso estiver exibida
  }
  this.disabledNext = false; // Ativa o botão "Próximo" para todas as situações
  if (this.currentTab > 0) {
        // Verifica se a etapa atual é maior que 0 (primeira etapa)
    if (this.currentTab === 3) {
      this.currentTab = 2; // Retrocede para a etapa de seleção de data e hora (etapa 2)
    } else if (this.currentTab === 4) {
      this.currentTab = 2;
    } else {
      this.currentTab--; // Retrocede para a etapa anterior
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
    if (this.selectedDay !== null && this.selectedMonth !== null && this.selectedYear !== null) {
        const selectedDateTime = `${this.selectedYear}-${this.selectedMonth}-${this.selectedDay} ${time}`;
        this.selectedDateTime = selectedDateTime;
    } else {
        console.error('Por favor, selecione um dia antes de selecionar a hora.');
    }
    this.summary.selectedDateTime = this.selectedDay+'/'+this.selectedMonth+'/'+this.selectedYear+'-'+time;
  },

// Método para submeter uma reserva
  async submitBooking() {
    // Verifica se um serviço, um barbeiro e uma data/hora foram selecionados
    if (this.selectedService && this.selectedBarber && this.selectedDateTime) {
      try {
        const token = localStorage.getItem('token');

        const decoded = jwtDecode(token);
        const userId = decoded.userId;

        // Preparação dos dados a enviar
        const dataToSend = {
          service: this.selectedService,
          barber: this.selectedBarber,
          dateTime: this.selectedDateTime,
          utilizador: userId,
          notas: this.selectedNotas,
        };

        const response = await fetch('http://localhost:5000/painel/marcacoes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
          this.selectedService = null;
          this.selectedBarber = null;
          this.selectedDateTime = null;
          this.currentTab = 5;
          this.showSuccess = true;
        } else {
          const errorMessage = await response.json();
          this.updateStatus = true;
          console.log(errorMessage);
          this.updateError = errorMessage.message;
        }
      } catch (error) {
        console.error('Erro ao enviar reserva:', error);
        this.showError = true;
      }
    } else {
      this.showError = true;
      this.errorMessage = 'Por favor selecione um serviço, um barbeiro e um horário antes de submeter a sua marcação.'
    }
  },
},
mounted() {
  this.fetchMarcacoes();
  this.fetchServicos();
  this.fetchBarbeiros();

  const today = new Date();
  const currentDay = today.getDate();

  this.selectedDay = currentDay;

  const dayPosition = currentDay % 7 === 0 ? 7 : currentDay % 7; 
  this.currentPage = Math.ceil((currentDay + (7 - dayPosition)) / 7);

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
gap: 20px;
}

.time-slot {
width: calc(25% - 10px); 
text-align: center;
}



.hour-row {
display: flex;
flex-wrap: wrap;
justify-content: space-between;
gap: 10px; 
margin-top:10%;
}

.hour-button {
width: calc(25% - 10px); 
text-align: center;
padding: 10px;
border: 1px solid #ccc; 
border-radius: 10px; 
cursor: pointer;
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
  background-color: #ffffff; 
  padding: 10px 0;
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.1); 
  z-index: 2; 
  text-align:center;
  gap:10%;
}

.button {
  color: #000000; 
  padding: 10px 20px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease; 
  border: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); 
  background-color:white;
  border:1px solid #FCD666;
  margin: 0 50px; 
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
transform: translateX(-5px);
}
.nextB:hover {
transform: translateX(5px); 
}
.left:hover {
transform: translateX(-5px); 
}
.right:hover {
transform: translateX(5px); 
}
.dayActive{
  transform: translateY(-5px); 
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
  z-index: 999; 
}

.loading-container img {
  width: 50px; 
  height: 50px; 
}


.social-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.social-login, .input-container, .button-container {
  width: 100%;
  margin-bottom: 10px;
  font-family: "Inter", sans-serif; 
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
    margin: 0 10px; 
    width: 10vw;
}













.circle {
  width: 100px; 
  height: 100px; 
  border: 2px dotted black;
  border-radius: 50%; 
  position: relative; 
  display: flex;
  justify-content: center;
  align-items: center;
  margin:auto;
}

.circle i {
  position: absolute; 
  font-size: 40px; 
  color: #F4B604;
}


.btn-close {
  background-color: #333; 
  color: #fff; 
  border: none; 
  padding: 10px 20px; 
  font-size: 16px; 
  cursor: pointer; 
  border-radius: 5px; 
}


</style>
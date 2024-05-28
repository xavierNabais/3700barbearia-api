<template>

  <Header />
  
  <div class="section2">
    <div class="content2">
      <span class="title2">MARCAÇÕES</span>
    </div>
  </div>



  <div style="width: 100%; height: auto; background-color: white; padding-bottom: 10%;" class="mobile">
    
    <div class="single-title">
      <p>Para Agendar ou Cancelar Agendamentos, clique no botão abaixo.</p>
      <a href="/perfil/marcacoes"><button style="cursor: pointer;">VER MARCAÇÕES</button></a>
    </div>


      <div class="profile-section-left" style="padding:10% 0%">
          <div class="item-container">

            <div class="item">
              <a href="/perfil" style="color:Black">Editar Perfil</a>
            </div>
              <hr class="divider">
            <div class="item bold">
              Marcações
            </div>
              <hr class="divider">
            <div class="item">
              <a href="/perfil/recompensa" style="color:Black">Recompensa</a>
            </div>
            <hr class="divider">
          </div>

        </div>

      <div>
          <div class="personal-info">
            <button class="marcacoesButtons" :class="{ 'active': isAnterioresActive }" @click="procurarAnteriores">ANTERIORES</button>
            <button class="marcacoesButtons" :class="{ 'active': !isAnterioresActive }" @click="procurarProximas" style="margin-left:5%">PRÓXIMAS</button>
          </div>
        <div  style="overflow-y:auto;height:fit-content;">
          <div class="ag-courses_item" v-for="(dados, index) in marcacoes" :key="index" :class="{ 'no-hover': infoAberto === index }">
            <a v-if="!blockAnteriores" @click.prevent="toggleInfo(index)" href="#" class="ag-courses-item_link-marcacoes">
              <div class="marcacao-divider">
                <div class="marcacao-img" style="flex:1;margin-right: 5%;">
                  <img src="../../assets/images/about_logo.jpg" style="width: 100%;">
                </div>
                <div class="marcacao-details" style="flex:4">
                  <div class="marcacao-title">
                    {{ dados.nomeServico }}
                  </div>
                  <div class="marcacao-desc">
                    Barbeiro: <span style="font-weight: bold;">{{dados.nomeBarbeiro}}</span>
                  </div>
                  <div class="marcacao-time">
                    {{ dados.Data }}
                  </div>
                  <div class="marcacao-price">
                    {{  dados.precoServico }}€
                  </div>
                </div>
                <div class="icon-container">
                  <i class="fas fa-info-circle" @click.prevent="toggleInfo(index)"></i>
                </div>
              </div>
            </a>
            <a v-else class="ag-courses-item_link-marcacoes">
              <div class="marcacao-divider">
                <div class="marcacao-img" style="flex:1;margin-right: 5%;">
                  <img src="../../assets/images/about_logo.jpg" style="width: 100%;">
                </div>
                <div class="marcacao-details" style="flex:4">
                  <div class="marcacao-title">
                    {{ dados.nomeServico }}
                  </div>
                  <div class="marcacao-desc">
                    Barbeiro: <span style="font-weight: bold;">{{dados.nomeBarbeiro}}</span>
                  </div>
                  <div class="marcacao-time">
                    {{ dados.Data }}
                  </div>
                  <div class="marcacao-price">
                    {{  dados.precoServico }}€
                  </div>
                </div>
              </div>
            </a>
            <div v-if="dados.mostrarInfo" class="additional-info">
              <Info :serviceDefault="dados"/>
            </div>

            <div v-if="dados.bloquearInfo">
              <p>Não é possível visualizar as informações desta marcação pois faltam menos de 15 minutos. <br>Por favor contacte o estabelecimento caso necessite de alterar ou cancelar a marcação.</p>
            </div>

          </div>

        </div>
      </div>
    </div>



  <div style="width: 100%; height: 1000px; background-color: white; padding-bottom: 10%;" class="desktop">
    
    <div class="single-title">
      <p>Para Agendar ou Cancelar Agendamentos, clique no botão abaixo.</p>
      <a href="/perfil/marcacoes"><button style="cursor: pointer;">VER MARCAÇÕES</button></a>
    </div>

    <div class="profile-container">
      <div class="profile-section-left">
        <div class="item-container">
          <div class="item">
              <a href="/perfil" style="color:Black">Editar Perfil</a>
          </div>
          <hr class="divider">
          <div class="item bold">
              Marcações
          </div>
          <hr class="divider">
          <div class="item">
              <a href="/perfil/recompensa" style="color:Black">Recompensa</a>
          </div>
          <hr class="divider">
        </div>
      </div>

      <div class="profile-section-right">
          <div class="personal-info">
            <button class="marcacoesButtons" :class="{ 'active': isAnterioresActive }" @click="procurarAnteriores">ANTERIORES</button>
            <button class="marcacoesButtons" :class="{ 'active': !isAnterioresActive }" @click="procurarProximas" style="margin-left:5%">PRÓXIMAS</button>
          </div>
        <div  style="overflow-y:auto;height:700px;">
          <div class="ag-courses_item" v-for="(dados, index) in marcacoes" :key="index" :class="{ 'no-hover': infoAberto === index }">
            <a v-if="!blockAnteriores" @click.prevent="toggleInfo(index)" href="#" class="ag-courses-item_link-marcacoes">
              <div class="marcacao-divider">
                <div class="marcacao-img" style="flex:1;margin-right: 5%;">
                  <img src="../../assets/images/about_logo.jpg" style="width: 100%;">
                </div>
                <div class="marcacao-details" style="flex:4">
                  <div class="marcacao-title">
                    {{ dados.nomeServico }}
                  </div>
                  <div class="marcacao-desc">
                    Barbeiro: <span style="font-weight: bold;">{{dados.nomeBarbeiro}}</span>
                  </div>
                  <div class="marcacao-time">
                    {{ dados.Data }}
                  </div>
                  <div class="marcacao-price">
                    {{  dados.precoServico }}€
                  </div>
                </div>
                <div class="icon-container">
                  <i class="fas fa-info-circle" @click.prevent="toggleInfo(index)"></i>
                </div>
              </div>
            </a>
            <a v-else class="ag-courses-item_link-marcacoes">
              <div class="marcacao-divider">
                <div class="marcacao-img" style="flex:1;margin-right: 5%;">
                  <img src="../../assets/images/about_logo.jpg" style="width: 100%;">
                </div>
                <div class="marcacao-details" style="flex:4">
                  <div class="marcacao-title">
                    {{ dados.nomeServico }}
                  </div>
                  <div class="marcacao-desc">
                    Barbeiro: <span style="font-weight: bold;">{{dados.nomeBarbeiro}}</span>
                  </div>
                  <div class="marcacao-time">
                    {{ dados.Data }}
                  </div>
                  <div class="marcacao-price">
                    {{  dados.precoServico }}€
                  </div>
                </div>
              </div>
            </a>
            <div v-if="dados.mostrarInfo" class="additional-info">
              <Info :serviceDefault="dados"/>
            </div>
            <div v-if="dados.bloquearInfo">
              <p>Não é possível visualizar as informações desta marcação pois faltam menos de 15 minutos. <br>Por favor contacte o estabelecimento caso necessite de alterar ou cancelar a marcação.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

  <Footer />
  
</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import Info from '../../views/perfil/Info.vue';
import {jwtDecode} from 'jwt-decode';

export default {
data() {
  return {
    marcacoes: [],
    isAnterioresActive: true, 
    blockAnteriores: false,
  };
},
methods: {
  async fetchMarcacoes(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.marcacoes = data;
    } catch (error) {
      console.error('Erro ao procurar os dados dos serviços:', error);
    }
  },
  async procurarAnteriores() {
    const token = localStorage.getItem('token');

    const decoded = jwtDecode(token);
    const userId = decoded.userId;

    await this.fetchMarcacoes(`api/perfil/marcacoes/anteriores/${userId}`);
    this.isAnterioresActive = true;
    this.blockAnteriores = true;
  },
  async procurarProximas() {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const userId = decoded.userId;
    await this.fetchMarcacoes(`api/perfil/marcacoes/proximas/${userId}`);
    this.isAnterioresActive = false;
    this.blockAnteriores = false;
  },
  toggleInfo(index) {
    const marcação = this.marcacoes[index];
    const dataHoraMarcação = marcação.Data;


    // Verifica se a string de data e hora é válida
    if (!dataHoraMarcação) {
        console.error("String de data e hora da marcação inválida:", dataHoraMarcação);
        return;
    }

    // Extrai a data e hora da string fornecida
    const [, dataStr, horaStr, minutosStr] = dataHoraMarcação.match(/(\d{2}\/\d{2}\/\d{4}), às (\d{2}):(\d{2})/);

    // Extrai ano, mês e dia da data extraída
    const [dia, mês, ano] = dataStr.split('/');
    
    // Cria o objeto Date com os componentes de data e hora
    const dataMarcação = new Date(ano, parseInt(mês) - 1, dia, parseInt(horaStr), parseInt(minutosStr));
    const horaAtual = new Date();

    // Calcula a diferença em minutos entre as duas datas
    const diferençaEmMinutos = Math.round((dataMarcação - horaAtual) / (1000 * 60));

    // Verifica se a diferença é maior que 15 minutos
    if (diferençaEmMinutos > 15) {
        // Abre a informação da marcação
        this.infoAberto = this.infoAberto === index ? null : index;
        marcação.mostrarInfo = !marcação.mostrarInfo;
        marcação.bloquearInfo = false;
    } else {
        marcação.bloquearInfo = !marcação.bloquearInfo;
        console.log("A marcação não pode ser aberta porque faltam menos de 15 minutos.");
    }
},
  openPopup() {
    this.$refs.Info.openPopup(); 
  },
},

mounted() {
  this.procurarProximas();
},
components: {
  Header,
  Footer,
  Info
},
name: 'perfilMarcacoes',
}
</script>


<style scoped>

.no-hover:hover {
  background-color:transparent;
}
</style>
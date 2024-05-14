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
            <div class="info-header" style="margin-bottom: 5%;">
              <button class="profile-agendar">+ AGENDAR</button>
            </div>
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
      console.log(this.marcacoes);
    } catch (error) {
      console.error('Erro ao procurar os dados dos serviços:', error);
    }
  },
  async procurarAnteriores() {
    const token = localStorage.getItem('token');

    const decoded = jwtDecode(token);
    const userId = decoded.userId;

    await this.fetchMarcacoes(`http://localhost:5000/perfil/marcacoes/anteriores/${userId}`);
    this.isAnterioresActive = true;
    this.blockAnteriores = true;
  },
  async procurarProximas() {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const userId = decoded.userId;
    await this.fetchMarcacoes(`http://localhost:5000/perfil/marcacoes/proximas/${userId}`);
    this.isAnterioresActive = false;
    this.blockAnteriores = false;
  },
  toggleInfo(index) {
    this.infoAberto = this.infoAberto === index ? null : index;
    this.marcacoes[index].mostrarInfo = !this.marcacoes[index].mostrarInfo;
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
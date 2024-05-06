<template>
  <div>
    <Header />
    
    <div class="section2">
      <div class="content2">
        <span class="title2">EDITAR PERFIL</span>
      </div>
    </div>

    <div style="width: 100%; height: 1000px; background-color: white; padding-bottom: 10%;" class="mobile">
      
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
            <div class="item">
              <a href="/perfil/marcacoes" style="color:Black">Marcações</a>
            </div>
              <hr class="divider">
            <div class="item bold">
              Recompensa
            </div>
            <hr class="divider">
          </div>

        </div>

        <div style="text-align:center">
          <div class="personal-info">
            <div class="info-header">
              Recompensa de fidelização
            </div>
            <hr class="small-divider" style="margin:auto">
            <div class="info-description" style="margin-top:5%">
              Participe do nosso programa de fidelidade e seja recompensado! Após realizar 10 serviços conosco, você ganhará um serviço gratuito como forma de agradecimento pela sua lealdade. Aproveite esta oportunidade para desfrutar de um tratamento extra e valorizar ainda mais a sua preferência por nossos serviços.
            </div>
          </div>

          <div class="form-container" style="width: 100%; margin-bottom: 5%;">
            <div class="first-five">
              <img :src="require('@/assets/images/about_logo.jpg')"
                  class="image-border gold-border"
                  :style="{'margin-bottom':'5%'}"
                  style="width:10%;">
            </div>
          </div>

          <button class="profile-anterior" :class="{ 'disabled': utilizador && utilizador.length > 0 && utilizador[0].Pontos < 10 }">
            <a href="" v-if="utilizador && utilizador.length > 0 && utilizador[0].Pontos < 10" style="pointer-events: none"><i class='fas fa-lock' style="margin-right:5%"></i> MARCAÇÃO GRATUITA {{ utilizador && utilizador.length > 0 ? utilizador[0].Pontos : 0 }}/10 </a>
            <a v-if="utilizador && utilizador.length > 0 && utilizador[0].Pontos == 10"> MARCAÇÃO GRATUITA</a>

          </button>
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
            <div class="item">
              <a href="/perfil/marcacoes" style="color:Black">Marcações</a>
            </div>
            <hr class="divider">
            <div class="item bold">
              <a href="/perfil/recompensa" style="color:Black">Recompensa</a>
            </div>
            <hr class="divider">
          </div>
        </div>

        <div class="profile-section-right">
          <div class="personal-info">
            <div class="info-header">
              Recompensa de fidelização
            </div>
            <hr class="small-divider">
            <div class="info-description">
              Participe do nosso programa de fidelidade e seja recompensado! Após realizar 10 serviços conosco, você ganhará um serviço gratuito como forma de agradecimento pela sua lealdade. Aproveite esta oportunidade para desfrutar de um tratamento extra e valorizar ainda mais a sua preferência por nossos serviços.
            </div>
          </div>

          <div class="form-container" style="width: 100%; margin-bottom: 5%;">
            <div class="first-five">
              <img :src="require('@/assets/images/about_logo.jpg')"
                  class="image-border gold-border"
                  :style="{'margin-bottom':'5%'}"
                  style="width:10%;">
            </div>
          </div>

          <button class="profile-anterior" :class="{ 'disabled': utilizador && utilizador.length > 0 && utilizador[0].Pontos < 10 }">
            <a href="" v-if="utilizador && utilizador.length > 0 && utilizador[0].Pontos < 10" style="pointer-events: none"><i class='fas fa-lock' style="margin-right:5%"></i> MARCAÇÃO GRATUITA {{ utilizador && utilizador.length > 0 ? utilizador[0].Pontos : 0 }}/10 </a>
            <a v-if="utilizador && utilizador.length > 0 && utilizador[0].Pontos == 10"> MARCAÇÃO GRATUITA</a>

          </button>
        </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';

export default {
  data() {
    return {
      userId: '', 
      utilizador: {}, 
      isButtonDisabled: true, 
    };
  },
  methods: {
    async fetchUtilizador() {
      try {
        const response = await fetch(`http://localhost:5000/painel/utilizadores/${this.userId}`);
        const data = await response.json();
        this.utilizador = data;
        if (this.utilizador.Pontos < 10) {
          this.isButtonDisabled = true; 
        } else {
          this.isButtonDisabled = false; 
        }
      } catch (error) {
        console.error('Erro ao buscar os dados do utilizador:', error);
      }
    },
  },
  mounted() {
    this.userId = localStorage.getItem('userId');
    this.fetchUtilizador();
  },
  components: {
    Header,
    Footer
  },
  name: 'recompensaPerfil',
}

</script>

<style scoped>
.gold-border {
  border: 12px solid #F2B707;
}

.profile-anterior {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #F2B707; 
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s;
  width:300px;
}

.profile-anterior.disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  width:300px;
}

</style>

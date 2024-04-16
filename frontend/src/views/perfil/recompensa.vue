<template>

    <Header />
    
    <div class="section2">
      <div class="content2">
        <span class="title2">EDITAR PERFIL</span>
      </div>
    </div>



    <div style="width: 100%; height: 1000px; background-color: white; padding-bottom: 10%;">
      
      <div class="single-title">
        <p>Para Agendar ou Cancelar Agendamentos, clique no botão abaixo.</p>
        <button>VER MARCAÇÕES</button>
      </div>


      <div class="profile-container">
        <div class="profile-section-left">
          <div class="item-container">

            <div class="item">
              Editar Perfil
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
            <div class="form-container" style="width: 100%;margin-bottom: 5%;">
                <img src="../../assets/images/about_logo.jpg" style="border:12px solid #F2B707;width:10%;">
                <img src="../../assets/images/about_logo.jpg" style="border:12px solid #F2B707;width:10%;margin-left:5%">
                <img src="../../assets/images/about_logo.jpg" style="border:12px solid #CCCCCC;width:10%;margin-left:5%">
                <img src="../../assets/images/about_logo.jpg" style="border:12px solid #CCCCCC;width:10%;margin-left:5%">
                <img src="../../assets/images/about_logo.jpg" style="border:12px solid #CCCCCC;width:10%;margin-left:5%">
            </div>
            <div class="form-container" style="width: 100%;margin-bottom:5%">
                <img src="../../assets/images/about_logo.jpg" style="border:12px solid #CCCCCC;width:10%;">
                <img src="../../assets/images/about_logo.jpg" style="border:12px solid #CCCCCC;width:10%;margin-left:5%">
                <img src="../../assets/images/about_logo.jpg" style="border:12px solid #CCCCCC;width:10%;margin-left:5%">
                <img src="../../assets/images/about_logo.jpg" style="border:12px solid #CCCCCC;width:10%;margin-left:5%">
                <img src="../../assets/images/about_logo.jpg" style="border:12px solid #CCCCCC;width:10%;margin-left:5%">
            </div>
            <button class="profile-anterior">AGENDAR</button>

        </div>
    </div>
</div>





    
    <Footer />
    
      </template>
      
      <script>
      import Header from '../../components/Header.vue';
      import Footer from '../../components/Footer.vue';
      
      export default {
        data() {
          return {
            utilizador: [], // Propriedade para armazenar os dados dos serviços
            };
        },
        methods: {
          async fetchUtilizador() {
            try {
              const response = await fetch('http://localhost:5000/painel/utilizadores');
              const data = await response.json();
              this.utilizador = data;
            } catch (error) {
              console.error('Erro ao buscar os dados dos serviços:', error);
            }
          },
        },
        mounted() {
          this.fetchUtilizador();    
        },
        components: {
          Header,
          Footer
        },
        name:'recompensaPerfil',
    
      }
      </script>
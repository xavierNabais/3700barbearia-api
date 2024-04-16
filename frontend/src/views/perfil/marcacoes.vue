<template>

    <Header />
    
    <div class="section2">
      <div class="content2">
        <span class="title2">MARCAÇÕES</span>
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
              <button class="profile-anterior">ANTERIORES</button>
              <button class="profile-proximo">PRÓXIMAS</button>

            </div>
            <div class="ag-courses_item">
            <a href="#" class="ag-courses-item_link-marcacoes">
                <div class="ag-courses-item_bg"></div>
                    <div class="marcacao-divider">
                        <div class="marcacao-img" style="flex:1;margin-right: 5%;">
                            <img src="../../assets/images/about_logo.jpg" style="width: 100%;">
                        </div>
                        <div class="marcacao-details" style="flex:4">
                            <div class="marcacao-title">
                            Corte
                            </div>
                            <div class="marcacao-desc">
                            Barbeiro: <span style="font-weight: bold;">Xavier</span>
                            </div>
                            <div class="marcacao-time">
                            Quarta, 19/11/2024 às 13h00
                            </div>
                            <div class="marcacao-price">
                            10€
                            </div>
                        </div>
                    </div>


            </a>
            </div>


            <div class="ag-courses_item">
            <a href="#" class="ag-courses-item_link-marcacoes">
                <div class="ag-courses-item_bg"></div>
                    <div class="marcacao-divider">
                        <div class="marcacao-img" style="flex:1;margin-right: 5%;">
                            <img src="../../assets/images/about_logo.jpg" style="width: 100%;">
                        </div>
                        <div class="marcacao-details" style="flex:4">
                            <div class="marcacao-title">
                            Corte
                            </div>
                            <div class="marcacao-desc">
                            Barbeiro: <span style="font-weight: bold;">Xavier</span>
                            </div>
                            <div class="marcacao-time">
                            Quarta, 19/11/2024 às 13h00
                            </div>
                            <div class="marcacao-price">
                            10€
                            </div>
                        </div>
                    </div>


            </a>
            </div>


            <div class="ag-courses_item">
            <a href="#" class="ag-courses-item_link-marcacoes">
                <div class="ag-courses-item_bg"></div>
                    <div class="marcacao-divider">
                        <div class="marcacao-img" style="flex:1;margin-right: 5%;">
                            <img src="../../assets/images/about_logo.jpg" style="width: 100%;">
                        </div>
                        <div class="marcacao-details" style="flex:4">
                            <div class="marcacao-title">
                            Corte
                            </div>
                            <div class="marcacao-desc">
                            Barbeiro: <span style="font-weight: bold;">Xavier</span>
                            </div>
                            <div class="marcacao-time">
                            Quarta, 19/11/2024 às 13h00
                            </div>
                            <div class="marcacao-price">
                            10€
                            </div>
                        </div>
                    </div>


            </a>
            </div>



            <div class="ag-courses_item">
            <a href="#" class="ag-courses-item_link-marcacoes">
                <div class="ag-courses-item_bg"></div>
                    <div class="marcacao-divider">
                        <div class="marcacao-img" style="flex:1;margin-right: 5%;">
                            <img src="../../assets/images/about_logo.jpg" style="width: 100%;">
                        </div>
                        <div class="marcacao-details" style="flex:4">
                            <div class="marcacao-title">
                            Corte
                            </div>
                            <div class="marcacao-desc">
                            Barbeiro: <span style="font-weight: bold;">Xavier</span>
                            </div>
                            <div class="marcacao-time">
                            Quarta, 19/11/2024 às 13h00
                            </div>
                            <div class="marcacao-price">
                            10€
                            </div>
                        </div>
                    </div>


            </a>
            </div>

            
            
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
        name:'perfilMarcacoes',
    
      }
      </script>
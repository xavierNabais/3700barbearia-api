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
        <a href="/perfil/marcacoes"><button style="cursor: pointer;">VER MARCAÇÕES</button></a>
      </div>


      <div class="profile-container">
        <div class="profile-section-left">
          <div class="item-container">

            <div class="item bold">
              Editar Perfil
            </div>
              <hr class="divider">
            <div class="item">
              <a href="/perfil/marcacoes" style="color:Black">Marcações</a>
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
              <div class="info-header">
                Informações pessoais
              </div>
              <hr class="small-divider">
              <div class="info-description">
                Personalize o seu perfil facilmente! Atualize as suas informações pessoais de forma rápida e simples para garantir que sua conta esteja sempre atualizada.
              </div>
            </div>
            <div class="form-container">
              <div class="input-group" style="display:flex; flex-direction: row;">
                <div>
                  <label for="nome">Nome</label>
                  <br>
                  <input type="text" id="nome">
                </div>
                <div style="margin-left: 5%;">
                  <label for="apelido">Apelido</label>
                  <br>
                  <input type="text" id="apelido">
                </div>
              </div>
              <div class="input-group">
                <label for="username">Username</label>
                <br>
                <input type="text" id="username">
              </div>
              <button class="save-button">Guardar</button>
            </div>



            <hr style="border: 1px solid #0000002d;margin-top: 5%; margin-bottom: 5%;">

                <div class="bottom-division">
                        <div class="left-division">

                            <div class="personal-info">
                              <div class="info-header">
                                Email
                              </div>
                              <hr class="small-divider">
                              <div class="info-description">
                                Gerencie o seu email com facilidade! Mantenha o seu contato atualizado alterando o seu endereço de email sempre que necessário.
                              </div>
                            </div>
                            <div class="form-container">
                              <div class="input-group" style="display:flex; flex-direction: row;">
                                <div>
                                  <label for="email" class="email">Endereço de email atual</label>
                                  <br>
                                  <input type="text" id="nome">
                                </div>
                              </div>
                              <div class="input-group">
                                <label for="emailNew" class="email">Novo endereço de email</label>
                                <br>
                                <input type="text" id="username">
                              </div>
                              <button class="save-button">Guardar</button>
                            </div>

                        </div>


                        <div class="right-division">
                          
                          <div class="personal-info">
                            <div class="info-header">
                              Password
                            </div>
                            <hr class="small-divider">
                            <div class="info-description">
                              Proteja a sua conta! Mantenha a sua senha segura e atualizada alterando-a regularmente para garantir a segurança dos seus dados
                            </div>
                          </div>
                          <div class="form-container">
                            <div class="input-group" style="display:flex; flex-direction: row;">
                              <div>
                                <label for="email" class="email">Password atual*</label>
                                <br>
                                <input type="text" id="nome">
                              </div>
                            </div>
                            <div class="input-group">
                              <label for="emailNew" class="email">Nova password*</label>
                              <br>
                              <input type="text" id="username">
                            </div>
                            <button class="save-button">Guardar</button>
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
        name:'editarPerfil',
    
      }
      </script>
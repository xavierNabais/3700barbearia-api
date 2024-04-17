<template>

    <Header />
    
    <div class="section2">
      <div class="content2">
        <span class="title2">INICIAR SESSÃO</span>
      </div>
    </div>



    <div style="width: 100%; height: 1000px; background-color: white; padding-bottom: 10%;">
      



      <div class="profile-container" style="margin-top: 0;padding-top:5%">
        <div class="profile-section-left" style="text-align: left;margin-left:10%;">
            <div class="personal-info">
              <div class="info-header login">
                INICIAR SESSÃO
              </div>
              <hr class="small-divider">
              <div class="info-description">
                Por favor, insira suas credenciais para iniciar sessão e acessar sua conta.
              </div>
            </div>
            <form id="loginForm" @submit.prevent="login">
            <div class="form-container">
            <div class="input-group">
                <div>
                  <label for="nome" class="login-label">Nome de utilizador ou email</label>
                  <br>
                  <input type="email" id="email" name="email" v-model="email" class="login">
                </div>
              </div>
              <div class="input-group">
                <label for="username" class="login-label">Password</label>
                <br>
                <input type="password" id="password" name="password" v-model="password" class="login">
              </div>
            </div>
            <a href=""><p style="font-size:15px; text-decoration:underline;color:#F2B709">Perdeu a senha?</p></a>
            <button type="submit" class="login-button">INICIAR SESSÃO</button>
              <div class="success-message" v-if="perfilAtualizado">
                Perfil atualizado com sucesso!
              </div>
            </form>
        </div>

        <div class="profile-section-right">
            <div class="personal-info">
              <div class="info-header login">
                CRIAR NOVA CONTA
              </div>
              <hr class="small-divider">
              <div class="info-description">
                Para criar uma nova conta, preencha o formulário com suas informações pessoais e escolha um nome de usuário e senha únicos.
              </div>
            </div>
            <div class="form-container">
            <div class="input-group">
                <div>
                  <label for="nome" class="login-label">Endereço de email</label>
                  <br>
                  <input type="text" id="nome" class="login">
                </div>
              </div>
              <div class="input-group">
                <label for="username" class="login-label">Password</label>
                <br>
                <input type="text" id="username" class="login">
              </div>
            </div>
            <p>Os seus dados pessoais serão usados para apoiar a sua experiência no site 3700barbershop.pt
            Serão utilizados para gerir o acesso à sua conta e outros fins descritos na nossa política de privacidade</p>
            <button class="login-button">REGISTAR NOVA CONTA</button>

        </div>







      </div>




    </div>



    
    <Footer />
    
      </template>
      
      <script>
      import Header from '../../components/Header.vue';
      import Footer from '../../components/Footer.vue';
      
      export default {
        components: {
          Header,
          Footer
        },
        name: 'loginPage',
        data() {
          return {
            email: '',
            password: '',
            perfilAtualizado: false,
          };
        },
        methods: {
          async login() {
            try {
              const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  email: this.email,
                  password: this.password
                })
              });
              const data = await response.json();
              
              // Verifique se o login foi bem-sucedido
              if (response.ok) {
                console.log(data);
                localStorage.setItem('userId', data.userId); // Use sessionStorage se preferir que os dados sejam perdidos quando o navegador for fechado
                localStorage.setItem('userName', data.userName);
                localStorage.setItem('type', data.type);
                this.perfilAtualizado = true;
                setTimeout(() => {
                    this.perfilAtualizado = false;
                    window.location.href= '/';
                }, 1500);
              } else {
                console.log(data); // Se o login não foi bem-sucedido, imprima os dados do erro no console
              }
            } catch (error) {
              console.error('Erro ao efetuar login:', error);
            }
          }
        }
      };
      </script>
      

      <style scoped>
      .success-message {
      color: black;
      font-weight: bold;
      font-size:18px;
      border-bottom:1px solid #F4B604;
      padding: 15px 20px;
      border-radius: 5px;
      margin-top: 20px;
      text-align: center;
      width:300px;
    }
      </style>
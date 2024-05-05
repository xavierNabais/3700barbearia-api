<template>
  <header>
    <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <title>Barbearia 3700</title>
    
    <div class="header">
      <!-- Menu para dispositivos móveis -->
      <nav class="mobile-menu">
        <div class="mobile-menu-icon" @click="toggleMobileMenu">
          <i class="fas fa-bars"></i>
        </div>
        <div class="mobile-menu-items-container" :class="{ 'ativo': mobileMenuOpen }">
          <ul class="mobile-menu-items">
            <li><a href="/">Home</a></li>
            <li><a href="#">Agendar</a></li>
            <li><a href="#">Contactos</a></li>
            <li v-if="userName"><a href="/perfil">Minha Conta </a></li>
            <li v-if="!userId"><a href="/login">Entrar na minha conta » </a></li>
            <li v-if="userId"><a @click="logout" href="/">Logout</a></li>
          </ul>
        </div>
        <div class="logo">
          <a href="/"><img src="../assets/images/logo.png" alt="Logo"></a>
        </div>
      </nav>

      <!-- Menu para desktop -->
      <nav class="menu">
        <ul class="menu-items">
          <li><a href="/">HOME</a></li>
          <li><a href="#">AGENDAR</a></li>
          <li><a href="#">CONTACTOS</a></li>
        </ul>
        <div class="dropdown" style="margin-left: 8%; align-self: self-end; box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);">
          <button class="dropbtn">
            <div v-if="!userId" class="profile-nav">
              <a href="/login">Iniciar sessão <i class="fas fa-scissors" :class="{ 'rotate': dropdownOpen, 'rotate-back': !dropdownOpen }"></i></a>
            </div>
          </button>
        </div>
        <Dropdown/>
      </nav>
    </div>
  </header>
</template>

<script>
import Dropdown from '../components/HeaderDropdown.vue';

export default {
  name: 'AppHeader',
  components: {
    Dropdown,
  },
  data() {
    return {
      userName: '',
      type: '',
      userId: '',
      dropdownOpen: false,
      mobileMenuOpen: false // Alterado para false
    };
  },
  methods: {
    logout() {
        localStorage.removeItem('userName'); 
        localStorage.removeItem('userId');
        localStorage.removeItem('type');
        window.location.reload;
        },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen; // Altera o estado do menu móvel
      this.dropdownOpen = false; // Fecha o dropdown do menu desktop ao abrir o menu móvel
    }
  },
  mounted() {
    // Recupera o userName do localStorage
    this.userId = localStorage.getItem('userId')
    this.userName = localStorage.getItem('userName');
    this.type = localStorage.getItem('type');
  }
}
</script>

<style scoped>
/* Estilos do cabeçalho */

/* Estilos para o menu móvel */
.mobile-menu {
  display:none;
  align-items: center;
  background-color: rgb(20, 20, 20);
  color: white;
  padding: 0px 20px;
  height: 90px;
  position: fixed;
  width: 100%;
}

.mobile-menu-icon {
  margin-right: 20px;
  cursor: pointer;
  font-size: 20px;
}

.mobile-menu-items-container {
  display: none;
  position: fixed;
  top: 90px; /* Ajuste conforme necessário */
  left: 0;
  background-color: rgb(20, 20, 20);
  width: 100%;
  z-index: 100; /* Ajuste conforme necessário */
}

.mobile-menu-items {
  display: flex;
  flex-direction: column;
  padding: 0px;
  margin:0px;
  background-color:rgb(20, 20, 20);
}

.mobile-menu-items-container.ativo {
  display: block;
}

.mobile-menu-items li {
  margin-bottom: 10px;
  list-style-type: none; /* Remover a bolinha */
  border-bottom:1px solid white;
  padding: 15px 10px;
}

.mobile-menu-items li a {
  color: white;
  text-decoration: none;
}

/* Estilos para o logo */
.logo {
  flex: 1;
  text-align: center;
  display: none;
}

.logo img {
  max-width: 20%;
  height: auto;
}

@media (max-width: 768px) {
  .mobile-menu {
    display: flex;
  }

  .menu {
    display: none;
  }

  .logo {
    display: block;
  }

  .dropdown {
    display: none;
  }

  .mobile-menu-items-container.ativo{
    display: block;
    width: 70%;
    margin: -5px 10px;
    box-shadow: 0px 0px 40px 0px rgba(0,0,0,0.25);
  }
}
</style>

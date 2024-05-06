<template>
    <div class="dropdown" style="margin-right: 20%;align-self: self-end">
      <button class="dropbtn" @click="toggleDropdown">
        <div v-if="userName" class="profile-nav" >
          Olá, {{ userName }} <i class="fas fa-scissors" :class="{ 'rotate': dropdownOpen, 'rotate-back': !dropdownOpen }"></i>
        </div>
        <div v-if="userId && !userName" class="profile-nav">
          Minha conta <i class="fas fa-scissors" :class="{ 'rotate': dropdownOpen, 'rotate-back': !dropdownOpen }"></i>
        </div>
      </button>
      <div class="dropdown-content" v-show="dropdownOpen">
        <a v-if="type == 2" href="/agenda">Agenda</a>
        <a href="/perfil">Editar Perfil</a>
        <a href="/perfil/marcacoes">Marcações</a>
        <a href="/perfil/recompensa">Recompensa</a>
        <a v-if="type == 1" href="/painel">Painel de controlo</a>
        <a @click="logout" href="/">Logout</a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HeaderDropdown',
    data() {
      return {
        userName: '',
        type: '',
        userId: '',
        dropdownOpen: false
      };
    },
    methods: {
      // Método para fazer logout
      logout() {
        // Remove os itens do localStorage relacionados ao utilizador
        localStorage.removeItem('userName'); 
        localStorage.removeItem('userId');
        localStorage.removeItem('type');
        // Atualiza os dados do utilizador após o logout
        this.updateUserData();
      },
    // Método para alternar o estado do dropdown entre aberto e fechado
      toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
      },
      // Método para atualizar os dados da sessão
      updateUserData() {
        this.userId = localStorage.getItem('userId');
        this.userName = localStorage.getItem('userName');
        this.type = localStorage.getItem('type');
      }
    },
    mounted() {
      // Quando o componente é montado, obtém os dados do localStorage e atualiza
      this.userId = localStorage.getItem('userId')
      this.userName = localStorage.getItem('userName');
      this.type = localStorage.getItem('type');
      this.updateUserData();
    }
  }
  </script>
  
  
  <style scoped>
  .rotate {
    animation: rotateScissors 0.5s ease-in-out forwards;
  }
  
  .rotate-back {
    animation: rotateScissorsBack 0.5s ease-in-out forwards;
  }
  
  @keyframes rotateScissors {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(90deg);
    }
  }
  
  @keyframes rotateScissorsBack {
    0% {
      transform: rotate(90deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
  </style>
  
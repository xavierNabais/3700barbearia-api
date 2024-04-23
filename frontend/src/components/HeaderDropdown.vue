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
        <!-- Coloque aqui as opções do dropdown -->
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
        logout() {
        localStorage.removeItem('userName'); 
        localStorage.removeItem('userId');
        localStorage.removeItem('type');
        },
      toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
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
  
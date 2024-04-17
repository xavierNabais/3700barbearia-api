<template>
  <header>
    <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <title>Barbearia 3700</title>
    
    <div class="header">
      <nav class="menu">
  <ul class="menu-items">
    <li><a href="/">HOME</a></li>
    <li><a href="#">AGENDAR</a></li>
    <li><a href="#">CONTACTOS</a></li>
  </ul>
  <div class="dropdown" style="margin-left: 8%; align-self: self-end">

    <button class="dropbtn" >
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
      dropdownOpen: false

    };
    },
    methods: {
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
  /* Estilos do cabeçalho */
  </style>
  
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
  <a v-if="!userName" href="/login" style="color:white;margin-top: 4%;color:#F4B604">Entrar  <i class="fas fa-user-alt	" style="font-size:16px;"></i></a>

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
    props: {
      userId: String
    },
    data() {
    return {
      userName: '',
      type: '',
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
      this.userName = localStorage.getItem('userName');
      this.type = localStorage.getItem('type');
    }
  }
  
  </script>
  
  <style scoped>
  /* Estilos do cabeçalho */
  </style>
  
<template>

    <Header />
    
    <div class="section2">
      <div class="content2">
        <span class="title2">PAINEL DE CONTROLO</span>
      </div>
    </div>


    <div style="width: 100%; height: auto; background-color: white; padding-bottom: 10%;">
        <div style="padding:5%">
        <p style="font-size: 24px; font-weight: bold;">Gestão de Serviços</p>
        <p>Facilite a organização do seu negócio com o nosso painel de controle de marcações para funcionários! Gerencie eficientemente os horários de trabalho, atribua tarefas, acompanhe as marcações dos clientes e garanta uma gestão de agenda otimizada.</p>
      </div>
      <div class="panel-main">
      <div class="panel-buttons">
        <button class="save-button" style="margin: 1%;" @click="mostrarComponente('utilizadores')">Utilizadores</button>
        <button class="save-button" style="margin: 1%;" @click="mostrarComponente('barbeiros')">Barbeiros</button>
        <button class="save-button" style="margin: 1%;" @click="mostrarComponente('servicos')">Serviços</button>
        <button class="save-button" style="margin: 1%;" @click="mostrarComponente('marcacoes')">Marcações</button>
      </div>
    </div>

    <div>
      <Utilizadores v-if="mostrarUtilizadores" />
      <Barbeiros v-if="mostrarBarbeiros" />
      <Servicos v-if="mostrarServicos" />
      <Marcacoes v-if="mostrarMarcacoes" />
    </div>


    </div>



    
    <Footer />
    
      </template>
      
      <script>
      import Header from '../../components/Header.vue';
      import Footer from '../../components/Footer.vue';
      import Utilizadores from '../painel/utilizadores.vue';
      import Barbeiros from '../painel/barbeiros.vue';
      import Servicos from '../painel/servicos.vue';
      import Marcacoes from '../painel/marcacoes.vue';

      export default {
        components: {
          Header,
          Footer,
          Utilizadores,
          Barbeiros,
          Servicos,
          Marcacoes
        },
        data() {
        return {
          mostrarUtilizadores: false,
          mostrarBarbeiros: false,
          mostrarServicos: false,
          mostrarMarcacoes: false
        };
        },
        name:'indexPainel',
        methods: {
          mostrarComponente(componente) {
            this.mostrarUtilizadores = componente === 'utilizadores';
            this.mostrarBarbeiros = componente === 'barbeiros';
            this.mostrarServicos = componente === 'servicos';
            this.mostrarMarcacoes = componente === 'marcacoes';
          }
        },
      }
      </script>


  <style scope>

    .panel-main {
        position: relative; 
    }

      .panel-buttons {
        position: absolute;
        top: 50%;
        left: 55%;
        transform: translate(-50%, -50%);
        width: 30%;
      }

  </style>
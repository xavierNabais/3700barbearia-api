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
        <p>Ações:</p>
        <p>X Ver marcação</p>
        <p>X Editar marcação</p>
        <p>X Cancelar marcação</p>
        </div>
        <div style="padding:5%;padding-top: 0;">
        <form>
  <table class="user-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Preço</th>
        <th>Duração</th>
        <th>Ativo</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <!-- Aqui você pode iterar sobre os dados dos usuários e criar linhas para cada usuário -->
      <tr v-for="dados in servicos" :key="dados.id" class="ag-courses_item">
        <td>{{ dados.Id }}</td>
        <td>{{ dados.Nome }}</td>
        <td>{{ dados.Preco }}</td>
        <td>{{ dados.Duracao }}</td>
        <td>{{ dados.Ativo }}</td>
        <!-- Coluna de ações -->
        <td>
          <!-- Aqui você pode adicionar botões para editar, excluir, etc. -->
          <button @click="editarUsuario(dados.id)">Editar</button>
          <button @click="excluirUsuario(dados.id)">Excluir</button>
        </td>
      </tr>
    </tbody>
  </table>
</form>
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
            servicos: [], // Propriedade para armazenar os dados dos serviços
            };
        },
        methods: {
          async fetchServicos() {
            try {
              const response = await fetch('http://localhost:5000/painel/servicos');
              const data = await response.json();
              this.servicos = data;
            } catch (error) {
              console.error('Erro ao buscar os dados dos serviços:', error);
            }
          },
        },
        mounted() {
          this.fetchServicos();    
        },
        components: {
          Header,
          Footer
        },
        name:'painelServicos',
    
      }
      </script>
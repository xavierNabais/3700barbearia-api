<template>




  <form style="margin:5%;">
  <table class="user-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Descrição</th>
        <th>Especialização</th>
        <th>Ativo</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <!-- Aqui você pode iterar sobre os dados dos usuários e criar linhas para cada usuário -->
      <tr v-for="dados in barbeiros" :key="dados.id" class="ag-courses_item">
        <td>{{ dados.Id }}</td>
        <td>{{ dados.Nome }}</td>
        <td>{{ dados.Descricao }}</td>
        <td>{{ dados.Especializacao }}</td>
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




    
    
      </template>
      
      <script>
      
      export default {
        data() {
          return {
            barbeiros: [], // Propriedade para armazenar os dados dos serviços
            };
        },
        methods: {
          async fetchBarbeiros() {
            try {
              const response = await fetch('http://localhost:5000/painel/barbeiros');
              const data = await response.json();
              this.barbeiros = data;
            } catch (error) {
              console.error('Erro ao buscar os dados dos serviços:', error);
            }
          },
        },
        mounted() {
          this.fetchBarbeiros();    
        },

        name:'painelBarbeiros',
    
      }
      </script>
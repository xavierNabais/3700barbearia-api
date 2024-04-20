<template>

<form style="margin:5%;">
  <table class="user-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Barbeiro</th>
        <th>Utilizador</th>
        <th>Serviço</th>
        <th>Data</th>
        <th>Notas</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <!-- Aqui você pode iterar sobre os dados dos usuários e criar linhas para cada usuário -->
      <tr v-for="dados in marcacoes" :key="dados.id" class="ag-courses_item">
        <td>{{ dados.Id }}</td>
        <td>{{ dados.Id_barbeiro }}</td>
        <td>{{ dados.Id_utilizador }}</td>
        <td>{{ dados.Id_servico }}</td>
        <td>{{ dados.Data }}</td>
        <td>{{ dados.Notas }}</td>
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
            marcacoes: [], // Propriedade para armazenar os dados dos serviços
            };
        },
        methods: {
          async fetchMarcacoes() {
            try {
              const response = await fetch('http://localhost:5000/painel/marcacoes');
              const data = await response.json();
              this.marcacoes = data;
            } catch (error) {
              console.error('Erro ao buscar os dados dos serviços:', error);
            }
          },
        },
        mounted() {
          this.fetchMarcacoes();    
        },
        name:'painelMarcacoes',
    
      }
      </script>
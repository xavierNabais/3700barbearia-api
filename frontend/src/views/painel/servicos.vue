<template>

<div v-if="showEditPopup" class="popup">
  <form @submit="submitEdit" style="display:contents">
        <div class="popup-content">
          <span class="close" @click="closeEditPopup">&times;</span>
          <h2>Editar Utilizador</h2>
          <!-- Campos de edição com títulos -->
          <div class="input-group">
            <label for="nome">Nome:</label>
            <input type="text" id="nome" v-model="editedUser.Nome">
          </div>
          <div class="input-group">
            <label for="apelido">Descrição:</label>
            <input type="text" id="apelido" v-model="editedUser.Descricao">
          </div>
          <div class="input-group">
            <label for="username">Preço:</label>
            <input type="text" id="username" v-model="editedUser.Preco">
          </div>
          <div class="input-group">
            <label for="email">Duracao:</label>
            <input type="text" id="email" v-model="editedUser.Duracao">
          </div>
          <div class="input-group">
            <label for="admin">Ativo:</label>
            <input type="text" id="admin" v-model="editedUser.Ativo">
          </div>
          <button class="savePanel">Guardar</button>
        </div>
      </form>
      </div>





<form style="margin:5%;">
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
      <tr v-for="dados in servicos" :key="dados.Id" class="ag-courses_item">
        <td>{{ dados.Id }}</td>
        <td>{{ dados.Nome }}</td>
        <td>{{ dados.Preco }}</td>
        <td>{{ dados.Duracao }}</td>
        <td>{{ dados.Ativo }}</td>
        <!-- Coluna de ações -->
        <td>
          <!-- Aqui você pode adicionar botões para editar, excluir, etc. -->
          <button class="editPanel" @click.prevent="showEditConfirmation(dados.Id)" style="color:black;margin-right:25px;"><i class="fas fa-edit"></i></button>
          <button class="editPanel" @click.prevent="showDeleteConfirmation(dados.Id)" style="color:black;"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    </tbody>
  </table>
</form>

<ConfirmationModal
      :showModal="showEditModal"
      :message="'Tem a certeza que quer editar este serviço?'"
      :onConfirm="openEditPopup"
      :onCancel="hideEditModal"
    />

    <ConfirmationModal
      :showModal="showDeleteModal"
      :message="'Tem a certeza que quer apagar este serviço?'"
      :onConfirm="deleteServico"
      :onCancel="hideDeleteModal"
    />
    
      </template>
      
      <script>
  import ConfirmationModal from "../../components/confirmation/ConfirmationModal.vue";

      export default {
        data() {
          return {
            servicos: [], // Propriedade para armazenar os dados dos serviços
            showEditModal: false,
            showDeleteModal: false,
            userIdToEdit: null,
            userIdToDelete: null,
            editedUser: {},
            showEditPopup: false,

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

        async excluirServico(userIdToDelete) {
        try {
          const response = await fetch(`http://localhost:5000/painel/servicos/${userIdToDelete}`, {
            method: 'DELETE'
          });

          if (response.ok) {
            console.log('Serviço excluído com sucesso!');
            this.hideDeleteModal();
            this.fetchServicos();
          } else {
            console.error('Erro ao excluir o serviço:', response.statusText);
          }
        } catch (error) {
          console.error('Erro ao excluir o serviço:', error);
        }
        },
        async submitEdit() {
          try {
            console.log(this.editedUser);
            const response = await fetch(`http://localhost:5000/painel/servicos/${this.userIdToEdit}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.editedUser) 
            });

            if (response.ok) {
              console.log('Serviço atualizado com sucesso!');
              this.closeEditPopup();
              this.fetchServicos();
            } else {
              console.error('Erro ao editar o serviço:', response.statusText);
            }
          } catch (error) {
            console.error('Erro ao editar o serviço:', error);
          }
        },
        showEditConfirmation(userId) {
        this.showEditModal = true;
        this.editedUser = Object.assign({}, this.fetchServicos(userId));
        },

        openEditPopup() {
          this.showEditModal = false;
          this.showEditPopup = true;
          // Carregar os dados do utilizador a ser editado
          this.editedUser = this.servicos.find(user => user.id === this.userId);
        },
        closeEditPopup() {
          this.showEditPopup = false;
        },
        hideEditModal() {
          this.showEditModal = false;
        },
        showDeleteConfirmation(userId) {
          this.userIdToDelete = userId;
          this.showDeleteModal = true;
        },
        deleteServico() {
          this.excluirServico(this.userIdToDelete);
        },

        hideDeleteModal() {
          this.showDeleteModal = false;
        },  
      },
      mounted() {
          this.fetchServicos();    
        },
      name:'painelServicos',
        components: {
          ConfirmationModal
        },
    }
      </script>
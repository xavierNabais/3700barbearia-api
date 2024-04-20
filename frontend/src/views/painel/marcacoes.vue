<template>
<div v-if="showEditPopup" class="popup">
  <form @submit="submitEdit" style="display:contents">
        <div class="popup-content">
          <span class="close" @click="closeEditPopup">&times;</span>
          <h2>Editar Utilizador</h2>
          <!-- Campos de edição com títulos -->
          <div class="input-group">
            <label for="nome">Barbeiro:</label>
            <input type="text" id="nome" v-model="editedUser.Id_barbeiro">
          </div>
          <div class="input-group">
            <label for="apelido">Utilizador:</label>
            <input type="text" id="apelido" v-model="editedUser.Id_utilizador">
          </div>
          <div class="input-group">
            <label for="username">Serviço:</label>
            <input type="text" id="username" v-model="editedUser.Id_servico">
          </div>
          <div class="input-group">
            <label for="email">Data:</label>
            <input type="text" id="email" v-model="editedUser.Data">
          </div>
          <div class="input-group">
            <label for="admin">Notas:</label>
            <input type="text" id="admin" v-model="editedUser.Notas">
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
          <button class="editPanel" @click.prevent="showEditConfirmation(dados.Id)" style="color:black;margin-right:25px;"><i class="fas fa-edit"></i></button>
          <button class="editPanel" @click.prevent="showDeleteConfirmation(dados.Id)" style="color:black;"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    </tbody>
  </table>
</form>

<ConfirmationModal
      :showModal="showEditModal"
      :message="'Tem a certeza que quer editar este Marcação?'"
      :onConfirm="openEditPopup"
      :onCancel="hideEditModal"
    />

    <ConfirmationModal
      :showModal="showDeleteModal"
      :message="'Tem a certeza que quer apagar este Marcação?'"
      :onConfirm="deleteMarcacao"
      :onCancel="hideDeleteModal"
    />
    
    
      </template>
      
      <script>
        import ConfirmationModal from "../../components/confirmation/ConfirmationModal.vue";

      export default {
        data() {
          return {
            marcacoes: [], // Propriedade para armazenar os dados dos Marcaçãos
            showEditModal: false,
            showDeleteModal: false,
            userIdToEdit: null,
            userIdToDelete: null,
            editedUser: {},
            showEditPopup: false,
            };
        },
        methods: {
          async fetchMarcacoes() {
            try {
              const response = await fetch('http://localhost:5000/painel/marcacoes');
              const data = await response.json();
              this.marcacoes = data;
            } catch (error) {
              console.error('Erro ao buscar os dados dos Marcaçãos:', error);
            }
          },
        async excluirMarcacao(userIdToDelete) {
        try {
          const response = await fetch(`http://localhost:5000/painel/marcacoes/${userIdToDelete}`, {
            method: 'DELETE'
          });

          if (response.ok) {
            console.log('Marcação excluído com sucesso!');
            this.hideDeleteModal();
            this.fetchMarcacoes();
          } else {
            console.error('Erro ao excluir o Marcação:', response.statusText);
          }
        } catch (error) {
          console.error('Erro ao excluir o Marcação:', error);
        }
        },
        async submitEdit() {
          try {
            console.log(this.editedUser);
            const response = await fetch(`http://localhost:5000/painel/marcacoes/${this.userIdToEdit}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.editedUser) 
            });

            if (response.ok) {
              console.log('Marcação atualizado com sucesso!');
              this.closeEditPopup();
              this.fetchMarcacoes();
            } else {
              console.error('Erro ao editar o Marcação:', response.statusText);
            }
          } catch (error) {
            console.error('Erro ao editar o Marcação:', error);
          }
        },
        showEditConfirmation(userId) {
        this.showEditModal = true;
        this.editedUser = Object.assign({}, this.fetchMarcacoes(userId));
        },

        openEditPopup() {
          this.showEditModal = false;
          this.showEditPopup = true;
          // Carregar os dados do utilizador a ser editado
          this.editedUser = this.marcacoes.find(user => user.id === this.userId);
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
        deleteMarcacao() {
          this.excluirMarcacao(this.userIdToDelete);
        },

        hideDeleteModal() {
          this.showDeleteModal = false;
        },  
      },
      
        mounted() {
          this.fetchMarcacoes();    
        },
        name:'painelMarcacoes',
        components: {
          ConfirmationModal
        },
    
      }
      </script>
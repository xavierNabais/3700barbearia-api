<template>


<div v-if="showEditPopup" class="popup">
  <form @submit="submitEdit" style="display:contents">
        <div class="popup-content">
          <span class="close" @click="closeEditPopup">&times;</span>
          <h2>Editar Utilizador</h2>
          <!-- Campos de edição com títulos -->
          <div class="input-group">
            <label for="nome">Nome:</label>
            <input type="text" id="nome" v-model="editedUser.Nome" placeholder="Nome">
          </div>
          <div class="input-group">
            <label for="apelido">Descrição:</label>
            <input type="text" id="apelido" v-model="editedUser.Descricao" placeholder="Apelido">
          </div>
          <div class="input-group">
            <label for="username">Especialização:</label>
            <input type="text" id="username" v-model="editedUser.Especializacao">
          </div>
          <div class="input-group">
            <label for="email">Ativo:</label>
            <input type="text" id="email" v-model="editedUser.Ativo" placeholder="Email">
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
          <button class="editPanel" @click.prevent="showEditConfirmation(dados.Id)" style="color:black;margin-right:25px;"><i class="fas fa-edit"></i></button>
          <button class="editPanel" @click.prevent="showDeleteConfirmation(dados.Id)" style="color:black;"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    </tbody>
  </table>
</form>


<ConfirmationModal
      :showModal="showEditModal"
      :message="'Tem a certeza que quer editar este Barbeiro?'"
      :onConfirm="openEditPopup"
      :onCancel="hideEditModal"
    />

    <ConfirmationModal
      :showModal="showDeleteModal"
      :message="'Tem a certeza que quer apagar este Barbeiro?'"
      :onConfirm="deleteServico"
      :onCancel="hideDeleteModal"
    />


    
    
      </template>
      
      <script>
        import ConfirmationModal from "../../components/confirmation/ConfirmationModal.vue";

      export default {
        data() {
          return {
            barbeiros: [], // Propriedade para armazenar os dados dos barbeiros
            showEditModal: false,
            showDeleteModal: false,
            userIdToEdit: null,
            userIdToDelete: null,
            editedUser: {},
            showEditPopup: false,
            };
        },
        methods: {
          async fetchBarbeiros() {
            try {
              const response = await fetch('http://localhost:5000/painel/barbeiros');
              const data = await response.json();
              this.barbeiros = data;
            } catch (error) {
              console.error('Erro ao buscar os dados dos barbeiros:', error);
            }
          },
          async excluirServico(userIdToDelete) {
          try {
            const response = await fetch(`http://localhost:5000/painel/barbeiros/${userIdToDelete}`, {
              method: 'DELETE'
            });

            if (response.ok) {
              console.log('Barbeiro excluído com sucesso!');
              this.hideDeleteModal();
              this.fetchBarbeiros();
            } else {
              console.error('Erro ao excluir o barbeiro:', response.statusText);
            }
          } catch (error) {
            console.error('Erro ao excluir o Barbeiro:', error);
          }
          },
          async submitEdit() {
          try {
            console.log(this.editedUser);
            const response = await fetch(`http://localhost:5000/painel/barbeiros/${this.userIdToEdit}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.editedUser) 
            });

            if (response.ok) {
              console.log('Barbeiro atualizado com sucesso!');
              this.closeEditPopup();
              this.fetchBarbeiros();
            } else {
              console.error('Erro ao editar o Barbeiro:', response.statusText);
            }
          } catch (error) {
            console.error('Erro ao editar o Barbeiro:', error);
          }
          },
          showEditConfirmation(userId) {
          this.showEditModal = true;
          this.editedUser = Object.assign({}, this.fetchBarbeiros(userId));
          },

          openEditPopup() {
            this.showEditModal = false;
            this.showEditPopup = true;
            // Carregar os dados do utilizador a ser editado
            this.editedUser = this.barbeiros.find(user => user.id === this.userId);
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
          this.fetchBarbeiros();    
        },

        name:'painelBarbeiros',
        components: {
          ConfirmationModal
        },
      }
      </script>
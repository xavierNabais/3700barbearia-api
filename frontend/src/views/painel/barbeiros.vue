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
            <label for="ativo">Estado:</label>
            <select id="ativo" v-model="editedUser.Ativo" name="ativo">
              <option value="0">Não-Ativo</option>
              <option value="1">Ativo</option>
            </select>
          </div>
          <button class="savePanel">Guardar</button>
        </div>
      </form>
</div>

<div v-if="showCreatePopup" class="popup">

<form @submit="createBarbeiro" style="display:contents">
      <div class="popup-content">
        <span class="close" @click="closeCreatePopup">&times;</span>
        <h2>Criar Barbeiro</h2>
        <!-- Campos de edição com títulos -->
        <div class="input-group">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" name="nome">
        </div>
        <div class="input-group">
          <label for="apelido">Descrição:</label>
          <input type="text" id="descricao" name="descricao">
        </div>
        <div class="input-group">
          <label for="username">Especialização:</label>
          <input type="text" id="especializacao" name="especializacao">
        </div>
        <div class="input-group">
            <label for="ativo">Estado:</label>
            <select id="ativo" v-model="editedUser.Ativo" name="ativo">
              <option value="0">Não-Ativo</option>
              <option value="1">Ativo</option>
            </select>
          </div>
        <button class="savePanel">Criar</button>
      </div>
</form>
</div>




<button class="save-button" style="margin: 0% 5%;width:auto" @click="showCreateConfirmation()">+ Novo barbeiro</button>

  <form style="margin:1% 5%;">
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
      :onConfirm="deleteBarbeiro"
      :onCancel="hideDeleteModal"
    />

    <ConfirmationModal
      :showModal="showCreateModal"
      :message="'Tem a certeza que quer criar um barbeiro?'"
      :onConfirm="openCreatePopup"
      :onCancel="hideCreateModal"
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
            showCreateModal: false,
            showCreatePopup: false,
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
          async createBarbeiro() {
          const nome = document.getElementById('nome').value;
          const descricao = document.getElementById('descricao').value;
          const especializacao = document.getElementById('especializacao').value;
          const ativo = document.getElementById('ativo').value;
          try {
            const response = await fetch(`http://localhost:5000/painel/barbeiros`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                nome,
                descricao,
                especializacao,
                ativo
                })
              });
              if (response.ok) {
                console.log('Serviço criado com sucesso!');
                this.hideBarbeiroModal();
                this.fetchBarbeiros();
              } else {
                console.error('Erro ao criar o serviço:', response.statusText);
              }
            } catch (error) {
              console.error('Erro ao criar o serviço:', error);
            }
            },
          async excluirBarbeiro(userIdToDelete) {
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
          showEditConfirmation(id) {
            this.userIdToEdit = id;
            this.showEditModal = true;
          },
          openEditPopup() {
            this.showEditModal = false;
            this.showEditPopup = true;
            // Carregar os dados do utilizador a ser editado
            this.editedUser = this.barbeiros.find(user => user.Id === this.userIdToEdit);
          },
          closeEditPopup() {
          this.showEditPopup = false;
          },
          closeCreatePopup(){
            this.showCreatePopup = false;
          },
          hideEditModal() {
            this.showEditModal = false;
          },
          showDeleteConfirmation(userId) {
            this.userIdToDelete = userId;
            this.showDeleteModal = true;
          },
          deleteBarbeiro() {
            this.excluirBarbeiro(this.userIdToDelete);
          },

          hideDeleteModal() {
            this.showDeleteModal = false;
          },  
          showCreateConfirmation() {
          this.showCreateModal = true;
          },  
          openCreatePopup() {
            this.showCreateModal = false;
            this.showCreatePopup = true;
          },
          hideCreateModal() {
            this.showCreateModal = false;
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



<style scoped>


.input-group select{
      width: 200px;
      padding: 5px;
      height: 48px;
    }
    
.popup {
  position: fixed;
  z-index: 99;
  left: 50%;
  top: 50%;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.popup-content {
  background-color: #fefefe;
  margin: 5% auto;
  padding: 25px;
  border: 1px solid #888;
  width: 50%;
  min-height: 600px;
  border-radius: 15px;
}

.close {
  color: #aaaaaa;
  font-size: 28px;
  font-weight: bold;
  z-index: 99;
  top:12%;
  right:25%;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
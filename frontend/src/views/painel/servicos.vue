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

<form @submit="createServico" style="display:contents">
      <div class="popup-content">
        <span class="close" @click="closeCreatePopup">&times;</span>
        <h2>Criar Serviço</h2>
        <!-- Campos de edição com títulos -->
        <div class="input-group">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" name="nome">
        </div>
        <div class="input-group">
          <label for="descricao">Descrição:</label>
          <input type="text" id="descricao" name="descricao">
        </div>
        <div class="input-group">
          <label for="preco">Preço:</label>
          <input type="number" id="preco" name="preco">
        </div>
        <div class="input-group">
          <label for="duracao">Duracao:</label>
          <input type="number" id="duracao" name="duracao">
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



<button class="save-button" style="margin: 0% 5%;width:auto" @click="showCreateConfirmation()">+ Novo serviço</button>

<form style="margin:1% 5%;">
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

    <ConfirmationModal
      :showModal="showCreateModal"
      :message="'Tem a certeza que quer criar um serviço?'"
      :onConfirm="openCreatePopup"
      :onCancel="hideCreateModal"
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
            showCreateModal: false,
            userIdToEdit: null,
            userIdToDelete: null,
            editedUser: {},
            showEditPopup: false,
            showCreatePopup: false,
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
        async createServico() {
          const nome = document.getElementById('nome').value;
          const descricao = document.getElementById('descricao').value;
          const preco = document.getElementById('preco').value;
          const duracao = document.getElementById('duracao').value;
          const ativo = document.getElementById('ativo').value;
        try {
          const response = await fetch(`http://localhost:5000/painel/servicos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
              nome,
              descricao,
              preco,
              duracao,
              ativo
              })
          });
          if (response.ok) {
            console.log('Serviço criado com sucesso!');
            this.hideServicoModal();
            this.fetchServicos();
          } else {
            console.error('Erro ao criar o serviço:', response.statusText);
          }
        } catch (error) {
          console.error('Erro ao criar o serviço:', error);
        }
        },
        async excluirServico() {
        try {
          const response = await fetch(`http://localhost:5000/painel/servicos/${this.userIdToDelete}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
              },
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
        showEditConfirmation(id) {
        this.userIdToEdit = id;
        this.showEditModal = true;
        },
        openEditPopup() {
          this.showEditModal = false;
          this.showEditPopup = true;
          // Carregar os dados do utilizador a ser editado
          this.editedUser = this.servicos.find(user => user.Id === this.userIdToEdit);
        },
        closeEditPopup() {
        this.showEditPopup = false;
        },
        closeCreatePopup(){
          this.showCreatePopup = false;
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
          this.fetchServicos();    
        },
      name:'painelServicos',
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


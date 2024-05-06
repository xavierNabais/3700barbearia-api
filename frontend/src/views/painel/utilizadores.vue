<template>

<div v-if="showCreatePopup" class="popup" style="height:auto">

<form @submit="createUtilizador" style="display:contents">
      <div class="popup-content">
        <span class="close" @click="closeCreatePopup">&times;</span>
        <h2>Criar Utilizador</h2>
        <div class="input-group">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" name="nome">
        </div>
        <div class="input-group">
          <label for="apelido">Apelido:</label>
          <input type="text" id="apelido" name="apelido">
        </div>
        <div class="input-group">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username">
        </div>
        <div class="input-group">
          <label for="email">Email:</label>
          <input type="email" id="email" name="email">
        </div>
        <div class="input-group">
          <label for="password">Password:</label>
          <input type="password" id="password" name="password">
        </div>
        <div class="input-group">
          <label for="telemovel">Telemóvel:</label>
          <input type="number" id="telemovel" name="telemovel">
        </div>
        <div class="input-group">
          <label for="pontos">Pontos:</label>
          <input type="number" id="pontos" name="pontos">
        </div>
        <div class="input-group">
          <label for="admin">Cargo:</label>
          <select id="cargo" v-model="editedUser.Cargo" name="cargo">
            <option value="0">Utilizador</option>
            <option value="1">Admin</option>
            <option value="2">Funcionário</option>
          </select>
        </div>
        <button class="savePanel">Criar</button>
      </div>
</form>
</div>


<div v-if="showEditPopup" class="popup" style="height:auto">
  <form @submit="submitEdit" style="display:contents">
        <div class="popup-content">
          <span class="close" @click="closeEditPopup">&times;</span>
          <h2>Editar Utilizador</h2>
          <div class="input-group">
            <label for="nome">Nome:</label>
            <input type="text" id="nome" v-model="editedUser.Nome" placeholder="Nome">
          </div>
          <div class="input-group">
            <label for="apelido">Apelido:</label>
            <input type="text" id="apelido" v-model="editedUser.Apelido" placeholder="Apelido">
          </div>
          <div class="input-group">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="editedUser.Username" placeholder="Username">
          </div>
          <div class="input-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="editedUser.Email" placeholder="Email">
          </div>
          <div class="input-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="editedUser.Password">
          </div>
          <div class="input-group">
            <label for="telemovel">Telemóvel:</label>
            <input type="number" id="telemovel" v-model="editedUser.Telemovel">
          </div>
          <div class="input-group">
            <label for="number">Pontos:</label>
            <input type="pontos" id="pontos" v-model="editedUser.Pontos">
          </div>
          <div class="input-group">
            <label for="admin">Cargo:</label>
            <select id="cargo" v-model="editedUser.Cargo" name="cargo">
              <option value="0">Utilizador</option>
              <option value="1">Admin</option>
              <option value="2">Funcionário</option>
            </select>
          </div>
          <button class="savePanel">Guardar</button>
        </div>
      </form>
      </div>


      <button class="save-button" style="margin: 0% 5%;width:auto" @click="showCreateConfirmation()">+ Novo utilizador</button>

  
    <form style="margin:1% 5%;">
      <table class="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Apelido</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Telemóvel</th>
            <th>Pontos</th>
            <th>Admin</th>
            <th style="text-align:center">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dados in utilizadores" :key="dados.id" class="ag-courses_item">
            <td>{{ dados.Id }}</td>
            <td>{{ dados.Nome }}</td>
            <td>{{ dados.Apelido }}</td>
            <td>{{ dados.Username }}</td>
            <td>{{ dados.Email }}</td>
            <td>
                <div v-if="!dados.showPassword">
                  <button class="showPasswordButton" @click="toggleShowPassword(dados)">
                    <i class="fas fa-eye"></i>
                  </button>
                </div>
                <div v-else>
                  <div>{{ dados.Password }}</div>
                  <button class="hidePasswordButton" @click="toggleShowPassword(dados)">
                    <i class="fas fa-eye-slash"></i>
                  </button>
                </div>
              </td>     
            <td>{{ dados.Telemovel }}</td>
            <td>{{ dados.Pontos }}</td>       
            <td>{{ dados.Cargo }}</td>
            <td style="text-align:center">
              <button class="editPanel" @click.prevent="showEditConfirmation(dados.Id)" style="color:black;margin-right:25px;"><i class="fas fa-edit"></i></button>
              <button class="editPanel" @click.prevent="showDeleteConfirmation(dados.Id)" style="color:black;"><i class="fas fa-trash"></i></button>
              </td>
          </tr>
        </tbody>
      </table>
    </form>

    <ConfirmationModal
      :showModal="showEditModal"
      :message="'Tem a certeza que quer editar este utilizador?'"
      :onConfirm="openEditPopup"
      :onCancel="hideEditModal"
    />

    <ConfirmationModal
      :showModal="showDeleteModal"
      :message="'Tem a certeza que quer apagar este utilizador?'"
      :onConfirm="deleteUser"
      :onCancel="hideDeleteModal"
    />

    <ConfirmationModal
      :showModal="showCreateModal"
      :message="'Tem a certeza que quer criar um utilizador?'"
      :onConfirm="openCreatePopup"
      :onCancel="hideCreateModal"
    />


</template>
<script>
import ConfirmationModal from "../../components/confirmation/ConfirmationModal.vue";

export default {
  name: 'painelUtilizadores',
  components: {
    ConfirmationModal
  },
  data() {
    return {
      utilizadores: [],
      showEditModal: false,
      showDeleteModal: false,
      userIdToEdit: null,
      userIdToDelete: null,
      editedUser: {},
      showEditPopup: false,
      novaPassword: '',
      showCreateModal: false,
      showCreatePopup: false,
    };
  },
  methods: {
    async fetchUtilizadores() {
      try {
        const response = await fetch('http://localhost:5000/painel/utilizadores');
        const data = await response.json();
        this.utilizadores = data;
      } catch (error) {
        console.error('Erro ao procurar os dados dos serviços:', error);
      }
    },
    async createUtilizador() {
          const nome = document.getElementById('nome').value;
          const apelido = document.getElementById('apelido').value;
          const username = document.getElementById('username').value;
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          const telemovel = document.getElementById('telemovel').value;
          const pontos = document.getElementById('pontos').value;
          const cargo = document.getElementById('cargo').value;
          try {
            const response = await fetch('http://localhost:5000/painel/utilizadores', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                nome,
                apelido,
                username,
                email,
                password,
                telemovel,
                pontos,
                cargo
                })
              });
              if (response.ok) {
                console.log('Utlizador criado com sucesso!');
                this.hideUtilizadorModal();
                this.fetchUtilizadores();
              } else {
                console.error('Erro ao criar o utilizador:', response.statusText);
              }
            } catch (error) {
              console.error('Erro ao criar o utilizador:', error);
            }
            },
    async excluirUtilizador(userIdToDelete) {
      try {
        const response = await fetch(`http://localhost:5000/painel/utilizadores/${userIdToDelete}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          console.log('Utilizador excluído com sucesso!');
          this.hideDeleteModal();
          this.fetchUtilizadores();
        } else {
          console.error('Erro ao excluir o utilizador:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao excluir o utilizador:', error);
      }
    },
    toggleShowPassword(dados) {
      dados.showPassword = !dados.showPassword;
    },
    showEditConfirmation(id) {
      this.userIdToEdit = id;
      this.showEditModal = true;
    },
    openEditPopup() {
      this.showEditModal = false;
      this.showEditPopup = true;
      this.editedUser = this.utilizadores.find(user => user.Id === this.userIdToEdit);
    },
    closeEditPopup() {
      this.showEditPopup = false;
    },
    closeCreatePopup(){
      this.showCreatePopup = false;
    },
        async submitEdit() {
      if (this.editedUser.Password.trim() == '') {
        const editedUserData = { ...this.editedUser };

        delete editedUserData.Password;

        try {
          console.log(editedUserData);
          const response = await fetch(`http://localhost:5000/painel/utilizadores/${this.userIdToEdit}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedUserData) 
          });

          if (response.ok) {
            console.log('Utilizador atualizado com sucesso!');
            this.closeEditPopup();
            this.fetchUtilizadores();
          } else {
            console.error('Erro ao editar o utilizador:', response.statusText);
          }
        } catch (error) {
          console.error('Erro ao editar o utilizador:', error);
        }
      } else {
        try {
          const response = await fetch(`http://localhost:5000/painel/utilizadores/${this.userIdToEdit}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.editedUser) 
          });

          if (response.ok) {
            console.log('Utilizador atualizado com sucesso!');
            this.closeEditPopup();
            this.fetchUtilizadores();
          } else {
            console.error('Erro ao editar o utilizador:', response.statusText);
          }
        } catch (error) {
          console.error('Erro ao editar o utilizador:', error);
        }
      }
    },
    hideEditModal() {
      this.showEditModal = false;
    },
    showDeleteConfirmation(userId) {
      this.userIdToDelete = userId;
      this.showDeleteModal = true;
    },
    deleteUser() {
      this.excluirUtilizador(this.userIdToDelete);
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
    this.fetchUtilizadores();
  }
};
</script>


<style scoped>

.showPasswordButton,
.hidePasswordButton {
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: blue;
  text-decoration: underline;
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


.input-group select{
  width: 200px;
    padding: 5px;
    height: 48px;
}
</style>
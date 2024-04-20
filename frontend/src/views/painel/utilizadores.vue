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
            <label for="apelido">Apelido:</label>
            <input type="text" id="apelido" v-model="editedUser.Apelido" placeholder="Apelido">
          </div>
          <div class="input-group">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="editedUser.Username" placeholder="Username">
          </div>
          <div class="input-group">
            <label for="email">Email:</label>
            <input type="text" id="email" v-model="editedUser.Email" placeholder="Email">
          </div>
          <div class="input-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="editedUser.Password">
          </div>
          <div class="input-group">
            <label for="admin">Admin:</label>
            <input type="text" id="admin" v-model="editedUser.Cargo" placeholder="Admin">
          </div>
          <button class="savePanel">Guardar</button>
        </div>
      </form>
      </div>


  <div>
    <form style="margin:5%;">
      <table class="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Apelido</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
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
              </td>            <td>{{ dados.Cargo }}</td>
            <td style="text-align:center">
              <button class="editPanel" @click.prevent="showEditConfirmation(dados.id)" style="color:black;margin-right:25px;"><i class="fas fa-edit"></i></button>
              <button class="editPanel" @click.prevent="showDeleteConfirmation(dados.id)" style="color:black;"><i class="fas fa-trash"></i></button>
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
  </div>
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
    };
  },
  methods: {
    async fetchUtilizadores() {
      try {
        const response = await fetch('http://localhost:5000/painel/utilizadores');
        const data = await response.json();
        this.utilizadores = data;
      } catch (error) {
        console.error('Erro ao buscar os dados dos serviços:', error);
      }
    },
    async excluirUtilizador() {
      try {
        const response = await fetch(`http://localhost:5000/painel/utilizadores/${this.userIdToDelete}`, {
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
    showEditConfirmation(userId) {
      this.editedUser = Object.assign({}, this.fetchUtilizadores(userId));
      this.showEditModal = true;
    },
    openEditPopup() {
      this.showEditModal = false;
      this.showEditPopup = true;
      // Carregar os dados do utilizador a ser editado
      this.editedUser = this.utilizadores.find(user => user.id === this.userId);
    },
    closeEditPopup() {
      this.showEditPopup = false;
    },
        async submitEdit() {
      if (this.editedUser.Password.trim() == '') {
        // Cria uma cópia do objeto editedUser
        const editedUserData = { ...this.editedUser };

        // Remove a propriedade Password do objeto
        delete editedUserData.Password;

        try {
          console.log(editedUserData);
          const response = await fetch(`http://localhost:5000/painel/utilizadores/${this.userIdToEdit}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedUserData) // Envia a cópia do objeto sem a propriedade Password
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
            body: JSON.stringify(this.editedUser) // Envia a cópia do objeto sem a propriedade Password
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
      this.deleteUser(userId);
    },
    deleteUser(userId) {
      this.excluirUtilizador(userId);
    },
    hideDeleteModal() {
      this.showDeleteModal = false;
    }
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


/* Estilos adicionais */
.input-group {
  margin-bottom: 10px;
}
.input-group label {
  display: inline-block;
  width: 100px;
}
.input-group input {
  width: calc(100% - 110px);
  padding: 5px;
}
</style>
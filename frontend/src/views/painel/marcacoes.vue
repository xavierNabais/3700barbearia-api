<template>

<div v-if="showCreatePopup" class="popup">
  <form @submit="createMarcacao" style="display:contents">
        <div class="popup-content">
          <span class="close" @click="hideCreateModal">&times;</span>
          <h2>Criar marcação</h2>
          <div class="input-group">
            <label for="barbeiro">Barbeiro:</label>
            <select id="id_barbeiro" name="id_barbeiro">
              <option v-for="barbeiro in barbeiros" :key="barbeiro.Id" :value="barbeiro.Id">{{ barbeiro.Nome }}</option>
            </select>
          </div>
          <div class="input-group">
            <label for="utilizador">Utilizador:</label>
            <select id="id_utilizador" name="id_utilizador">
              <option v-for="utilizador in utilizadores" :key="utilizador.Id" :value="utilizador.Id">{{ utilizador.Nome }}</option>
            </select>
          </div>
          <div class="input-group">
            <label for="servico">Serviço:</label>
            <select id="id_servico" name="id_servico">
              <option v-for="servico in servicos" :key="servico.Id" :value="servico.Id">{{ servico.Nome }}</option>
            </select>
          </div>
          <div class="input-group">
            <label for="data">Data e Hora:</label>
            <input type="datetime-local" id="data" name="data">
          </div>
          <div class="input-group">
            <label for="admin">Notas:</label>
            <input type="text" id="notas" name="notas">
          </div>
          <button class="savePanel">Criar</button>
        </div>
    </form>
</div>



<div v-if="showEditPopup" class="popup">
  <form @submit="submitEdit" style="display:contents" name="submit">
        <div class="popup-content">
          <span class="close" @click="closeEditPopup">&times;</span>
          <h2>Editar Utilizador</h2>
          <div class="input-group">
            <label for="barbeiro">Barbeiro:</label>
            <select id="Id_barbeiro" name="Id_barbeiro" v-model="editedUser.Id_barbeiro" form="submit">
              <option v-for="barbeiro in barbeiros" :key="barbeiro.Id" :value="barbeiro.Id">{{ barbeiro.Nome }}</option>
            </select>
          </div>
          <div class="input-group">
            <label for="utilizador">Utilizador:</label>
            <select id="Id_utilizador" name="Id_utilizador" v-model="editedUser.Id_utilizador" form="submit">
              <option v-for="utilizador in utilizadores" :key="utilizador.Id" :value="utilizador.Id">{{ utilizador.Nome }}</option>
            </select>
          </div>
          <div class="input-group">
            <label for="servico">Serviço:</label>
            <select id="Id_servico" name="Id_servico" v-model="editedUser.Id_servico" form="submit">
              <option v-for="servico in servicos" :key="servico.Id" :value="servico.Id">{{ servico.Nome }}</option>
            </select>
          </div>
          <div class="input-group">
            <label for="data">Data e Hora:</label>
            <input type="datetime-local" id="data" name="data">
          </div>
          <div class="input-group">
            <label for="Notas">Notas:</label>
            <input type="text" id="Notas" v-model="editedUser.Notas">
          </div>
          <button class="savePanel">Guardar</button>
        </div>
      </form>
      </div>




      <button class="save-button" style="margin: 0% 5%;width:auto" @click="showCreateConfirmation()">+ Nova marcação</button>



<form style="margin:1% 5%;">
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
      <tr v-for="dados in marcacoes" :key="dados.id" class="ag-courses_item">
        <td>{{ dados.Id }}</td>
        <td>{{ dados.nomeBarbeiro }}</td>
        <td>{{ dados.nomeUtilizador }}</td>
        <td>{{ dados.nomeServico }}</td>
        <td>{{ dados.DataFormatada }}</td>
        <td>{{ dados.Notas }}</td>
        <td>
          <button class="editPanel" @click.prevent="showEditConfirmation(dados.Id)" style="color:black;margin-right:25px;"><i class="fas fa-edit"></i></button>
          <button class="editPanel" @click.prevent="showDeleteConfirmation(dados.Id)" style="color:black;"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    </tbody>
  </table>
</form>

<ConfirmationModal
      :showModal="showCreateModal"
      :message="'Tem a certeza que quer criar uma marcação?'"
      :onConfirm="openCreatePopup"
      :onCancel="hideCreatePopup"
    />

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
            marcacoes: [], 
            utilizadores: [],
            barbeiros: [],
            servicos: [],
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
          async fetchMarcacoes() {
            try {
              const response = await fetch('http://localhost:5000/painel/marcacoes');
              const data = await response.json();
              this.marcacoes = data;
            } catch (error) {
              console.error('Erro ao buscar os dados dos Marcaçãos:', error);
            }
          },
          async fetchUtilizadores() {
            try {
              const response = await fetch('http://localhost:5000/painel/utilizadores');
              const data = await response.json();
              this.utilizadores = data;
            } catch (error) {
              console.error('Erro ao buscar os dados dos Marcaçãos:', error);
            }
          },
          async fetchBarbeiros() {
            try {
              const response = await fetch('http://localhost:5000/painel/barbeiros');
              const data = await response.json();
              this.barbeiros = data;
            } catch (error) {
              console.error('Erro ao buscar os dados dos Marcaçãos:', error);
            }
          },
          async fetchServicos() {
            try {
              const response = await fetch('http://localhost:5000/painel/servicos');
              const data = await response.json();
              this.servicos = data;
            } catch (error) {
              console.error('Erro ao buscar os dados dos Marcaçãos:', error);
            }
          },
          async createMarcacao() {
          const id_utilizador = document.getElementById('id_utilizador').value;
          const id_barbeiro = document.getElementById('id_barbeiro').value;
          const id_servico = document.getElementById('id_servico').value;
          const data = document.getElementById('data').value;
          const notas = document.getElementById('notas').value;
          try {
            const response = await fetch(`http://localhost:5000/painel/marcacoes`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                id_utilizador,
                id_barbeiro,
                id_servico,
                data,
                notas
                })
              });
              if (response.ok) {
                console.log('Marcação criada com sucesso!');
                this.hideBarbeiroModal();
                this.fetchBarbeiros();
              } else {
                console.error('Erro ao criar a marcação:', response.statusText);
              }
            } catch (error) {
              console.error('Erro ao criar a marcação:', error);
            }
            },

        async excluirMarcacao(userIdToDelete) {
        try {
          const response = await fetch(`http://localhost:5000/painel/marcacoes/${userIdToDelete}`, {
            method: 'DELETE'
          });

          if (response.ok) {
            console.log('Marcação excluída com sucesso!');
            this.hideDeleteModal();
            this.fetchMarcacoes();
          } else {
            console.error('Erro ao excluir a marcação:', response.statusText);
          }
        } catch (error) {
          console.error('Erro ao excluir a marcação:', error);
        }
        },
        async submitEdit() {
          try {

            this.editedUser.Id = this.userIdToEdit;
            this.editedUser.Id_barbeiro = document.getElementById('Id_barbeiro').value;
            this.editedUser.Id_utilizador = document.getElementById('Id_utilizador').value;
            this.editedUser.Id_servico = document.getElementById('Id_servico').value;
            this.editedUser.Data = document.getElementById('data').value;
            this.editedUser.Notas = document.getElementById('Notas').value;

            const response = await fetch(`http://localhost:5000/painel/marcacoes/${this.userIdToEdit}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.editedUser) 
            });

            if (response.ok) {
              console.log('Marcação atualizada com sucesso!');
              this.closeEditPopup();
              this.fetchMarcacoes();
            } else {
              console.error('Erro ao editar a Marcação:', response.statusText);
            }
          } catch (error) {
            console.error('Erro ao editar a Marcação:', error);
          }
        },
        openEditPopup() {
        this.showEditModal = false;
        this.showEditPopup = true;

        const marcacao = this.marcacoes.find(marcacao => marcacao.Id === this.userIdToEdit);

        this.editedUser = {
          Id_barbeiro: marcacao.Id_barbeiro,
          Id_utilizador: marcacao.Id_utilizador,
          Id_servico: marcacao.Id_servico,
          Data: marcacao.Data,
          Notas: marcacao.Notas
        };
      },

      showEditConfirmation(userId) {
        this.userIdToEdit = userId;

        this.showEditModal = true;

        this.editedUser = this.marcacoes.find(marcacao => marcacao.Id === userId);
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
        showCreateConfirmation() {
          this.showCreateModal = true;
          },  
          openCreatePopup() {
            this.showCreateModal = false;
            this.showCreatePopup = true;
          },
          hideCreatePopup(){
            this.showCreateModal = false;
          },
          hideCreateModal() {
            this.showCreatePopup = false;
          },
      },
      
        mounted() {
          this.fetchMarcacoes();    
          this.fetchUtilizadores();
          this.fetchBarbeiros();
          this.fetchServicos();
        },
        name:'painelMarcacoes',
        components: {
          ConfirmationModal
        },
    
      }
      </script>


<style scoped>

.input-group select {
  width:347px;
  height: 48px
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
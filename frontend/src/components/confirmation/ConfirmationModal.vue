<template>
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <p>{{ message }}</p>
        <div class="modal-buttons">
          <button class="confirm-button" @click="confirm">Sim</button>
          <button class="cancel-button" @click="cancel">Não</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ConfirmationModal',
    props: {
      message: {
        type: String,
        required: true
      },
      showModal: {
        type: Boolean,
        required: true
      },
      onConfirm: {
        type: Function,
        required: true
      },
      onCancel: {
        type: Function,
        required: true
      }
    },
    methods: {
      confirm() {
        this.onConfirm();
      },
      cancel() {
        this.onCancel();
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos para o modal */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    text-align: center;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    width: 20%;
    height: 15%;
  }

  .modal-content p{
    margin-bottom:40px;
  }
  
  .modal-buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .confirm-button, .cancel-button {
    padding: 10px 20px;
    margin: 0 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .confirm-button {
    background-color: green;
    color: white;
  }
  
  .cancel-button {
    background-color: red;
    color: white;
  }
  </style>
  
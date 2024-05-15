<template>
    <div class="dialog-modal">
      <p>Serviço: {{ servico }}</p>
      <p>Barbeiro: {{ barbeiro }}</p>
      <p>Data e hora: {{ dataHora }}</p>
      <p>Notas: {{ notas }}</p>
    </div>
  </template>
  
  <style scoped>
  .dialog-modal {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  </style>
  
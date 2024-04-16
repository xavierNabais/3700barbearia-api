<template>


<section class="servico-bloco">

<p style="font-size: 32px; color: white; font-weight: bold;">SERVIÇOS</p>
<div class="separador">
                <img src="../../assets/images/bigode_line.png" alt="Bigode" style="width:10%;">
            </div>


<div class="servico">

    <div class="servicesLeft" style="flex:1;">
        <div class="blocks">

            <div v-for="dados in servicos" :key="dados.id" class="bloco-servico">
                <div style="margin-left:10%">
                    <h3 style="color:#F1B809; text-transform: uppercase; font-size: 24px;">{{ dados.Nome }}</h3>
                    <p style="font-size:14px;line-height: 170%">{{ dados.Descricao }}</p>
                    <div style="margin-left:50%; width: 150px;"><img src="../../assets/images/tesoura.png" alt="Tesoura" style="width: 45%;"></div>
                </div>
            </div>

        </div>
    </div>


<div class="servicesLeft" style="flex:1;">
    <div class="block">
        <img src="../../assets/images/giff.gif" alt="Imagem" style="width: 45%;box-shadow: 20px 20px 5px rgba(0, 0, 0, 0.342);">
    </div>
</div>
</div>
</section>
    
    </template>
    
    
    <script>
    export default {
    name: 'SectionServicos',
    data() {
      return {
        servicos: [], // Propriedade para armazenar os dados dos serviços
        };
    },
    methods: {
        async fetchServicos() {
        try {
            const response = await fetch('http://localhost:5000/painel/servicos');
            const data = await response.json();
            this.servicos = data.slice(0, 4); // Limita para os primeiros 4 registros
        } catch (error) {
            console.error('Erro ao buscar os dados dos serviços:', error);
        }
        }
    },
    mounted() {
      this.fetchServicos();
    },
    
    }
    
    </script>
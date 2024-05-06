<template>

    <!-- DESKTOP -->

<section class="servico-bloco desktop">

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
                    <p style="font-size:16px;line-height: 190%">{{ dados.Descricao }}</p>
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



    <!-- MOBILE -->


<section class="servico-bloco mobile" style="height:auto">

<p style="font-size: 32px; color: white; font-weight: bold;">SERVIÇOS</p>
<div class="separador">
                <img src="../../assets/images/bigode_line.png" alt="Bigode" style="width:50%;">
            </div>


<div class="servico">

    <div class="servicesLeft" style="flex:1;">
        <div class="blocks" style="justify-content:center;padding-bottom:10%">

            <div v-for="dados in servicos" :key="dados.id" class="bloco-servico" style="text-align:center">
                <div style="padding:10%">
                    <h3 style="color:#F1B809; text-transform: uppercase; font-size: 24px;">{{ dados.Nome }}</h3>
                    <p style="font-size:16px;line-height: 190%">{{ dados.Descricao }}</p>
                </div>
            </div>

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
          servicos: [], 
        };
      },
      methods: {
        // Método assíncrono para obter os serviços
        async obterServicos() {
          try {
            // Faz uma requisição para obter os serviços
            const resposta = await fetch('http://localhost:5000/painel/servicos');
            // Converte a resposta para JSON
            const dados = await resposta.json();
            // Filtra os serviços para obter serviços específicos
            this.servicos = dados.filter(servico => {
              const nome = servico.Nome.toLowerCase();
              return nome === 'corte' || nome === 'sobrancelhas' || nome === 'acabamento' || nome === 'penteado';
            });
          } catch (erro) {
            // Captura e regista qualquer erro na obtenção dos dados dos serviços
            console.error('Erro ao obter os dados dos serviços:', erro);
          }
        }
      },
      mounted() {
        this.obterServicos();
      },
    }
    </script>
    

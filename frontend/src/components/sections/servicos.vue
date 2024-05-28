<template>

    <!-- DESKTOP -->

<section class="servico-bloco desktop" id="servicos">

<p style="font-size: 32px; color: white; font-weight: bold;">SERVIÇOS</p>
<div class="separador">
                <img src="../../assets/images/bigode_line.png" alt="Bigode" style="width:10%;">
            </div>


<div class="servico">

    <div class="servicesLeft" style="flex:1;">
        <div class="blocks">

            <div class="bloco-servico">
                <div style="margin-left:10%">
                    <h3 style="color:#F1B809; text-transform: uppercase; font-size: 24px;">Corte de cabelo</h3>
                    <p style="font-size:16px;line-height: 190%">Corte de cabelo personalizado conforme suas preferências e estilo.</p>
                    <div style="margin-left:60%; width: 150px;"><img src="../../assets/images/tesoura.png" alt="Tesoura" style="width: 45%;"></div>
                </div>
            </div>

            <div class="bloco-servico">
                <div style="margin-left:10%">
                    <h3 style="color:#F1B809; text-transform: uppercase; font-size: 24px;">Pintura</h3>
                    <p style="font-size:16px;line-height: 190%">Coloração de cabelo para dar um toque único e moderno ao seu visual.</p>
                    <div style="margin-left:60%; width: 150px;"><img src="../../assets/images/pincel.png" alt="Tesoura" style="width: 45%;"></div>
                </div>
            </div>

            <div class="bloco-servico">
                <div style="margin-left:10%">
                    <h3 style="color:#F1B809; text-transform: uppercase; font-size: 24px;">Barba</h3>
                    <p style="font-size:16px;line-height: 190%">Tratamento profissional para modelar e aparar a barba, mantendo-a impecável.</p>
                    <div style="margin-left:60%; width: 150px;"><img src="../../assets/images/barbeador.png" alt="Tesoura" style="width: 45%;"></div>
                </div>
            </div>

            <div class="bloco-servico">
                <div style="margin-left:10%">
                    <h3 style="color:#F1B809; text-transform: uppercase; font-size: 24px;">Tratamento Capilar</h3>
                    <p style="font-size:16px;line-height: 190%">Um tratamento especializado para cabelos pintados.</p>
                    <div style="margin-left:60%; width: 150px;"><img src="../../assets/images/cuidado-capilar.png" alt="Tesoura" style="width: 45%;"></div>
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


<section class="servico-bloco mobile" style="height:auto" id="servicos">

<p style="font-size: 32px; color: white; font-weight: bold;">SERVIÇOS</p>
<div class="separador">
                <img src="../../assets/images/bigode_line.png" alt="Bigode" style="width:50%;">
            </div>


<div class="servico">

    <div class="servicesLeft" style="flex:1;">
        <div class="blocks" style="justify-content:center;padding-bottom:10%">

          <div class="bloco-servico">
                <div style="margin-left:10%">
                    <h3 style="color:#F1B809; text-transform: uppercase; font-size: 24px;">Corte de cabelo</h3>
                    <p style="font-size:16px;line-height: 190%">Corte de cabelo personalizado conforme suas preferências e estilo.</p>
                    <div style="margin-left:60%; width: 150px;"><img src="../../assets/images/tesoura.png" alt="Tesoura" style="width: 45%;"></div>
                </div>
            </div>

            <div class="bloco-servico">
                <div style="margin-left:10%">
                    <h3 style="color:#F1B809; text-transform: uppercase; font-size: 24px;">Pintura</h3>
                    <p style="font-size:16px;line-height: 190%">Coloração de cabelo para dar um toque único e moderno ao seu visual.</p>
                    <div style="margin-left:60%; width: 150px;"><img src="../../assets/images/pincel.png" alt="Tesoura" style="width: 45%;"></div>
                </div>
            </div>

            <div class="bloco-servico">
                <div style="margin-left:10%">
                    <h3 style="color:#F1B809; text-transform: uppercase; font-size: 24px;">Barba</h3>
                    <p style="font-size:16px;line-height: 190%">Tratamento profissional para modelar e aparar a barba, mantendo-a impecável.</p>
                    <div style="margin-left:60%; width: 150px;"><img src="../../assets/images/barbeador.png" alt="Tesoura" style="width: 45%;"></div>
                </div>
            </div>

            <div class="bloco-servico">
                <div style="margin-left:10%">
                    <h3 style="color:#F1B809; text-transform: uppercase; font-size: 24px;">Tratamento Capilar</h3>
                    <p style="font-size:16px;line-height: 190%">Um tratamento especializado para cabelos pintados.</p>
                    <div style="margin-left:60%; width: 150px;"><img src="../../assets/images/cuidado-capilar.png" alt="Tesoura" style="width: 45%;"></div>
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
      mounted() {
        this.obterServicos();
      },
    }
    </script>
    

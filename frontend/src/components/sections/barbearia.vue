<template>
        <section class="barbearia">
            <p style="font-size: 32px; color: white; font-weight: bold;">A BARBEARIA</p>
            <div class="separador">
                <img src="../../assets/images/bigode_line.png" alt="Bigode" style="width:10%;">
            </div>
        <div class="conteudo">
            <div class="conteudo-texto">
            <p style="font-size: 24px;color: white;line-height: 50px">
                Bem-vindo à Barbearia [Nome] Localizada no coração da cidade, a Barbearia [Nome] oferece serviços de barbearia de alta qualidade para homens que procuram um corte de cabelo e barba impecáveis. Com uma equipe de barbeiros experientes e apaixonados, estamos comprometidos em proporcionar uma experiência de cuidado pessoal excepcional a cada cliente.
            </p>
            <div style="gap:30px;display: flex;margin-top:10%;">
                <div><img src="../../assets/images/aboutus.jpg" style="width:100%;" class="lightbox"></div>
                <div><img src="../../assets/images/aboutus.jpg" style="width:100%" class="lightbox"></div>
                <div><img src="../../assets/images/aboutus.jpg" style="width:100%" class="lightbox"></div>
                <div><img src="../../assets/images/aboutus.jpg" style="width:100%" class="lightbox"></div>
            </div>
            </div>
        </div>

        <div class="container">
            <div class="quadrado">
            <div class="centro">
                <img class="logotipo" src="../../assets/images/marcas/gilette.png" alt="Logotipo">
            </div>
            </div>
            <div class="quadrado">
            <div class="centro">
                <img class="logotipo" src="../../assets/images/marcas/sa.png" alt="Logotipo">
            </div>
            </div>
            <div class="quadrado">
            <div class="centro">
                <img class="logotipo" src="../../assets/images/marcas/amway.png" alt="Logotipo">
            </div>
            </div>
            <div class="quadrado">
            <div class="centro">
                <img class="logotipo" src="../../assets/images/marcas/keri.png" alt="Logotipo">
            </div>
            </div>
        </div>


        </section>
</template>

<script>
export default {
name: 'SectionBarbearia',

}

</script>


<style scoped>

.lightbox:hover{
    transform: translateY(-15px);
    transition:0.2s;
}

.lightbox{
    transition:0.2s;
    border: 1px solid white;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 430px; /* Altura da div */
  padding:5% 0;
  background:linear-gradient(rgba(0, 0, 0, 0.85)), url('../../assets/images/contactos.png');
  background-attachment: fixed;
}

.logotipo {
  width: 150px; /* Largura do logotipo */
  height: auto; /* Altura do logotipo */
}

.quadrado {
  width: 430px; /* Largura do quadrado */
  height: 230px; /* Altura do quadrado */
  border: 1px solid #ddd; /* Borda cinza claro */
  margin: 5px; /* Espaçamento entre os quadrados */
  position: relative; /* Posição relativa para posicionar o logotipo */
  opacity:0.3;
  transition:0.4s;
}

.quadrado:hover {
    opacity:1;
}

.centro {
  position: absolute; /* Posição absoluta para centralizar o logotipo */
  top: 50%; /* Alinhamento vertical ao centro */
  left: 50%; /* Alinhamento horizontal ao centro */
  transform: translate(-50%, -50%); /* Centralizar */
}

</style>
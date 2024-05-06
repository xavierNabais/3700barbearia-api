<template>

    <!-- DESKTOP -->
        <section class="barbearia desktop">
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







    <!-- MOBILE -->

        <section class="barbearia mobile">
            <p style="font-size: 32px; color: white; font-weight: bold;">A BARBEARIA</p>
            <div class="separador">
                <img src="../../assets/images/bigode_line.png" alt="Bigode" style="width:50%;">
            </div>
        <div class="conteudo" style="width:80%">
            <div class="conteudo-texto" style="padding:0">
            <p style="font-size: 16px;color: white;line-height: 35px;">
                Bem-vindo à Barbearia [Nome] Localizada no coração da cidade, a Barbearia [Nome] oferece serviços de barbearia de alta qualidade para homens que procuram um corte de cabelo e barba impecáveis. Com uma equipe de barbeiros experientes e apaixonados, estamos comprometidos em proporcionar uma experiência de cuidado pessoal excepcional a cada cliente.
            </p>
                <div style="margin: 50px 0px 10px 0px"><img src="../../assets/images/aboutus.jpg" style="width:100%;border: 1px solid white;"></div>
                <div style="margin: 10px 0px"><img src="../../assets/images/aboutus.jpg" style="width:100%;border: 1px solid white;"></div>
            </div>
        </div>

        <div class="container" style="height:auto;padding:0% 10%">
            <div class="quadrado" style="height:150px">
            <div class="centro">
                <img class="logotipo" src="../../assets/images/marcas/gilette.png" alt="Logotipo">
            </div>
            </div>
            <div class="quadrado" style="height:150px">
            <div class="centro">
                <img class="logotipo" src="../../assets/images/marcas/sa.png" alt="Logotipo">
            </div>
            </div>
        </div>
        <div class="container" style="height:auto;padding:0% 10%">
            <div class="quadrado" style="height:150px">
            <div class="centro">
                <img class="logotipo" src="../../assets/images/marcas/amway.png" alt="Logotipo">
            </div>
            </div>
            <div class="quadrado" style="height:150px">
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
  height: 430px; 
  padding:5% 0;
}

.logotipo {
  width: 150px; 
  height: auto; 
}

.quadrado {
  width: 430px; 
  height: 230px; 
  border: 1px solid #ddd; 
  margin: 5px; 
  position: relative; 
  opacity:0.3;
  transition:0.4s;
}

.quadrado:hover {
    opacity:1;
}

.centro {
  position: absolute; 
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%); 
}

</style>
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
  

</style>
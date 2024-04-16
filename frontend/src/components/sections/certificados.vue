
<template>


<div class="scroller" data-direction="left" data-speed="ultra-fast">
  <div class="scroller__inner certificados" style="margin-top:0">
    <img src="../../assets/images/certificado.png" alt="Certificado 1">
    <img src="../../assets/images/certificado.png" alt="Certificado 1">
    <img src="../../assets/images/certificado.png" alt="Certificado 1">
    <img src="../../assets/images/certificado.png" alt="Certificado 1">
    <img src="../../assets/images/certificado.png" alt="Certificado 1">
    <img src="../../assets/images/certificado.png" alt="Certificado 1">

  </div>
</div>

</template>

<script>
export default {
  name: 'SectionCertificados',
  mounted() {
    const scrollers = document.querySelectorAll(".scroller");

    // Se o usuário não optou por reduzir o movimento, então adicionamos a animação
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.addAnimation(scrollers);
    }
  },
  methods: {
    addAnimation(scrollers) {
      scrollers.forEach((scroller) => {
        // Adicione data-animated="true" a cada `.scroller` na página
        scroller.setAttribute("data-animated", true);

        // Faça um array dos elementos dentro de `.scroller-inner`
        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        // Para cada item no array, clone-o
        // adicione aria-hidden a ele
        // adicione-o dentro de `.scroller-inner`
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);
          scrollerInner.appendChild(duplicatedItem);
        });
      });
    }
  }
}


</script>

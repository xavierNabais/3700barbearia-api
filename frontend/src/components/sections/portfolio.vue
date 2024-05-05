<template>


<section class="portfolio-block desktop">

<p style="font-size: 32px; color: white; font-weight: bold;">PORTFOLIO</p>
<div class="separador">
                <img src="../../assets/images/bigode_line.png" alt="Bigode" style="width:10%;">
            </div>




    <div class="scroller" data-direction="left" data-speed="fast">
  <div class="scroller__inner">
    <img src="../../assets/images/portfolio/1.jpg" alt="Testemunho 1">
    <img src="../../assets/images/portfolio/2.jpg" alt="Testemunho 2">
    <img src="../../assets/images/portfolio/3.jpg" alt="Testemunho 3">
    <img src="../../assets/images/portfolio/4.jpg" alt="Testemunho 4">
    <img src="../../assets/images/portfolio/2.jpg" alt="Testemunho 2">
    <img src="../../assets/images/portfolio/5.jpg" alt="Testemunho 5">
    <img src="../../assets/images/portfolio/6.jpg" alt="Testemunho 6">
    <img src="../../assets/images/portfolio/7.jpg" alt="Testemunho 7">
    <img src="../../assets/images/portfolio/8.jpg" alt="Testemunho 8">
  </div>
</div>



</section>









<section class="portfolio-block mobile">

<p style="font-size: 32px; color: white; font-weight: bold;">PORTFOLIO</p>
<div class="separador">
                <img src="../../assets/images/bigode_line.png" alt="Bigode" style="width:50%;">
            </div>




    <div class="scroller" data-direction="left" data-speed="fast">
  <div class="scroller__inner">
    <img src="../../assets/images/portfolio/1.jpg" alt="Testemunho 1" style="width:450px">
    <img src="../../assets/images/portfolio/2.jpg" alt="Testemunho 2" style="width:450px">
    <img src="../../assets/images/portfolio/3.jpg" alt="Testemunho 3" style="width:450px">
    <img src="../../assets/images/portfolio/4.jpg" alt="Testemunho 4" style="width:450px">
    <img src="../../assets/images/portfolio/2.jpg" alt="Testemunho 2" style="width:450px">
    <img src="../../assets/images/portfolio/5.jpg" alt="Testemunho 5" style="width:450px">
    <img src="../../assets/images/portfolio/6.jpg" alt="Testemunho 6" style="width:450px">
    <img src="../../assets/images/portfolio/7.jpg" alt="Testemunho 7" style="width:450px">
    <img src="../../assets/images/portfolio/8.jpg" alt="Testemunho 8" style="width:450px">
  </div>
</div>



</section>


















</template>


<script>
export default {
  name: 'SectionPortfolio',
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
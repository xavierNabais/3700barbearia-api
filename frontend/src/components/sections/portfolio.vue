<template>

    <!-- DESKTOP -->

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







    <!-- MOBILE -->


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
    // Seleciona todos os elementos com a classe "scroller"
    const scrollers = document.querySelectorAll(".scroller");


    this.addAnimation(scrollers);

  },
  methods: {
    addAnimation(scrollers) {
      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", true);

        // Seleciona o conteúdo dentro do elemento "scroller"
        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        // Duplica cada item do conteúdo e oculta o duplicado
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

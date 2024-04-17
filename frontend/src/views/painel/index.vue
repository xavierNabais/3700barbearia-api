<template>

    <Header />
    
    <div class="section2">
      <div class="content2">
        <span class="title2">PAINEL DE CONTROLO</span>
      </div>
    </div>


    <div style="width: 100%; height: auto; background-color: white; padding-bottom: 10%;">
        <div style="padding:5%">
        <p style="font-size: 24px; font-weight: bold;">Gestão de Serviços</p>
        <p>Facilite a organização do seu negócio com o nosso painel de controle de marcações para funcionários! Gerencie eficientemente os horários de trabalho, atribua tarefas, acompanhe as marcações dos clientes e garanta uma gestão de agenda otimizada.</p>
            
            <a href="/painel/utilizadores" style="color:black;">Utilizadores</a>
            <br><br><a href="/painel/servicos"  style="color:black;">Serviços</a>
            <br><br><a href="/painel/barbeiros"  style="color:black;">Barbeiros</a>
            <br><br><a href="/painel/marcacoes"  style="color:black;">Marcações</a>
        
        </div>



    </div>



    
    <Footer />
    
      </template>
      
      <script>
      import Header from '../../components/Header.vue';
      import Footer from '../../components/Footer.vue';
      
      export default {
        components: {
          Header,
          Footer
        },
        name:'indexPainel',
    
      }
      </script>
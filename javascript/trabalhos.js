window.onload = async function (e) {
    let url = "http://localhost:8001/trabalhos";
    let response = await fetch(url);
    let trabalhos = await response.json();

    trabalhos.forEach(trabalhoAtual => {
        // ---- Criando a linha do Trabalho ---- //
        let linhaTrabalho = document.createElement('tr');

        // ---- Separando a data da hora ---- //
        let dataTrabalhoConvertida = trabalhoAtual.DataTrabalho.split("T")[0];

        // ---- Criando as colunas ---- //
        let tdId = document.createElement('td');
        let tdDescricao = document.createElement('td');
        let tdDataTrabalho = document.createElement('td');
        let tdProfessor = document.createElement('td');
        let tdQuestoes = document.createElement('td');
        let tdAcoes = document.createElement('td');

        // ---- Pegando os valores do BD ---- //
        tdId.innerHTML = trabalhoAtual.Id
        tdDescricao.innerHTML = trabalhoAtual.Descricao
        tdDataTrabalho.innerHTML = dataTrabalhoConvertida
        tdProfessor.innerHTML = trabalhoAtual.Professor.Nome
        tdQuestoes.innerHTML = trabalhoAtual.Questoes

        // ---- Inserindo os valores nas celulas ---- //
        linhaTrabalho.appendChild(tdId)
        linhaTrabalho.appendChild(tdDescricao)
        linhaTrabalho.appendChild(tdDataTrabalho)
        linhaTrabalho.appendChild(tdProfessor)
        linhaTrabalho.appendChild(tdQuestoes)
        linhaTrabalho.appendChild(tdAcoes)

        // ---- Inserindo os trabalhos na tabela ---- //
        let tabelaQuestoes = document.querySelector('#linha_trabalho')
        tabelaQuestoes.appendChild(linhaTrabalho)

        // ---- Criando o botão de Editar ---- //
        let botaoEditar = document.createElement('button');
        botaoEditar.innerText = "Editar";
        botaoEditar.classList.add("botao_editar");
        botaoEditar.classList.add("btn")
        botaoEditar.classList.add("btn-primary")
        botaoEditar.classList.add("btn-sm")
        tdAcoes.appendChild(botaoEditar)
        botaoEditar.addEventListener("click", async function (event) {
            // ---- Pegando a linha selecionada e o seu ID e convertendo a data ---- //
            let tr = this.parentNode.parentNode;
            let id = tr.children[0].innerHTML;
            let urlTrabalho = `http://localhost:8001/trabalhos/${id}`;
            let responseTrabalho = await fetch(urlTrabalho);
            let trabalho = await responseTrabalho.json();
            let dataAniversarioConvertida = trabalhoAtual.DataAniversario.split("T")[0]
      
            // ---- Deixar o formulário de editar Visivel ---- //
            let formularioTrabalho = document.querySelector("#formularioTrabalho");
            formularioTrabalho.removeAttribute("style");
      
            // ---- Selecionando as células ---- //
            let idInput = document.querySelector(".id_input");
            let idSpan = document.querySelector("#id_span");
            let descricaoInput = document.querySelector(".descricao_input");
            let dataTrabalhoInput = document.querySelector(".data_trabalho_input");
            let professorInput = document.querySelector(".professor_input");
            let questaoInput = document.querySelector(".questao_input");
      
            // ---- Inserindo valores nas celulas do formulário de editar ---- //
            idInput.value = trabalho.Id;
            idSpan.innerHTML = trabalho.Id;
            descricaoInput.value = trabalho.Descricao;
            dataTrabalhoInput.value = dataAniversarioConvertida;
            professorInput.value = trabalho.Professor;
            questaoInput.value = trabalho.Questoes;
          });



        let botaoDeletar = document.createElement('button');
        botaoDeletar.innerText = "Deletar";
        botaoDeletar.classList.add("botao_deletar");
        botaoDeletar.classList.add("btn")
        botaoDeletar.classList.add("btn-danger")
        botaoDeletar.classList.add("btn-sm")
        tdAcoes.appendChild(botaoDeletar)

            // ----- Função no botão para deletar o aluno selecionado ---- //
        botaoDeletar.addEventListener("click", async function (event) {
        event.preventDefault();
        linhaTrabalho.remove();
        trabalhoObjetoJson = JSON.stringify(trabalhoAtual);
        let urlDeletarTrabalho = `http://localhost:8001/trabalhos`;
        let responseObj = await fetch(urlDeletarTrabalho, {
          method: "DELETE",
          body: trabalhoObjetoJson,
          });
        });
    });
}

// ---- Selecionando o formulário editar ---- //
let formularioTrabalho = document.querySelector("#formularioTrabalho");

// ---- Função para atualizar o aluno selecionado ---- //
formularioTrabalho.addEventListener("submit", async function (event) {
    event.preventDefault();
    let id = this[0].value;
    let trabalho = {
      Id: document.querySelector(".id_input").value,
      Descricao: document.querySelector(".descricao_input").value,
      DataTrabalho: document.querySelector(".data_trabalho_input").value,
      Professor: document.querySelector(".professor_input").value,
      Questoes: document.querySelector(".questao_input").value
    };
    let trabalhoObjetoJson = JSON.stringify(trabalho);
    let urlAtualizarTrabalho = `http://localhost:8001/trabalhos`;
    let responseObj = await fetch(urlAtualizarTrabalho, {
      method: "POST",
      body: trabalhoObjetoJson,
    });
    let LinhasTrabalhos = document.querySelectorAll('tr')
    for(i = 0 ; i < LinhasTrabalhos.length; i++){
      let idTrabalhos = LinhasTrabalhos[i].children[0].innerHTML
      if(id == idTrabalhos){
        LinhasTrabalhos[i].children[1].innerHTML = trabalho.Descricao
        LinhasTrabalhos[i].children[2].innerHTML = trabalho.DataTrabalho
        LinhasTrabalhos[i].children[3].innerHTML = trabalho.Professor
        LinhasTrabalhos[i].children[4].innerHTML = trabalho.Questoes
          break;
        }  
      }
    });
  
// Selecionando o botão adicionar.
let botaoAdicionar = document.getElementById("botao_adicionar");

// Adiciona o evento de clique ao botão
botaoAdicionar.addEventListener("click", function () {
  // Redireciona para a nova página
  window.location.href = "cadastroTrabalho.html";
});
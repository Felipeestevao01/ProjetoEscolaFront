window.onload = async function (e) {
  let url = "http://localhost:8001/questoes";
  let response = await fetch(url);
  let questoes = await response.json();

  questoes.forEach((questaoAtual) => {
    // ---- Criando a linha da questão ---- //
    let linhaQuestao = document.createElement("tr");

    // ---- Criando as colunas ---- //
    let tdId = document.createElement("td");
    let tdDescricao = document.createElement("td");
    let tdEscolhas = document.createElement("td");
    let tdAcoes = document.createElement("td");

    // ---- Pegando os valores do BD ---- //
    tdId.innerHTML = questaoAtual.Id;
    tdDescricao.innerHTML = questaoAtual.Descricao;
    tdEscolhas.innerHTML = questaoAtual.Escolha;

    // ---- Inserindo os valores nas celulas ---- //
    linhaQuestao.appendChild(tdId);
    linhaQuestao.appendChild(tdDescricao);
    linhaQuestao.appendChild(tdEscolhas);
    linhaQuestao.appendChild(tdAcoes);

    // ---- Inserindo os alunos na tabela ---- //
    let tabelaQuestoes = document.querySelector("#linha_descricao");
    tabelaQuestoes.appendChild(linhaQuestao);

    // ---- Criando o botão de Editar ---- //
    let botaoEditar = document.createElement("button");
    botaoEditar.innerText = "Editar";
    botaoEditar.classList.add("botao_editar");
    botaoEditar.classList.add("btn");
    botaoEditar.classList.add("btn-primary");
    botaoEditar.classList.add("btn-sm");
    tdAcoes.appendChild(botaoEditar);
    botaoEditar.addEventListener("click", async function (event) {
      // ---- Pegando a linha selecionada e o seu ID e convertendo a data ---- //
      let tr = this.parentNode.parentNode;
      let id = tr.children[0].innerHTML;
      let urlQuestao = `http://localhost:8001/questoes/${id}`;
      let responseQuestao = await fetch(urlQuestao);
      let questao = await responseQuestao.json();

      // ---- Deixar o formulário de editar Visivel ---- //
      let formularioQuestoes = document.querySelector("#formularioQuestoes");
      formularioQuestoes.removeAttribute("style");

      // ---- Selecionando as células ---- //
      let idInput = document.querySelector(".id_input");
      let idSpan = document.querySelector("#id_span");
      let descricaoInput = document.querySelector(".descricao_input");
      let escolhaInput = document.querySelector(".escolhas_input");

      // ---- Inserindo valores nas celulas do formulário de editar ---- //
      idInput.value = questao.Id;
      idSpan.innerHTML = questao.Id;
      descricaoInput.value = questao.Descricao;
      escolhaInput.value = questao.Escolha;
    });

    // ---- Criando o botão Deletar ---- //
    let botaoDeletar = document.createElement("button");
    botaoDeletar.innerText = "Deletar";
    botaoDeletar.classList.add("botao_deletar");
    botaoDeletar.classList.add("btn");
    botaoDeletar.classList.add("btn-danger");
    botaoDeletar.classList.add("btn-sm");
    tdAcoes.appendChild(botaoDeletar);

    // ----- Função no botão para deletar o aluno selecionado ---- //
    botaoDeletar.addEventListener("click", async function (event) {
      event.preventDefault();
      linhaQuestao.remove();
      questaoObjetoJson = JSON.stringify(questaoAtual);
      let urlDeletarQuestao = `http://localhost:8001/questoes`;
      let responseObj = await fetch(urlDeletarQuestao, {
        method: "DELETE",
        body: questaoObjetoJson,
      });
    });
  });
};

// ---- Selecionando o formulário editar ---- //
let formularioQuestoes = document.querySelector("#formularioQuestoes");

// ---- Função para atualizar a questão selecionada ---- //
formularioQuestoes.addEventListener("submit", async function (event) {
    event.preventDefault();
    let id = this[0].value;
    let questao = {
      Id: document.querySelector(".id_input").value,
      Descricao: document.querySelector(".descricao_input").value,
      Escolha: document.querySelector(".escolhas_input").value,
    };
    let questaoObjetoJson = JSON.stringify(questao);
    let urlAtualizarQuestao = `http://localhost:8001/questoes`;
    let responseObj = await fetch(urlAtualizarQuestao, {
      method: "POST",
      body: questaoObjetoJson,
    });
    let linhasQuestoes = document.querySelectorAll('tr')
    for(i = 0 ; i < linhasQuestoes.length; i++){
      let idQuestoes = linhasQuestoes[i].children[0].innerHTML
      if(id == idQuestoes){
        linhasQuestoes[i].children[1].innerHTML = questao.Descricao
        linhasQuestoes[i].children[2].innerHTML = questao.Escolha
          break;
        }  
      }
    });

// Selecionando o botão adicionar.
let botaoAdicionar = document.getElementById("botao_adicionar");

// Adiciona o evento de clique ao botão
botaoAdicionar.addEventListener("click", function () {
  // Redireciona para a nova página
  window.location.href = "cadastroQuestao.html";
});
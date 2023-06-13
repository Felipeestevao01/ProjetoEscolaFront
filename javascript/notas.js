window.onload = async function (e) {
    let url = "http://localhost:8001/notas";
    let response = await fetch(url);
    let notas = await response.json();

    notas.forEach(notaAtual => {
        // ---- Criando a linha da nota ---- //
        let linhaNota = document.createElement("tr");

        // ---- Criando as colunas ---- //
        let tdId = document.createElement("td");
        let tdValorNota = document.createElement("td");
        let tdTrabalho = document.createElement("td");
        let tdAluno = document.createElement("td");
        let tdAcoes = document.createElement("td");

        // ---- Pegando os valores do BD ---- //
        tdId.innerHTML = notaAtual.Id 
        tdValorNota.innerHTML = notaAtual.ValorNota 
        tdTrabalho.innerHTML = notaAtual.Trabalho.Descricao 
        tdAluno.innerHTML = notaAtual.Aluno

        // ---- Inserindo os valores nas celulas ---- //
        linhaNota.appendChild(tdId)
        linhaNota.appendChild(tdValorNota)
        linhaNota.appendChild(tdTrabalho)
        linhaNota.appendChild(tdAluno)
        linhaNota.appendChild(tdAcoes)

        // ---- Inserindo as notas na tabela ---- //
        let tabelaNotas = document.querySelector("#linha_nota")
        tabelaNotas.appendChild(linhaNota)
        
        // ---- Criando o botão de Editar ---- //
        let botaoEditar = document.createElement("button");
        botaoEditar.innerText = "Editar";
        botaoEditar.classList.add("botao_editar", "btn", "btn-primary", "btn-sm");
        tdAcoes.appendChild(botaoEditar);
        botaoEditar.addEventListener("click", async function (event) {
            // ---- Pegando a linha selecionada e o seu ID e convertendo a data ---- //
            let tr = this.parentNode.parentNode;
            let id = tr.children[0].innerHTML;
            let urlNota = `http://localhost:8001/notas/${id}`;
            let responseNota = await fetch(urlNota);
            let nota = await responseNota.json();
      
            // ---- Deixar o formulário de editar Visivel ---- //
            let formularioEditar = document.querySelector("#formularioEditar");
            formularioEditar.removeAttribute("style");
      
            // ---- Selecionando as células ---- //
            let idInput = document.querySelector(".id_input");
            let idSpan = document.querySelector("#id_span");
            let valorNotaInput = document.querySelector(".nota_input");
            let trabalhoInput = document.querySelector(".trabalho_input");
            let alunoInput = document.querySelector(".aluno_input");
      
            // ---- Inserindo valores nas celulas do formulário de editar ---- //
            idInput.value = nota.Id;
            idSpan.innerHTML = nota.Id;
            valorNotaInput.value = nota.ValorNota;
            trabalhoInput.value = nota.Trabalho.Descricao;
            alunoInput.value = nota.Aluno;
          });

        // ---- Criando o botão Deletar ---- //
        let botaoDeletar = document.createElement("button");
        botaoDeletar.innerText = "Deletar";
        botaoDeletar.classList.add("botao_deletar", "btn", "btn-danger", "btn-sm");
        tdAcoes.appendChild(botaoDeletar);
        
        // ----- Função no botão para deletar a materia selecionada ---- //
        botaoDeletar.addEventListener("click", async function (event) {
            event.preventDefault();
            linhaNota.remove();
            notaObjetoJson = JSON.stringify(notaAtual);
            let urlDeletarNota = `http://localhost:8001/notas`;
            let responseObj = await fetch(urlDeletarNota, {
            method: "DELETE",
            body: notaObjetoJson,
            });
        });
    })
};

// ---- Selecionando o formulário editar ---- //
let formularioEditar = document.querySelector("#formularioEditar");

// ---- Função para atualizar a materia selecionado ---- //
formularioEditar.addEventListener("submit", async function (event) {
  event.preventDefault();
  let id = this[0].value;
  let nota = {
    Id: document.querySelector(".id_input").value,
    ValorNota: document.querySelector(".nota_input").value,
    Trabalho: document.querySelector(".trabalho_input").value,
    Aluno: document.querySelector(".aluno_input").value,
  };
  let notaObjetoJson = JSON.stringify(nota);
  let urlAtualizarNota = `http://localhost:8001/notas`;
  let responseObj = await fetch(urlAtualizarNota, {
    method: "PUT",
    body: notaObjetoJson,
  });
  let LinhasNotas = document.querySelectorAll('tr')
  for(i = 0 ; i < LinhasNotas.length; i++){
    let idNotas = LinhasNotas[i].children[0].innerHTML
    if(id == idNotas){
        LinhasNotas[i].children[1].innerHTML = nota.ValorNota
        LinhasNotas[i].children[2].innerHTML = nota.Trabalho
        LinhasNotas[i].children[3].innerHTML = nota.Aluno
        break;
      }  
    }
  });

  // Selecionando o botão adicionar.
let botaoAdicionar = document.getElementById("botao_adicionar");

// Adiciona o evento de clique ao botão
botaoAdicionar.addEventListener("click", function () {
  // Redireciona para a nova página
  window.location.href = "cadastroNota.html";
});
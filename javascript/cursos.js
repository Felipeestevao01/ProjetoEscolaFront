window.onload = async function (e) {
    let url = "http://localhost:8001/cursos";
    let response = await fetch(url);
    let cursos = await response.json();

    cursos.forEach(cursoAtual => {
        // ---- Criando a linha do curso ---- //
        let linhaCurso = document.createElement("tr");
    
        // ---- Criando as colunas ---- //
        let tdId = document.createElement("td");
        let tdNome = document.createElement("td");
        let tdCargaHoraria = document.createElement("td");
        let tdAtivo = document.createElement("td");
        let tdAcoes = document.createElement("td");

        // ---- Pegando os valores do BD ---- //
        tdId.innerHTML = cursoAtual.Id;
        tdNome.innerHTML = cursoAtual.Nome;
        tdCargaHoraria.innerHTML = cursoAtual.CargaHoraria ;
        tdAtivo.innerHTML = cursoAtual.Ativo;

        // ---- Inserindo os valores nas celulas ---- //
        linhaCurso.appendChild(tdId);
        linhaCurso.appendChild(tdNome);
        linhaCurso.appendChild(tdCargaHoraria);
        linhaCurso.appendChild(tdAtivo);
        linhaCurso.appendChild(tdAcoes);

        // ---- Inserindo os cursos na tabela ---- //
        let tabelaCurso = document.querySelector("#tabela_curso");
        tabelaCurso.appendChild(linhaCurso);

         // ---- Criando o botão de Editar ---- //
        let botaoEditar = document.createElement("button");
        botaoEditar.innerText = "Editar";
        botaoEditar.classList.add("botao_editar", "btn", "btn-primary", "btn-sm");
        tdAcoes.appendChild(botaoEditar);
        botaoEditar.addEventListener("click", async function (event) {
            // ---- Pegando a linha selecionada e o seu ID e convertendo a data ---- //
            let trSelecionada = this.parentNode.parentNode;
            let id = trSelecionada.children[0].innerHTML;
            let urlCurso = `http://localhost:8001/cursos/${id}`;
            let responseCurso = await fetch(urlCurso);
            let curso = await responseCurso.json();

            // ---- Deixar o formulário de editar Visivel ---- //
            let formularioEditar = document.querySelector("#formularioEditar");
            formularioEditar.removeAttribute("style");
      
            // ---- Selecionando as células ---- //
            let idInput = document.querySelector(".id_input");
            let idSpan = document.querySelector("#id_span");
            let nomeInput = document.querySelector(".nome_input");
            let cargaHorariaInput = document.querySelector(".carga_horaria_input");
            let ativoInput = document.querySelector(".ativo_input");
      
            // ---- Inserindo valores nas celulas do formulário de editar ---- //
            idInput.value = curso.Id;
            idSpan.innerHTML = curso.Id;
            nomeInput.value = curso.Nome;
            cargaHorariaInput.value = curso.CargaHoraria;
            ativoInput.value = curso.Ativo;
          });

        // ---- Criando o botão Deletar ---- //
        let botaoDeletar = document.createElement("button");
        botaoDeletar.innerText = "Deletar";
        botaoDeletar.classList.add("botao_deletar", "btn", "btn-danger", "btn-sm");
        tdAcoes.appendChild(botaoDeletar);

        // ----- Função no botão para deletar o curso selecionado ---- //
        botaoDeletar.addEventListener("click", async function (event) {
        event.preventDefault();
        linhaCurso.remove();
        cursoObjetoJson = JSON.stringify(cursoAtual);
        let urlDeletarCurso = `http://localhost:8001/cursos`;
        let responseObj = await fetch(urlDeletarCurso, {
          method: "DELETE",
          body: cursoObjetoJson
        });
      });
    })
};

// ---- Selecionando o formulário editar ---- //
let formularioEditar = document.querySelector("#formularioEditar");

formularioEditar.addEventListener("submit", async function (event){
    event.preventDefault();
    let id = this[0].value;
    let curso = {
        Id: document.querySelector(".id_input").value,
        Nome: document.querySelector(".nome_input").value,
        CargaHoraria: document.querySelector(".carga_horaria_input").value,
        Ativo: document.querySelector(".ativo_input").value
    };
    let cursoObjetoJson = JSON.stringify(curso);
    let urlAtualizarCurso = `http://localhost:8001/cursos`;
    let responseObj = await fetch(urlAtualizarCurso, {
        method: "PUT",
        body: cursoObjetoJson,
    });
    let LinhasCursos = document.querySelectorAll('tr')
    for(i = 0 ; i < LinhasCursos.length; i++){
        let idCurso = LinhasCursos[i].children[0].innerHTML
        if(id == idCurso){
            LinhasCursos[i].children[1].innerHTML = curso.Nome;
            LinhasCursos[i].children[2].innerHTML = curso.CargaHoraria;
            LinhasCursos[i].children[3].innerHTML = curso.Ativo;
            break;
        }
    }
});

// ---- Botão para enviar para o Cadastro ---- //
let botaoAdicionar = document.getElementById("botao_adicionar");
botaoAdicionar.addEventListener("click", function () {
  window.location.href = "cadastroCurso.html";
});
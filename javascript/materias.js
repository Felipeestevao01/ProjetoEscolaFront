window.onload = async function (e) {
    let url = "http://localhost:8001/materias";
    let response = await fetch(url);
    let materias = await response.json();

    materias.forEach(materiaAtual => {

        // ---- Criando a linha da materia ---- //
        let linhaMateria = document.createElement("tr");

        // Criando as colunas da pagina curso.
        let tdId = document.createElement("td");
        let tdNome = document.createElement("td");
        let tdCargaHoraria = document.createElement("td");
        let tdCursos = document.createElement("td");
        let tdProfessores = document.createElement("td");
        let tdAcoes = document.createElement("td");

        // ---- Pegando os valores do BD ---- //
        tdId.innerHTML = materiaAtual.Id;
        tdNome.innerHTML = materiaAtual.Nome;
        tdCargaHoraria.innerHTML = materiaAtual.CargaHoraria;
        tdCursos.innerHTML = materiaAtual.Cursos;
        tdProfessores.innerHTML = materiaAtual.Professores;

        // ---- Inserindo os valores nas celulas ---- //
        linhaMateria.appendChild(tdId);
        linhaMateria.appendChild(tdNome);
        linhaMateria.appendChild(tdCargaHoraria);
        linhaMateria.appendChild(tdCursos);
        linhaMateria.appendChild(tdProfessores);
        linhaMateria.appendChild(tdAcoes);

        // ---- Inserindo as materias na tabela ---- //
        let tabelaMateria = document.querySelector("#tabela_materia");
        tabelaMateria.appendChild(linhaMateria);

        // ---- Criando o botão de Editar ---- //
        let botaoEditar = document.createElement("button");
        botaoEditar.innerText = "Editar";
        botaoEditar.classList.add("botao_editar", "btn", "btn-primary", "btn-sm");
        tdAcoes.appendChild(botaoEditar);
        botaoEditar.addEventListener("click", async function (event) {
            // ---- Pegando a linha selecionada e o seu ID e convertendo a data ---- //
            let trSelecionado = this.parentNode.parentNode;
            let id = trSelecionado.children[0].innerHTML;
            let urlMateria = `http://localhost:8001/materias/${id}`;
            let responseMateria = await fetch(urlMateria);
            let materia = await responseMateria.json();
      
            // ---- Deixar o formulário de editar Visivel ---- //
            let formularioEditar = document.querySelector("#formularioEditar");
            formularioEditar.removeAttribute("style");
      
            // ---- Selecionando as células ---- //
            let idInput = document.querySelector(".id_input");
            let idSpan = document.querySelector("#id_span");
            let nomeInput = document.querySelector(".nome_input");
            let cargaHorariaInput = document.querySelector(".carga_horaria_input");
            let cursoInput = document.querySelector(".curso_input");
            let professorInput = document.querySelector(".professor_input");
      
            // ---- Inserindo valores nas celulas do formulário de editar ---- //
            idInput.value = materia.Id;
            idSpan.innerHTML = materia.Id;
            nomeInput.value = materia.Nome;
            cargaHorariaInput.value = materia.CargaHoraria;
            cursoInput.value = materia.Cursos[0].Nome;
            professorInput.value = materia.Professores;
        });

        // ---- Criando o botão Deletar ---- //
        let botaoDeletar = document.createElement("button");
        botaoDeletar.innerText = "Deletar";
        botaoDeletar.classList.add("botao_deletar", "btn", "btn-danger", "btn-sm");
        tdAcoes.appendChild(botaoDeletar);

        // ----- Função no botão para deletar a materia selecionada ---- //
        botaoDeletar.addEventListener("click", async function (event) {
            event.preventDefault();
            linhaMateria.remove();
            materiaObjetoJson = JSON.stringify(materiaAtual);
            let urlDeletarMateria = `http://localhost:8001/materias`;
            let responseObj = await fetch(urlDeletarMateria, {
            method: "DELETE",
            body: materiaObjetoJson,
            });
        });
    });
};

// ---- Selecionando o formulário editar ---- //
let formularioEditar = document.querySelector("#formularioEditar");

// ---- Função para atualizar a materia selecionado ---- //
formularioEditar.addEventListener("submit", async function (event) {
  event.preventDefault();
  let id = this[0].value;
  let materia = {
    Id: document.querySelector(".id_input").value,
    Nome: document.querySelector(".nome_input").value,
    CargaHoraria: document.querySelector(".carga_horaria_input").value,
    Cursos: document.querySelector(".curso_input").value,
    Professores: document.querySelector(".professor_input").value,
  };
  let materiaObjetoJson = JSON.stringify(materia);
  let urlAtualizarMateria = `http://localhost:8001/materias`;
  let responseObj = await fetch(urlAtualizarMateria, {
    method: "PUT",
    body: materiaObjetoJson,
  });
  let LinhasMaterias = document.querySelectorAll('tr')
  for(i = 0 ; i < LinhasMaterias.length; i++){
    let idMaterias = LinhasMaterias[i].children[0].innerHTML
    if(id == idMaterias){
        LinhasMaterias[i].children[1].innerHTML = materia.Nome
        LinhasMaterias[i].children[2].innerHTML = materia.CargaHoraria
        LinhasMaterias[i].children[3].innerHTML = materia.Cursos
        LinhasMaterias[i].children[4].innerHTML = materia.Professores
        break;
      }  
    }
  });

// ---- Botão para enviar para o Cadastro ---- //
let botaoAdicionar = document.getElementById("botao_adicionar");
botaoAdicionar.addEventListener("click", function () {
  window.location.href = "cadastroMateria.html";
});
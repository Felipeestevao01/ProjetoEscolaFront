window.onload = async function (e) {
    let url = "http://localhost:8001/materia";
    let response = await fetch(url);
    let materias = await response.json();

    for (let i = 0; i <= materias.length; i++) {
        let materialAtual = materias[i];

        let linhaMateria = document.createElement("tr");

        // Criando as colunas da pagina curso.
        let tdId = document.createElement("td");
        let tdNome = document.createElement("td");
        let tdCargaHoraria = document.createElement("td");
        let tdCursos = document.createElement("td");
        let tdProfessores = document.createElement("td");
        let tdAcoes = document.createElement("td");

        // Criando os botoes de Editar/Deletar
        let botaoEditar = document.createElement("button");
        botaoEditar.innerText = "Editar";
        let botaoDeletar = document.createElement("button");
        botaoDeletar.innerText = "Deletar";
        tdAcoes.appendChild(botaoEditar);
        tdAcoes.appendChild(botaoDeletar);

        // Pegando os valores do banco.
        tdId.innerHTML = materialAtual.Id
        tdNome.innerHTML = materialAtual.Nome
        tdCargaHoraria.innerHTML = materialAtual.CargaHoraria
        tdCursos.innerHTML = materialAtual.Cursos
        tdProfessores.innerHTML = materialAtual.Professores
        
        linhaMateria.appendChild(tdId)
        linhaMateria.appendChild(tdNome)
        linhaMateria.appendChild(tdCargaHoraria)
        linhaMateria.appendChild(tdCursos)
        linhaMateria.appendChild(tdProfessores)
        linhaMateria.appendChild(tdAcoes)

        let tabelaMateria = document.querySelector(".cabecalho_materias");
        tabelaMateria.appendChild(linhaMateria)
    }
}
window.onload = async function (e) {
    let url = "http://localhost:8001/curso";
    let response = await fetch(url);
    let cursos = await response.json();

    for (let i = 0; i <= cursos.length; i++) {
        let cursoAtual = cursos[i];

        let linhaCurso = document.createElement("tr");
    
        // Criando as colunas da pagina curso.
        let tdId = document.createElement("td");
        let tdNome = document.createElement("td");
        let tdCargaHoraria = document.createElement("td");
        let tdAtivo = document.createElement("td");
        let tdAcoes = document.createElement("td");

        // Criando os botoes de Editar/Deletar
        let botaoEditar = document.createElement("button");
        botaoEditar.innerText = "Editar";
        let botaoDeletar = document.createElement("button");
        botaoDeletar.innerText = "Deletar";
        tdAcoes.appendChild(botaoEditar);
        tdAcoes.appendChild(botaoDeletar);

        // Pegando os valores do banco.
        tdId.innerHTML = cursoAtual.Id
        tdNome.innerHTML = cursoAtual.Nome
        tdCargaHoraria.innerHTML = cursoAtual.CargaHoraria 
        tdAtivo.innerHTML = cursoAtual.Ativo

        linhaCurso.appendChild(tdId)
        linhaCurso.appendChild(tdNome)
        linhaCurso.appendChild(tdCargaHoraria)
        linhaCurso.appendChild(tdAtivo)
        linhaCurso.appendChild(tdAcoes)

        let tabelaCurso = document.querySelector(".cabecalho_cursos");
        tabelaCurso.appendChild(linhaCurso)
    }
}



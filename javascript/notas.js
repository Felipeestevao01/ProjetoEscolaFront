window.onload = async function (e) {
    let url = "http://localhost:8001/nota";
    let response = await fetch(url);
    let notas = await response.json();

    for (let i = 0; i <= notas.length; i++) {
        let notaAtual = notas[i];

        let linhaNota = document.createElement("tr");

        // Criando as colunas da pagina curso.
        let tdId = document.createElement("td");
        let tdValorNota = document.createElement("td");
        let tdTrabalho = document.createElement("td");
        let tdAluno = document.createElement("td");
        let tdAcoes = document.createElement("td");
        
        
        // Criando os botoes de Editar/Deletar
        let botaoEditar = document.createElement("button");
        botaoEditar.innerText = "Editar";
        let botaoDeletar = document.createElement("button");
        botaoDeletar.innerText = "Deletar";
        tdAcoes.appendChild(botaoEditar);
        tdAcoes.appendChild(botaoDeletar);

        // Pegando os valores do banco.
        tdId.innerHTML = notaAtual.Id 
        tdValorNota.innerHTML = notaAtual.ValorNota 
        tdTrabalho.innerHTML = notaAtual.Trabalho.Descricao 
        tdAluno.innerHTML = notaAtual.Aluno 

        linhaNota.appendChild(tdId)
        linhaNota.appendChild(tdValorNota)
        linhaNota.appendChild(tdTrabalho)
        linhaNota.appendChild(tdAluno)
        linhaNota.appendChild(tdAcoes)

        let tabelaNotas = document.querySelector(".cabecalho_notas")
        tabelaNotas.appendChild(linhaNota)
    }
}
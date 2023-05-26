window.onload = async function (e) {
    let url = "http://localhost:8001/questao";
    let response = await fetch(url);
    let questoes = await response.json();

    for (let i = 0; i <= questoes.length; i++) {
        let questaoAtual = questoes[i];

        let linhaQuestao = document.createElement("tr");

        // Criando as colunas da pagina curso.
        let tdId = document.createElement('td')
        let tdDescricao = document.createElement('td')
        let tdEscolhas = document.createElement('td')
        let tdAcoes = document.createElement('td')

        // Criando os botoes de Editar/Deletar
        let botaoEditar = document.createElement('button')
        botaoEditar.innerText = "Editar"
        let botaoDeletar = document.createElement('button')
        botaoDeletar.innerText = "Deletar"
        tdAcoes.appendChild(botaoEditar)
        tdAcoes.appendChild(botaoDeletar)

        // Pegando os valores do banco
        tdId.innerHTML = questaoAtual.Id 
        tdDescricao.innerHTML = questaoAtual.Descricao 
        tdEscolhas.innerHTML = questaoAtual.Escolha 

        linhaQuestao.appendChild(tdId)
        linhaQuestao.appendChild(tdDescricao)
        linhaQuestao.appendChild(tdEscolhas)
        linhaQuestao.appendChild(tdAcoes)
        
        let tabelaQuestoes = document.querySelector('.cabecalho_questoes')
        tabelaQuestoes.appendChild(linhaQuestao)
    }
}
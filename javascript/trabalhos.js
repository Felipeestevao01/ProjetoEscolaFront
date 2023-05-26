window.onload = async function (e) {
    let url = "http://localhost:8001/trabalho";
    let response = await fetch(url);
    let trabalhos = await response.json();

    for (let i = 0; i <= trabalhos.length; i++) {
        let trabalhoAtual = trabalhos[i];

        //Separar a data da hora.
        let dataTrabalhoConvertida = trabalhoAtual.DataTrabalho.split("T")[0];

        let linhaTrabalho = document.createElement('tr');

        let tdId = document.createElement('td');
        let tdDescricao = document.createElement('td');
        let tdDataTrabalho = document.createElement('td');
        let tdProfessor = document.createElement('td');
        let tdQuestoes = document.createElement('td');
        let tdAcoes = document.createElement('td');

        // Criando Botoes Editar/Deletar
        let botaoEditar = document.createElement('button');
        botaoEditar.innerText = "Editar";
        let botaoDeletar = document.createElement('button');
        botaoDeletar.innerText = "Deletar";
        tdAcoes.appendChild(botaoEditar)
        tdAcoes.appendChild(botaoDeletar)

        // Pegando os valores do banco
        tdId.innerHTML = trabalhoAtual.Id
        tdDescricao.innerHTML = trabalhoAtual.Descricao
        tdDataTrabalho.innerHTML = dataTrabalhoConvertida
        tdProfessor.innerHTML = trabalhoAtual.Professor.Nome
        tdQuestoes.innerHTML = trabalhoAtual.Questoes
        
        linhaTrabalho.appendChild(tdId)
        linhaTrabalho.appendChild(tdDescricao)
        linhaTrabalho.appendChild(tdDataTrabalho)
        linhaTrabalho.appendChild(tdProfessor)
        linhaTrabalho.appendChild(tdQuestoes)
        linhaTrabalho.appendChild(tdAcoes)

        let tabelaQuestoes = document.querySelector('.cabecalho_trabalhos')
        tabelaQuestoes.appendChild(linhaTrabalho)
         
    }
}
window.onload = async function (e) {
    let url = "http://localhost:8001/professor";
    let response = await fetch(url);
    let professores = await response.json();

    for (let i = 0; i <= professores.length; i++) {
        let professorAtual = professores[i];

         //Separar a data da hora.
        let dataNascimentoConvertida = professorAtual.DataAniversario.split("T")[0];

        let linhaProfessor = document.createElement("tr");

        // Criando as colunas da pagina curso.
        let tdId = document.createElement('td')
        let tdNome = document.createElement('td')
        let tdSobrenome = document.createElement('td')
        let tdDataAniversario = document.createElement('td')
        let tdCpf = document.createElement('td')
        let tdEmail = document.createElement('td')
        let tdEndereco = document.createElement('td')
        let tdSalario = document.createElement('td')
        let tdTelefone = document.createElement('td')
        let tdAcoes = document.createElement('td')

         // Criando os botoes de Editar/Deletar
         let botaoEditar = document.createElement('button')
         botaoEditar.innerText = "Editar"
         let botaoDeletar = document.createElement('button')
         botaoDeletar.innerText = "Deletar"
         tdAcoes.appendChild(botaoEditar)
         tdAcoes.appendChild(botaoDeletar)

         // Pegando os valores do banco.
         tdId.innerHTML = professorAtual.Id
         tdNome.innerHTML = professorAtual.Nome 
         tdSobrenome.innerHTML = professorAtual.Sobrenome 
         tdDataAniversario.innerHTML = dataNascimentoConvertida 
         tdCpf.innerHTML = professorAtual.Cpf 
         tdEmail.innerHTML = professorAtual.Email 
         tdEndereco.innerHTML = professorAtual.Endereco 
         tdSalario.innerHTML = professorAtual.Salario 
         tdTelefone.innerHTML = professorAtual.Telefone 

         linhaProfessor.appendChild(tdId)
         linhaProfessor.appendChild(tdNome)
         linhaProfessor.appendChild(tdSobrenome)
         linhaProfessor.appendChild(tdDataAniversario)
         linhaProfessor.appendChild(tdCpf)
         linhaProfessor.appendChild(tdEmail)
         linhaProfessor.appendChild(tdEndereco)
         linhaProfessor.appendChild(tdSalario)
         linhaProfessor.appendChild(tdTelefone)
         linhaProfessor.appendChild(tdAcoes)

         let tabelaProfessores = document.querySelector('.cabecalho_professores')
         tabelaProfessores.appendChild(linhaProfessor)
    }
}
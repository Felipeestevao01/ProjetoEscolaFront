window.onload = async function (e) {
    let url = "http://localhost:8001/professores";
    let response = await fetch(url);
    let professores = await response.json();

    professores.forEach(professorAtual => {
        // ---- Criando a linha do professor ---- //
        let linhaProfessor = document.createElement("tr");

        // ---- Separando a data da hora ---- //
        let dataNascimentoConvertida = professorAtual.DataAniversario.split("T")[0]
        
        // ---- Criando as colunas ---- //
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

        // ---- Pegando os valores do banco ---- //
         tdId.innerHTML = professorAtual.Id
         tdNome.innerHTML = professorAtual.Nome 
         tdSobrenome.innerHTML = professorAtual.Sobrenome 
         tdDataAniversario.innerHTML = dataNascimentoConvertida 
         tdCpf.innerHTML = professorAtual.Cpf 
         tdEmail.innerHTML = professorAtual.Email 
         tdEndereco.innerHTML = professorAtual.Endereco 
         tdSalario.innerHTML = professorAtual.Salario 
         tdTelefone.innerHTML = professorAtual.Telefone 

         // ---- Inserindo os valores nas celulas ---- //
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

        // ---- Inserindo os professores na tabela ---- //
         let tabelaProfessores = document.querySelector('#tabela_professor')
         tabelaProfessores.appendChild(linhaProfessor)

         // ---- Criando o botao editar ---- //
         let botaoEditar = document.createElement('button')
         botaoEditar.innerText = "Editar"
         botaoEditar.classList.add("botao_editar", "btn", "btn-primary", "btn-sm");
         tdAcoes.appendChild(botaoEditar)
         botaoEditar.addEventListener("click", async function (event){
            // ---- Pegando a linha selecionada e o seu ID e convertendo a data ---- //
            let tr = this.parentNode.parentNode
            let idProfessorAtual = tr.children[0].innerHTML;
            let urlProfessor = `http://localhost:8001/professores/${idProfessorAtual}`;
            let responseProfessor = await fetch(urlProfessor);
            let professor = await responseProfessor.json();
            // ---- Deixar o formulário de editar Visivel ---- //
            let formularioEditar = document.querySelector("#formularioEditar");
            formularioEditar.removeAttribute("style");

            // ---- Selecionando as células ---- //
            let idInput = document.querySelector(".id_input");
            let idSpan = document.querySelector("#id_span");
            let nomeInput = document.querySelector(".nome_input");
            let sobrenomeInput = document.querySelector(".sobrenome_input");
            let dataNascimentoInput = document.querySelector(".data_nascimento_input")
            let cpfInput = document.querySelector(".cpf_input")
            let emailInput = document.querySelector(".email_input")
            let enderecoInput = document.querySelector(".endereco_input")
            let salarioInput = document.querySelector(".salario_input")
            let telefoneInput = document.querySelector(".telefone_input")

            // ---- Inserindo valores nas celulas do formulário de editar ---- //
            idInput.value = professor.Id;
            idSpan.innerHTML = professor.Id;
            nomeInput.value = professor.Nome;
            sobrenomeInput.value = professor.Sobrenome;
            dataNascimentoInput.value = professorAtual.DataAniversario.split("T")[0]
            cpfInput.value = professor.Cpf;
            emailInput.value = professor.Email;
            enderecoInput.value = professor.Endereco;
            salarioInput.value = professor.Salario;
            telefoneInput.value = professor.Telefone;
        })

        // ---- Criando o botão Deletar ---- //
         let botaoDeletar = document.createElement('button')
         botaoDeletar.innerText = "Deletar"
         botaoDeletar.classList.add("botao_deletar", "btn", "btn-danger", "btn-sm");
         tdAcoes.appendChild(botaoDeletar)


        // ----- Função no botão para deletar o professor selecionado ---- //
        botaoDeletar.addEventListener("click", async function (event) {
            event.preventDefault();
            linhaProfessor.remove();
            let professorObjetoJson = JSON.stringify(professorAtual);
            let urlDeletarProfessor = `http://localhost:8001/professores`;
            let responseObj = await fetch(urlDeletarProfessor, {
            method: "DELETE",
            body: professorObjetoJson,
            });
        });
    });
  };

  // ---- Selecionando o formulário editar ---- //
let formularioEditar = document.querySelector("#formularioEditar");

// ---- Função para atualizar o professor selecionado ---- //
formularioEditar.addEventListener("submit", async function (event){
    event.preventDefault();
    let id = this[0].value;
    let professor = {
        Id: document.querySelector(".id_input").value,
        Nome: document.querySelector(".nome_input").value,
        Sobrenome: document.querySelector(".sobrenome_input").value,
        DataAniversario: document.querySelector(".data_nascimento_input").value,
        Cpf: document.querySelector(".cpf_input").value,
        Email: document.querySelector(".email_input").value,
        Endereco: document.querySelector(".endereco_input").value,
        Salario: document.querySelector(".salario_input").value,
        Telefone: document.querySelector(".telefone_input").value
    }
    let professorObjetoJson = JSON.stringify(professor);
    let urlAtualizarProfessor = `http://localhost:8001/professores/${id}`;
    let responseObj = await fetch(urlAtualizarProfessor,{
        method: "PUT",
        body: professorObjetoJson
    });
    let LinhasProfessores = document.querySelectorAll('tr')
    for(i = 0 ; i < LinhasProfessores.length; i++){
      let idProfessor = LinhasProfessores[i].children[0].innerHTML
      if(id == idProfessor){
            LinhasProfessores[i].children[1].innerHTML = professor.Nome
            LinhasProfessores[i].children[2].innerHTML = professor.Sobrenome
            LinhasProfessores[i].children[3].innerHTML = professor.DataAniversario
            LinhasProfessores[i].children[4].innerHTML = professor.Cpf
            LinhasProfessores[i].children[5].innerHTML = professor.Email
            LinhasProfessores[i].children[6].innerHTML = professor.Endereco
            LinhasProfessores[i].children[7].innerHTML = professor.Salario
            LinhasProfessores[i].children[8].innerHTML = professor.Telefone
            break;
        }  
    }
});

// Selecionando o botão adicionar.
let botaoAdicionar = document.getElementById("botao_adicionar");

// Adiciona o evento de clique ao botão
botaoAdicionar.addEventListener("click", function () {
  // Redireciona para a nova página
  window.location.href = "cadastroProfessor.html";
});
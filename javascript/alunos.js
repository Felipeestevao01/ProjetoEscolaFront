window.onload = async function (e) {
  let url = "http://localhost:8001/aluno";
  let response = await fetch(url);
  let alunos = await response.json();
  
  function formatarDataHoraBrasileira(dataHoraString) {
    let dataHora = new Date(dataHoraString);
  
    let dia = dataHora.getDate();
    let mes = dataHora.getMonth() + 1;
    let ano = dataHora.getFullYear();
    let horas = dataHora.getHours();
    let minutos = dataHora.getMinutes();
  
    // Formatação com zero à esquerda para valores menores que 10
    dia = dia < 10 ? '0' + dia : dia;
    mes = mes < 10 ? '0' + mes : mes;
    horas = horas < 10 ? '0' + horas : horas;
    minutos = minutos < 10 ? '0' + minutos : minutos;
  
    let dataFormatada = dia + '/' + mes + '/' + ano;
    let horaFormatada = horas + ':' + minutos;
  
    return dataFormatada + ' ' + horaFormatada;
  }

  alunos.forEach(alunoAtual => {
    // ---- Pegando os alunos da response e criando a linha ---- //
    let linhaAluno = document.createElement("tr");

    // ---- Separando a data da hora ----//
    let dataNascimentoConvertida = alunoAtual.DataAniversario ? formatarDataHoraBrasileira(alunoAtual.DataAniversario).split(" ")[0] : ""
    
    // ---- Criando as colunas ---- //
    let tdId = document.createElement("td");
    let tdNome = document.createElement("td");
    let tdSobrenome = document.createElement("td");
    let tdDataNascimento = document.createElement("td");
    let tdCpf = document.createElement("td");
    let tdEndereco = document.createElement("td");
    let tdEmail = document.createElement("td");
    let tdNumeroFaltas = document.createElement("td");
    let tdAcoes = document.createElement("td");

    // ---- Adicionando atributos ---- //
    linhaAluno.classList.add("tr_linha")
    //tdId.setAttribute("")
    tdNome.classList.add("td_nome")

    // ---- Pegando os valores do BD ---- //
    tdId.innerHTML = alunoAtual.Id;
    tdNome.innerHTML = alunoAtual.Nome;
    tdSobrenome.innerHTML = alunoAtual.Sobrenome;
    tdDataNascimento.innerHTML = dataNascimentoConvertida;
    tdCpf.innerHTML = alunoAtual.Cpf;
    tdEndereco.innerHTML = alunoAtual.Endereco;
    tdEmail.innerHTML = alunoAtual.Email;
    tdNumeroFaltas.innerHTML = alunoAtual.NumeroFaltas;

    // ---- Inserindo os valores nas celulas ---- //
    linhaAluno.appendChild(tdId);
    linhaAluno.appendChild(tdNome);
    linhaAluno.appendChild(tdSobrenome);
    linhaAluno.appendChild(tdDataNascimento);
    linhaAluno.appendChild(tdCpf);
    linhaAluno.appendChild(tdEndereco);
    linhaAluno.appendChild(tdEmail);
    linhaAluno.appendChild(tdNumeroFaltas);
    linhaAluno.appendChild(tdAcoes);

    // ---- Inserindo os alunos na tabela ---- //
    let tabelaAluno = document.querySelector("#linha_aluno");
    tabelaAluno.appendChild(linhaAluno);

    // ---- Criando o botão de Editar ---- //
    let botaoEditar = document.createElement("button");
    botaoEditar.innerText = "Editar";
    botaoEditar.classList.add("botao_editar");
    botaoEditar.classList.add("btn")
    botaoEditar.classList.add("btn-primary")
    botaoEditar.classList.add("btn-sm")
    tdAcoes.appendChild(botaoEditar);
    botaoEditar.addEventListener("click", async function (event) {
      // ---- Pegando a linha selecionada e o seu ID e convertendo a data ---- //
      let tr = this.parentNode.parentNode;
      let id = tr.children[0].innerHTML;
      let urlAluno = `http://localhost:8001/aluno/${id}`;
      let responseAluno = await fetch(urlAluno);
      let aluno = await responseAluno.json();
      let dataAniversarioConvertida = formatarDataHoraBrasileira(alunoAtual.DataAniversario).split(" ")[0];

      // ---- Deixar o formulário de editar Visivel ---- //
      let formularioAlunos = document.querySelector("#formularioAlunos");
      formularioAlunos.removeAttribute("style");

      // ---- Selecionando as células ---- //
      let idInput = document.querySelector(".id_input");
      let idSpan = document.querySelector("#id_span");
      let nomeInput = document.querySelector(".nome_input");
      let sobrenomeInput = document.querySelector(".sobrenome_input");
      let dataNascimentoInput = document.querySelector(".data_nascimento_input");
      let cpfInput = document.querySelector(".cpf_input");
      let enderecoInput = document.querySelector(".endereco_input");
      let emailInput = document.querySelector(".email_input");
      let numeroFaltasInput = document.querySelector(".numerofaltas_input");

      // ---- Inserindo valores nas celulas do formulário de editar ---- //
      idInput.value = aluno.Id;
      idSpan.innerHTML = aluno.Id;
      nomeInput.value = aluno.Nome;
      sobrenomeInput.value = aluno.Sobrenome;
      dataNascimentoInput.value = dataAniversarioConvertida;
      cpfInput.value = aluno.Cpf;
      enderecoInput.value = aluno.Endereco;
      emailInput.value = aluno.Email;
      numeroFaltasInput.value = aluno.NumeroFaltas;
    });

    // ---- Criando o botão Deletar ---- //
    let botaoDeletar = document.createElement("button");
    botaoDeletar.innerText = "Deletar";
    botaoDeletar.classList.add("botao_deletar");
    botaoDeletar.classList.add("btn")
    botaoDeletar.classList.add("btn-danger")
    botaoDeletar.classList.add("btn-sm")
    tdAcoes.appendChild(botaoDeletar);

    // ----- Função no botão para deletar o aluno selecionado ---- //
    botaoDeletar.addEventListener("click", async function (event) {
      event.preventDefault();
      linhaAluno.remove();
      alunoObjetoJson = JSON.stringify(alunoAtual);
      let urlDeletarAluno = `http://localhost:8001/aluno/delete`;
      let responseObj = await fetch(urlDeletarAluno, {
        method: "DELETE",
        body: alunoObjetoJson,
      });
    });
  });
};

// ---- Selecionando o formulário editar ---- //
let formularioAlunos = document.querySelector("#formularioAlunos");

// ---- Função para atualizar o aluno selecionado ---- //
formularioAlunos.addEventListener("submit", async function (event) {
  event.preventDefault();
  let id = this[0].value;
  let aluno = {
    Id: document.querySelector(".id_input").value,
    Nome: document.querySelector(".nome_input").value,
    Sobrenome: document.querySelector(".sobrenome_input").value,
    DataAniversario: document.querySelector(".data_nascimento_input").value,
    Cpf: document.querySelector(".cpf_input").value,
    Endereco: document.querySelector(".endereco_input").value,
    Email: document.querySelector(".email_input").value,
    NumeroFaltas: document.querySelector(".numerofaltas_input").value,
  };
  let alunoObjetoJson = JSON.stringify(aluno);
  let urlAtualizarAluno = `http://localhost:8001/aluno/${id}/edit`;
  let responseObj = await fetch(urlAtualizarAluno, {
    method: "POST",
    body: alunoObjetoJson,
  });
  let LinhasAlunos = document.querySelectorAll('tr')
  for(i = 0 ; i < LinhasAlunos.length; i++){
    let idAlunos = LinhasAlunos[i].children[0].innerHTML
    if(id == idAlunos){
        LinhasAlunos[i].children[1].innerHTML = aluno.Nome
        LinhasAlunos[i].children[2].innerHTML = aluno.Sobrenome
        LinhasAlunos[i].children[3].innerHTML = aluno.DataAniversario
        LinhasAlunos[i].children[4].innerHTML = aluno.Cpf
        LinhasAlunos[i].children[5].innerHTML = aluno.Endereco
        LinhasAlunos[i].children[6].innerHTML = aluno.Email
        LinhasAlunos[i].children[7].innerHTML = aluno.NumeroFaltas
        break;
      }  
    }
  });

// Selecionando o botão adicionar.
let botaoAdicionar = document.getElementById("botao_adicionar");

// Adiciona o evento de clique ao botão
botaoAdicionar.addEventListener("click", function () {
  // Redireciona para a nova página
  window.location.href = "cadastroAluno.html";
});

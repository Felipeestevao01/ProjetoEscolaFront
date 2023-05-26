window.onload = async function (e) {
  let url = "http://localhost:8001/aluno";
  let response = await fetch(url);
  let alunos = await response.json();

  for (let i = 0; i <= alunos.length; i++) {

    let alunoAtual = alunos[i];

    let linhaAluno = document.createElement("tr");

    //Separar a data da hora.
    let dataNascimentoConvertida = alunoAtual.DataAniversario.split("T")[0];

    // Criando as colunas da pagina aluno.
    let tdId = document.createElement("td");
    let tdNome = document.createElement("td");
    let tdSobrenome = document.createElement("td");
    let tdDataNascimento = document.createElement("td");
    let tdCpf = document.createElement("td");
    let tdEndereco = document.createElement("td");
    let tdEmail = document.createElement("td");
    let tdNumeroFaltas = document.createElement("td");
    let tdAcoes = document.createElement("td");

    // Criando os botoes de Editar/Deletar
    let botaoEditar = document.createElement("button");
    botaoEditar.innerText = "Editar";
    botaoEditar.classList.add('botao_editar')
    botaoEditar.addEventListener('click', async function(event){
      let tr = this.parentNode.parentNode
      
      let id = tr.children[0].innerHTML

      let urlAluno = `http://localhost:8001/aluno/${id}`;
      let responseAluno = await fetch(urlAluno);
      let aluno = await responseAluno.json();

      let dataAniversarioConvertida = aluno.DataAniversario.split('T', [1])

      //Deixar o form Visivel.
      let formulario = document.querySelector('#formulario')
      formulario.removeAttribute("style")

      // inserir os valores nas celulas do form.
      let idInput = document.querySelector('.id_input')
      idInput.value = aluno.Id
      let idSpan = document.querySelector('#id_span')
      idSpan.innerHTML = aluno.Id
      let nomeInput = document.querySelector('.nome_input')
      nomeInput.value = aluno.Nome
      let sobrenomeInput = document.querySelector('.sobrenome_input')
      sobrenomeInput.value = aluno.Sobrenome
      let dataNascimentoInput = document.querySelector('.data_nascimento_input')
      dataNascimentoInput.value = dataAniversarioConvertida
      let cpfInput = document.querySelector('.cpf_input')
      cpfInput.value = aluno.Cpf
      let enderecoInput = document.querySelector('.endereco_input')
      enderecoInput.value = aluno.Endereco
      let emailInput = document.querySelector('.email_input')
      emailInput.value = aluno.Email
      let numeroFaltasInput = document.querySelector('.numerofaltas_input')
      numeroFaltasInput.value = aluno.NumeroFaltas  
    })

    let botaoDeletar = document.createElement("button");
    botaoDeletar.innerText = "Deletar";
    botaoDeletar.classList.add('botao_deletar')
    tdAcoes.appendChild(botaoEditar);
    tdAcoes.appendChild(botaoDeletar);

    // Pegando os valores do banco.
    tdId.innerHTML = alunoAtual.Id;
    tdNome.innerHTML = alunoAtual.Nome;
    tdSobrenome.innerHTML = alunoAtual.Sobrenome;
    tdDataNascimento.innerHTML = dataNascimentoConvertida;
    tdCpf.innerHTML = alunoAtual.Cpf;
    tdEndereco.innerHTML = alunoAtual.Endereco;
    tdEmail.innerHTML = alunoAtual.Email;
    tdNumeroFaltas.innerHTML = alunoAtual.NumeroFaltas;

    // Inserindo os valores nas celulas.
    linhaAluno.appendChild(tdId);
    linhaAluno.appendChild(tdNome);
    linhaAluno.appendChild(tdSobrenome);
    linhaAluno.appendChild(tdDataNascimento);
    linhaAluno.appendChild(tdCpf);
    linhaAluno.appendChild(tdEndereco);
    linhaAluno.appendChild(tdEmail);
    linhaAluno.appendChild(tdNumeroFaltas);
    linhaAluno.appendChild(tdAcoes);

    let tabelaAluno = document.querySelector("#linha_aluno");
    tabelaAluno.appendChild(linhaAluno);

    botaoDeletar.addEventListener('click', async function(event){
      event.preventDefault()
      let removerLinha = linhaAluno
      let id = alunoAtual.Id
      console.log(id)

      let urlDeletarAluno = ``
    })

  }
};
 
// Selecionando o form.
let formulario = document.querySelector('#formulario')


formulario.addEventListener('submit', async function(event){
  event.preventDefault()
  let id = this[0].value
  
  let aluno = {
    Id: document.querySelector('.id_input').value,
    Nome: document.querySelector('.nome_input').value,
    Sobrenome: document.querySelector('.sobrenome_input').value,
    DataAniversario: document.querySelector('.data_nascimento_input').value,
    Cpf: document.querySelector('.cpf_input').value,
    Endereco: document.querySelector('.endereco_input').value,
    Email: document.querySelector('.email_input').value,
    NumeroFaltas: document.querySelector('.numerofaltas_input').value
  }
  let alunoObjetoJson = JSON.stringify(aluno)

  let urlAtualizarAluno = `http://localhost:8001/aluno/${id}/edit`
  let responseObj = await fetch(urlAtualizarAluno, {
    method: 'POST',
    body: alunoObjetoJson
  });
  let jsonObj = await responseObj.json()

  if(jsonObj.Status == "sucesso"){

    let tabelaAluno = document.querySelector("#cabecalho_alunos");

    for(let i = 0; i < tabelaAluno.length; i++){
      let alunoAtualizado = tabelaAluno[i]
    }
  }
})

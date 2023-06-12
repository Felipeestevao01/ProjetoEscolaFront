
// ---- Seleciona o cadastro ---- //
let formularioCadastro = document.getElementById("formularioCadastro");

// ---- Pegando os valores do Formulario ---- //
formularioCadastro.addEventListener("submit", async function(event){
  let nomeCadastro = document.getElementById("nome_cadastro").value;
  let sobrenomeCadastro = document.getElementById("sobrenome_cadastro").value;
  let dataNascimentoCadastro = document.getElementById("data_nascimento_cadastro").value;
  let telefoneCadastro = document.getElementById("telefone_cadastro").value;
  let cpfCadastro = document.getElementById("cpf_cadastro").value;
  let enderecoCadastro = document.getElementById("endereco_cadastro").value;
  let emailCadastro = document.getElementById("email_cadastro").value;
  let numeroFaltasCadastro = document.getElementById("numero_faltas_cadastro").value;

  // ---- Criando o Objeto e transformando em JSON ---- //
  let alunoObj = {
    dataAniversario: dataNascimentoCadastro,
    nome: nomeCadastro,
    sobrenome: sobrenomeCadastro,
    telefone: telefoneCadastro,
    cpf: cpfCadastro,
    endereco: enderecoCadastro,
    email: emailCadastro,
    numeroFaltas: numeroFaltasCadastro
  };
  let alunoObjetoJson = JSON.stringify(alunoObj);

  // ---- Cadastrando o aluno no banco ---- //
  let urlNovoAluno = `http://localhost:8001/alunos`
  let responseObj = await fetch(urlNovoAluno, {
    method: 'POST',
    body: alunoObjetoJson
  });
  let jsonObj = await responseObj.json()
});
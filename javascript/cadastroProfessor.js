
// ---- Seleciona o cadastro ---- //
let formularioCadastro = document.getElementById("formularioCadastro");

// ---- Pegando os valores do Formulario ---- //
formularioCadastro.addEventListener("submit", async function(event){
  let nomeCadastro = document.getElementById("nomeCadastro").value;
  let sobrenomeCadastro = document.getElementById("sobrenomeCadastro").value;
  let dataNascimentoCadastro = document.getElementById("dataNascimentoCadastro").value;
  let telefoneCadastro = document.getElementById("cpfCadastro").value;
  let cpfCadastro = document.getElementById("cpfCadastro").value;
  let enderecoCadastro = document.getElementById("enderecoCadastro").value;
  let emailCadastro = document.getElementById("emailCadastro").value;
  let salarioCadastro = document.getElementById("salarioCadastro").value;

  // ---- Criando o Objeto e transformando em JSON ---- //
  let professorObj = {
    dataAniversario: dataNascimentoCadastro,
    nome: nomeCadastro,
    sobrenome: sobrenomeCadastro,
    telefone: telefoneCadastro,
    cpf: cpfCadastro,
    endereco: enderecoCadastro,
    email: emailCadastro,
    salario: salarioCadastro
  }
  let professorObjetoJson = JSON.stringify(professorObj)

  // ---- Cadastrando o professor no banco ---- //
  let urlNovoProfessor = `http://localhost:8001/professores`
  let responseObj = await fetch(urlNovoProfessor, {
    method: 'POST',
    body: professorObjetoJson
  });
  let jsonObj = await responseObj.json()
})
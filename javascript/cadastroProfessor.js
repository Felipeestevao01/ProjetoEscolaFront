
// Cadastro de Aluno
let formularioCadastro = document.getElementById("formularioCadastro");

formularioCadastro.addEventListener("submit", async function(event){
  event.preventDefault(); // Evita o envio padrão do formulár

let nomeCadastro = document.getElementById("nomeCadastro").value;
let sobrenomeCadastro = document.getElementById("sobrenomeCadastro").value;
let dataNascimentoCadastro = document.getElementById("dataNascimentoCadastro").value;
let telefoneCadastro = document.getElementById("cpfCadastro").value;
let cpfCadastro = document.getElementById("cpfCadastro").value;
let enderecoCadastro = document.getElementById("enderecoCadastro").value;
let emailCadastro = document.getElementById("emailCadastro").value;
let salarioCadastro = document.getElementById("salarioCadastro").value;

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

let urlNovoAluno = `http://localhost:8001/professores`
let responseObj = await fetch(urlNovoAluno, {
  method: 'POST',
  body: professorObjetoJson
});
let jsonObj = await responseObj.json()
})
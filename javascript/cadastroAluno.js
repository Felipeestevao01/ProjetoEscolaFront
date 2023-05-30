
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
let numeroFaltasCadastro = document.getElementById("numeroFaltasCadastro").value;

let alunoObj = {
    dataAniversario: dataNascimentoCadastro,
    nome: nomeCadastro,
    sobrenome: sobrenomeCadastro,
    telefone: telefoneCadastro,
    cpf: cpfCadastro,
    endereco: enderecoCadastro,
    email: emailCadastro,
    numeroFaltas: numeroFaltasCadastro
}

let alunoObjetoJson = JSON.stringify(alunoObj)
console.log(alunoObjetoJson)

let urlNovoAluno = `http://localhost:8001/aluno/new`
let responseObj = await fetch(urlNovoAluno, {
  method: 'POST',
  body: alunoObjetoJson
});
let jsonObj = await responseObj.json()
})

// Cadastro de Materia
let formularioCadastro = document.getElementById("formularioCadastro");

formularioCadastro.addEventListener("submit", async function(event){
  event.preventDefault(); // Evita o envio padrão do formulár

let descricaoCadastro = document.getElementById("descricaoCadastro").value;
let dataTrabalhoCadastro = document.getElementById("dataTrabalhoCadastro").value;
let professorCadastro = document.getElementById("professorCadastro").value;
let questaoCadastro = document.getElementById("questaoCadastro").value;

let trabalhoObj = {
    Descricao: descricaoCadastro,
    DataTrabalho: dataTrabalhoCadastro,
    Professor: professorCadastro,
    Questoes: questaoCadastro
}

let trabalhoObjetoJson = JSON.stringify(trabalhoObj)

let urlNovoTrabalho = `http://localhost:8001/trabalhos`
let responseObj = await fetch(urlNovoTrabalho, {
  method: 'POST',
  body: trabalhoObjetoJson
});
let jsonObj = await responseObj.json()
})
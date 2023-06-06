
// Cadastro de Aluno
let formularioCadastro = document.getElementById("formularioCadastro");

formularioCadastro.addEventListener("submit", async function(event){
  event.preventDefault(); // Evita o envio padrão do formulár

let nomeCadastro = document.getElementById("nomeCadastro").value;
let cargaHorariaCadastro = document.getElementById("cargaHorariaCadastro").value;
let ativoCadastro = document.getElementById("ativoCadastro").value;

let cursoObj = {
    nome: nomeCadastro,
    cargaHoraria: cargaHorariaCadastro,
    ativo: ativoCadastro
}

let cursoObjetoJson = JSON.stringify(cursoObj)

let urlNovoCurso = `http://localhost:8001/cursos`
let responseObj = await fetch(urlNovoCurso, {
  method: 'POST',
  body: cursoObjetoJson
});
let jsonObj = await responseObj.json()
})
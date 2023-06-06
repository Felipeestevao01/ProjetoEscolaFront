
// Cadastro de Materia
let formularioCadastro = document.getElementById("formularioCadastro");

formularioCadastro.addEventListener("submit", async function(event){
  event.preventDefault(); // Evita o envio padrão do formulár

let nomeCadastro = document.getElementById("nomeCadastro").value;
let cargaHorariaCadastro = document.getElementById("cargaHorariaCadastro").value;
let cursoCadastro = document.getElementById("cursoCadastro").value;
let professorCadastro = document.getElementById("professorCadastro").value;

let materiaObj = {
    nome: nomeCadastro,
    cargaHoraria: cargaHorariaCadastro,
    Cursos: cursoCadastro,
    Professores: professorCadastro
}

let materiaObjetoJson = JSON.stringify(materiaObj)

let urlNovaMateria = `http://localhost:8001/materias`
let responseObj = await fetch(urlNovaMateria, {
  method: 'POST',
  body: materiaObjetoJson
});
let jsonObj = await responseObj.json()
})

// ---- Seleciona o cadastro ---- //
let formularioCadastro = document.getElementById("formularioCadastro");

// ---- Pegando os valores do Formulario ---- //
formularioCadastro.addEventListener("submit", async function(event){
  let nomeCadastro = document.getElementById("nome_cadastro").value;
  let cargaHorariaCadastro = document.getElementById("carga_horaria_cadastro").value;
  let cursoCadastro = document.getElementById("curso_cadastro").value;
  let professorCadastro = document.getElementById("professor_cadastro").value;

  // ---- Criando o Objeto e transformando em JSON ---- //
  let materiaObj = {
    nome: nomeCadastro,
    cargaHoraria: cargaHorariaCadastro,
    Cursos: cursoCadastro,
    Professores: professorCadastro
  }
  let materiaObjetoJson = JSON.stringify(materiaObj)

  // ---- Cadastrando a materia no banco ---- //
  let urlNovaMateria = `http://localhost:8001/materias`
  let responseObj = await fetch(urlNovaMateria, {
    method: 'POST',
    body: materiaObjetoJson
  });
  let jsonObj = await responseObj.json()
});
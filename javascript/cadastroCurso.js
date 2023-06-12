
// ---- Seleciona o cadastro ---- //
let formularioCadastro = document.getElementById("formularioCadastro");

// ---- Pegando os valores do Formulario ---- //
formularioCadastro.addEventListener("submit", async function(event){
  let nomeCadastro = document.getElementById("nome_cadastro").value;
  let cargaHorariaCadastro = document.getElementById("carga_horaria_cadastro").value;
  let ativoCadastro = document.getElementById("ativo_cadastro").value;

  // ---- Criando o Objeto e transformando em JSON ---- //
  let cursoObj = {
    nome: nomeCadastro,
    cargaHoraria: cargaHorariaCadastro,
    ativo: ativoCadastro
  };
  let cursoObjetoJson = JSON.stringify(cursoObj);

  // ---- Cadastrando o curso no banco ---- //
  let urlNovoCurso = `http://localhost:8001/cursos`
  let responseObj = await fetch(urlNovoCurso, {
    method: 'POST',
    body: cursoObjetoJson
  });
  let jsonObj = await responseObj.json()
});
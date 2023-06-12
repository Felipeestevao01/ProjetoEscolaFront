// ---- Seleciona o cadastro ---- //
let formularioCadastro = document.getElementById("formularioCadastro");

// ---- Pegando os valores do Formulario ---- //
formularioCadastro.addEventListener("submit", async function(event){
  let notaCadastro = document.getElementById("notaCadastro").value;
  let trabalhoCadastro = document.getElementById("trabalhoCadastro").value;
  let alunoCadastro = document.getElementById("alunoCadastro").value;

  // ---- Criando o Objeto e transformando em JSON ---- //
  let notaObj = {
    ValorNota: notaCadastro,
    Trabalho: trabalhoCadastro,
    Aluno: alunoCadastro
  }
  let notaObjetoJson = JSON.stringify(notaObj)

  // ---- Cadastrando o aluno no banco ---- //
  let urlNovaNota = `http://localhost:8001/materias`
  let responseObj = await fetch(urlNovaNota, {
    method: 'POST',
    body: notaObjetoJson
  });
  let jsonObj = await responseObj.json()
})
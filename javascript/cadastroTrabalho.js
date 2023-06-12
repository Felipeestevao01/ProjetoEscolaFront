
// ---- Seleciona o cadastro ---- //
let formularioCadastro = document.getElementById("formularioCadastro");

// ---- Pegando os valores do Formulario ---- //
formularioCadastro.addEventListener("submit", async function(event){
  let descricaoCadastro = document.getElementById("descricaoCadastro").value;
  let dataTrabalhoCadastro = document.getElementById("dataTrabalhoCadastro").value;
  let professorCadastro = document.getElementById("professorCadastro").value;
  let questaoCadastro = document.getElementById("questaoCadastro").value;

  // ---- Criando o Objeto e transformando em JSON ---- //
  let trabalhoObj = {
    Descricao: descricaoCadastro,
    DataTrabalho: dataTrabalhoCadastro,
    Professor: professorCadastro,
    Questoes: questaoCadastro
  }
  let trabalhoObjetoJson = JSON.stringify(trabalhoObj)

  // ---- Cadastrando o trabalho no banco ---- //
  let urlNovoTrabalho = `http://localhost:8001/trabalhos`
  let responseObj = await fetch(urlNovoTrabalho, {
    method: 'POST',
    body: trabalhoObjetoJson
  });
  let jsonObj = await responseObj.json()
});
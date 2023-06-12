// ---- Seleciona o cadastro ---- //
let formularioCadastro = document.getElementById("formularioCadastro");

// ---- Pegando os valores do Formulario ---- //
formularioCadastro.addEventListener("submit", async function(event){
  let descricaoCadastro = document.getElementById("descricaoCadastro").value;
  let escolhaCadastro = document.getElementById("escolhaCadastro").value;

  // ---- Criando o Objeto e transformando em JSON ---- //
  let questaoObj = {
    Descricao: descricaoCadastro,
    Escolha: escolhaCadastro
  }
  let questaoObjetoJson = JSON.stringify(questaoObj)

  // ---- Cadastrando a questão no banco ---- //
  let urlNovaQuestao = `http://localhost:8001/questoes`
  let responseObj = await fetch(urlNovaQuestao, {
    method: 'POST',
    body: questaoObjetoJson
  });
  let jsonObj = await responseObj.json()
})
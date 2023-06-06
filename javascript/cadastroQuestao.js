// Cadastro de Aluno
let formularioCadastro = document.getElementById("formularioCadastro");

formularioCadastro.addEventListener("submit", async function(event){
  event.preventDefault(); // Evita o envio padrão do formulár

let descricaoCadastro = document.getElementById("descricaoCadastro").value;
let escolhaCadastro = document.getElementById("escolhaCadastro").value;

let questaoObj = {
    Descricao: descricaoCadastro,
    Escolha: escolhaCadastro
}

let questaoObjetoJson = JSON.stringify(questaoObj)

let urlNovaQuestao = `http://localhost:8001/questoes`
let responseObj = await fetch(urlNovaQuestao, {
  method: 'POST',
  body: questaoObjetoJson
});
let jsonObj = await responseObj.json()
})
// Cadastro de Nota
let formularioCadastro = document.getElementById("formularioCadastro");

formularioCadastro.addEventListener("submit", async function(event){
  event.preventDefault(); // Evita o envio padrão do formulár

let notaCadastro = document.getElementById("notaCadastro").value;
let trabalhoCadastro = document.getElementById("trabalhoCadastro").value;
let alunoCadastro = document.getElementById("alunoCadastro").value;

let notaObj = {
    ValorNota: notaCadastro,
    Trabalho: trabalhoCadastro,
    Aluno: alunoCadastro
}

let notaObjetoJson = JSON.stringify(notaObj)

let urlNovaNota = `http://localhost:8001/materias`
let responseObj = await fetch(urlNovaNota, {
  method: 'POST',
  body: notaObjetoJson
});
let jsonObj = await responseObj.json()
})
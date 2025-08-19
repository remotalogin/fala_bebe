async function gerarFala(personagem) {
  const tema = prompt("Digite o tema para a fala:");

  const resposta = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ personagem, tema })
  });

  const data = await resposta.json();

  if (personagem === "mulher") {
    document.getElementById("falaMulher").value = data.texto;
  } else {
    document.getElementById("falaBebe").value = data.texto;
  }

  atualizarPrompt();
}

function atualizarPrompt() {
  const genero = document.getElementById("genero").value;
  const cor = document.getElementById("cor").value || "sky blue";
  const falaMulher = document.getElementById("falaMulher").value;
  const falaBebe = document.getElementById("falaBebe").value;

  const descricaoCrianca =
    genero === "menino"
      ? `Baby Boy Speaker: 7–9 months old, wearing a fluffy ${cor} onesie with tiny cloud patterns and a matching knit beanie.`
      : `Baby Girl Speaker: 7–9 months old, wearing a fluffy ${cor} dress with tiny flower patterns and a headband bow.`;

  const prompt = `Character 1 – Woman Interviewer: Young woman, pastel pink nails, holding a mic. Character 2 – ${descricaoCrianca} Dialogue (Portuguese): Woman: “${falaMulher}” Baby: “${falaBebe}”`;

  document.getElementById("prompt").innerText = prompt;
}

function copiarPrompt() {
  const texto = document.getElementById("prompt").innerText;
  navigator.clipboard.writeText(texto);
  alert("Prompt copiado!");
}

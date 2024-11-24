Jogo de Aventura com JavaScript
===============================

Um jogo simples baseado em texto desenvolvido com HTML, CSS e JavaScript. O jogador explora locais, enfrenta monstros e gerencia recursos como ouro, saúde e armas.

🚀 Funcionalidades do Jogo
--------------------------

-   Explorar diferentes locais: praça central, loja e caverna.
-   Comprar itens e gerenciar um inventário de armas.
-   Combater monstros e ganhar experiência e ouro.
-   Escolhas interativas com múltiplos finais, incluindo vitória ou derrota.
-   Easter egg secreto com um mini-jogo de sorte.

🛠️ Fundamentos de JavaScript Utilizados
----------------------------------------

### 1\. **Manipulação do DOM**

O jogo usa seletores do DOM para interagir com elementos da interface:


`const button1 = document.querySelector("#button1");
button1.onclick = goStore;`

As funções atualizam dinamicamente o conteúdo da página (texto, botões, estatísticas do jogador, etc.).

### 2\. **Objetos e Arrays**

Os locais, armas e monstros são representados como objetos e arrays:


`const weapons = [
  { name: "porrete", power: 5 },
  { name: "adaga", power: 30 }
];`

Isso permite armazenar e acessar propriedades de forma estruturada.

### 3\. **Funções**

Funções reutilizáveis para ações do jogador e lógica do jogo, como atacar monstros, esquivar ou comprar itens:

`function buyWeapon() {
  if (gold >= 30) {
    gold -= 30;
    currentWeapon++;
    goldText.innerText = gold;
    text.innerText = "Agora você tem uma " + weapons[currentWeapon].name + ".";
  }
}`

### 4\. **Eventos**

Os eventos de clique (`onclick`) ativam funções que executam a lógica do jogo com base nas escolhas do jogador.

### 5\. **Condicionais**

Lógica condicional usada para determinar o resultado de ações, como verificar se o jogador tem ouro suficiente:

`if (gold >= 10) {
  gold -= 10;
  health += 10;
} else {
  text.innerText = "Você não tem ouro suficiente.";
}`

### 6\. **Math e Aleatoriedade**

O jogo usa `Math.random()` para gerar elementos aleatórios, como ataques de monstros e eventos no mini-jogo:

`function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  return hit > 0 ? hit : 0;
}`

### 7\. **Estruturas de Controle**

Loops e arrays são usados para lógica de sorteio no mini-jogo:


`function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
}`

### 8\. **Controle de Estado**

O estado do jogo é controlado por variáveis globais como `xp`, `gold`, `health` e `currentWeapon`. Essas variáveis são atualizadas dinamicamente conforme o jogo avança.

### 9\. **Estilização Dinâmica**

A visibilidade de elementos como estatísticas do monstro é controlada programaticamente:



`monsterStats.style.display = "block";`

📂 Estrutura de Arquivos
------------------------



`|-- index.html
|-- style.css
|-- script.js
|-- README.md`

🖥️ Como Executar o Jogo
------------------------

1.  Clone o repositório:   

    `git clone https://github.com/seu-usuario/nome-do-repositorio.git`

2.  Abra o arquivo `index.html` em qualquer navegador moderno.

🌟 Próximos Passos
------------------

-   Melhorar o design com CSS moderno.
-   Adicionar novas armas, monstros e eventos.
-   Implementar salvamento do progresso do jogo usando `localStorage`.

📝 Licença
----------

Este projeto é distribuído sob a licença MIT. Sinta-se à vontade para usá-lo e modificá-lo!

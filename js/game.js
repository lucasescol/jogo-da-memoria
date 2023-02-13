//DECLARAÇÕES.
const grid = document.querySelector('.grid');
let primeiroCard = '';
let segundoCard = '';
const linguagens = [
    'c++',
    'css',
    'git',
    'html',
    'java',
    'js',
    'mysql',
    'php',
    'python',
    'ruby',
]


//CRIA AS TAGS HTML.
const criarElement = (tag, nomeClasse) => {
    const element = document.createElement(tag);
    element.className = nomeClasse;
    return element;
}


//SE O NÚMERO TOTAL DE CARTAS DESATIVADAS FOR 20, ENCERRA O JOGO.
checarFimDoJogo = () => {
    const disabledCards = document.querySelectorAll('.carta-desativada');

    if (disabledCards.length === 20) {
        alert('Fim do Jogo!!')
    }
}


//CHECA SE A PRIMEIRA CARTA VIRADA É IGUAL A SEGUNDA, SE NÃO, DESVIRA AS CARTAS.
const checarCartas = () => {
    const primeiraLing = primeiroCard.getAttribute('lang');
    const segundaLing = segundoCard.getAttribute('lang');

    if (primeiraLing === segundaLing) {
        primeiroCard.firstChild.classList.add('carta-desativada');
        segundoCard.firstChild.classList.add('carta-desativada');

        primeiroCard = '';
        segundoCard = '';

        checarFimDoJogo()
        
    } else {
        setTimeout(() => {
            primeiroCard.classList.remove('revelar-carta');
            segundoCard.classList.remove('revelar-carta');

            primeiroCard = '';
            segundoCard = '';
        }, 500)
    }
}


//CAPTURA O CLICK DO MOUSE, SE A CARTA CLICADA NÃO FOI REVELADA, REVELA.
const revelarCard = ({ target }) => {
    if (target.parentNode.className.includes('revelar-carta')) {
        return;
    }

    if (primeiroCard === '') {
        target.parentNode.classList.add('revelar-carta');
        primeiroCard = target.parentNode;
    } else if (segundoCard === '') {
        target.parentNode.classList.add('revelar-carta');
        segundoCard = target.parentNode;
    }

    checarCartas();
}


//CRIA O CONJUNTO DE TAGS QUE FORMAM UMA CARTA.
const criarCard = (linguagem) => {
    const card = criarElement('div', 'card');
    const front = criarElement('div', 'face front');
    const back = criarElement('div', 'face back');

    front.style.backgroundImage = `url('img/${linguagem}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revelarCard);
    card.setAttribute('lang', linguagem);

    return card;
}


//DUPLICA, EMBARALHA E PÕE AS CARTAS NO GRID.
const carregarJogo = () => {
    const linguagensDuplicaadas = [...linguagens, ...linguagens];
    const linguagensEmbaralhadas = linguagensDuplicaadas.sort(() => Math.random() - 0.5);

    linguagensEmbaralhadas.forEach((linguagem) => {
        const card = criarCard(linguagem);
        grid.appendChild(card);
    })
}


carregarJogo();
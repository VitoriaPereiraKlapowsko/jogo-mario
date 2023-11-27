const mario = document.querySelector('.mario');
const cano = document.querySelector('.cano');
const nuvem = document.querySelector('.nuvem');
const fimDeJogo = document.querySelector('.fim-de-jogo');
const botaoReiniciar = document.querySelector('.reiniciar');
const pontuacaoElemento = document.querySelector('.pontuacao');
const valorPontuacaoElemento = document.querySelector('#valor-pontuacao');

let pontuacao = 0;
let distanciaPercorrida = 0;

document.addEventListener('keyup', fazerMarioPular);
botaoReiniciar.addEventListener('click', reiniciarJogo);

function fazerMarioPular() {
    mario.classList.add('pular');
    setTimeout(function () {
        mario.classList.remove('pular');
        pontuacao++;

        atualizarPontuacao();
    }, 500);
}

function atualizarPontuacao() {
    distanciaPercorrida++;
    valorPontuacaoElemento.textContent = `${distanciaPercorrida} metros`;
}

function veriicarColisoes() {
    const posicaoCano = cano.offsetLeft;
    const posicaoMario = parseFloat(getComputedStyle(mario).bottom);
    const posicaoNuvem = parseFloat(getComputedStyle(nuvem).bottom);

    if (posicaoCano <= 100 && posicaoCano > 0 && posicaoMario < 60) {
        console.log("Você morreu, sua pontuação foi de: ", pontuacao)
        pontuacao = 0;
        pararJogo();

        cano.style.animation = 'nome';
        cano.style.left = `${posicaoCano}px`;

        mario.style.animation = 'nome';
        mario.style.bottom = `${posicaoMario}px`;
        mario.src = 'assets/imgs/fim-de-jogo.png';
        mario.style.widht = '70px'
        mario.style.marginLet = '35px';

        nuvem.style.animation = 'nuvem 20s infinite linear';
        nuvem.style.left = `${posicaoNuvem}px`;

        fimDeJogo.style.visibility = 'visible';
        botaoReiniciar.style.visibility = 'visible';

    } else if (posicaoCano < -100 && posicaoCano > -110) {
        pontuacao++;
        atualizarPontuacao();
    }
}

let loopJogo = setInterval(veriicarColisoes, 10);

function pararJogo() {
    clearInterval(loopJogo);
    console.log("Jogo Parado")
}

function reiniciarJogo() {
    location.reload()
}
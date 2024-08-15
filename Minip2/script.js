import { selecionarPerguntasDoDia, obterPerguntaDoDia } from './perguntas.js';
import { verificarResposta } from './resposta.js';
import { atualizarStatus, mostrarResultadoFinal } from './resultado.js';

let questaoElemento = document.querySelector(".questao");
let acertouErrou = document.querySelector(".certou-errou");
let questaoRespondidaElemento = document.querySelector(".perguntas-respondidas");
let questaoQueFaltamElemento = document.querySelector(".perguntas-falta");
let descricao = document.querySelector(".descricao");

let perguntaAtual = 0;

// Função para exibir a pergunta atual e suas alternativas
function exibirPergunta() {
    let perguntaElemento = document.querySelector(".pergunta");
    let alternativasElemento = document.querySelector(".alternativas");
    let perguntasDoDia = obterPerguntaDoDia();
    let perguntaObjeto = perguntasDoDia[perguntaAtual];

    if (perguntaElemento && alternativasElemento) {
        perguntaElemento.textContent = perguntaObjeto.pergunta;

        // Criando uma lista de alternativas
        alternativasElemento.innerHTML = ""; // Limpa alternativas anteriores
        perguntaObjeto.alternativas.forEach(alternativa => {
            let li = document.createElement("li");
            li.textContent = alternativa;
            li.style.cursor = 'pointer';
            li.addEventListener('click', () => verificarResposta(perguntaAtual, alternativa, (explicacao, acertou) => {
                acertouErrou.textContent = acertou ? `Resposta certa` : `Resposta errada`;
                descricao.textContent = explicacao;

                // Desabilitar o clique nas outras alternativas
                Array.from(alternativasElemento.children).forEach(item => {
                    item.style.pointerEvents = 'none'; // Desabilita cliques adicionais
                });
            }));
            alternativasElemento.appendChild(li);
        });

        // Atualiza o status das questões
        atualizarStatus(questaoElemento, questaoRespondidaElemento, questaoQueFaltamElemento);
    }
}

// Função para ir para a próxima pergunta
function proximaPergunta() {
    let perguntasDoDia = obterPerguntaDoDia(); 
    if (perguntaAtual < perguntasDoDia.length - 1) {
        perguntaAtual++;
        exibirPergunta();
        acertouErrou.textContent = "";
        descricao.textContent = "";
    } else {
        mostrarResultadoFinal();
    }
}

// Botão de próxima pergunta
let proxPergunta = document.getElementById("proPergunta");
proxPergunta.addEventListener('click', proximaPergunta);

// Botão de encerrar quiz
let encerrarQuiz = document.getElementById("encerrar-quiz");
encerrarQuiz.addEventListener('click', mostrarResultadoFinal);

// Inicialização do quiz
selecionarPerguntasDoDia();
exibirPergunta();
import { obterPerguntaDoDia } from './perguntas.js';

// Verifica a resposta do usuário e atualiza o status da pergunta
function verificarResposta(perguntaAtual, respostaUsuario, callback) {
    let perguntasDoDia = obterPerguntaDoDia();
    let perguntaObjeto = perguntasDoDia[perguntaAtual];

    // Verifica se a pergunta ainda não foi respondida
    if (!perguntaObjeto.respondida) {
        perguntaObjeto.respondida = true; // Marca a pergunta como respondida
        let questaoRespondida = parseInt(localStorage.getItem('questaoRespondida')) + 1; // Incrementa o contador de perguntas respondidas
        localStorage.setItem('questaoRespondida', questaoRespondida);

        // Verifica a resposta do usuário
        if (respostaUsuario === perguntaObjeto.resposta) {
            perguntaObjeto.certo = true;
            let respostaCerta = parseInt(localStorage.getItem('respostaCerta')) + 1;
            localStorage.setItem('respostaCerta', respostaCerta);
            const audio = document.querySelector('#audCerto');
            audio.play();
        } else {
            perguntaObjeto.certo = false;
            let respostaErrada = parseInt(localStorage.getItem('respostaErrada')) + 1;
            localStorage.setItem('respostaErrada', respostaErrada);
            const audio2 = document.querySelector('#audErrado');
            audio2.play();
        }

        let questaoQueFaltam = perguntasDoDia.length - questaoRespondida;
        localStorage.setItem('questaoQueFaltam', questaoQueFaltam);

        // Atualiza o localStorage com o estado atualizado das perguntas do dia
        localStorage.setItem('perguntasDoDia', JSON.stringify(perguntasDoDia));

        // Executa a função callback, se fornecida, passando a explicação e o resultado da resposta
        if (callback) {
            callback(perguntaObjeto.explicacao, perguntaObjeto.certo);
        }
    }
}

function getQuestaoRespondida (){
    return parseInt(localStorage.getItem('questaoRespondida')) || 0;
}

function getQuestaoQueFaltam (){
    return parseInt(localStorage.getItem('questaoQueFaltam')) || 0;
}

function getRespostaCerta (){
    return parseInt(localStorage.getItem('respostaCerta')) || 0;
}

function getRespostaErrada (){
    return parseInt(localStorage.getItem('respostaErrada')) || 0;
}

export {verificarResposta, getQuestaoQueFaltam, getQuestaoRespondida, getRespostaCerta, getRespostaErrada}
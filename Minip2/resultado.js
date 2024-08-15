import { getQuestaoQueFaltam, getQuestaoRespondida, getRespostaCerta, getRespostaErrada } from './resposta.js';

const modal = document.querySelector("dialog");
const resultElemento = document.getElementById('result');

// Função para gerar a URL de compartilhamento no X
function gerarUrlDeCompartilhamento(respostaCerta, respostaErrada) {
    const texto = `Acabei de completar o quiz! Acertos: ${respostaCerta}, Erros: ${respostaErrada}.`;
    const urlBase = "https://twitter.com/intent/tweet";
    const urlCompleta = `${urlBase}?text=${encodeURIComponent(texto)}`;
    return urlCompleta;
}

// Atualiza o status das questões no HTML
function atualizarStatus(questaoElemento, questaoRespondidaElemento, questaoQueFaltamElemento) {
    let questaoAtual = getQuestaoRespondida() + 1;
    let questaoRespondida = getQuestaoRespondida();
    let questaoQueFaltam = getQuestaoQueFaltam();

    if (questaoElemento) {
        questaoElemento.textContent = `Pergunta ${questaoAtual}`;
    }
    if (questaoRespondidaElemento) {
        questaoRespondidaElemento.textContent = `Perguntas respondidas: ${questaoRespondida}`;
    }
    if (questaoQueFaltamElemento) {
        questaoQueFaltamElemento.textContent = `Perguntas que Faltam: ${questaoQueFaltam}`;
    }
}

// Mostra o resultado final ao fim do questionário
function mostrarResultadoFinal() {
    let respostaCerta = getRespostaCerta();
    let respostaErrada = getRespostaErrada();
    let resultadoTexto = `Você acertou ${respostaCerta} e errou ${respostaErrada}.`;

    // Atualizando o conteúdo do popup
    resultElemento.textContent = resultadoTexto;

    // Mostrando o dialog
    modal.showModal();

    // Adicionando o evento de clique ao botão de compartilhar
    const compartilharBtn = document.getElementById('compartilhar');
    compartilharBtn.addEventListener('click', () => {
        const urlCompartilhar = gerarUrlDeCompartilhamento(respostaCerta, respostaErrada);
        window.open(urlCompartilhar, '_blank');
    });
}

// Adicionando listeners para os botões "Reiniciar" e "Fechar" dentro do modal
document.getElementById('reiniciar').addEventListener('click', () => {
    location.reload(); // Recarrega a página para reiniciar o quiz
});

document.getElementById('fechar').addEventListener('click', () => {
    window.location.href = "home.html";
    modal.close(); // Fecha o dialog
});

export { atualizarStatus, mostrarResultadoFinal };

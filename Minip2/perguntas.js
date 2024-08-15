const lista = [
    {
        pergunta: "Qual é a capital do Brasil?",
        alternativas: ["São Paulo", "Rio de Janeiro", "Brasília"],
        resposta: "Brasília",
        respondida: false,
        certo: false,
        explicacao: "Brasília foi inaugurada como capital do Brasil em 1960, projetada para ajudar no desenvolvimento do interior do país."
    },
    {
        pergunta: "Qual é a capital da França?",
        alternativas: ["Paris", "Lyon", "Marselha"],
        resposta: "Paris",
        respondida: false,
        certo: false,
        explicacao: "Paris é a capital da França desde o século 10, conhecida por sua cultura, história e arquitetura icônica."
    },
    {
        pergunta: "Qual é a moeda utilizada no Japão?",
        alternativas: ["Yuan", "Won", "Iene"],
        resposta: "Iene",
        respondida: false,
        certo: false,
        explicacao: "O Iene é a moeda oficial do Japão, adotada em 1871, simbolizando a modernização da economia japonesa."
    },
    {
        pergunta: "Qual é o maior planeta do Sistema Solar?",
        alternativas: ["Terra", "Júpiter", "Saturno"],
        resposta: "Júpiter",
        respondida: false,
        certo: false,
        explicacao: "Júpiter é o maior planeta do Sistema Solar, com um diâmetro onze vezes maior que o da Terra."
    },
    {
        pergunta: "Qual é o elemento químico com o símbolo 'O'?",
        alternativas: ["Ouro", "Oxigênio", "Osmio"],
        resposta: "Oxigênio",
        respondida: false,
        certo: false,
        explicacao: "O oxigênio é o elemento químico com o símbolo 'O', essencial para a respiração dos organismos vivos."
    },
    {
        pergunta: "Quem escreveu 'Dom Quixote'?",
        alternativas: ["Miguel de Cervantes", "William Shakespeare", "Gabriel García Márquez"],
        resposta: "Miguel de Cervantes",
        respondida: false,
        certo: false,
        explicacao: "Miguel de Cervantes, escritor espanhol, escreveu 'Dom Quixote', considerado uma das maiores obras da literatura mundial."
    },
    {
        pergunta: "Qual é a velocidade da luz no vácuo?",
        alternativas: ["300.000 km/s", "150.000 km/s", "450.000 km/s"],
        resposta: "300.000 km/s",
        respondida: false,
        certo: false,
        explicacao: "A velocidade da luz no vácuo é de aproximadamente 300.000 quilômetros por segundo."
    },
    {
        pergunta: "Quem pintou a Mona Lisa?",
        alternativas: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci"],
        resposta: "Leonardo da Vinci",
        respondida: false,
        certo: false,
        explicacao: "Leonardo da Vinci, pintor renascentista italiano, criou a famosa pintura Mona Lisa."
    },
    {
        pergunta: "Qual é o maior oceano do mundo?",
        alternativas: ["Oceano Atlântico", "Oceano Pacífico", "Oceano Índico"],
        resposta: "Oceano Pacífico",
        respondida: false,
        certo: false,
        explicacao: "O Oceano Pacífico é o maior oceano do mundo, cobrindo mais de 63 milhões de milhas quadradas."
    },
    {
        pergunta: "Qual é o principal gás que compõe a atmosfera da Terra?",
        alternativas: ["Oxigênio", "Nitrogênio", "Dióxido de Carbono"],
        resposta: "Nitrogênio",
        respondida: false,
        certo: false,
        explicacao: "O nitrogênio compõe cerca de 78% da atmosfera da Terra, tornando-se o principal gás presente."
    }
  ];
  
  function selecionarPerguntasDoDia() {
    let data = new Date();
    let diaDoMes = data.getDate();
  
    // Alterna entre as duas metades da lista a cada dia
    let perguntasDoDia;
    if (diaDoMes % 2 === 0) {
        perguntasDoDia = lista.slice(0, 5);
    } else {
        perguntasDoDia = lista.slice(5, 10);
    }
  
    perguntasDoDia = perguntasDoDia.map(pergunta => {
        return { ...pergunta, respondida: false, certo: false };
    });
  
    try {
        localStorage.setItem('perguntasDoDia', JSON.stringify(perguntasDoDia));
        localStorage.setItem('questaoRespondida', 0);
        localStorage.setItem('questaoQueFaltam', 5);
        localStorage.setItem('respostaCerta', 0);
        localStorage.setItem('respostaErrada', 0);
    } catch (e) {
        console.error('Erro ao salvar no localStorage', e);
    }
  }
  
  function obterPerguntaDoDia() {
    let perguntas = localStorage.getItem('perguntasDoDia');
    return perguntas ? JSON.parse(perguntas) : [];
  }
  
  export { lista, selecionarPerguntasDoDia, obterPerguntaDoDia };
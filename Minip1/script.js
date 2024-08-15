const inputNovaTarefa = document.querySelector("input[type='text']");
const botaoAdd = document.querySelector("button");
const listaTarefas = document.querySelector("#lista");
const botaoConcluido = document.querySelector("#concluido");
const botaoPendente = document.querySelector("#pendente");
let dbTarefas = JSON.parse(localStorage.getItem("listaTarefas")) || [];

// Função para adicionar uma tarefa à lista
function adicionarTarefa(tarefa, concluida = false) {
  const novaTarefa = document.createElement("li");
  novaTarefa.classList.add("item-lista");
  if (concluida) {
    novaTarefa.style.color = "green";
    novaTarefa.classList.add("concluido");
  }

  const spanNomeTarefa = document.createElement("span");
  spanNomeTarefa.textContent = tarefa;

  const tarefaConcluida = document.createElement("input");
  tarefaConcluida.type = "checkbox";
  tarefaConcluida.checked = concluida;

  tarefaConcluida.addEventListener("click", () => {
    if (tarefaConcluida.checked) {
      novaTarefa.style.color = "green";
      novaTarefa.classList.add("concluido");
    } else {
      novaTarefa.style.color = "inherit";
      novaTarefa.classList.remove("concluido");
    }
    // Atualizar estado da tarefa no dbTarefas
    const index = dbTarefas.findIndex((t) => t.tarefa === tarefa);
    if (index !== -1) {
      dbTarefas[index].concluida = tarefaConcluida.checked;
    }
    salvarTarefas();
  });

  const botaoRemoverTarefa = document.createElement("button");
  botaoRemoverTarefa.textContent = " X ";
  botaoRemoverTarefa.addEventListener("click", () => {
    listaTarefas.removeChild(novaTarefa);
    dbTarefas = dbTarefas.filter((t) => t.tarefa !== tarefa);
    salvarTarefas();
  });

  // Função para editar a tarefa
  function editarTarefa() {
    const inputEdicao = document.createElement("input");
    inputEdicao.type = "text";
    inputEdicao.value = spanNomeTarefa.textContent;
    novaTarefa.replaceChild(inputEdicao, spanNomeTarefa);
    inputEdicao.focus();

    inputEdicao.addEventListener("blur", () => {
      spanNomeTarefa.textContent = inputEdicao.value;
      const index = dbTarefas.findIndex((t) => t.tarefa === tarefa);
      if (index !== -1) {
        dbTarefas[index].tarefa = inputEdicao.value;
      }
      novaTarefa.replaceChild(spanNomeTarefa, inputEdicao);
      salvarTarefas();
    });

    inputEdicao.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        inputEdicao.blur();
      }
    });
  }

  spanNomeTarefa.addEventListener("dblclick", editarTarefa);

  novaTarefa.appendChild(spanNomeTarefa);
  novaTarefa.appendChild(botaoRemoverTarefa);
  novaTarefa.appendChild(tarefaConcluida);
  listaTarefas.appendChild(novaTarefa);
}

// Função para salvar as tarefas no localStorage
function salvarTarefas() {
  localStorage.setItem("listaTarefas", JSON.stringify(dbTarefas));
}

// Carregar tarefas do localStorage ao carregar a página
dbTarefas.forEach((t) => adicionarTarefa(t.tarefa, t.concluida));

botaoAdd.addEventListener("click", () => {
  const tarefa = inputNovaTarefa.value;
  if (tarefa === "") {
    alert("Adicione uma tarefa");
    return;
  }
  dbTarefas.push({ tarefa, concluida: false });
  adicionarTarefa(tarefa);
  salvarTarefas();
  inputNovaTarefa.value = "";
});

botaoConcluido.addEventListener("click", () => {
  const tarefas = document.querySelectorAll(".item-lista");
  tarefas.forEach((tarefa) => {
    if (tarefa.classList.contains("concluido")) {
      tarefa.style.display = "block";
    } else {
      tarefa.style.display = "none";
    }
  });
});

botaoPendente.addEventListener("click", () => {
  const tarefas = document.querySelectorAll(".item-lista");
  tarefas.forEach((tarefa) => {
    if (!tarefa.classList.contains("concluido")) {
      tarefa.style.display = "block";
    } else {
      tarefa.style.display = "none";
    }
  });
});
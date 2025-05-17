let carrinho = [];

function adicionarCarrinho(nome, preco, imagem) {
  const existente = carrinho.find(item => item.nome === nome);
  if (existente) {
    existente.quantidade++;
  } else {
    carrinho.push({ nome, preco, imagem, quantidade: 1 });
  }
  atualizarCarrinho();
}

function removerCarrinho(nome) {
  carrinho = carrinho.filter(item => item.nome !== nome);
  atualizarCarrinho();
}

function atualizarQuantidade(nome, novaQtd) {
  const item = carrinho.find(produto => produto.nome === nome);
  if (item) {
    item.quantidade = parseInt(novaQtd);
    if (item.quantidade <= 0) {
      removerCarrinho(nome);
    } else {
      atualizarCarrinho();
    }
  }
}

function atualizarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  const totalSpan = document.getElementById("total");
  lista.innerHTML = "";

  let total = 0;
  carrinho.forEach(item => {
    const li = document.createElement("li");
    li.className = "carrinho-item";
    li.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}">
      <div class="nome-produto">${item.nome}</div>
      <div class="valores-produto">
        <span>R$ ${item.preco.toFixed(2)}</span>
        <div class="input-quantidade">
          <button class="btn-diminuir" onclick="diminuirQuantidade('${item.nome}')">-</button>
          <input type="text" readonly value="${item.quantidade}" id="input-${item.nome}">
          <button class="btn-aumentar" onclick="aumentarQuantidade('${item.nome}')">+</button>
        </div>
        <button class="remover-btn" onclick="removerCarrinho('${item.nome}')">Remover</button>
      </div>
    `;
    lista.appendChild(li);
    total += item.preco * item.quantidade;
  });

  totalSpan.textContent = total.toFixed(2);
}

function abrirCarrinho() {
  document.getElementById("carrinho").style.display = "flex";
  document.querySelector(".produtos").style.paddingRight = "470px";
  document.querySelector(".icone-carrinho").style.paddingRight = "470px";
}

function fecharCarrinho() {
  document.getElementById("carrinho").style.display = "none";
  document.querySelector(".produtos").style.paddingRight = "20px";
  document.querySelector(".icone-carrinho").style.paddingRight = "10px";
}

function aumentarQuantidade(nome) {
  const input = document.getElementById(`input-${nome}`);
  let valor = parseInt(input.value);
  valor++;
  input.value = valor;
  atualizarQuantidade(nome, valor); // sua função existente para atualizar o carrinho
}

function diminuirQuantidade(nome) {
  const input = document.getElementById(`input-${nome}`);
  let valor = parseInt(input.value);
  if (valor > 1) {
    valor--;
    input.value = valor;
    atualizarQuantidade(nome, valor);
  }
}
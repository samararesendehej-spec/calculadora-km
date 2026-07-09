// ==========================
// TAXAS (ALTERE QUANDO QUISER)
// ==========================

let taxas = {
    debito: 1.99,
    1: 3.49,
    2: 4.49,
    3: 5.49,
    4: 6.49,
    5: 7.49,
    6: 8.49,
    7: 9.49,
    8: 10.49,
    9: 11.49,
    10: 12.49,
    11: 13.49,
    12: 14.49,
    13: 15.49,
    14: 16.49,
    15: 17.49,
    16: 18.49,
    17: 19.49,
    18: 20.49
};

// ==========================

const campoValor = document.getElementById("valor");
const tabela = document.getElementById("tabelaResultado");

// Máscara em reais
campoValor.addEventListener("input", mascaraMoeda);

function mascaraMoeda(e){

    let valor = e.target.value.replace(/\D/g,"");

    valor = (Number(valor)/100).toLocaleString("pt-BR",{
        style:"currency",
        currency:"BRL"
    });

    e.target.value = valor;

    calcular();

}

function obterNumero(){

    return Number(

        campoValor.value

        .replace("R$","")

        .replace(/\./g,"")

        .replace(",",".")
        .trim()

    );

}

function dinheiro(valor){

    return valor.toLocaleString("pt-BR",{
        style:"currency",
        currency:"BRL"
    });

}

function calcular(){

    tabela.innerHTML="";

    const valor = obterNumero();

    if(valor<=0 || isNaN(valor))
        return;

    adicionarLinha("Débito", taxas.debito, 1, valor);

    for(let i=1;i<=18;i++){

        adicionarLinha(i+"x", taxas[i], i, valor);

    }

}

function adicionarLinha(nome,taxa,parcelas,valor){

    const total = valor/(1-(taxa/100));

    const parcela = total/parcelas;

    tabela.innerHTML += `

<tr>

<td>${nome}</td>

<td>${dinheiro(parcela)}</td>

<td>${dinheiro(total)}</td>

<td>

<button class="copiar"

onclick="copiar('${nome}','${dinheiro(parcela)}','${dinheiro(total)}')">

📋

</button>

</td>

</tr>

`;

}

function copiar(parcela,valor,total){

    const texto=

`${parcela}
Parcela: ${valor}
Total: ${total}`;

    navigator.clipboard.writeText(texto);

    alert("Copiado!");

}const modal = document.getElementById("modal");
const abrirConfig = document.getElementById("abrirConfig");

abrirConfig.addEventListener("click", () => {
    modal.style.display = "flex";
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
// ==========================
// TAXAS DA MAQUININHA
// ==========================

const taxas = {
    debito: 2.20,
    1: 4.50,
    2: 5.68,
    3: 6.50,
    4: 7.10,
    5: 7.59,
    6: 8.50,
    7: 9.58,
    8: 10.40,
    9: 11.44,
    10: 11.99,
    11: 12.45,
    12: 12.61,
    13: 13.28,
    14: 13.90,
    15: 14.55,
    16: 15.80,
    17: 16.10,
    18: 17.01
};

// Taxa adicional (1 ponto percentual)
const taxaExtra = 1;

// ==========================

const campoValor = document.getElementById("valor");
const tabela = document.getElementById("tabelaResultado");

campoValor.addEventListener("input", mascaraMoeda);

// Máscara em reais
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

function adicionarLinha(nome, taxa, parcelas, valor){

    // Soma 1 ponto percentual à taxa da maquininha
    const taxaFinal = taxa + taxaExtra;

    // Calcula o valor que deve ser cobrado
    const total = valor / (1 - (taxaFinal / 100));

    // Valor de cada parcela
    const parcela = total / parcelas;

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

function copiar(parcela, valor, total){

    const texto =
`${parcela}
Parcela: ${valor}
Total: ${total}`;

    navigator.clipboard.writeText(texto);

}
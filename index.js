const express = require('express');
const app = express();
app.use(express.json());

let produtos = [
    { id: 1, nome: "Temaki Completo", preco: 35.00 },
    { id: 2, nome: "Combinado 20 Peças", preco: 85.00 }
]
//listar produtos
app.get('/produtos', (req, res) => {
    res.json(produtos);
});
//adicionar produtos
app.post('/produtos', (req, res) => {
    const { nome, preco } = req.body;
    const novoProduto = {id: produtos.length + 1, nome, preco};
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

app.listen(3000, () => console.log("http://localhost:3000"))

//atualizar produto
app.put('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, preco } = req.body;

    const produto = produtos.find(p => p.id === parseInt(id));

    if (!produto) {
        return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    if (nome !== undefined) {
        produto.nome = nome;
    }

    if (preco !== undefined) {
        produto.preco = preco;
    }

    res.json(produto);
});

//deletar produtos
app.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;

    const index = produtos.findIndex(p => p.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    const produtoRemovido = produtos.splice(index, 1);

    res.json({
        mensagem: "Produto removido com sucesso",
        produto: produtoRemovido[0]
    });
});
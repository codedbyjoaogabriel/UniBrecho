import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusCircle,
  ArrowLeft,
  Image as ImageIcon,
  DollarSign,
  Tag,
  FileText,
} from "lucide-react";
import "../styles/NovoAnuncio.css";

export default function NovoAnuncio() {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [tipo, setTipo] = useState("Venda");
  const [imagem, setImagem] = useState("");

  const handlePrecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let valor = e.target.value.replace(/\D/g, "");
    if (valor) {
      valor = (parseInt(valor, 10) / 100).toFixed(2);
    }
    setPreco(valor);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!titulo || !descricao || !categoria || !preco || !imagem) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const usuarioStorage = localStorage.getItem("usuario");
    if (!usuarioStorage) {
      alert("Você precisa estar logado para criar um anúncio.");
      navigate("/login");
      return;
    }

    const usuario = JSON.parse(usuarioStorage);

    const novoProduto = {
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      categoria,
      preco: parseFloat(preco),
      tipo,
      imagem: imagem?.trim(),
      usuarioId: usuario.id,
    };

    try {
      const response = await fetch("http://localhost:8080/produtos/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoProduto),
      });

      if (response.ok) {
        alert("Anúncio cadastrado com sucesso!");
        navigate("/dashboard");
      } else {
        const erroMsg = await response.text();
        alert("Erro ao cadastrar anúncio: " + erroMsg);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Não foi possível conectar ao servidor.");
    }
  }

  return (
    <div className="novo-anuncio-container">
      <div className="novo-anuncio-card">
        <button className="btn-voltar" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} /> Voltar
        </button>

        <div className="novo-anuncio-header">
          <PlusCircle size={36} />
          <h1>Criar Novo Anúncio</h1>
        </div>

        <form onSubmit={handleSubmit} className="novo-anuncio-form">
          <div className="form-group">
            <label>Título do Anúncio</label>

            <div className="input-icon-wrapper">
              <Tag size={18} />
              <input
                type="text"
                placeholder="Ex: Livro de Cálculo I, Casaco Unifor..."
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Categoria</label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">Selecione...</option>
                <option value="Livros">Livros & Material</option>
                <option value="Roupas">Roupas & Acessórios</option>
                <option value="Eletrônicos">Eletrônicos</option>
                <option value="Móveis">Móveis & Decoração</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            <div className="form-group">
              <label>Tipo</label>
              <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="Venda">Venda</option>
                <option value="Troca">Troca</option>
                <option value="Doacao">Doação</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Preço (R$)</label>

            <div className="input-icon-wrapper">
              <DollarSign size={18} />
              <input
                type="text"
                placeholder="0,00"
                value={preco}
                onChange={handlePrecoChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>URL da Imagem</label>

            <div className="input-icon-wrapper">
              <ImageIcon size={18} />
              <input
                type="url"
                placeholder="https://exemplo.com/imagem.jpg"
                value={imagem}
                onChange={(e) => setImagem(e.target.value)}
              />
            </div>
          </div>

          {imagem && (
            <div className="preview-container">
              <p>Pré-visualização da imagem:</p>
              <img
                src={imagem}
                alt="Preview"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          )}

          <div className="form-group">
            <label>Descrição detalhada</label>

            <div className="input-icon-wrapper textarea-wrapper">
              <FileText size={18} className="textarea-icon" />
              <textarea
                rows={4}
                placeholder="Descreva o estado do produto, tempo de uso, local de entrega no campus..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn-publicar">
            Publicar Anúncio
          </button>
        </form>
      </div>
    </div>
  );
}

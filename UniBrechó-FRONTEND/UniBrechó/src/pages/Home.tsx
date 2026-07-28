import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  BookOpen,
  Search,
  LogOut,
  User,
  Tag,
  Menu
} from "lucide-react";

import "../styles/Home.css";

interface Produto {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  tipo: string;
  categoria: string;
  imagem: string;
  disponivel: boolean;
  usuarioId: number;
  nomeUsuario: string;
}

export default function Home() {
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [pesquisa, setPesquisa] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    try {
      setCarregando(true);

      const response = await fetch("http://localhost:8080/produtos");

      if (!response.ok) {
        throw new Error("Erro ao carregar produtos.");
      }

      const dados = await response.json();

      setProdutos(dados);
    } catch (erro) {
      console.error(erro);
    } finally {
      setCarregando(false);
    }
  }

  function sair() {
    localStorage.clear();
    navigate("/");
  }

  const categorias = ["Todos", ...new Set(produtos.map((p) => p.categoria))];

  const produtosFiltrados = useMemo(() => {
    return produtos
      .filter((produto) => produto.disponivel)
      .filter((produto) => produto.usuarioId !== usuario.id)
      .filter((produto) => {
        if (categoriaSelecionada === "Todos") return true;

        return produto.categoria === categoriaSelecionada;
      })
      .filter((produto) => {
        const texto = pesquisa.toLowerCase();

        return (
          produto.titulo.toLowerCase().includes(texto) ||
          produto.descricao.toLowerCase().includes(texto) ||
          produto.categoria.toLowerCase().includes(texto) ||
          produto.nomeUsuario.toLowerCase().includes(texto)
        );
      });
  }, [produtos, pesquisa, categoriaSelecionada, usuario.id]);

  return (
    <div className="home">
      {/* HEADER */}
      <header className="homeHeader">
        <Link to="/home" className="logo">
          <BookOpen size={34} />
          <h1>UniBrechó</h1>
        </Link>

        <div className="searchBar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Pesquisar anúncios..."
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
        </div>

        <div className="headerButtons">
          <Link to="/dashboard" className="dashboardButton">
            <Menu size={20} />
            Menu
          </Link>

          <div className="userInfo">
            <User size={18} />
            <span>{usuario.nome}</span>
          </div>

          <button className="logoutButtonHome" onClick={sair}>
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </header>

      {/* CONTEÚDO */}
      <main className="homeContent">
        <section className="homeTitle">
          <h2>Marketplace Universitário</h2>
          <p>
            Encontre materiais acadêmicos, eletrônicos e diversos itens
            anunciados por estudantes da Unifor.
          </p>
        </section>

        {/* CATEGORIAS */}
        <section className="categories">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              className={
                categoriaSelecionada === categoria
                  ? "category active"
                  : "category"
              }
              onClick={() => setCategoriaSelecionada(categoria)}
            >
              <Tag size={16} />
              {categoria}
            </button>
          ))}
        </section>

        {/* LISTA DE PRODUTOS */}
        <section className="products">
          {carregando ? (
            <p className="loading">Carregando anúncios...</p>
          ) : produtosFiltrados.length === 0 ? (
            <p className="loading">Nenhum anúncio encontrado.</p>
          ) : (
            <div className="productsGrid">
              {produtosFiltrados.map((produto) => (
                <div className="productCard" key={produto.id}>
                  <div className="productImageContainer">
                    <img
                      src={produto.imagem}
                      alt={produto.titulo}
                      className="productImage"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/600x400/eaf4ff/003b70?text=UniBrechó";
                      }}
                    />
                  </div>

                  <div className="productInfo">
                    <span className="productCategory">{produto.categoria}</span>

                    <h3>{produto.titulo}</h3>

                    <p className="productDescription">{produto.descricao}</p>

                    <div className="productFooter">
                      <strong className="productPrice">
                        {produto.preco === 0
                          ? "Doação"
                          : Number(produto.preco).toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                      </strong>

                      <small>
                        Anunciado por <b>{produto.nomeUsuario}</b>
                      </small>
                    </div>

                    <div className="productButtons">
                      <button
                        className="detailsButton"
                        onClick={() => navigate(`/produto/${produto.id}`)}
                      >
                        Ver anúncio
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

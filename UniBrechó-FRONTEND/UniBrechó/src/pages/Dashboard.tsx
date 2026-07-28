import {
  LayoutDashboard,
  Package,
  PlusCircle,
  User,
  LogOut,
  BookOpen,
  Heart,
  Home,
  Trash2,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "../styles/Dashboard.css";

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

export default function Dashboard() {
  const navigate = useNavigate();

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);

  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  const nomeUsuario = usuario.nome || "Estudante";

  const USUARIO_LOGADO_ID =
    usuario?.id || Number(localStorage.getItem("usuarioId")) || 1;

  const [produtosFavoritos, setProdutosFavoritos] = useState<Produto[]>([]);
  const [mostrarCarrosselFavoritos, setMostrarCarrosselFavoritos] =
    useState(false);

  useEffect(() => {
    carregarProdutos();
  }, []);

  useEffect(() => {
    carregarFavoritos();
  }, [USUARIO_LOGADO_ID]);

  async function carregarFavoritos() {
    if (!USUARIO_LOGADO_ID) return;

    try {
      const response = await fetch(
        `http://localhost:8080/favoritos/usuario/${USUARIO_LOGADO_ID}`
      );
      if (response.ok) {
        const dados = await response.json();
        // Mapeia caso o backend retorne o objeto DTO do favorito com o produto dentro
        const listaFormatada = dados.map((item: any) => item.produto || item);
        setProdutosFavoritos(listaFormatada);
      }
    } catch (error) {
      console.error("Erro ao carregar favoritos:", error);
    }
  }

  async function toggleFavorito(e: React.MouseEvent, produto: Produto) {
    e.stopPropagation();

    if (!USUARIO_LOGADO_ID) return;

    const jaEhFavorito = produtosFavoritos.some((p) => p.id === produto.id);

    if (jaEhFavorito) {
      setProdutosFavoritos((prev) => prev.filter((p) => p.id !== produto.id));

      try {
        await fetch(
          `http://localhost:8080/favoritos?usuarioId=${USUARIO_LOGADO_ID}&produtoId=${produto.id}`,
          { method: "DELETE" }
        );
      } catch (error) {
        console.error("Erro ao remover favorito:", error);
        carregarFavoritos();
      }
    } else {
      setProdutosFavoritos((prev) => [...prev, produto]);

      try {
        await fetch("http://localhost:8080/favoritos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            usuarioId: USUARIO_LOGADO_ID,
            produtoId: produto.id,
          }),
        });
      } catch (error) {
        console.error("Erro ao adicionar favorito:", error);
        carregarFavoritos();
      }
    }
  }

  async function carregarProdutos() {
    if (!USUARIO_LOGADO_ID) return;

    try {
      setCarregando(true);

      const response = await fetch(
        `http://localhost:8080/produtos/usuario/${USUARIO_LOGADO_ID}`
      );
      if (!response.ok) {
        throw new Error("Erro ao carregar anúncios.");
      }

      const dados = await response.json();
      setProdutos(dados);
    } catch (erro) {
      console.error(erro);
    } finally {
      setCarregando(false);
    }
  }

  const excluirAnuncio = async (id: number, titulo: string) => {
    const confirmou = window.confirm(
      `Tem certeza que deseja excluir o anúncio "${titulo}"?`
    );

    if (!confirmou) return;

    try {
      const response = await fetch(`http://localhost:8080/produtos/${id}`, {
        method: "DELETE",
      });

      if (response.ok || response.status === 204) {
        setProdutos((prev) => prev.filter((produto) => produto.id !== id));
        setProdutosFavoritos((prev) => prev.filter((produto) => produto.id !== id));
        alert("Anúncio excluído com sucesso!");
      } else {
        alert("Não foi possível excluir o anúncio. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao excluir anúncio:", error);
      alert("Erro ao conectar ao servidor.");
    }
  };

  function sair() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div>
          <div className="sidebarLogo">
            <BookOpen size={34} />
            <h2>UniBrechó</h2>
          </div>

          <nav>
            <Link to="/home">
              <Home size={20} />
              Home
            </Link>
            <Link to="/dashboard" className="active">
              <LayoutDashboard size={20} />
              Dashboard
            </Link>

            <Link to="/perfil">
              <User size={20} />
              Perfil
            </Link>
          </nav>
        </div>

        <button className="logoutButton" onClick={sair}>
          <LogOut size={20} />
          Sair
        </button>
      </aside>

      <main className="content">
        <header className="topbar">
          <div>
            <h1>Olá, {nomeUsuario} 👋</h1>
            <p>Bem-vindo ao UniBrechó.</p>
          </div>

          <div className="topbarRight">
            <div className="avatar">
              {nomeUsuario
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase()}
            </div>
          </div>
        </header>

        <section className="stats">
          <div className="statCard">
            <Package size={28} />
            <h3>{produtos.length}</h3>
            <span>Anúncios publicados</span>
          </div>

          <div
            className={`statCard favoriteStatCard ${
              mostrarCarrosselFavoritos ? "active" : ""
            }`}
            onClick={() =>
              setMostrarCarrosselFavoritos(!mostrarCarrosselFavoritos)
            }
            style={{ cursor: "pointer" }}
          >
            <Heart size={28} color="#ef4444" />
            <h3>{produtosFavoritos.length}</h3>
            <span>Favoritos</span>
          </div>
        </section>

        {mostrarCarrosselFavoritos && (
          <section className="favoriteCarouselSection">
            <h4>Seus Anúncios Favoritados</h4>

            {produtosFavoritos.length === 0 ? (
              <p className="emptyFavorites">
                Você ainda não tem nenhum produto favoritado.
              </p>
            ) : (
              <div className="favoriteCarousel">
                {produtosFavoritos.map((produto) => (
                  <div
                    key={produto.id}
                    className="favoriteItemCard"
                    onClick={() => navigate(`/produto/${produto.id}`)}
                  >
                    <div className="favoriteImageContainer">
                      <img
                        src={produto.imagem}
                        alt={produto.titulo}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://placehold.co/600x400/eaf4ff/003b70?text=UniBrechó";
                        }}
                      />

                      <button
                        className="removeFavoriteBtn"
                        title="Remover dos favoritos"
                        onClick={(e) => toggleFavorito(e, produto)}
                      >
                        <Heart size={16} fill="#ef4444" color="#ef4444" />
                      </button>
                    </div>

                    <div className="favoriteItemInfo">
                      <span className="favoriteItemCategory">
                        {produto.categoria}
                      </span>

                      <h5>{produto.titulo}</h5>

                      <p className="favoriteDescription">{produto.descricao}</p>

                      <div className="favoriteFooter">
                        <strong>
                          {produto.preco === 0
                            ? "Doação"
                            : Number(produto.preco).toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                        </strong>

                        <button
                          className="favoriteDetailsButton"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/produto/${produto.id}`);
                          }}
                        >
                          Ver
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        <section className="actions">
          <Link to="/novo-anuncio" className="primaryAction">
            <PlusCircle />
            Novo anúncio
          </Link>
        </section>

        <section className="recentProducts">
          <h2>Meus Anúncios</h2>

          {carregando ? (
            <p>Carregando anúncios...</p>
          ) : produtos.length === 0 ? (
            <p>Nenhum anúncio cadastrado.</p>
          ) : (
            <div className="productGrid">
              {produtos.map((produto) => {
                const isFav = produtosFavoritos.some((p) => p.id === produto.id);

                return (
                  <div className="productCard" key={produto.id}>
                    <span className="categoria">{produto.categoria}</span>

                    <img
                      src={produto.imagem}
                      className="productImage"
                      alt={produto.titulo}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/600x400/eaf4ff/003b70?text=UniBrechó";
                      }}
                    />

                    <div className="productBody">
                      <h3>{produto.titulo}</h3>

                      <p className="descricao">{produto.descricao}</p>

                      <div className="productFooter">
                        <span className="preco">
                          {produto.preco === 0
                            ? "Doação"
                            : Number(produto.preco).toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                        </span>

                        <div className="actionsCard">
                          <button
                            className="btnDetalhes"
                            onClick={() => navigate(`/produto/${produto.id}`)}
                          >
                            Ver
                          </button>

                          <button
                            className={`btnFavorito ${isFav ? "active" : ""}`}
                            onClick={(e) => toggleFavorito(e, produto)}
                            title={isFav ? "Remover dos favoritos" : "Favoritar"}
                          >
                            <Heart
                              size={18}
                              fill={isFav ? "#ef4444" : "none"}
                              color={isFav ? "#ef4444" : "#64748b"}
                            />
                          </button>

                          <button
                            className="btnExcluir"
                            onClick={() =>
                              excluirAnuncio(produto.id, produto.titulo)
                            }
                            title="Excluir produto"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
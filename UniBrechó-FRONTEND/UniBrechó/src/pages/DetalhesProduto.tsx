import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Tag,
  FileText,
  User,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import "../styles/DetalhesProduto.css";

interface Produto {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  preco: number;
  tipo: string;
  imagem: string;
  nomeUsuario?: string;
  telefoneUsuario?: string;
}

export default function DetalhesProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const usuarioLogado = JSON.parse(localStorage.getItem("usuario") || "{}");

  const [produto, setProduto] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    async function carregarProduto() {
      try {
        const response = await fetch(`http://localhost:8080/produtos/${id}`);

        if (!response.ok) {
          alert("Produto não encontrado.");
          navigate("/home");
          return;
        }

        const data: Produto = await response.json();

        setProduto(data);

        if (usuarioLogado.id) {
          const status = await fetch(
            `http://localhost:8080/favoritos/status?usuarioId=${usuarioLogado.id}&produtoId=${data.id}`,
          );

          if (status.ok) {
            const favorito = await status.json();
            setFavorito(favorito);
          }
        }
      } catch (erro) {
        console.error(erro);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      carregarProduto();
    }
  }, [id]);

  function abrirWhatsApp() {
    if (!produto?.telefoneUsuario) {
      alert(
        "O anunciante não cadastrou um número de telefone no banco de dados.",
      );
      return;
    }

    const telefoneLimpo = produto.telefoneUsuario.replace(/\D/g, "");
    const telefoneFormatado = telefoneLimpo.startsWith("55")
      ? telefoneLimpo
      : `55${telefoneLimpo}`;

    const textoMensagem = `Olá ${produto.nomeUsuario || ""}! Vi seu anúncio "${produto.titulo}" no UniBrechó e gostaria de mais informações.`;
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${telefoneFormatado}&text=${encodeURIComponent(textoMensagem)}`;

    window.open(urlWhatsApp, "_blank");
  }

  async function alternarFavorito() {
    try {
      if (!produto) return;

      if (!favorito) {
        const response = await fetch("http://localhost:8080/favoritos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuarioId: usuarioLogado.id,
            produtoId: produto.id,
          }),
        });

        if (!response.ok) {
          throw new Error();
        }

        setFavorito(true);
      } else {
        const response = await fetch(
          `http://localhost:8080/favoritos?usuarioId=${usuarioLogado.id}&produtoId=${produto.id}`,
          {
            method: "DELETE",
          },
        );

        if (!response.ok) {
          throw new Error();
        }

        setFavorito(false);
      }
    } catch (erro) {
      console.error(erro);
      alert("Erro ao atualizar favorito.");
    }
  }

  if (loading) {
    return (
      <div
        className="detalhesContainer"
        style={{ textAlign: "center", paddingTop: "50px" }}
      >
        <p>Carregando informações...</p>
      </div>
    );
  }

  if (!produto) return null;

  return (
    <div className="detalhesContainer">
      <button className="btnVoltar" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Voltar
      </button>

      <div className="detalhesGrid">
        <div className="imagemSection">
          <img
            src={produto.imagem}
            alt={produto.titulo}
            className="imagemGrande"
          />
          <span className="badgetTipo" data-tipo={produto.tipo}>
            {produto.tipo}
          </span>
        </div>

        <div className="infoSection">
          <div className="topHeader">
            <span className="categoriaTag">
              <Tag size={14} /> {produto.categoria}
            </span>
            <button
              className="btnFavorito"
              onClick={alternarFavorito}
              title="Favoritar produto"
            >
              <Heart
                size={20}
                color={favorito ? "#ef4444" : "#64748b"}
                fill={favorito ? "#ef4444" : "none"}
              />
            </button>
          </div>

          <h1 className="tituloProduto">{produto.titulo}</h1>

          <div className="precoContainer">
            {produto.tipo === "Doação" || produto.preco === 0 ? (
              <span className="precoGratis">Grátis</span>
            ) : (
              <span className="precoValor">
                R$ {produto.preco?.toFixed(2).replace(".", ",")}
              </span>
            )}
          </div>

          <div className="divisor" />

          <div className="blocoInfo">
            <h3>
              <FileText size={16} /> Descrição
            </h3>
            <p className="descricaoTexto">{produto.descricao}</p>
          </div>

          <div className="divisor" />

          <div className="anuncianteCard">
            <div className="anuncianteAvatar">
              <User size={24} />
            </div>
            <div className="anuncianteDados">
              <span className="anuncianteRotulo">Anunciado por</span>
              <strong className="anuncianteNome">
                {produto.nomeUsuario || "Anunciante Unifor"}
              </strong>
              <span className="anuncianteCampus">Campus Unifor</span>
            </div>
          </div>

          <button
            className="btnWhatsApp"
            onClick={abrirWhatsApp}
            disabled={!produto.telefoneUsuario}
            style={{ opacity: produto.telefoneUsuario ? 1 : 0.6 }}
          >
            <MessageCircle size={22} />
            {produto.telefoneUsuario
              ? "Contatar no WhatsApp"
              : "Telefone Indisponível"}
          </button>

          <div className="segurancaAviso">
            <ShieldCheck size={16} /> Combine a entrega em locais públicos do
            campus.
          </div>
        </div>
      </div>
    </div>
  );
}

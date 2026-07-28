import {
  BookOpen,
  Laptop,
  Calculator,
  HeartHandshake,
  Search,
  PlusCircle,
  Leaf,
  Users,
  Recycle,
} from "lucide-react";

import { useState, useEffect } from "react";
import "../styles/Landing.css";

interface Produto {
  id: number;
  titulo: string;
  categoria: string;
  descricao: string;
  tipo: string;
  preco: number;
  imagem: string;
}

const categorias = [
  {
    nome: "Livros",
    icone: <BookOpen />,
  },

  {
    nome: "Tecnologia",
    icone: <Laptop />,
  },

  {
    nome: "Engenharia",
    icone: <Calculator />,
  },

  {
    nome: "Saúde",
    icone: <HeartHandshake />,
  },
];

export default function Landing() {
  const [categoria, setCategoria] = useState("Todos");
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const response = await fetch("http://localhost:8080/produtos");

        if (!response.ok) {
          throw new Error("Erro ao carregar produtos.");
        }

        const dados = await response.json();

        setProdutos(dados);
      } catch (error) {
        console.error(error);
      }
    }

    carregarProdutos();
  }, []);

  const produtosFiltrados =
    categoria === "Todos"
      ? produtos
      : produtos.filter((item) => item.categoria === categoria);

  return (
    <div className="landing">
      <header className="header">
        <div className="logo">
          <Recycle />
          UniBrechó
        </div>

        <nav>
          <a>Sobre</a>
          <a href="/login" className="buttonEnter">
            Entrar
          </a>
        </nav>
      </header>

      <section className="hero">
        <div className="heroText">
          <span className="tag">
            <Leaf size={18} />
            Economia circular universitária
          </span>

          <h1>Dê uma nova vida aos materiais do campus.</h1>

          <p>
            Compre, venda ou doe livros, equipamentos e materiais acadêmicos
            entre estudantes.
          </p>

          <div className="actions">
            <button className="primary">
              <Search />
              Encontrar itens
            </button>

            <button className="secondary">
              <PlusCircle />
              Anunciar
            </button>
          </div>
        </div>

        <div className="impact">
          <h2>Impacto do campus</h2>

          <div>
            <Recycle />

            <strong>1250+</strong>

            <p>Itens reutilizados</p>
          </div>

          <div>
            <Users />

            <strong>850</strong>

            <p>Estudantes ativos</p>
          </div>
        </div>
      </section>

      <section className="categorias">
        <h2>Categorias</h2>

        <div className="categoriaGrid">
          <button onClick={() => setCategoria("Todos")}>Todos</button>

          {categorias.map((cat) => (
            <button key={cat.nome} onClick={() => setCategoria(cat.nome)}>
              {cat.icone}

              {cat.nome}
            </button>
          ))}
        </div>
      </section>

      <section className="produtos">
        <h2>Últimos anúncios</h2>

        <div className="grid">
          {produtosFiltrados.map((produto) => (
            <div className="card" key={produto.id}>
              <img src={produto.imagem} alt={produto.titulo} />

              <div className="cardContent">
                <h3>{produto.titulo}</h3>

                <p>{produto.descricao}</p>

                <strong>
                  {produto.preco === 0 ? "Doação" : `R$ ${produto.preco}`}
                </strong>

                <button>Tenho interesse</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer>
        UniBrechó
        <br />
        Marketplace sustentável universitário
      </footer>
    </div>
  );
}

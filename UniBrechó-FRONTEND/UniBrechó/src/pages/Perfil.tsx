import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  BookOpen,
  User,
  Mail,
  Phone,
  Lock,
  LayoutDashboard,
  Home,
  LogOut,
} from "lucide-react";

import "../styles/Perfil.css";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

export default function Perfil() {
  const navigate = useNavigate();

  const usuarioLogado = JSON.parse(localStorage.getItem("usuario") || "{}");

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    email: "",
    telefone: "",
  });

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    setUsuario({
      id: usuarioLogado.id,
      nome: usuarioLogado.nome || "",
      email: usuarioLogado.email || "",
      telefone: usuarioLogado.telefone || "",
    });
  }, []);

  function sair() {
    localStorage.clear();
    navigate("/");
  }
  return (
    <div className="perfil">
      <aside className="perfilSidebar">
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

            <Link to="/dashboard">
              <LayoutDashboard size={20} />
              Dashboard
            </Link>

            <Link to="/perfil" className="active">
              <User size={20} />
              Meu Perfil
            </Link>
          </nav>
        </div>

        <button className="logoutButton" onClick={sair}>
          <LogOut size={20} />
          Sair
        </button>
      </aside>

      <main className="perfilContent">
        <header className="perfilHeader">
          <div className="perfilAvatar">
            {usuario.nome
              ? usuario.nome
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)
                  .toUpperCase()
              : "U"}
          </div>

          <div>
            <h1>Meu Perfil</h1>

            <p>Atualize suas informações pessoais.</p>
          </div>
        </header>

        <section className="perfilCard">
          <h2>Dados pessoais</h2>

          <div className="inputGroup">
            <label>Nome</label>

            <div className="inputIcon">
              <User size={18} />

              <input
                type="text"
                value={usuario.nome}
                onChange={(e) =>
                  setUsuario({
                    ...usuario,
                    nome: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="inputGroup">
            <label>E-mail</label>

            <div className="inputIcon">
              <Mail size={18} />

              <input
                type="email"
                value={usuario.email}
                onChange={(e) =>
                  setUsuario({
                    ...usuario,
                    email: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="inputGroup">
            <label>Telefone</label>

            <div className="inputIcon">
              <Phone size={18} />

              <input
                type="text"
                placeholder="(85) 99999-9999"
                value={usuario.telefone}
                onChange={(e) =>
                  setUsuario({
                    ...usuario,
                    telefone: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </section>

        <section className="perfilCard">
          <h2>Alterar senha</h2>

          <div className="inputGroup">
            <label>Senha atual</label>

            <div className="inputIcon">
              <Lock size={18} />

              <input
                type="password"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
              />
            </div>
          </div>

          <div className="inputGroup">
            <label>Nova senha</label>

            <div className="inputIcon">
              <Lock size={18} />

              <input
                type="password"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
              />
            </div>
          </div>

          <div className="inputGroup">
            <label>Confirmar nova senha</label>

            <div className="inputIcon">
              <Lock size={18} />

              <input
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
            </div>
          </div>

          <button
            className="saveButton"
            disabled={salvando}
            onClick={salvarAlteracoes}
          >
            {salvando ? "Salvando..." : "Salvar alterações"}
          </button>
        </section>
      </main>
    </div>
  );
  async function salvarAlteracoes() {
    if (
      !usuario.nome.trim() ||
      !usuario.email.trim() ||
      !usuario.telefone.trim()
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    if (novaSenha !== "" && novaSenha !== confirmarSenha) {
      alert("A confirmação da nova senha não confere.");
      return;
    }

    setSalvando(true);

    try {
      const response = await fetch(
        `http://localhost:8080/usuarios/${usuario.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: usuario.nome,
            email: usuario.email,
            telefone: usuario.telefone,
            senhaAtual,
            novaSenha,
          }),
        },
      );

      const dados = await response.json();

      if (!response.ok) {
        throw new Error(dados.message || "Erro ao atualizar perfil.");
      }

      setUsuario({
        id: dados.id,
        nome: dados.nome,
        email: dados.email,
        telefone: dados.telefone,
      });

      localStorage.setItem("usuario", JSON.stringify(dados));
      localStorage.setItem("nomeUsuario", dados.nome);

      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");

      alert("Perfil atualizado com sucesso!");
    } catch (erro: any) {
      alert(erro.message);
    } finally {
      setSalvando(false);
    }
  }
}

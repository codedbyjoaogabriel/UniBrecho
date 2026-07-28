import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Recycle, ArrowRight } from "lucide-react";

import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const fazerLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErro("");
    setCarregando(true);

    try {
      const response = await fetch("http://localhost:8080/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          senha: senha.trim(),
        }),
      });

      const dados = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          dados?.mensagem ?? dados?.message ?? "E-mail ou senha inválidos.",
        );
      }

      // Salva o usuário logado
      localStorage.setItem("usuario", JSON.stringify(dados));

      navigate("/home");
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro("Ocorreu um erro ao tentar fazer login.");
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="loginPage">
      <div className="loginBrand">
        <div className="brandLogo">
          <Recycle size={45} />
          <h1>UniBrechó</h1>
        </div>

        <h2>Bem-vindo de volta!</h2>

        <p>Continue conectado ao marketplace sustentável do campus.</p>

        <div className="benefits">
          <div>♻️ Economia circular universitária</div>
          <div>📚 Compartilhe materiais acadêmicos</div>
          <div>🤝 Conecte-se com estudantes</div>
        </div>
      </div>

      <div className="loginCard">
        <h2>Entrar</h2>

        <p>Acesse sua conta acadêmica</p>

        <form onSubmit={fazerLogin}>
          <label>Email institucional</label>

          <div className="inputGroup">
            <Mail size={20} />

            <input
              type="email"
              placeholder="nome@unifor.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <label>Senha</label>

          <div className="inputGroup">
            <Lock size={20} />

            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          {erro && <p className="erroLogin">{erro}</p>}

          <button type="submit" className="loginButton" disabled={carregando}>
            {carregando ? "Entrando..." : "Entrar"}

            <ArrowRight size={20} />
          </button>
        </form>

        <div className="register">
          <span>Ainda não possui conta? </span>

          <Link to="/cadastro">Criar conta</Link>
        </div>
      </div>
    </div>
  );
}

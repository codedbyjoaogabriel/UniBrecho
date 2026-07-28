import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import "../styles/Cadastro.css";

export default function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [confirmarTelefone, setConfirmarTelefone] = useState("");

  const [mostrarSenha, setMostrarSenha] = useState(false);

  const formatarTelefone = (value: string) => {
    const apenasNumeros = value.replace(/\D/g, "");
    if (apenasNumeros.length <= 11) {
      return apenasNumeros
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }
    return value.slice(0, 15);
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelefone(formatarTelefone(e.target.value));
  };

  const handleConfirmarTelefoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmarTelefone(formatarTelefone(e.target.value));
  };

  async function cadastrar(e: React.FormEvent) {
    e.preventDefault();

    if (
      !nome ||
      !email ||
      !senha ||
      !confirmarSenha ||
      !telefone ||
      !confirmarTelefone
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    if (telefone !== confirmarTelefone) {
      alert("Os telefones não coincidem.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/usuarios/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome.trim(),
          email: email.trim().toLowerCase(),
          senha: senha.trim(),
          telefone: telefone.replace(/\D/g, ""),
        }),
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        navigate("/login");
      } else {
        const mensagemErro = await response.text();
        alert("Erro no cadastro: " + mensagemErro);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Não foi possível conectar ao servidor Spring Boot.");
    }
  }

  return (
    <div className="cadastro">
      <div className="cadastroCard">
        <div className="logoCadastro">
          <UserPlus size={40} />
          <h1>UniBrechó</h1>
        </div>

        <h2>Criar conta</h2>

        <p>Faça parte da comunidade de economia circular da Unifor.</p>

        <form onSubmit={cadastrar}>
          <label>Nome completo</label>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label>E-mail</label>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Telefone / WhatsApp</label>
          <input
            type="tel"
            placeholder="(85) 99999-9999"
            value={telefone}
            onChange={handleTelefoneChange}
            maxLength={15}
          />

          <label>Confirmar telefone</label>
          <input
            type="tel"
            placeholder="Confirme seu telefone"
            value={confirmarTelefone}
            onChange={handleConfirmarTelefoneChange}
            maxLength={15}
          />

          <label>Senha</label>
          <div className="senhaInput">
            <input
              type={mostrarSenha ? "text" : "password"}
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
            >
              {mostrarSenha ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <label>Confirmar senha</label>
          <input
            type={mostrarSenha ? "text" : "password"}
            placeholder="Confirme sua senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />

          <button className="btnCadastro">Criar conta</button>
        </form>

        <span>
          Já possui conta?
          <Link to="/login">Entrar</Link>
        </span>
      </div>
    </div>
  );
}

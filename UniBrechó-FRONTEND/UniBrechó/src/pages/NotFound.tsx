import { Link } from "react-router-dom";
import { BookOpen, Home, LayoutDashboard, TriangleAlert } from "lucide-react";

import "../styles/NotFound.css";

export default function NotFound() {
  return (
    <div className="notFound">
      <div className="bgCircle circle1"></div>
      <div className="bgCircle circle2"></div>
      <div className="bgCircle circle3"></div>

      <div className="notFoundCard">
        <div className="logo404">
          <BookOpen size={42} />
          <span>UniBrechó</span>
        </div>

        <div className="iconError">
          <TriangleAlert size={70} />
        </div>

        <h1>404</h1>

        <h2>Página não encontrada</h2>

        <p>
          A página que você tentou acessar não existe ou foi removida. Volte
          para uma das páginas principais do sistema.
        </p>

        <div className="buttons404">
          <Link to="/home" className="primary404">
            <Home size={18} />
            Ir para Home
          </Link>

          <Link to="/dashboard" className="secondary404">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  ChartNoAxesCombined,
  User,
  Sparkles,
  Leaf,
  ArrowRight,
} from "lucide-react";
import { initial, KEY, load, type State } from "./model";
import {
  Dashboard,
  Courses,
  Unit,
  Lesson,
  Progress,
  Profile,
  Plan,
  Tools,
  Missing,
} from "./pages";
export default function App() {
  const [s, update] = useState<State>(() => {
    try {
      return load(localStorage.getItem(KEY));
    } catch {
      return { ...initial };
    }
  });
  const [storageError, setStorageError] = useState(false);
  const location = useLocation();
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(s));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [s]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const nav = [
    { to: "/", label: "Inicio", icon: Home },
    { to: "/cursos", label: "Cursos", icon: BookOpen },
    { to: "/progreso", label: "Progreso", icon: ChartNoAxesCombined },
    { to: "/perfil", label: "Perfil", icon: User },
  ];
  return (
    <div className="app">
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <aside className="sidebar">
        <Link to="/" className="brand">
          <img src="/logo.jpeg" alt="CON-CIENCIA · Tu plataforma de biología" />
        </Link>
        <span className="nav-label">MI APRENDIZAJE</span>
        <nav aria-label="Principal">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === "/"}>
              <n.icon size={21} />
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-pro">
            <Sparkles size={25} />
            <h3>
              Tu curiosidad,
              <br />
              sin límites.
            </h3>
            <p>Descubre tu siguiente nivel con Pro.</p>
            <Link to="/plan">
              Conoce Pro <ArrowRight size={15} />
            </Link>
          </div>
          <div className="mini-brand">
            <Leaf size={17} /> Hecho para aprender
          </div>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <Link className="mobile-brand" to="/" aria-label="CON-CIENCIA, ir al inicio">
            <img src="/logo.jpeg" alt="" />
            <strong><span>CON-</span>CIENCIA</strong>
          </Link>
          <div className="breadcrumb">
            Tu plataforma de biología <span>/</span>{" "}
            <b>
              {nav.find((n) => n.to === location.pathname)?.label ||
                "Aprendizaje"}
            </b>
          </div>
          <div className="top-actions">
            <Link
              className={`plan-badge ${s.pro ? "active-pro" : ""}`}
              to="/plan"
            >
              <Sparkles size={14} />
              {s.pro ? "Pro · Demo" : "Plan Gratuito"}
            </Link>
            <Link to="/perfil" className="avatar" aria-label="Mi perfil">
              {s.name.slice(0, 1).toUpperCase()}
            </Link>
          </div>
        </header>
        <main id="contenido">
          {storageError && (
            <div role="alert" className="demo-note">
              El navegador no permite guardar datos. Tu avance durará solo esta
              sesión.
            </div>
          )}
          <Routes>
            <Route path="/" element={<Dashboard s={s} />} />
            <Route path="/cursos" element={<Courses s={s} />} />
            <Route path="/cursos/:id" element={<Unit s={s} />} />
            <Route
              path="/leccion/:id"
              element={<Lesson s={s} update={update} />}
            />
            <Route path="/progreso" element={<Progress s={s} />} />
            <Route path="/perfil" element={<Profile s={s} update={update} />} />
            <Route path="/plan" element={<Plan s={s} update={update} />} />
            <Route
              path="/herramientas/:tool"
              element={
                <Tools
                  key={`${location.pathname}-${s.pro}`}
                  s={s}
                  update={update}
                />
              }
            />
            <Route path="*" element={<Missing />} />
          </Routes>
          <footer>
            <span>
              CON-CIENCIA <span className="footer-dot">✦</span> Tu plataforma de
              biología
            </span>
            <span>Aprender es descubrir la vida.</span>
          </footer>
        </main>
      </div>
      <nav className="bottom-nav" aria-label="Navegación móvil">
        {nav.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.to === "/"}>
            <n.icon size={21} />
            <span>{n.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

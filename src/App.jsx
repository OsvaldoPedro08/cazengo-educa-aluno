import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/home/NavbarMenu"
import Home from "./pages/Home"
import Explore from "./pages/Explore"
import Publish from "./pages/Publish"
import Licenses from "./pages/Licenses"
import About from "./pages/About"
import Profile from "./pages/Profile"
import ResourceViewer from "./components/resource/ResourceViewer"
import FAQ from "./pages/FAQ"
import Terms from "./pages/Terms"
import Politics from "./pages/Politics"
import { useState } from "react"
import Login from "./pages/Login"

function App() {
  const [user, setUser] = useState(null); //caso nao fez login
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return(
    <div>
      {/* Navbar aparece sempre, exceto na pagina de login */}
      {!isLoginPage && <Navbar user={user} setUser={setUser} />}

        {/* Area do conteudo dinamico*/}
      <main>
        <Routes>
          <Route path="/login" element={<Login onLogin={setUser} />} />

          {/* HOME é acessível para todos usuarios */}
          <Route path="/" element={<Home isLoggedIn={!!user} />} />

          {/* Mostra o botao de perfil com o nome apenas quando o usuario faz login */}
          <Route path="/perfil" element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/login" />} />

          {/* Rotas mostradas em todos usuarios */}
          <Route path="/explorar" element={<Explore />} />
          <Route path="/partilhar-recurso" element={<Publish />} />
          <Route path="/licencas" element={<Licenses />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/recurso/:id" element={<ResourceViewer />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/Termos" element={<Terms />} />
          <Route path="/Politica" element={<Politics />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
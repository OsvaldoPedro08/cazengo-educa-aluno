import { Route, Routes } from "react-router-dom"
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

function App() {
  return(
    <div>
      <Navbar />

        {/* Area do conteudo dinamico*/}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explorar" element={<Explore />} />
          <Route path="/partilhar-recurso" element={<Publish />} />
          <Route path="/licencas" element={<Licenses />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/perfil" element={<Profile />} />
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
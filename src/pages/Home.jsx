import { useEffect } from "react"
import CategoryFilters from "../components/home/CategoryFilters"
import Footer from "../components/home/Footer"
import HeroSection from "../components/home/HeroSection"
import RecentResource from "../components/home/RecentResource"
import SchoolMap from "../components/home/SchoolMap"
import { useLocation, useNavigate } from "react-router-dom"

function Home() {

   /* const location = useLocation();
    const navigate = useNavigate();
    const [toast, setToast] = useState({ show: false, message: "", type: "warning" });

    const showToast = (message, type = "warning") => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: "", type: "warning" }), 5000);
    };

    useEffect(() => {
        //verifica se veio o sinal de adicionar o toast do ProtectedRoute
        if(location.state?.showAuthToast) {

            //chama o toast
            showToast("Apenas usuários com sessão iniciada podem partilhar recursos.", "Aviso");

            //limpa o estado da rota para o toast não reaparecer se o utilizador atualizar a pagina
            navigate(location.pathname, { 
                replace: true, 
                state : {}
            }); 
        }
    }, [location, navigate]); */

    return(
        <div>
            <HeroSection />
           <main className="container mx-auto">
                <CategoryFilters />
                <RecentResource />
                <SchoolMap />
            </main>
            <Footer />
        </div>
    )
}

export default Home
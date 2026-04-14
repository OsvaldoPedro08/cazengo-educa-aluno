import CategoryFilters from "../components/home/CategoryFilters"
import Footer from "../components/home/Footer"
import HeroSection from "../components/home/HeroSection"
import RecentResource from "../components/home/RecentResource"
import SchoolMap from "../components/home/SchoolMap"

function Home() {
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
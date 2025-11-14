import { Layout } from '../components/layout/Layout'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'
import { IconButton } from '../components/ui/IconButton'

// Importando imagens de forma compatível com Vite
const buszer_icon = new URL('../assets/img/Buszer_icon.png', import.meta.url).href
const ufpb_icon = new URL('../assets/img/ufpb_icon.png', import.meta.url).href
const ci_icon = new URL('../assets/img/ci_icon.jpg', import.meta.url).href

const Home = () => {
  return (
    <Layout currentPath="/">
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 sm:mb-8">
            Buszer
          </h1>
          <p className="text-base sm:text-lg text-foreground leading-relaxed mb-8 sm:mb-10 max-w-4xl mx-auto px-2">
            Acompanhe o ônibus circular em tempo real, consulte horários e receba
            notificações personalizadas para tornar sua experiência de transporte mais
            simples e prática. Este sistema foi desenvolvido por alunos do Centro de
            Informática da UFPB, com o objetivo de melhorar a mobilidade e a rotina de
            estudantes e servidores, facilitando o uso do ônibus circular.
          </p>
          <Link to="/schedules">
            <Button
              size="lg"
              className="bg-[#017D97] hover:bg-[#06242E] text-primary-foreground px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg w-full sm:w-auto"
            >
              RASTREAR CIRCULAR
            </Button>
          </Link>
        </div>

        {/* About Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-8 sm:mb-12">
            Quem somos?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="text-foreground leading-relaxed px-2">
              <p className="text-base sm:text-lg">
                Este sistema foi desenvolvido por alunos do Centro de Informática da UFPB,
                com o objetivo de melhorar a mobilidade e a rotina de estudantes e
                servidores, facilitando o uso do ônibus circular.
              </p>
            </div>

            <div className="flex items-center justify-center gap-6 sm:gap-8">
              <img
                src={buszer_icon}
                alt="Buszer Icon"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover shadow-lg"
              />

              <img
                src={ufpb_icon}
                alt="UFPB Icon"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-contain bg-white p-2 shadow-lg"
              />

              <img
                src={ci_icon}
                alt="CI icon"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home

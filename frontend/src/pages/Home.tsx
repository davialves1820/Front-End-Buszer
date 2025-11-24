import { Layout } from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { AnimatedBackground } from '../components/ui/animatedBackground'
import { FloatingElements } from '../components/ui/floatingElements'
import { MouseGlow } from '../components/ui/mouseGlow'
import { PageTransition } from '../components/ui/pageTransition'
import { ParallaxSection } from '../components/ui/parallaxSection'
import { motion } from 'framer-motion'
import { usePageView } from '../hooks/use-page-view'
import Tilt from 'react-parallax-tilt'

const buszer_icon = new URL('../assets/img/Buszer_icon.png', import.meta.url).href
const ufpb_icon = new URL('../assets/img/ufpb_icon.png', import.meta.url).href
const ci_icon = new URL('../assets/img/ci_icon.jpg', import.meta.url).href

export default function Home() {
  usePageView('Home')

  return (
    <PageTransition>
      <Layout currentPath="/">
        <div className="min-h-screen relative bg-background overflow-hidden">
          <AnimatedBackground />
          <FloatingElements />
          <MouseGlow />

          {/* HERO SECTION */}
          <section className="pt-32 pb-24 px-4 relative z-20">
            <ParallaxSection speed={-0.35}>
              <div className="container mx-auto max-w-5xl text-center">
                <motion.h1
                  className="text-6xl md:text-7xl font-black mb-8 gradient-text drop-shadow-lg leading-tight"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  Buszer
                </motion.h1>

                <motion.p
                  className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  Acompanhe o ônibus circular em tempo real, consulte horários e receba
                  notificações personalizadas.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  <Link to="/schedules">
                    <Button
                      size="lg"
                      className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-xl px-10 py-6 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_-5px_var(--secondary)] group animate-glow-pulse"
                    >
                      RASTREAR CIRCULAR
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </ParallaxSection>
          </section>

          {/* ABOUT SECTION */}
          <section className="py-24 px-4 bg-muted/20 backdrop-blur-sm relative z-10">
            <ParallaxSection speed={0.25}>
              <div className="container mx-auto max-w-6xl">
                <motion.h2
                  className="text-4xl md:text-5xl font-bold text-center text-foreground mb-20 drop-shadow-sm"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  Quem somos?
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-16 items-center">
                  {/* TEXTO */}
                  <motion.div
                    className="space-y-6 text-lg leading-relaxed text-foreground"
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <p>
                      O Buszer é uma plataforma criada por alunos do Centro de Informática
                      da UFPB para proporcionar rastreamento confiável, horários
                      atualizados e notificações personalizadas.
                    </p>
                    <p>
                      Nosso objetivo é facilitar a mobilidade, reduzir incertezas e
                      modernizar o uso do transporte dentro da universidade.
                    </p>
                  </motion.div>

                  {/* ÍCONES ANIMADOS COM TILT 3D + NEON */}
                  <motion.div
                    className="flex items-center justify-center gap-10"
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    {[buszer_icon, ufpb_icon, ci_icon].map((src, index) => (
                      <Tilt
                        key={index}
                        glareEnable={true}
                        glareMaxOpacity={0.35}
                        glarePosition="all"
                        scale={1.07}
                        transitionSpeed={2000}
                        className="rounded-3xl"
                      >
                        <motion.div
                          className="p-3 rounded-3xl bg-card shadow-xl border border-border backdrop-blur-lg hover:shadow-[0_0_35px_-5px_var(--primary)] transition-all duration-300"
                          whileHover={{ rotate: index === 1 ? 6 : -6 }}
                          transition={{ type: 'spring', stiffness: 250, damping: 15 }}
                        >
                          <img
                            src={src}
                            className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36
                                      rounded-2xl
                                      object-contain
                                      shadow-inner
                                      mx-auto"
                          />
                        </motion.div>
                      </Tilt>
                    ))}
                  </motion.div>
                </div>
              </div>
            </ParallaxSection>
          </section>
        </div>
      </Layout>
    </PageTransition>
  )
}

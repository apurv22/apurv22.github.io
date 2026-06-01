import { Layout } from './components/Layout'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Experience } from './components/Experience'
import { ProjectsGrid } from './components/ProjectsGrid'
import { ResumeSection } from './components/ResumeSection'
import { Contact } from './components/Contact'

export default function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <ProjectsGrid />
      <ResumeSection />
      <Contact />
    </Layout>
  )
}

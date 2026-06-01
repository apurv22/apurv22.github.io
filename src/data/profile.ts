export type Profile = {
  name: string
  title: string
  location: string
  email: string
  github: string
  linkedin: string
  resumePath: string
  intro: string
  about: string[]
}

export const profile: Profile = {
  name: 'Apurv Patel',
  title: 'Principal Software Engineer',
  location: 'Toronto, ON',
  email: 'apurvpatel22@gmail.com',
  github: 'https://github.com/apurv22',
  linkedin: 'https://www.linkedin.com/in/apurvpatel/',
  resumePath: '/resume/Resume_Apurv_Patel_Master_SWE.pdf',
  intro:
    'I build payments and ML platform infrastructure at Capital One. I work across the stack — Kafka, PySpark, Airflow, FastAPI, AWS — and I like systems where correctness and latency both matter.',
  about: [
    'Principal Software Engineer at Capital One, where I currently lead work on near-real-time payments. Before that I built and ran a centralized Airflow platform serving 40+ pipelines across 10+ teams, and shipped a device-possession microservice that serves around 30k new customers a month.',
    'I have a Master of Engineering in Electrical and Computer Engineering from the University of Waterloo, an undergrad in Computer Engineering from Gujarat Technological University, and AWS Solutions Architect Associate certification. Outside of work I build production-grade open-source projects in Python — a payments pipeline, a SEC-filings RAG system, a feature store, a streaming anomaly detector, and a distributed task queue.',
    'I care about end-to-end ownership: shaping the design, writing the code, getting it deployed, and being on the pager when it breaks.',
  ],
}

export type Role = {
  title: string
  dates: string
}

export type Job = {
  company: string
  location: string
  period: string
  roles: Role[]
  highlights: { team: string; period: string; bullets: string[] }[]
}

export type Education = {
  school: string
  location: string
  degree: string
  period: string
  gpa?: string
}

export type Certification = {
  name: string
  issuer: string
  date: string
}

export const jobs: Job[] = [
  {
    company: 'Capital One',
    location: 'Toronto, ON',
    period: 'Sept 2021 — Present',
    roles: [
      { title: 'Principal Software Engineer', dates: 'Jan 2025 — Present' },
      { title: 'Senior Software Engineer', dates: 'Jan 2023 — Dec 2024' },
      { title: 'Associate Software Engineer', dates: 'Sept 2021 — Dec 2022' },
    ],
    highlights: [
      {
        team: 'Payments Tech',
        period: 'Feb 2024 — Present',
        bullets: [
          'Built a near-real-time payments system on Kafka, SQS, and EventBridge that cut customer Open-To-Buy wait time from 1–2 days to ~15 minutes for more than 1M customers.',
          'Designed an automated credit-balance refund system on AWS Glue (PySpark) that processes 500–1,000+ cheque requests daily and eliminated a vendor dependency.',
          'Promoted to Principal Engineer in January 2025 for end-to-end ownership and cross-team coordination on this initiative.',
        ],
      },
      {
        team: 'IDsRUs',
        period: 'Mid-2023 — Jan 2024',
        bullets: [
          'Built a device-possession check microservice (SMS verification for fraud prevention) serving ~30k new customers per month.',
          'Stack: Python, AWS Lambda, DynamoDB, REST APIs behind API Gateway.',
        ],
      },
      {
        team: 'Planet Express (Data Engineering)',
        period: 'Sept 2021 — Mid-2023',
        bullets: [
          'Built a centralized Apache Airflow platform on ECS Fargate (RDS + Redis + Celery executors) and onboarded ~40 pipelines across 10+ teams, cutting runtime errors ~70%.',
          'Migrated 40+ pipelines from an internal Spark framework to PySpark on AWS EMR; the migration became the reference implementation other teams adopted.',
          'Created an automated PR campaign that generated 6,000+ security-update PRs in one quarter and was later adopted org-wide.',
        ],
      },
    ],
  },
  {
    company: 'Cyphercor Inc.',
    location: 'Ottawa, ON',
    period: 'Jan 2021 — Sept 2021',
    roles: [{ title: 'Software Development Engineer (Full-Stack)', dates: 'Jan 2021 — Sept 2021' }],
    highlights: [
      {
        team: '2FA Platform',
        period: 'Jan 2021 — Sept 2021',
        bullets: [
          'Built 10+ REST APIs for the cloud and on-premise 2FA product on Play Framework + JAX-RS.',
          'Created 3 monitoring dashboards for metrics and logs; owned end-to-end delivery on 4 projects with ~80% test coverage.',
          'Stack: Play Framework, JAX-RS, React, DynamoDB, SQL.',
        ],
      },
    ],
  },
  {
    company: 'Sculptsoft',
    location: 'Ahmedabad, India',
    period: 'May 2018 — June 2018',
    roles: [{ title: 'Software Development Intern (ML team)', dates: 'May 2018 — June 2018' }],
    highlights: [
      {
        team: 'ML / NLP',
        period: 'Summer 2018',
        bullets: [
          'Built a PoC chatbot using AWS and NLP.',
          'Prototyped a rule-engine integrated into a Flask web app.',
        ],
      },
    ],
  },
]

export const education: Education[] = [
  {
    school: 'University of Waterloo',
    location: 'Waterloo, ON',
    degree: 'M.Eng., Electrical and Computer Engineering',
    period: 'Sept 2019 — Dec 2020',
    gpa: '3.95 / 4.0',
  },
  {
    school: 'Gujarat Technological University',
    location: 'Ahmedabad, India',
    degree: 'B.Eng., Computer Engineering',
    period: 'Aug 2015 — June 2019',
    gpa: '9.03 / 10',
  },
]

export const certifications: Certification[] = [
  { name: 'AWS Certified Solutions Architect — Associate', issuer: 'Amazon Web Services', date: '2023' },
  { name: 'AWS Certified Machine Learning Engineer — Associate', issuer: 'Amazon Web Services', date: 'Scheduled 2026' },
  { name: 'Machine Learning Engineer Training Program (MLETP)', issuer: 'Capital One', date: '2024' },
  { name: 'AWS DeepRacer — Podium Finish', issuer: 'Capital One', date: '2023' },
]

export type SkillGroup = {
  category: string
  items: string[]
}

export const skills: SkillGroup[] = [
  {
    category: 'Languages',
    items: ['Python', 'Java', 'SQL', 'TypeScript', 'JavaScript', 'Go', 'C++', 'HTML/CSS'],
  },
  {
    category: 'Backend & Frameworks',
    items: [
      'FastAPI',
      'Spring Boot',
      'Flask',
      'Play Framework',
      'JAX-RS',
      '.NET',
      'React',
      'Click',
    ],
  },
  {
    category: 'Data & ML',
    items: [
      'Apache Kafka',
      'PySpark',
      'Apache Airflow',
      'Celery',
      'Pandas',
      'NumPy',
      'scikit-learn',
      'PyTorch',
      'LangChain',
      'pgvector',
      'spaCy',
    ],
  },
  {
    category: 'Databases & Storage',
    items: ['PostgreSQL', 'DynamoDB', 'Redis', 'MySQL', 'MongoDB', 'S3'],
  },
  {
    category: 'Cloud & DevOps',
    items: [
      'AWS Lambda',
      'AWS ECS Fargate',
      'AWS EMR',
      'AWS Glue',
      'API Gateway',
      'EventBridge',
      'SQS',
      'CloudFormation',
      'CloudWatch',
      'Docker',
      'Terraform',
      'Jenkins',
      'GitHub Actions',
    ],
  },
  {
    category: 'Tools & Practices',
    items: [
      'Git',
      'Linux',
      'Splunk',
      'New Relic',
      'JIRA',
      'OpenAPI',
      'pytest',
      'JUnit',
      'Mockito',
      'Selenium',
      'JMeter',
    ],
  },
]

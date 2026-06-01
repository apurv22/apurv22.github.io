export type Project = {
  slug: string
  name: string
  tagline: string
  summary: string
  technologies: string[]
  features: string[]
  githubUrl: string
  mermaid: string
}

export const projects: Project[] = [
  {
    slug: 'ap-payments-pipeline',
    name: 'ap-payments-pipeline',
    tagline: 'Lambda architecture for real-time payments',
    summary:
      'A production-grade payments data pipeline on a Lambda architecture. The speed layer consumes Avro-serialized transactions from Kafka, enriches them with merchant, FX, and fraud signals, and bulk-loads PostgreSQL via COPY with at-least-once delivery and a dead-letter queue. The batch layer runs nightly PySpark jobs orchestrated by Airflow for per-user spend aggregations, merchant analytics, and T+1 settlement reconciliation. A FastAPI serving layer exposes the aggregates over REST.',
    technologies: [
      'Python 3.11',
      'Apache Kafka',
      'Avro / fastavro',
      'PostgreSQL',
      'Redis',
      'PySpark',
      'Apache Airflow',
      'FastAPI',
      'SQLAlchemy 2.0',
      'Alembic',
      'Pydantic v2',
      'boto3 / S3',
      'Docker Compose',
      'pytest + testcontainers',
    ],
    features: [
      'Speed-layer Kafka consumer with manual offset commits and a Kafka DLQ for unparseable messages.',
      'Three-stage enricher chain — merchant lookup (in-memory + Postgres), FX rate normalization (Redis cache → external API fallback), and rule-based fraud signals (Redis sorted-set velocity).',
      'Bulk Postgres sink using COPY with ON CONFLICT DO NOTHING deduplication on transaction_id.',
      'Schema evolution via fastavro reader-schema (v2 superset reads both v1 and v2 messages transparently).',
      'Airflow DAGs for nightly aggregations, T+1 settlement reconciliation, and S3 cold-storage archival.',
      'PySpark jobs reading via JDBC for daily spend, merchant GMV analytics, and settlement discrepancy detection.',
      'FastAPI endpoints for per-user spend, merchant analytics, and discrepancy resolution.',
      'Integration tests on testcontainers (ephemeral Kafka + Postgres).',
    ],
    githubUrl: 'https://github.com/apurv22/ap-payments-pipeline',
    mermaid: `flowchart LR
    Producer["Transaction Producer<br/>(synthetic, weighted)"] -->|Avro v2<br/>key=user_id| Kafka[(Kafka<br/>payment-transactions)]

    subgraph Speed["Speed Layer"]
      Consumer["TransactionConsumer<br/>fastavro reader<br/>manual offset commit"]
      Enrich["Enricher chain<br/>Merchant → FX → Fraud"]
      Sink["PostgresSink<br/>COPY + ON CONFLICT"]
      Consumer --> Enrich --> Sink
    end

    Kafka --> Consumer
    Consumer -.->|deserialize fail| DLQ[(DLQ topic)]
    Enrich <-->|FX cache<br/>velocity ZSET| Redis[(Redis)]
    Sink --> Postgres[("PostgreSQL<br/>transactions<br/>merchants")]

    subgraph Batch["Batch Layer (Airflow, nightly)"]
      Daily["daily_pipeline_dag<br/>2am UTC"]
      Settle["settlement_dag<br/>8am UTC"]
      Archive["archival_dag<br/>4am UTC"]
      Daily --> DailyAgg["daily_aggregations.py"]
      Daily --> Merch["merchant_analytics.py"]
      Settle --> Recon["settlement_reconciler.py"]
    end

    Postgres -->|JDBC read| DailyAgg & Merch & Recon
    DailyAgg & Merch & Recon -->|write| Postgres
    Archive -->|>30d Parquet| S3[(S3<br/>cold storage)]

    subgraph Serving["Serving Layer"]
      API["FastAPI<br/>/aggregates<br/>/merchants<br/>/settlement"]
    end

    Postgres --> API --> Client(["Client"])
`,
  },

  {
    slug: 'ap-finrag',
    name: 'ap-finrag',
    tagline: 'RAG for SEC financial filings with hybrid retrieval',
    summary:
      'A production-grade RAG system for SEC filings (10-K, 10-Q, earnings transcripts). Async Celery workers ingest EDGAR filings, clean and chunk them with a section-aware strategy, embed via Ollama or OpenAI, and store in PostgreSQL with pgvector. A hybrid retriever fuses semantic search and Postgres FTS with Reciprocal Rank Fusion. The query path streams tokens over SSE through a LangChain RAG chain that tracks per-claim citations.',
    technologies: [
      'Python 3.11',
      'FastAPI',
      'LangChain',
      'OpenAI / Ollama',
      'PostgreSQL + pgvector',
      'Celery',
      'Redis',
      'SQLAlchemy 2.0',
      'Alembic',
      'spaCy',
      'BeautifulSoup4',
      'sse-starlette',
      'Pydantic v2',
      'httpx',
      'pytest + testcontainers',
    ],
    features: [
      'EDGAR scraper with 5 req/sec rate limiting and httpx async client.',
      'Three pluggable chunking strategies: recursive text, sentence window, and section-aware (default).',
      'Hybrid retrieval — pgvector cosine similarity + Postgres FTS, fused via Reciprocal Rank Fusion (k=60).',
      'Streaming responses via Server-Sent Events using sse-starlette and LangChain astream.',
      'Citation tracking — every factual claim is linked back to its source chunk.',
      'Async ingestion via Celery with retry, status polling, and Redis-cached embeddings (SHA256 key, 7-day TTL).',
      'Provider-agnostic LLM layer — flip a single env var to switch between Ollama and OpenAI.',
      'Admin endpoints for reindex, purge, and stats; query feedback capture (-1 / 0 / 1).',
    ],
    githubUrl: 'https://github.com/apurv22/ap-finrag',
    mermaid: `flowchart TB
    subgraph Ingest["Ingestion Path (async)"]
      Post["POST /documents/<br/>status=pending"] -->|Celery| Task["ingest_document<br/>Celery worker"]
      Task --> Scrape["EDGAR scraper<br/>httpx, 5 req/sec"]
      Scrape --> Clean["HTML cleaner<br/>BeautifulSoup4"]
      Clean --> Chunk["Chunker<br/>section-aware"]
      Chunk --> Embed["Embedder<br/>Ollama / OpenAI"]
      Embed <-->|SHA256, 7d TTL| EmbedCache[(Redis<br/>embedding cache)]
      Embed --> Store["Store chunks<br/>status=ready"]
    end

    subgraph Storage["PostgreSQL + pgvector"]
      Docs[("documents<br/>ticker · doc_type<br/>period · status")]
      Chunks[("chunks<br/>text · section<br/>embedding VECTOR<br/>search_vector TSVECTOR")]
      QH[("query_history<br/>query · answer<br/>feedback · latency")]
    end

    Store --> Chunks
    Post --> Docs

    subgraph Query["Query Path"]
      QPost["POST /query/<br/>or /query/stream"] --> QEmbed["Embed query<br/>(same model)"]
      QEmbed --> Hybrid["HybridRetriever"]
      subgraph HybridBox[" "]
        direction LR
        Vec["Vector search<br/>pgvector ⟨=⟩"]
        Kw["Keyword search<br/>FTS @@ "]
        RRF["RRF fusion<br/>k=60"]
        Vec --> RRF
        Kw --> RRF
      end
      Hybrid --> Chain["FinancialRAGChain<br/>LangChain + citations"]
      Chain -->|SSE tokens or JSON| Client(["Client"])
    end

    Chunks --> Vec
    Chunks --> Kw
    Chain -.write.-> QH
`,
  },

  {
    slug: 'ap-feature-store',
    name: 'ap-feature-store',
    tagline: 'Self-hosted ML feature store with offline + online tiers',
    summary:
      'A lightweight ML feature store written as a Python library, CLI, and REST serving layer. A Postgres-backed registry holds FeatureView and Entity definitions with schema-compatibility checks. The offline store serves point-in-time correct historical retrieval from Postgres; the online store serves sub-millisecond lookups from Redis using msgpack and pipeline batching. A materialization engine moves data offline → online in either batch or watermark-driven incremental mode, with optional S3 Parquet snapshots.',
    technologies: [
      'Python 3.11',
      'FastAPI',
      'SQLAlchemy 2.0',
      'Alembic',
      'PostgreSQL',
      'Redis',
      'msgpack',
      'Pandas',
      'Click',
      'Rich',
      'Pydantic v2',
      'boto3 / S3',
      'Docker Compose',
      'pytest + testcontainers',
    ],
    features: [
      'Feature Registry on Postgres with FeatureView / Entity / materialization-job / lineage tables.',
      'Schema-compatibility enforcement on apply (rejects backwards-incompatible feature changes).',
      'Offline store with point-in-time correct historical retrieval (event-timestamp asof joins).',
      'Online store in Redis with msgpack serialization and pipeline batching for sub-ms reads.',
      'Batch and incremental (watermark-tracked) materialization with chunked processing.',
      'Optional S3 Parquet snapshot store for offline durability.',
      'Click + Rich CLI: apply, materialize, materialize-incremental, serve, status, diff.',
      'FastAPI serving endpoints: /features/online, /features/historical, /feature-views, /materialization/jobs.',
    ],
    githubUrl: 'https://github.com/apurv22/ap-feature-store',
    mermaid: `flowchart TB
    Defs["Python definitions<br/>FeatureView · Entity"] -->|apply| Registry[("Feature Registry<br/>(PostgreSQL)<br/>SQLAlchemy 2.0 + Alembic")]

    Registry -->|get_feature_view| Offline[("Offline Store<br/>PostgreSQL<br/>point-in-time joins")]
    Registry -->|materialization jobs| Mat["Materialization Engine"]

    subgraph MatBox["Materialization Engine"]
      Batch["BatchMaterializer<br/>(chunked)"]
      Incr["IncrementalMaterializer<br/>(watermark)"]
    end

    Mat --> Batch
    Mat --> Incr

    Offline -->|range query| Batch
    Offline -->|since watermark| Incr
    Batch & Incr -->|msgpack pipeline| Online[("Online Store<br/>Redis<br/>TTL · msgpack")]
    Batch -.optional.-> Snap[("Snapshot Store<br/>S3 Parquet")]

    subgraph Consumers["Consumers"]
      API["REST API (FastAPI)<br/>/features/online<br/>/features/historical<br/>/feature-views"]
      CLI["CLI (Click + Rich)<br/>apply · materialize<br/>serve · status · diff"]
    end

    Online --> API
    Offline --> API
    Registry --> API
    Registry --> CLI
    CLI -->|apply / diff| Registry
`,
  },

  {
    slug: 'ap-streambeat',
    name: 'ap-streambeat',
    tagline: 'Real-time CDN streaming quality monitor with ML anomaly detection',
    summary:
      'A real-time monitor for video CDN streaming quality. A telemetry simulator publishes CDN events to Kafka. The stream processor consumes them, maintains rolling-window QoE metrics (60s / 300s / 3600s), and runs Isolation Forest anomaly detection with an atomic model hot-swap and a threshold fallback. Alerts are persisted to Postgres, published over a Redis pub/sub channel, and pushed to operators via a FastAPI WebSocket feed. Celery beat jobs handle daily model retraining and stale-event cleanup.',
    technologies: [
      'Python 3.11',
      'Apache Kafka (kafka-python)',
      'PostgreSQL',
      'Redis',
      'scikit-learn (Isolation Forest)',
      'FastAPI',
      'WebSockets',
      'Celery',
      'SQLAlchemy 2.0',
      'Alembic',
      'joblib',
      'NumPy / Pandas',
      'boto3 / S3 (model artifacts)',
      'Pydantic v2',
      'pytest + testcontainers + fakeredis',
    ],
    features: [
      'CDN event simulator with realistic degradation profiles.',
      'Kafka consumer with consumer-group rebalance + commit-on-flush semantics.',
      'Rolling-window metrics processor maintaining 60s / 300s / 3600s deques per region.',
      'Isolation Forest detector with atomic in-memory hot-swap — model updates without dropping traffic.',
      'Threshold-based fallback detector when no trained model is available.',
      'AlertingEngine with template-driven severity scoring; alerts written to Postgres and published to Redis pub/sub.',
      'FastAPI REST + WebSocket — /metrics/{region}, /alerts, /models, /ws/live.',
      'Celery Beat: nightly retrain (03:00 UTC) with promote/evaluate cycle; daily cleanup (02:00 UTC).',
    ],
    githubUrl: 'https://github.com/apurv22/ap-streambeat',
    mermaid: `flowchart LR
    Sim["CDN Event Simulator<br/>(degradation profiles)"] -->|JSON, key=region| Kafka[(Kafka<br/>cdn-telemetry)]

    subgraph Processor["Stream Processor"]
      Cons["KafkaConsumer<br/>group: streambeat-v1"]
      Win["RollingWindow<br/>60s · 300s · 3600s"]
      Det["AnomalyDetector<br/>Isolation Forest<br/>+ threshold fallback"]
      Alert["AlertingEngine<br/>template + severity"]
      Cons --> Win --> Det --> Alert
    end

    Kafka --> Cons

    Alert -->|write| PG[("PostgreSQL<br/>raw_events<br/>window_metrics<br/>alerts<br/>model_versions")]
    Alert -->|publish<br/>streambeat:alerts| Redis[(Redis<br/>pub/sub)]
    Det <-->|atomic hot-swap| ModelStore[("S3<br/>model artifacts")]

    subgraph Serving["FastAPI"]
      REST["REST<br/>/metrics/{r}<br/>/alerts · /models"]
      WS["WebSocket<br/>/ws/live"]
    end

    PG --> REST
    Redis --> WS
    REST --> Client(["Operator / dashboard"])
    WS --> Client

    subgraph Beat["Celery Beat (workers)"]
      Train["retrain-daily<br/>03:00 UTC"]
      Clean["cleanup-events<br/>02:00 UTC"]
    end
    Train --> ModelStore
    Train -.promote.-> Det
    Clean --> PG
`,
  },

  {
    slug: 'ap-taskqueue',
    name: 'ap-taskqueue',
    tagline: 'Distributed task queue, Celery-style, from scratch',
    summary:
      'A lightweight distributed task queue for Python. A @task decorator registers async- and sync-aware tasks. The Redis broker pairs a FIFO LIST for normal queues with a ZSET for priority and an ETA-keyed ZSET for scheduled tasks. An async worker pool with a semaphore-bounded concurrency runs tasks; failed tasks retry with exponential backoff + jitter, then land in a dead-letter queue with re-queue support. Results live in a TTL-managed Redis backend. Task chaining is supported via Signatures, and a FastAPI dashboard plus a Click CLI handle introspection and ops.',
    technologies: [
      'Python 3.11',
      'Redis',
      'msgpack',
      'asyncio + anyio',
      'FastAPI',
      'Click',
      'Rich',
      'Pydantic v2',
      'pytest + fakeredis',
    ],
    features: [
      '@task decorator with queue, priority, max_retries, retry_backoff, time_limit options.',
      'Redis broker with FIFO LIST per queue, ZSET for priority, ZSET for scheduled (ETA) tasks, SET of active workers.',
      'AsyncWorkerPool with asyncio.Semaphore-bounded concurrency; SIGTERM-aware graceful shutdown.',
      'TaskExecutor that handles both async and sync tasks, enforces time limits, and propagates chains.',
      'RetryPolicy with exponential backoff and jitter; configurable max attempts.',
      'Dead-letter queue with re-queue support and per-task failure metadata.',
      'AsyncResult with polling + exponential backoff and TTL-managed result backend.',
      'Task chaining via Signatures — `(t1.s(arg) | t2.s()).delay()`.',
      'FastAPI dashboard: /queues, /workers, /tasks/{id}, /dlq, POST /dlq/retry, DELETE /purge.',
      'Click CLI: worker, inspect, purge, retry-dlq.',
    ],
    githubUrl: 'https://github.com/apurv22/ap-taskqueue',
    mermaid: `flowchart TB
    App["Application<br/>(Web server / CLI)"] -->|task.delay() / apply_async()| TQ["TaskQueue<br/>registry + sync→async bridge"]
    TQ -->|msgpack| Broker

    subgraph Broker["Redis Broker"]
      direction LR
      Q["LIST<br/>taskqueue:queue:&lt;name&gt;<br/>FIFO"]
      P["ZSET<br/>taskqueue:priority:&lt;name&gt;"]
      S["ZSET<br/>taskqueue:scheduled<br/>(ETA)"]
      W["SET<br/>taskqueue:workers"]
    end

    Broker -->|ZPOPMIN / BRPOP| Pool["AsyncWorkerPool<br/>asyncio.Semaphore"]
    Pool --> Exec["TaskExecutor<br/>async/sync · time limits<br/>chain propagation"]

    Exec --> Retry["RetryPolicy<br/>exp backoff + jitter"]
    Exec --> DLQ[("Dead-letter<br/>Queue")]
    Exec --> Result[("Result Backend<br/>Redis JSON · TTL")]
    Exec --> Chain["Chain propagation<br/>(Signatures)"]

    Retry -.requeue.-> Broker
    DLQ -.retry-dlq.-> Broker

    Result --> AR["AsyncResult<br/>poll · exp backoff"]

    subgraph Ops["Auxiliary"]
      Dash["FastAPI Dashboard<br/>/queues · /workers<br/>/tasks · /dlq"]
      CLI["Click CLI<br/>worker · inspect<br/>purge · retry-dlq"]
    end

    Broker --> Dash
    Result --> Dash
    DLQ --> Dash
    CLI --> Broker
    CLI --> DLQ
`,
  },
]

import { useEffect, useMemo, useRef, useState } from "react"
import { LazyMotion, domAnimation, m } from "motion/react"
import { Analytics } from "@vercel/analytics/react"
import MagneticButton from "./components/MagneticButton"
import TiltSurface from "./components/TiltSurface"
import { useMousePosition } from "./hooks/useMousePosition"
import { links, navItems, projects, skillGroups } from "./data/portfolio"
function Arrow() {
  return (
    <span className="arrow-icon" aria-hidden="true">
      ↗
    </span>
  )
}
function ExternalLink({ href, children, className = "", label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={className}
    >
      {children}
    </a>
  )
}
function Reveal({ children, className = "" }) {
  return (
    <m.div
      className={`reveal ${className}`}
      initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  )
}
function SectionLabel({ number, children }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <span>{children}</span>
      <i />
    </div>
  )
}
function Metric({ value, suffix = "", label }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(0)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      const started = performance.now()
      const tick = (now) => {
        const p = Math.min((now - started) / 900, 1)
        setShown(Math.round(value * (1 - Math.pow(1 - p, 3))))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
      observer.disconnect()
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [value])
  return (
    <div className="metric">
      <span ref={ref}>
        {shown}
        {suffix}
      </span>
      <small>{label}</small>
    </div>
  )
}
function Architecture({ expanded = false }) {
  const nodes = [
    ["DOCUMENTATION", "Source documentation enters the analysis pipeline."],
    ["INGESTION", "Documents are collected and prepared for processing."],
    ["CHUNKING", "Content is split into retrievable units."],
    [
      "EMBEDDINGS",
      "Convert document chunks into vector representations for semantic retrieval.",
    ],
    ["CHROMADB", "Stores and retrieves document embeddings."],
    ["RETRIEVAL", "Relevant evidence is surfaced for analysis."],
    [
      "LLM ANALYSIS",
      "Analyzes retrieved evidence and produces impact insights.",
    ],
    ["IMPACT REPORT", "The final change impact is presented."],
  ]
  return (
    <div className={`architecture ${expanded ? "architecture-expanded" : ""}`}>
      {nodes.map(([name, description], i) => (
        <div className="architecture-step" key={name}>
          <div className="architecture-node" tabIndex={0}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <b>{name}</b>
            <div className="node-tip">{description}</div>
          </div>
          {i < nodes.length - 1 && (
            <div className="flow-line">
              <i />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
function ProductPreview() {
  const [subject, setSubject] = useState("Computer Science")
  const subjects = ["Computer Science", "Mathematics", "Physics"]
  return (
    <div className="product-window" data-cursor="EXPLORE">
      <div className="window-bar">
        <div>
          <i />
          <i />
          <i />
        </div>
        <span>examshelf.in</span>
        <b>AB</b>
      </div>
      <div className="product-body">
        <aside>
          <strong>ExamShelf</strong>
          <small>MY LIBRARY</small>
          {subjects.map((s) => (
            <button
              key={s}
              onClick={() => setSubject(s)}
              className={subject === s ? "selected" : ""}
            >
              {s}
            </button>
          ))}
        </aside>
        <div className="resource-area">
          <div className="mock-search">⌕&nbsp;&nbsp; Search resources</div>
          <p className="eyebrow">BROWSE LIBRARY</p>
          <h3>{subject}</h3>
          <div className="resource-grid">
            {["Study notes", "Previous papers", "Reference material"].map(
              (r, i) => (
                <div className="resource-card" key={r}>
                  <span>0{i + 1}</span>
                  <i>PDF</i>
                  <b>{r}</b>
                  <small>Academic resource</small>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
function Portrait() {
  const frame = useRef(null)
  const [imageReady, setImageReady] = useState(false)
  const move = (event) => {
    if (!window.matchMedia("(pointer: fine)").matches) return
    const bounds = frame.current.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    frame.current.style.setProperty("--portrait-x", `${x * 7}px`)
    frame.current.style.setProperty("--portrait-y", `${y * 7}px`)
    frame.current.style.setProperty("--portrait-rx", `${-y}deg`)
    frame.current.style.setProperty("--portrait-ry", `${x}deg`)
  }
  const reset = () => {
    frame.current.style.setProperty("--portrait-x", "0px")
    frame.current.style.setProperty("--portrait-y", "0px")
    frame.current.style.setProperty("--portrait-rx", "0deg")
    frame.current.style.setProperty("--portrait-ry", "0deg")
  }
  return (
    <div
      className="portrait-composition"
      ref={frame}
      onMouseMove={move}
      onMouseLeave={reset}
      data-cursor="VIEW"
    >
      <div className="portrait-offset" aria-hidden="true" />
      <div className="portrait-frame">
        <div className="portrait-fallback" aria-hidden="true">
          <span>AB</span>
          <small>PORTRAIT / ARADHY BAJPAI</small>
        </div>
        <img
          className={imageReady ? "is-ready" : ""}
          src="/images/profile.jpg"
          alt="Portrait of Aradhy Bajpai"
          onLoad={() => setImageReady(true)}
          onError={() => setImageReady(false)}
        />
        <div className="portrait-grain" aria-hidden="true" />
        <div className="portrait-sweep" aria-hidden="true" />
      </div>
      <div className="portrait-label">THE BUILDER</div>
      <div className="portrait-meta portrait-meta-left">
        <span>ARADHY BAJPAI</span>
        <span>CS / SOFTWARE ENGINEERING</span>
      </div>
      <div className="portrait-meta portrait-meta-right">
        <span>KANPUR, INDIA</span>
        <span>2026</span>
      </div>
    </div>
  )
}
function MLPipeline() {
  return (
    <div className="ml-panel">
      <div className="ml-flow">
        {[
          "DATA",
          "PREPROCESS",
          "FEATURES",
          "MODEL",
          "EVALUATE",
          "SHAP",
          "API",
        ].map((n, i) => (
          <div key={n}>
            <span>{n}</span>
            {i < 6 && <i>→</i>}
          </div>
        ))}
      </div>
      <div className="shap-visual">
        <div className="shap-head">
          <span>EXPLAINABILITY VIEW</span>
          <b>SHAP</b>
        </div>
        {[82, 63, 49, 35, 22].map((v, i) => (
          <div className="shap-row" key={v}>
            <small>feature_{i + 1}</small>
            <i style={{ "--w": `${v}%` }} />
            <span>{i % 2 ? "−" : "+"}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
function ProjectVisual({ project }) {
  let visual = <MLPipeline />
  if (project.key === "examshelf") visual = <ProductPreview />
  if (project.key === "deltarag") visual = <Architecture />
  return <TiltSurface>{visual}</TiltSurface>
}
function Modal({ title, onClose, children, className = "" }) {
  const closeButton = useRef(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  useEffect(() => {
    const close = (e) => e.key === "Escape" && onCloseRef.current()
    document.addEventListener("keydown", close)
    document.body.classList.add("locked")
    closeButton.current?.focus()
    return () => {
      document.removeEventListener("keydown", close)
      document.body.classList.remove("locked")
    }
  }, [])
  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section
        className={`modal ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="modal-top">
          <span>{title}</span>
          <button ref={closeButton} onClick={onClose} aria-label="Close dialog">
            CLOSE ×
          </button>
        </div>
        {children}
      </section>
    </div>
  )
}
function CaseStudy({ project, onClose }) {
  const content = {
    examshelf: {
      problem:
        "Students need a focused place to discover and access academic resources.",
      solution:
        "A full-stack academic resource platform with browsing, search, subject selection, authentication, and a student dashboard.",
      decisions:
        "Next.js powers the product interface, while Supabase and PostgreSQL support authentication and data.",
      learned:
        "Building for 400+ logged-in users reinforced the value of clear information architecture and dependable product flows.",
    },
    deltarag: {
      problem:
        "Documentation changes can create downstream impact that is difficult to trace manually.",
      solution:
        "A RAG-based pipeline that ingests documentation, retrieves relevant evidence, and supports LLM-assisted impact analysis.",
      decisions:
        "ChromaDB enables semantic retrieval; FastAPI exposes the workflow; Docker supports consistent environments.",
      learned:
        "Retrieval quality depends on the full pipeline—from chunking and embeddings to evidence-grounded analysis.",
    },
    credit: {
      problem:
        "Credit risk assessment needs a reproducible machine learning workflow with interpretable outputs.",
      solution:
        "A pipeline covering preprocessing, feature engineering, modeling, evaluation, SHAP explainability, and API delivery.",
      decisions:
        "Scikit-learn provides the modeling workflow, SHAP supports interpretability, and FastAPI exposes the result.",
      learned:
        "Useful ML systems need both predictions and a clear way to inspect what influenced them.",
    },
  }[project.key]
  return (
    <Modal
      title={`${project.title} / CASE STUDY`}
      onClose={onClose}
      className="case-modal"
    >
      <div className="case-hero">
        <span>{project.index}</span>
        <h2>
          <ExternalLink
            href={project.github}
            label={`Open ${project.title} GitHub repository`}
          >
            {project.title} <Arrow />
          </ExternalLink>
        </h2>
        <p>{project.subtitle}</p>
      </div>
      <div className="case-grid">
        <article>
          <small>01 / PROBLEM</small>
          <p>{content.problem}</p>
        </article>
        <article>
          <small>02 / SOLUTION</small>
          <p>{content.solution}</p>
        </article>
        <article className="wide">
          <small>03 / ARCHITECTURE</small>
          <ProjectVisual project={project} />
        </article>
        <article>
          <small>04 / ENGINEERING DECISIONS</small>
          <p>{content.decisions}</p>
        </article>
        <article>
          <small>05 / WHAT I LEARNED</small>
          <p>{content.learned}</p>
        </article>
      </div>
      <div className="modal-actions">
        {project.live && (
          <ExternalLink href={project.live} className="primary-button">
            Live website <Arrow />
          </ExternalLink>
        )}
        <ExternalLink href={project.github} className="ghost-button">
          View source <Arrow />
        </ExternalLink>
      </div>
    </Modal>
  )
}
function CommandPalette({ onClose }) {
  const items = [
    ["View projects", () => document.querySelector("#work")?.scrollIntoView()],
    ["Open GitHub", () => window.open(links.github, "_blank")],
    ["Open LinkedIn", () => window.open(links.linkedin, "_blank")],
    ["View LeetCode", () => window.open(links.leetcode, "_blank")],
    [
      "View resume",
      () => window.open(links.resume, "_blank", "noopener,noreferrer"),
    ],
    ["Contact me", () => document.querySelector("#contact")?.scrollIntoView()],
  ]
  const [selected, setSelected] = useState(0)
  useEffect(() => {
    const keys = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelected((v) => (v + 1) % items.length)
      }
      if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelected((v) => (v - 1 + items.length) % items.length)
      }
      if (e.key === "Enter") {
        items[selected][1]()
        onClose()
      }
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", keys)
    return () => document.removeEventListener("keydown", keys)
  }, [selected, onClose])
  return (
    <div
      className="palette-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <div className="palette-query">
          <span>⌘</span> What do you want to explore?<kbd>ESC</kbd>
        </div>
        <div className="palette-list">
          {items.map(([name, action], i) => (
            <button
              key={name}
              className={selected === i ? "active" : ""}
              onMouseEnter={() => setSelected(i)}
              onClick={() => {
                action()
                onClose()
              }}
            >
              <span>0{i + 1}</span>
              {name}
              <i>↗</i>
            </button>
          ))}
        </div>
        <div className="palette-foot">
          <span>↑↓ Navigate</span>
          <span>↵ Select</span>
        </div>
      </div>
    </div>
  )
}
function DevTerminal({ onClose }) {
  const [value, setValue] = useState("")
  const [lines, setLines] = useState([
    "Developer mode unlocked.",
    "Type help to see available commands.",
  ])
  const run = (e) => {
    e.preventDefault()
    const command = value.trim().toLowerCase()
    const outputs = {
      help: "about · projects · skills · contact · clear",
      about: "Student by designation. Builder by habit.",
      projects: "ExamShelf · DeltaRAG · Credit Risk",
      skills: "Full-stack · AI/ML · GenAI · Engineering",
      contact: "bajpaiaradhy@gmail.com",
    }
    if (command === "clear") setLines([])
    else
      setLines((v) => [
        ...v,
        `aradhy@portfolio:~$ ${command}`,
        outputs[command] || `command not found: ${command}`,
      ])
    setValue("")
  }
  return (
    <Modal
      title="DEVELOPER TERMINAL"
      onClose={onClose}
      className="terminal-modal"
    >
      <div className="dev-terminal">
        {lines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
        <form onSubmit={run}>
          <span>aradhy@portfolio:~$</span>
          <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-label="Terminal command"
          />
        </form>
      </div>
    </Modal>
  )
}
export default function App() {
  const [loading, setLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("home")
  const [palette, setPalette] = useState(false)
  const [terminal, setTerminal] = useState(false)
  const [caseProject, setCaseProject] = useState(null)
  const [architecture, setArchitecture] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [filter, setFilter] = useState("ALL")
  const cursor = useMousePosition()
  const typed = useRef("")
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    const timer = window.setTimeout(
      () => setLoading(false),
      reducedMotion ? 250 : 1400,
    )
    const scroll = () => setScrolled(window.scrollY > 40)
    const key = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setPalette((v) => !v)
      }
      if (!e.metaKey && !e.ctrlKey && !e.altKey && e.key.length === 1) {
        typed.current = (typed.current + e.key).slice(-4)
        if (typed.current === "/dev") setTerminal(true)
      }
      if (e.key === "Escape") setMobileMenu(false)
    }
    window.addEventListener("scroll", scroll, { passive: true })
    document.addEventListener("keydown", key)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", scroll)
      document.removeEventListener("keydown", key)
    }
  }, [])
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal")
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("visible"),
        ),
      { threshold: 0.12 },
    )
    reveals.forEach((el) => observer.observe(el))
    const sections = document.querySelectorAll("main > section[id]")
    const sectionObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -50%" },
    )
    sections.forEach((el) => sectionObserver.observe(el))
    return () => {
      observer.disconnect()
      sectionObserver.disconnect()
    }
  }, [loading, filter])
  const filtered = useMemo(
    () =>
      filter === "ALL"
        ? projects
        : projects.filter((p) => p.kind.includes(filter)),
    [filter],
  )
  return (
    <LazyMotion features={domAnimation}>
      <div className="app-shell">
        <a className="skip-link" href="#work">
          Skip to selected work
        </a>
        {loading && (
          <div className="loader">
            <div className="loader-mark">
              <span>AB</span>
              <i />
            </div>
            <div className="loader-copy">
              <small>INITIALIZING PORTFOLIO</small>
              <b>ARADHY BAJPAI</b>
              <p>BUILD&nbsp; → &nbsp;LEARN&nbsp; → &nbsp;SHIP</p>
            </div>
            <div className="loader-progress">
              <i />
            </div>
          </div>
        )}
        <div
          className={`cursor ${cursor.label ? "cursor-active" : ""}`}
          style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }}
        >
          <span>{cursor.label}</span>
        </div>
        <div className="ambient" aria-hidden="true">
          <div className="grid" />
          <div className="glow" />
          <div className="noise" />
        </div>

        <header className={`nav-wrap ${scrolled ? "nav-scrolled" : ""}`}>
          <nav aria-label="Primary navigation">
            <a className="brand" href="#home" aria-label="Aradhy Bajpai, home">
              <span>AB</span>
              <b>ARADHY</b>
            </a>
            <div className="nav-links">
              {navItems.map(([name, id]) => (
                <a
                  key={id}
                  className={active === id ? "active" : ""}
                  href={`#${id}`}
                >
                  {name}
                </a>
              ))}
            </div>
            <div className="nav-actions">
              <button
                className="command-trigger"
                onClick={() => setPalette(true)}
                aria-label="Open command palette"
              >
                <span>⌘</span>K
              </button>
              <button
                className="mobile-menu-trigger"
                onClick={() => setMobileMenu((value) => !value)}
                aria-expanded={mobileMenu}
                aria-controls="mobile-navigation"
                aria-label={mobileMenu ? "Close navigation" : "Open navigation"}
              >
                <span
                  className={`menu-icon ${mobileMenu ? "is-open" : ""}`}
                  aria-hidden="true"
                >
                  <i />
                  <i />
                </span>
              </button>
              <ExternalLink
                href={links.resume}
                className="resume-link"
                label="Open Aradhy Bajpai resume PDF"
              >
                View Resume <Arrow />
              </ExternalLink>
            </div>
          </nav>
        </header>
        <div
          id="mobile-navigation"
          className={`mobile-navigation ${mobileMenu ? "is-open" : ""}`}
          aria-hidden={!mobileMenu}
        >
          <div>
            {navItems.map(([name, id], index) => (
              <a
                key={id}
                className={active === id ? "active" : ""}
                href={`#${id}`}
                onClick={() => setMobileMenu(false)}
              >
                <span>0{index + 1}</span>
                {name}
              </a>
            ))}
          </div>
          <footer>
            <span>ARADHY BAJPAI</span>
            <button
              onClick={() => {
                setMobileMenu(false)
                setPalette(true)
              }}
            >
              COMMAND PALETTE <kbd>⌘K</kbd>
            </button>
          </footer>
        </div>

        <main>
          <section id="home" className="hero">
            <div className="hero-copy">
              <div className="availability">
                <i /> AVAILABLE FOR SOFTWARE ENGINEERING{" "}
                <span>KANPUR · INDIA</span>
              </div>
              <h1>
                <span>I BUILD</span>
                <span>SOFTWARE</span>
                <span>
                  THAT <em>MATTERS.</em>
                </span>
              </h1>
              <div className="hero-identity">
                <b>Aradhy Bajpai</b>
                <span>Computer Science Undergraduate</span>
                <span>Full-Stack · AI/ML · Generative AI</span>
              </div>
              <p>
                Practical software, thoughtful systems, and engineering that
                earns its place in the real world.
              </p>
              <div className="hero-actions">
                <MagneticButton href="#work" className="primary-button">
                  Explore my work <span>↓</span>
                </MagneticButton>
                <MagneticButton
                  href={links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  ariaLabel="Open Aradhy Bajpai resume PDF"
                  className="ghost-button resume-button"
                >
                  View Resume <Arrow />
                </MagneticButton>
                <ExternalLink href={links.github} className="text-link">
                  GitHub <Arrow />
                </ExternalLink>
              </div>
            </div>
            <Portrait />
            <div className="scroll-cue">
              <span>SCROLL TO DISCOVER</span>
              <i />
            </div>
          </section>

          <section className="tech-marquee" aria-label="Technology ecosystem">
            <div>
              {[
                "JAVA",
                "PYTHON",
                "REACT",
                "NEXT.JS",
                "NODE.JS",
                "FASTAPI",
                "POSTGRESQL",
                "SUPABASE",
                "AWS",
                "DOCKER",
                "LANGCHAIN",
                "CHROMADB",
              ].map((t) => (
                <span key={t} title={`${t} in the project ecosystem`}>
                  {t}
                  <i>◆</i>
                </span>
              ))}
            </div>
          </section>

          <section id="about" className="about-section content-section">
            <SectionLabel number="01">WHO I AM</SectionLabel>
            <div className="about-grid">
              <Reveal>
                <h2>
                  Student by designation.
                  <br />
                  <em>Builder by habit.</em>
                </h2>
              </Reveal>
              <Reveal className="about-copy">
                <p>
                  I'm a Computer Science undergraduate focused on Software
                  Engineering, Full-Stack Development, AI/ML, and Generative AI.
                </p>
                <p>
                  I enjoy turning ideas into working systems and learning the
                  engineering behind them.
                </p>
                <div className="coordinates">
                  <span>26.4499° N</span>
                  <span>80.3319° E</span>
                  <span>KANPUR / INDIA</span>
                </div>
              </Reveal>
            </div>
            <Reveal className="timeline">
              {[
                ["2024", "B.Tech CSE begins"],
                ["2025", "Projects + DSA"],
                ["2026", "AI/ML + Full-Stack", "Major Projects"],
                ["2027", "Industry Preparation"],
              ].map(([year, ...text], i) => (
                <div key={year}>
                  <span>0{i + 1}</span>
                  <i />
                  <b>{year}</b>
                  <p>
                    {text.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </p>
                </div>
              ))}
            </Reveal>
          </section>

          <section className="dashboard-section content-section">
            <SectionLabel number="02">LIVE ENGINEERING DASHBOARD</SectionLabel>
            <Reveal className="dashboard-head">
              <div>
                <small>WORKSPACE / ACTIVE</small>
                <h2>
                  CURRENTLY
                  <br />
                  BUILDING
                </h2>
              </div>
              <div className="system-ring">
                <span>3</span>
                <small>
                  SYSTEMS
                  <br />
                  IN VIEW
                </small>
              </div>
            </Reveal>
            <div className="dashboard-grid">
              {[
                [
                  "DELTARAG",
                  "Documentation Change Impact Analysis",
                  "BUILDING",
                  "73",
                ],
                [
                  "EXAMSHELF",
                  "Academic Resource Platform",
                  "LIVE · 400+ USERS",
                  "100",
                ],
                [
                  "CREDIT RISK",
                  "Machine Learning Risk Assessment",
                  "BUILDING",
                  "61",
                ],
              ].map(([name, desc, status, progress], i) => (
                <Reveal className="dash-card" key={name}>
                  <div className="dash-top">
                    <span>0{i + 1}</span>
                    <i className={status.startsWith("LIVE") ? "live" : ""} />
                  </div>
                  <h3>{name}</h3>
                  <p>{desc}</p>
                  <div className="dash-status">
                    <span>{status}</span>
                    <small>
                      {progress === "100" ? "DEPLOYED" : "IN PROGRESS"}
                    </small>
                  </div>
                  <div className="dash-progress">
                    <i style={{ "--progress": `${progress}%` }} />
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="work" className="work-section content-section">
            <SectionLabel number="03">
              SELECTED WORK / TECHNICAL DEPTH
            </SectionLabel>
            <Reveal className="work-heading">
              <h2>
                BUILT TO
                <br />
                <em>BE USED.</em>
              </h2>
              <p>
                Three systems. Different problem spaces.
                <br />
                One approach: understand, build, improve.
              </p>
            </Reveal>
            <div className="filters" role="group" aria-label="Filter projects">
              {["ALL", "FULL-STACK", "AI / ML", "GENAI", "BACKEND"].map((f) => (
                <button
                  key={f}
                  className={filter === f ? "active" : ""}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="project-list">
              {filtered.map((project) => (
                <article
                  className={`project project-${project.accent}`}
                  key={project.key}
                >
                  <div className="project-info">
                    <span className="project-number">{project.index} / 03</span>
                    <Reveal>
                      <h3 className="project-title-link">
                        <ExternalLink
                          href={project.github}
                          label={`Open ${project.title} GitHub repository`}
                        >
                          {project.title}
                          <Arrow />
                        </ExternalLink>
                      </h3>
                      <p>{project.subtitle}</p>
                    </Reveal>
                    {project.key === "examshelf" && (
                      <div className="project-stat">
                        <strong>400+</strong>
                        <span>
                          LOGGED-IN
                          <br />
                          USERS
                        </span>
                      </div>
                    )}
                    <div className="tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <div className="project-actions">
                      {project.live && (
                        <ExternalLink
                          href={project.live}
                          className="primary-button"
                        >
                          Live website <Arrow />
                        </ExternalLink>
                      )}
                      <ExternalLink
                        href={project.github}
                        className="ghost-button"
                      >
                        View source <Arrow />
                      </ExternalLink>
                      <button
                        className="case-link"
                        onClick={() => setCaseProject(project)}
                      >
                        View case study <span>→</span>
                      </button>
                      {project.key === "deltarag" && (
                        <button
                          className="case-link"
                          onClick={() => setArchitecture(true)}
                        >
                          Explore architecture <span>→</span>
                        </button>
                      )}
                    </div>
                  </div>
                  <Reveal className="project-visual">
                    <ProjectVisual project={project} />
                  </Reveal>
                </article>
              ))}
            </div>
          </section>

          <section className="principles-section">
            <div className="content-section">
              <SectionLabel number="04">HOW I THINK</SectionLabel>
              <Reveal>
                <h2>
                  I DON'T JUST USE
                  <br />
                  TECHNOLOGY.
                  <br />
                  <em>I TRY TO UNDERSTAND WHY.</em>
                </h2>
              </Reveal>
              <div className="principles">
                {[
                  ["01", "BUILD", "Turn ideas into working systems."],
                  ["02", "UNDERSTAND", "Learn the underlying engineering."],
                  ["03", "MEASURE", "Use evidence instead of assumptions."],
                  ["04", "IMPROVE", "Iterate based on what breaks."],
                ].map(([n, t, d]) => (
                  <Reveal className="principle" key={t}>
                    <span>{n}</span>
                    <h3>{t}</h3>
                    <p>{d}</p>
                    <i>↗</i>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section id="skills" className="skills-section content-section">
            <SectionLabel number="05">TECHNOLOGY ECOSYSTEM</SectionLabel>
            <Reveal className="skills-head">
              <h2>
                TOOLS ARE
                <br />
                <em>CONNECTED.</em>
              </h2>
              <p>Hover to trace each part of the stack.</p>
            </Reveal>
            <div className="skill-constellation">
              <div className="constellation-core">
                <span>AB</span>
                <i />
                <i />
                <i />
              </div>
              {skillGroups.map(([group, skills], i) => (
                <Reveal className="skill-group" key={group}>
                  <small>
                    0{i + 1} / {group}
                  </small>
                  <div>
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        tabIndex={0}
                        data-project={
                          skill === "Next.js"
                            ? "USED IN EXAMSHELF"
                            : skill === "ChromaDB"
                              ? "USED IN DELTARAG"
                              : "ENGINEERING TOOL"
                        }
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section
            id="achievements"
            className="achievements-section content-section"
          >
            <SectionLabel number="06">PROOF OF WORK</SectionLabel>
            <div className="achievement-grid">
              <Reveal className="achievement-intro">
                <h2>
                  CONSISTENCY
                  <br />
                  COMPOUNDS.
                </h2>
                <p>
                  Progress measured in problems solved, systems built, and
                  lessons carried forward.
                </p>
              </Reveal>
              <Reveal className="achievement-card leetcode-card">
                <span>LEETCODE / PROFILE</span>
                <div className="code-rings">
                  <i />
                  <i />
                  <i />
                  <b>{"{ }"}</b>
                </div>
                <div className="metric-row">
                  <Metric value={500} suffix="+" label="PROBLEMS" />
                  <Metric value={1670} suffix="+" label="CONTEST RATING" />
                </div>
                <ExternalLink href={links.leetcode} className="case-link">
                  Open profile <Arrow />
                </ExternalLink>
              </Reveal>
              <Reveal className="achievement-card expo-card">
                <span>TECH EXPO / 2025</span>
                <div className="rank">
                  <Metric value={6} label="PLACE" />
                  <b>/</b>
                  <Metric value={150} label="TEAMS" />
                </div>
                <h3>
                  Smart Drainage
                  <br />
                  Monitoring System
                </h3>
                <p>Featured in a newspaper.</p>
              </Reveal>
            </div>
          </section>

          <section className="credentials-section content-section">
            <SectionLabel number="07">LEADERSHIP / CREDENTIALS</SectionLabel>
            <Reveal className="leadership">
              <div className="network" aria-hidden="true">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <i key={i} />
                ))}
                <span>AB</span>
              </div>
              <div>
                <small>AWS STUDENT BUILDER GROUP — PSIT</small>
                <h2>
                  Technical Lead —<br />
                  Community Developer
                </h2>
                <b>SEP 2026 — PRESENT</b>
                <p>
                  Lead community initiatives across social platforms, coordinate
                  technical activities, guide student members, and provide
                  technical guidance during workshops and technical events.
                </p>
              </div>
            </Reveal>
            <div className="credential-grid">
              {[
                [
                  "AWS",
                  "AWS Cloud Solutions Architect",
                  "Coursera / AWS",
                  "https://www.coursera.org/account/accomplishments/specialization/E7IIVRB52LBO",
                ],
                [
                  "OCI",
                  "Agentic AI Certified Foundations Associate",
                  "Oracle",
                  "https://catalog-education.oracle.com/ords/certview/sharebadge?id=25EE9DEB5C24696B7D0BC650BE4DD7E8A6186A732E2B7A656BAD7D0C1CFE664F",
                ],
                [
                  "AWS",
                  "Machine Learning Foundations",
                  "AWS Academy Graduate",
                  "https://www.credly.com/badges/1c5f4872-8dfb-4843-b1e9-4bb7003de2db",
                ],
              ].map(([mark, name, issuer, url], i) => (
                <Reveal className="credential" key={name}>
                  <div>
                    <span>{mark}</span>
                    <small>0{i + 1}</small>
                  </div>
                  <p>{issuer}</p>
                  <h3>{name}</h3>
                  <ExternalLink href={url}>
                    Verify credential <Arrow />
                  </ExternalLink>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="education-section content-section">
            <SectionLabel number="08">EDUCATION / FOUNDATION</SectionLabel>
            <div className="education-list">
              {[
                ["2024—2028", "PSIT, KANPUR", "B.Tech CSE", "8.79/10"],
                ["2024", "WENDY ACADEMY", "ISC XII", "93%  /  CS 97/100"],
                ["2022", "WENDY ACADEMY", "ICSE X", "89.8%  /  CS 97/100"],
              ].map(([year, school, degree, score]) => (
                <Reveal key={degree}>
                  <span>{year}</span>
                  <h3>{school}</h3>
                  <p>{degree}</p>
                  <b>{score}</b>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="public-section content-section">
            <SectionLabel number="09">BUILDING IN PUBLIC</SectionLabel>
            <Reveal className="github-panel">
              <div className="github-copy">
                <span>GITHUB / ARADHY2005</span>
                <h2>
                  CODE, COMMIT,
                  <br />
                  <em>KEEP BUILDING.</em>
                </h2>
                <p>
                  Live activity isn't requested from the network. Visit GitHub
                  for the current contribution history and repositories.
                </p>
                <ExternalLink href={links.github} className="primary-button">
                  View GitHub <Arrow />
                </ExternalLink>
              </div>
              <div
                className="contribution-placeholder"
                aria-label="Decorative GitHub contribution placeholder"
              >
                <div>
                  {Array.from({ length: 84 }, (_, i) => (
                    <i
                      key={i}
                      className={(i * 7 + (i % 5)) % 4 === 0 ? "on" : ""}
                    />
                  ))}
                </div>
                <span>STATIC VISUAL / LIVE DATA ON GITHUB</span>
              </div>
            </Reveal>
          </section>

          <section id="contact" className="contact-section">
            <div className="contact-lines" aria-hidden="true">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <i key={i} />
              ))}
            </div>
            <div className="content-section">
              <SectionLabel number="10">START A CONVERSATION</SectionLabel>
              <Reveal>
                <h2>
                  LET'S BUILD
                  <br />
                  SOMETHING
                  <br />
                  <em>USEFUL.</em>
                </h2>
                <p>
                  Interested in software engineering, full-stack development,
                  AI/ML, or GenAI? Let's connect.
                </p>
                <div className="contact-actions">
                  <ExternalLink
                    href="mailto:bajpaiaradhy@gmail.com"
                    className="primary-button"
                  >
                    Get in touch <Arrow />
                  </ExternalLink>
                  <ExternalLink href={links.linkedin} className="ghost-button">
                    LinkedIn <Arrow />
                  </ExternalLink>
                  <ExternalLink href={links.github} className="ghost-button">
                    GitHub <Arrow />
                  </ExternalLink>
                </div>
              </Reveal>
              <div className="contact-details">
                <ExternalLink href="mailto:bajpaiaradhy@gmail.com">
                  bajpaiaradhy@gmail.com
                </ExternalLink>
                <a href="tel:+919335853717">+91 93358 53717</a>
                <span>KANPUR, UTTAR PRADESH, INDIA</span>
              </div>
            </div>
          </section>
        </main>

        <footer>
          <div>
            <b>ARADHY BAJPAI</b>
            <p>
              Software Engineer
              <br />
              Full-Stack Developer
              <br />
              AI/ML Builder
            </p>
          </div>
          <div className="footer-links">
            <ExternalLink href={links.github}>
              GitHub <Arrow />
            </ExternalLink>
            <ExternalLink href={links.linkedin}>
              LinkedIn <Arrow />
            </ExternalLink>
            <ExternalLink href={links.leetcode}>
              LeetCode <Arrow />
            </ExternalLink>
            <ExternalLink href="mailto:bajpaiaradhy@gmail.com">
              Email <Arrow />
            </ExternalLink>
          </div>
          <div>
            <span>BUILT WITH CURIOSITY.</span>
            <small>© 2026 / ALL SYSTEMS OPERATIONAL</small>
          </div>
        </footer>

        {palette && <CommandPalette onClose={() => setPalette(false)} />}
        {terminal && <DevTerminal onClose={() => setTerminal(false)} />}
        {caseProject && (
          <CaseStudy
            project={caseProject}
            onClose={() => setCaseProject(null)}
          />
        )}
        {architecture && (
          <Modal
            title="DELTARAG / SYSTEM ARCHITECTURE"
            onClose={() => setArchitecture(false)}
            className="architecture-modal"
          >
            <div className="architecture-modal-copy">
              <small>INTERACTIVE DATA FLOW</small>
              <h2>
                FROM DOCUMENTATION
                <br />
                TO IMPACT INSIGHT.
              </h2>
              <p>
                Focus each node to inspect its role in the retrieval and
                analysis pipeline.
              </p>
            </div>
            <Architecture expanded />
          </Modal>
        )}
        <Analytics />
      </div>
    </LazyMotion>
  )
}

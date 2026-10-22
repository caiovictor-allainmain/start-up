import { useEffect, useState } from "react"

import "./Configuration.css"

export default function Configuration() {
  const [activeSection, setActiveSection] = useState("conta")

  const [config, setConfig] = useState({
    nome: "Eryck",
    email: "",
    notificacoes: true,
    emailNotificacoes: true,
    perfilPublico: true,
    statusOnline: true,
    tema: "claro"
  })

  // Carregar configurações salvas
  useEffect(() => {
    const saved = localStorage.getItem("configuracoes")

    if (saved) {
      setConfig(JSON.parse(saved))
    }
  }, [])

  // Aplicar o tema global
  useEffect(() => {
    document.body.classList.toggle(
      "escuro",
      config.tema === "escuro"
    )
  }, [config.tema])

  function updateConfig(campo, valor) {
    setConfig((prev) => ({
      ...prev,
      [campo]: valor
    }))
  }

  function saveConfig() {
    localStorage.setItem(
      "configuracoes",
      JSON.stringify(config)
    )

    alert("Configurações salvas com sucesso! ✅")
  }

  function resetConfig() {
    const defaultConfig = {
      nome: "Eryck",
      email: "",
      notificacoes: true,
      emailNotificacoes: true,
      perfilPublico: true,
      statusOnline: true,
      tema: "claro"
    }

    setConfig(defaultConfig)

    localStorage.setItem(
      "configuracoes",
      JSON.stringify(defaultConfig)
    )
  }

  const sections = [
    {
      id: "conta",
      icon: "👤",
      title: "Conta",
      description: "Informações pessoais"
    },
    {
      id: "notificacoes",
      icon: "🔔",
      title: "Notificações",
      description: "Gerencie seus avisos"
    },
    {
      id: "aparencia",
      icon: "🎨",
      title: "Aparência",
      description: "Personalize sua interface"
    },
    {
      id: "privacidade",
      icon: "🔒",
      title: "Privacidade",
      description: "Controle sua visibilidade"
    },
    {
      id: "seguranca",
      icon: "🛡️",
      title: "Segurança",
      description: "Proteja sua conta"
    }
  ]

  return (
    <div className="config-page">

      <div className="config-top">
        <div>
          <span className="config-badge">
            CONFIGURAÇÕES
          </span>

          <h1>Configurações</h1>

          <p>
            Personalize sua conta e controle como sua experiência
            funciona dentro da plataforma.
          </p>
        </div>
      </div>

      <div className="config-layout">

        <aside className="config-menu">

          <div className="profile-mini">

            <div className="profile-avatar">
              {config.nome?.charAt(0).toUpperCase() || "U"}
            </div>

            <div>
              <strong>
                {config.nome || "Usuário"}
              </strong>

              <span>
                {config.email || "Sua conta"}
              </span>
            </div>

          </div>

          <div className="config-menu-list">

            {sections.map((section) => (
              <button
                key={section.id}
                className={`config-menu-item ${
                  activeSection === section.id
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setActiveSection(section.id)
                }
              >

                <div className="menu-icon">
                  {section.icon}
                </div>

                <div className="menu-text">
                  <strong>
                    {section.title}
                  </strong>

                  <span>
                    {section.description}
                  </span>
                </div>

                <span className="menu-arrow">
                  ›
                </span>

              </button>
            ))}

          </div>

          <button
            className="reset-button"
            onClick={resetConfig}
          >
            Restaurar configurações
          </button>

        </aside>

        <main className="config-content">

          {activeSection === "conta" && (
            <section className="settings-card">

              <div className="section-header">
                <div className="section-title">

                  <span>👤</span>

                  <div>
                    <h2>Conta</h2>

                    <p>
                      Gerencie as informações da sua conta.
                    </p>
                  </div>

                </div>
              </div>

              <div className="user-preview">

                <div className="big-avatar">
                  {config.nome?.charAt(0).toUpperCase() || "U"}
                </div>

                <div>
                  <h3>
                    {config.nome || "Usuário"}
                  </h3>

                  <span>
                    {config.email || "Email não informado"}
                  </span>
                </div>

                <div className="account-status">
                  <span></span>
                  Conta ativa
                </div>

              </div>

              <div className="fields-grid">

                <div className="field">

                  <label>
                    Nome de usuário
                  </label>

                  <input
                    type="text"
                    value={config.nome}
                    placeholder="Digite seu nome"
                    onChange={(e) =>
                      updateConfig(
                        "nome",
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="field">

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    value={config.email}
                    placeholder="seuemail@email.com"
                    onChange={(e) =>
                      updateConfig(
                        "email",
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>

            </section>
          )}

          {activeSection === "notificacoes" && (
            <section className="settings-card">

              <div className="section-header">
                <div className="section-title">

                  <span>🔔</span>

                  <div>
                    <h2>Notificações</h2>

                    <p>
                      Escolha quais notificações deseja receber.
                    </p>
                  </div>

                </div>
              </div>

              <div className="settings-list">

                <SettingToggle
                  title="Notificações da plataforma"
                  description="Receba avisos sobre atividades importantes."
                  value={config.notificacoes}
                  onChange={(value) =>
                    updateConfig(
                      "notificacoes",
                      value
                    )
                  }
                />

                <SettingToggle
                  title="Notificações por email"
                  description="Receba atualizações importantes no seu email."
                  value={config.emailNotificacoes}
                  onChange={(value) =>
                    updateConfig(
                      "emailNotificacoes",
                      value
                    )
                  }
                />

              </div>

            </section>
          )}

          {activeSection === "aparencia" && (
            <section className="settings-card">

              <div className="section-header">
                <div className="section-title">

                  <span>🎨</span>

                  <div>
                    <h2>Aparência</h2>

                    <p>
                      Personalize a aparência da plataforma.
                    </p>
                  </div>

                </div>
              </div>

              <div className="theme-container">

                <label className="theme-option">

                  <input
                    type="radio"
                    name="theme"
                    checked={config.tema === "claro"}
                    onChange={() =>
                      updateConfig(
                        "tema",
                        "claro"
                      )
                    }
                  />

                  <div className="theme-preview light-preview">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>

                  <strong>
                    Claro
                  </strong>

                  <span>
                    Interface clara e limpa
                  </span>

                </label>

                <label className="theme-option">

                  <input
                    type="radio"
                    name="theme"
                    checked={config.tema === "escuro"}
                    onChange={() =>
                      updateConfig(
                        "tema",
                        "escuro"
                      )
                    }
                  />

                  <div className="theme-preview dark-preview">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>

                  <strong>
                    Escuro
                  </strong>

                  <span>
                    Interface escura para ambientes com pouca luz
                  </span>

                </label>

              </div>

            </section>
          )}

          {activeSection === "privacidade" && (
            <section className="settings-card">

              <div className="section-header">
                <div className="section-title">

                  <span>🔒</span>

                  <div>
                    <h2>Privacidade</h2>

                    <p>
                      Controle quem pode visualizar suas informações.
                    </p>
                  </div>

                </div>
              </div>

              <div className="settings-list">

                <SettingToggle
                  title="Perfil público"
                  description="Permitir que outros usuários encontrem seu perfil."
                  value={config.perfilPublico}
                  onChange={(value) =>
                    updateConfig(
                      "perfilPublico",
                      value
                    )
                  }
                />

                <SettingToggle
                  title="Mostrar status online"
                  description="Permitir que outros usuários saibam quando você está online."
                  value={config.statusOnline}
                  onChange={(value) =>
                    updateConfig(
                      "statusOnline",
                      value
                    )
                  }
                />

              </div>

            </section>
          )}

          {activeSection === "seguranca" && (
            <section className="settings-card">

              <div className="section-header">
                <div className="section-title">

                  <span>🛡️</span>

                  <div>
                    <h2>Segurança</h2>

                    <p>
                      Mantenha sua conta protegida.
                    </p>
                  </div>

                </div>
              </div>

              <div className="security-item">

                <div>
                  <strong>
                    Senha
                  </strong>

                  <span>
                    Altere sua senha regularmente para manter sua conta segura.
                  </span>
                </div>

                <button className="secondary-button">
                  Alterar senha
                </button>

              </div>

              <div className="security-item">

                <div>
                  <strong>
                    Sessões ativas
                  </strong>

                  <span>
                    Veja onde sua conta está conectada.
                  </span>
                </div>

                <button className="secondary-button">
                  Ver sessões
                </button>

              </div>

              <div className="security-warning">

                <span>
                  ⚠️
                </span>

                <div>
                  <strong>
                    Proteja sua conta
                  </strong>

                  <p>
                    Nunca compartilhe sua senha ou informações de acesso.
                  </p>
                </div>

              </div>

            </section>
          )}

          <div className="save-container">

            <button
              className="save-button"
              onClick={saveConfig}
            >
              ✓ Salvar alterações
            </button>

          </div>

          <div className="danger-zone">

            <div>

              <span className="danger-icon">
                ⚠️
              </span>

              <div>
                <h3>
                  Zona de perigo
                </h3>

                <p>
                  Ações nesta área podem afetar permanentemente sua conta.
                </p>
              </div>

            </div>

            <button className="delete-button">
              Excluir conta
            </button>

          </div>

        </main>

      </div>

    </div>
  )
}

function SettingToggle({
  title,
  description,
  value,
  onChange
}) {
  return (
    <div className="setting-row">

      <div className="setting-info">

        <strong>
          {title}
        </strong>

        <span>
          {description}
        </span>

      </div>

      <button
        className={`toggle ${value ? "on" : ""}`}
        onClick={() => onChange(!value)}
        aria-label={title}
      >
        <span></span>
      </button>

    </div>
  )
}
import { useState, useRef, useEffect } from 'react'
import './App.css'
import { ANIMATIONS } from './data/animations'
import { FONTS } from './data/fonts'
import { PARTICLE_EFFECTS } from './data/particles'
import { BACKGROUND_EFFECTS } from './data/backgrounds'
import { TEMPLATES, TEMPLATE_CATEGORIES, type TemplateConfig } from './data/templates'

type AppState = TemplateConfig

function App() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [config, setConfig] = useState<AppState>(TEMPLATES.corporateClean as AppState)
  const [activeTab, setActiveTab] = useState<'templates' | 'text' | 'fonts' | 'colors' | 'animation' | 'particles' | 'effects' | 'export'>('templates')
  const [isPlaying, setIsPlaying] = useState(false)
  const [savedDesigns, setSavedDesigns] = useState<string[]>([])
  const [history, setHistory] = useState<AppState[]>([TEMPLATES.corporateClean as AppState])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [selectedLayer, setSelectedLayer] = useState(0)

  // Load saved designs and fonts
  useEffect(() => {
    const saved = localStorage.getItem('profilecraftDesigns')
    if (saved) setSavedDesigns(JSON.parse(saved))

    // Load Google Fonts
    const fontLinks = FONTS.map(f => f.googleFontsUrl).join('&')
    const link = document.createElement('link')
    link.href = fontLinks
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 's') {
          e.preventDefault()
          exportAsImage()
        } else if (e.key === 'r') {
          e.preventDefault()
          surpriseMe()
        } else if (e.key === 'z' && e.shiftKey) {
          e.preventDefault()
          redo()
        } else if (e.key === 'z') {
          e.preventDefault()
          undo()
        }
      }
      if (e.code === 'Space') {
        e.preventDefault()
        setIsPlaying(!isPlaying)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying])

  const updateConfig = (updates: Partial<AppState>) => {
    const newConfig = { ...config, ...updates } as AppState
    setConfig(newConfig)

    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newConfig)
    setHistory(newHistory.slice(-20))
    setHistoryIndex(newHistory.length - 1)
  }

  const updateLayer = (layerIdx: number, updates: Partial<AppState['layers'][0]>) => {
    const newLayers = [...config.layers]
    newLayers[layerIdx] = { ...newLayers[layerIdx], ...updates }
    updateConfig({ layers: newLayers } as Partial<AppState>)
  }

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setConfig(history[historyIndex - 1])
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setConfig(history[historyIndex + 1])
    }
  }

  const applyTemplate = (templateId: string) => {
    const template = TEMPLATES[templateId as keyof typeof TEMPLATES]
    if (template) {
      updateConfig(template as Partial<AppState>)
    }
  }

  const surpriseMe = () => {
    const templateIds = Object.keys(TEMPLATES)
    const randomId = templateIds[Math.floor(Math.random() * templateIds.length)]
    applyTemplate(randomId)
  }

  const randomizeColors = () => {
    const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
    updateConfig({
      backgroundColor: randomColor(),
      backgroundColor2: randomColor(),
      accentColor: randomColor(),
      borderColor: randomColor(),
      gradientColor2: randomColor(),
      particleColor: randomColor(),
    } as Partial<AppState>)
  }

  const randomizeAnimations = () => {
    const animIds = Object.keys(ANIMATIONS)
    const randomId = animIds[Math.floor(Math.random() * animIds.length)]
    const randomDuration = Math.random() * 2 + 0.5
    updateConfig({ animationId: randomId, animationDuration: randomDuration } as Partial<AppState>)
  }

  const randomizeFont = () => {
    const randomFont = FONTS[Math.floor(Math.random() * FONTS.length)]
    updateLayer(selectedLayer, { fontId: randomFont.id })
  }

  const saveDesign = () => {
    const newSaved = [...savedDesigns, JSON.stringify(config)]
    setSavedDesigns(newSaved)
    localStorage.setItem('profilecraftDesigns', JSON.stringify(newSaved))
    alert('✅ Design saved!')
  }

  const loadDesign = (idx: number) => {
    const design = JSON.parse(savedDesigns[idx]) as AppState
    updateConfig(design)
  }

  const deleteDesign = (idx: number) => {
    const newSaved = savedDesigns.filter((_, i) => i !== idx)
    setSavedDesigns(newSaved)
    localStorage.setItem('profilecraftDesigns', JSON.stringify(newSaved))
  }

  const exportAsImage = async () => {
    if (!canvasRef.current) return
    const html2canvas = (await import('html2canvas')).default
    const canvas = await html2canvas(canvasRef.current, { scale: 2 })
    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = `github-header-${Date.now()}.png`
    link.click()
  }

  const getFontFamily = (fontId: string) => {
    const font = FONTS.find(f => f.id === fontId)
    return font?.family || 'system-ui'
  }

  // Inject animations whenever config changes
  useEffect(() => {
    const styleId = 'animation-keyframes-style'
    let styleEl = document.getElementById(styleId) as HTMLStyleElement | null
    if (!styleEl) {
      styleEl = document.createElement('style')
      styleEl.id = styleId
      document.head.appendChild(styleEl)
    }

    // Collect all unique animations used in layers
    const animationIds = new Set<string>()
    config.layers.forEach(layer => {
      if (layer.animationId) animationIds.add(layer.animationId)
    })

    // Build CSS for all animations
    let css = ''
    animationIds.forEach(animId => {
      const anim = ANIMATIONS[animId]
      if (anim) {
        css += anim.keyframes + '\n'
      }
    })

    styleEl.textContent = css
  }, [config])

  const styles = {
    container: {
      display: 'flex' as const,
      height: '100vh',
      background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #000 100%)',
      color: '#fff',
      fontFamily: 'system-ui',
    },
    header: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      height: '60px',
      background: '#111827',
      borderBottom: '1px solid #374151',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 1.5rem',
      zIndex: 1000,
    },
    headerTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      background: 'linear-gradient(90deg, #3B82F6, #A855F7)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    mainContent: {
      display: 'flex',
      flex: 1,
      marginTop: '60px',
      overflow: 'hidden',
    },
    panel: {
      background: '#111827',
      borderRight: '1px solid #374151',
      overflowY: 'auto' as const,
      padding: '1.5rem',
    },
    centerPanel: {
      flex: 1,
      background: '#1F2937',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflowY: 'auto' as const,
    },
    canvas: {
      width: '1280px',
      maxWidth: '90vw',
      height: '400px',
      borderRadius: `${config.canvasBorderRadius}px`,
      border: `${config.canvasBorderWidth}px solid ${config.canvasBorderColor}`,
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative' as const,
      overflow: 'hidden' as const,
      background: config.gradient
        ? `linear-gradient(${config.gradientAngle}deg, ${config.backgroundColor}, ${config.gradientColor2})`
        : config.backgroundColor,
      opacity: config.globalOpacity,
    },
    textLayer: {
      position: 'absolute' as const,
      whiteSpace: 'nowrap' as const,
    },
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerTitle}>🎨 ProfileCraft Pro</div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={undo} disabled={historyIndex === 0} style={{ padding: '0.5rem 1rem', cursor: historyIndex === 0 ? 'not-allowed' : 'pointer', opacity: historyIndex === 0 ? 0.5 : 1 }}>
            ↩️
          </button>
          <button onClick={redo} disabled={historyIndex === history.length - 1} style={{ padding: '0.5rem 1rem', cursor: historyIndex === history.length - 1 ? 'not-allowed' : 'pointer', opacity: historyIndex === history.length - 1 ? 0.5 : 1 }}>
            ↪️
          </button>
          <button onClick={saveDesign} style={{ padding: '0.5rem 1rem', background: '#8B5CF6', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', color: '#fff' }}>
            💾
          </button>
          <button onClick={() => setIsPlaying(!isPlaying)} style={{ padding: '0.5rem 1rem', background: isPlaying ? '#EF4444' : '#10B981', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', color: '#fff' }}>
            {isPlaying ? '⏸' : '▶'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Left Panel */}
        <div style={{ ...styles.panel, width: '280px' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>📚 Templates</h3>
          {Object.entries(TEMPLATE_CATEGORIES).map(([category, templates]) => (
            <div key={category} style={{ marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#A0AEC0', marginBottom: '0.25rem' }}>
                {category.toUpperCase()}
              </div>
              {templates.slice(0, 3).map((template: TemplateConfig) => (
                <button
                  key={template.id}
                  onClick={() => applyTemplate(template.id)}
                  style={{
                    width: '100%',
                    padding: '0.35rem 0.5rem',
                    marginBottom: '0.15rem',
                    background: config.id === template.id ? '#3B82F6' : '#1F2937',
                    color: '#fff',
                    border: '1px solid #374151',
                    borderRadius: '0.2rem',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    textAlign: 'left',
                  }}
                >
                  {template.name}
                </button>
              ))}
            </div>
          ))}

          <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #374151' }}>
            <button onClick={surpriseMe} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.25rem', background: '#A855F7', color: '#fff', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', fontSize: '0.8rem' }}>
              🎲 Surprise
            </button>
            <button onClick={randomizeColors} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.25rem', background: '#EC4899', color: '#fff', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', fontSize: '0.8rem' }}>
              🎨 Colors
            </button>
            <button onClick={randomizeAnimations} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.25rem', background: '#F59E0B', color: '#fff', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', fontSize: '0.8rem' }}>
              ✨ Animation
            </button>
            <button onClick={randomizeFont} style={{ width: '100%', padding: '0.5rem', background: '#06B6D4', color: '#fff', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', fontSize: '0.8rem' }}>
              📝 Font
            </button>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.75rem', overflowX: 'auto', borderBottom: '1px solid #374151', paddingBottom: '0.5rem' }}>
            {(['templates', 'text', 'colors', 'animation', 'export'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '0.5rem 0.75rem',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab ? '2px solid #3B82F6' : 'transparent',
                  color: activeTab === tab ? '#3B82F6' : '#9CA3AF',
                  cursor: 'pointer',
                  fontSize: '0.7rem',
                  fontWeight: activeTab === tab ? '600' : '400',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Text Tab */}
          {activeTab === 'text' && (
            <div style={{ marginTop: '0.75rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem' }}>Text Layers ({config.layers.length})</h4>
              {config.layers.map((layer, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedLayer(idx)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    marginBottom: '0.25rem',
                    background: selectedLayer === idx ? '#3B82F6' : '#1F2937',
                    color: '#fff',
                    border: '1px solid #374151',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    textAlign: 'left',
                  }}
                >
                  L{idx + 1}: {layer.text.slice(0, 15)}...
                </button>
              ))}

              {config.layers[selectedLayer] && (
                <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #374151' }}>
                  <label style={{ fontSize: '0.75rem', color: '#A0AEC0', display: 'block', marginBottom: '0.25rem' }}>Text</label>
                  <input
                    type="text"
                    value={config.layers[selectedLayer].text}
                    onChange={(e) => updateLayer(selectedLayer, { text: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      background: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '0.25rem',
                      color: '#fff',
                      fontSize: '0.75rem',
                      marginBottom: '0.5rem',
                    }}
                  />
                  <label style={{ fontSize: '0.75rem', color: '#A0AEC0', display: 'block', marginBottom: '0.25rem' }}>Font Size: {config.layers[selectedLayer].fontSize}px</label>
                  <input
                    type="range"
                    min="12"
                    max="72"
                    value={config.layers[selectedLayer].fontSize}
                    onChange={(e) => updateLayer(selectedLayer, { fontSize: parseInt(e.target.value) })}
                    style={{ width: '100%' }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Colors Tab */}
          {activeTab === 'colors' && (
            <div style={{ marginTop: '0.75rem' }}>
              <label style={{ fontSize: '0.75rem', color: '#A0AEC0', display: 'block', marginBottom: '0.25rem' }}>Background</label>
              <input
                type="color"
                value={config.backgroundColor}
                onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                style={{ width: '100%', height: '2rem', marginBottom: '0.5rem', cursor: 'pointer', border: 'none', borderRadius: '0.25rem' }}
              />
              <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem', cursor: 'pointer', fontSize: '0.75rem' }}>
                <input type="checkbox" checked={config.gradient} onChange={(e) => updateConfig({ gradient: e.target.checked })} />
                Use Gradient
              </label>
              {config.gradient && (
                <>
                  <label style={{ fontSize: '0.75rem', color: '#A0AEC0', display: 'block', marginBottom: '0.25rem' }}>Second Color</label>
                  <input
                    type="color"
                    value={config.gradientColor2}
                    onChange={(e) => updateConfig({ gradientColor2: e.target.value })}
                    style={{ width: '100%', height: '2rem', marginBottom: '0.5rem', cursor: 'pointer', border: 'none', borderRadius: '0.25rem' }}
                  />
                </>
              )}
              <label style={{ fontSize: '0.75rem', color: '#A0AEC0', display: 'block', marginBottom: '0.25rem' }}>Text Color</label>
              <input
                type="color"
                value={config.textColor}
                onChange={(e) => updateConfig({ textColor: e.target.value })}
                style={{ width: '100%', height: '2rem', cursor: 'pointer', border: 'none', borderRadius: '0.25rem' }}
              />
            </div>
          )}

          {/* Animation Tab */}
          {activeTab === 'animation' && (
            <div style={{ marginTop: '0.75rem' }}>
              <label style={{ fontSize: '0.75rem', color: '#A0AEC0', display: 'block', marginBottom: '0.25rem' }}>Animation</label>
              <select
                value={config.animationId}
                onChange={(e) => updateConfig({ animationId: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  background: '#1F2937',
                  color: '#fff',
                  border: '1px solid #374151',
                  borderRadius: '0.25rem',
                  marginBottom: '0.5rem',
                  fontSize: '0.75rem',
                }}
              >
                {Object.entries(ANIMATIONS).map(([id, anim]) => (
                  <option key={id} value={id}>
                    {anim.name}
                  </option>
                ))}
              </select>
              <label style={{ fontSize: '0.75rem', color: '#A0AEC0', display: 'block', marginBottom: '0.25rem' }}>Duration: {config.animationDuration.toFixed(1)}s</label>
              <input type="range" min="0.3" max="8" step="0.1" value={config.animationDuration} onChange={(e) => updateConfig({ animationDuration: parseFloat(e.target.value) })} style={{ width: '100%', marginBottom: '0.5rem' }} />
              <label style={{ fontSize: '0.75rem', color: '#A0AEC0', display: 'block', marginBottom: '0.25rem' }}>Delay: {config.animationDelay.toFixed(1)}s</label>
              <input type="range" min="0" max="5" step="0.1" value={config.animationDelay} onChange={(e) => updateConfig({ animationDelay: parseFloat(e.target.value) })} style={{ width: '100%' }} />
            </div>
          )}

          {/* Export Tab */}
          {activeTab === 'export' && (
            <div style={{ marginTop: '0.75rem' }}>
              <button
                onClick={exportAsImage}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: '#2563EB',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: '500',
                  marginBottom: '0.5rem',
                }}
              >
                📥 Export as PNG
              </button>
              {savedDesigns.length > 0 && (
                <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #374151' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem' }}>Saved Designs ({savedDesigns.length})</h4>
                  <div style={{ display: 'grid', gap: '0.25rem', maxHeight: '150px', overflowY: 'auto' }}>
                    {savedDesigns.map((_, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '0.25rem' }}>
                        <button
                          onClick={() => loadDesign(idx)}
                          style={{
                            flex: 1,
                            padding: '0.35rem',
                            background: '#1F2937',
                            color: '#fff',
                            border: '1px solid #374151',
                            borderRadius: '0.2rem',
                            cursor: 'pointer',
                            fontSize: '0.7rem',
                          }}
                        >
                          Load {idx + 1}
                        </button>
                        <button
                          onClick={() => deleteDesign(idx)}
                          style={{
                            padding: '0.35rem 0.5rem',
                            background: '#EF4444',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '0.2rem',
                            cursor: 'pointer',
                            fontSize: '0.7rem',
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Center Panel */}
        <div style={styles.centerPanel}>
          <div ref={canvasRef} style={styles.canvas}>
            {config.layers.map((layer, idx) => {
              const anim = ANIMATIONS[layer.animationId]
              const isContinuous = anim?.category === 'continuous'
              return (
                <div
                  key={idx}
                  style={{
                    ...styles.textLayer,
                    fontSize: `${layer.fontSize}px`,
                    color: layer.color,
                    fontFamily: getFontFamily(layer.fontId),
                    fontWeight: layer.fontId.includes('bold') ? 700 : 500,
                    opacity: layer.opacity,
                    transform: `rotate(${layer.rotation}deg)`,
                    top: `${layer.positionY}px`,
                    zIndex: idx + 10,
                    textShadow: layer.shadowEnabled
                      ? `${layer.shadowX}px ${layer.shadowY}px ${layer.shadowBlur}px ${layer.shadowColor}`
                      : layer.glowEnabled
                      ? `0 0 ${layer.glowSize}px ${layer.glowColor}`
                      : 'none',
                    animation: isPlaying && layer.animationId
                      ? `${layer.animationId} ${layer.animationDuration}s ${layer.animationEasing} ${layer.animationDelay}s ${isContinuous ? 'infinite' : 'forwards'}`
                      : 'none',
                  }}
                >
                  {layer.text}
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ ...styles.panel, width: '250px' }}>
          <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem' }}>ℹ️ Info</h3>
          <div style={{ fontSize: '0.75rem', color: '#A0AEC0', lineHeight: '1.6' }}>
            <p><strong>Template:</strong> {config.name}</p>
            <p><strong>Layers:</strong> {config.layers.length}</p>
            <p><strong>Animations:</strong> {Object.keys(ANIMATIONS).length}</p>
            <p><strong>Fonts:</strong> {FONTS.length}</p>
            <p><strong>Particles:</strong> {PARTICLE_EFFECTS.length}</p>
            <p><strong>Backgrounds:</strong> {BACKGROUND_EFFECTS.length}</p>
            <p style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #374151' }}>
              <strong>⌨️ Shortcuts:</strong><br />
              Ctrl+S - Export<br />
              Ctrl+R - Random<br />
              Space - Play<br />
              Ctrl+Z - Undo
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

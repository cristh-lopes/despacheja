import { useEffect, useState } from 'react'
import TransferForm from './components/TransferForm'

// ===================================
type Process = 'NONE' | 'TRANSFER'
// ===================================

export default function App() {
  const [process, setProcess] = useState<Process>('NONE')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    window.api.onNewTransfer(() => {
      setProcess('TRANSFER')
      setMenuOpen(false)
    })
  }, [])

  return (
    <div style={layout.container}>

      <header style={layout.header}>
        <div style={layout.logo}>DespacheJá</div>

        <div style={{ position: 'relative' }}>
          <button onClick={() => setMenuOpen(!menuOpen)}>Novo ▾</button>

          {menuOpen && (
            <div style={layout.dropdown}>
              <button onClick={() => setProcess('TRANSFER')}>
                Transferência de Veículo
              </button>
            </div>
          )}
        </div>
      </header>

      <main style={layout.main}>
        {process === 'NONE' && <Welcome />}
        {process === 'TRANSFER' && <TransferForm />}
      </main>

      <footer style={layout.footer}>
        Pronto
      </footer>

    </div>
  )
}

// ===================================

function Welcome() {
  return (
    <div style={layout.welcome}>
      <h2>Bem-vindo ao DespacheJá</h2>
      <p>Selecione um processo no menu acima.</p>
    </div>
  )
}

// ===================================

const layout: Record<string, React.CSSProperties> = {

  container: {
    display: 'grid',
    gridTemplateRows: '50px 1fr 32px',
    height: '100vh'
  },

  header: {
    background: '#111423',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    borderBottom: '1px solid #252a41'
  },

  logo: {
    fontWeight: 600,
    letterSpacing: '.5px'
  },

  dropdown: {
    position: 'absolute',
    right: 0,
    top: '36px',
    background: '#161925',
    border: '1px solid #252a41',
    borderRadius: 6,
    overflow: "hidden"
  },

  main: {
    overflow: 'auto',
    padding: 20
  },

  footer: {
    background: '#111423',
    borderTop: '1px solid #252a41',
    padding: '5px 12px',
    fontSize: 12,
    color: '#9aa1b4'
  },

  welcome: {
    textAlign: 'center',
    marginTop: 80,
    color: '#9aa1b4'
  }
}

import Dashboard from './pages/Dashboard'
import { ThemeProvider } from '@/components/theme-provider'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="recipe-app-theme">
      <Dashboard />
    </ThemeProvider>
  )
}

export default App

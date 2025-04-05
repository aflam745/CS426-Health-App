import './App.css'
import { AppSidebar } from './components/sidebarComponents/app-sidebar'
import { SiteHeader } from './components/sidebarComponents/site-header'
import { SidebarInset, SidebarProvider } from './components/ui/sidebar'
import AppRoutes from './routes'
import { useLocation } from "react-router-dom"

function App() {
  const location = useLocation()
  const isLoginPage = location.pathname === "/login"
  return (
    <div className='App'>
      {isLoginPage ? (
        <AppRoutes />
      ) : (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SiteHeader />
          <div className="content-wrapper">
              <AppRoutes />
          </div>
        </SidebarInset>
      </SidebarProvider>
      )}
    </div>
  )
}

export default App

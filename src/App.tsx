import './App.css'
import { AppSidebar } from './components/sidebarComponents/app-sidebar'
import { SiteHeader } from './components/sidebarComponents/site-header'
import { SidebarInset, SidebarProvider } from './components/ui/sidebar'
import AppRoutes from './routes'
import { useLocation } from "react-router-dom"
import { AuthProvider } from './context/authContext'

function App() {
  const location = useLocation()
  const isAuthPage = ["/login", "/signup", "/"].includes(location.pathname)
  
  return (
    <AuthProvider>
      <div className='App'>
        {isAuthPage ? (
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
    </AuthProvider>
  )
}

export default App

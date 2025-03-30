import './App.css'
import { AppSidebar } from './components/sidebarComponents/app-sidebar'
import { SiteHeader } from './components/sidebarComponents/site-header'
import { SidebarInset, SidebarProvider } from './components/ui/sidebar'
import AppRoutes from './routes'

function App() {
  return (
    <div className='App'>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SiteHeader />
          <div className="content-wrapper">
              <AppRoutes />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export default App

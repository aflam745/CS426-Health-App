import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 cursor-pointer transition-transform duration-200 hover:scale-120" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="font-medium">Health 2.0</h1>
        <Button type="submit" className=" ml-auto cursor-pointer hover:scale-95">
          Logout
        </Button>
      </div>
    </header>
  )
}

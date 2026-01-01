'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher'
import {
    LayoutDashboard,
    Ticket,
    Users,
    Building2,
    BookOpen,
    BarChart3,
    Settings,
    Shield,
    Bell,
    Search,
    Menu,
    X,
    ChevronDown,
    LogOut,
    User,
    HelpCircle,
    Folder,
    ClipboardList,
    Zap,
} from 'lucide-react'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Tickets', href: '/dashboard/tickets', icon: Ticket, badge: 12 },
    { name: 'Tareas', href: '/dashboard/tasks', icon: ClipboardList },
    { name: 'Socios', href: '/dashboard/socios', icon: Users },
    { name: 'Knowledge Base', href: '/dashboard/knowledge', icon: BookOpen },
    { name: 'Reportes', href: '/dashboard/reports', icon: BarChart3 },
    { name: 'Mi Perfil', href: '/dashboard/profile', icon: User },
]

const adminNavigation = [
    { name: 'Usuarios', href: '/dashboard/admin/users', icon: Users },
    { name: 'Departamentos', href: '/dashboard/admin/departments', icon: Building2 },
    { name: 'Categorías', href: '/dashboard/admin/categories', icon: Folder },
    { name: 'Workflows', href: '/dashboard/admin/workflows', icon: Zap },
    { name: 'Configuración', href: '/dashboard/admin/settings', icon: Settings },
    { name: 'Auditoría', href: '/dashboard/admin/audit', icon: Shield },
]

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [adminOpen, setAdminOpen] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)

    return (
        <div className="min-h-screen bg-background">
            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/60 lg:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 z-50 h-full bg-background-secondary border-r border-border
          transition-all duration-300 ease-in-out
          lg:translate-x-0
          ${sidebarOpen ? 'w-64' : 'w-20'}
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-border">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center shadow-lg shadow-primary/20">
                            <Ticket className="w-5 h-5 text-white" />
                        </div>
                        {sidebarOpen && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="font-bold text-lg text-gradient"
                            >
                                SGTI
                            </motion.span>
                        )}
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="hidden lg:flex p-2 rounded-lg hover:bg-background-tertiary transition-colors"
                    >
                        <Menu className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="lg:hidden p-2 rounded-lg hover:bg-background-tertiary transition-colors"
                    >
                        <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100%-4rem)]">
                    {/* Main Nav */}
                    <div className="space-y-1">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150
                    ${isActive
                                            ? 'bg-primary/10 text-primary border-l-2 border-primary'
                                            : 'text-muted-foreground hover:bg-background-tertiary hover:text-foreground'
                                        }
                  `}
                                >
                                    <item.icon className="w-5 h-5 flex-shrink-0" />
                                    {sidebarOpen && (
                                        <span className="flex-1 font-medium">{item.name}</span>
                                    )}
                                    {sidebarOpen && item.badge && (
                                        <span className="px-2 py-0.5 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            )
                        })}
                    </div>

                    {/* Admin Section */}
                    {sidebarOpen && (
                        <div className="pt-4">
                            <button
                                onClick={() => setAdminOpen(!adminOpen)}
                                className="flex items-center gap-3 px-3 py-2 w-full text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Settings className="w-5 h-5" />
                                <span className="flex-1 text-left font-medium text-sm uppercase tracking-wider">
                                    Administración
                                </span>
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform ${adminOpen ? 'rotate-180' : ''}`}
                                />
                            </button>
                            <AnimatePresence>
                                {adminOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="space-y-1 pl-2 pt-1">
                                            {adminNavigation.map((item) => {
                                                const isActive = pathname === item.href
                                                return (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className={`
                              flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 text-sm
                              ${isActive
                                                                ? 'bg-primary/10 text-primary'
                                                                : 'text-muted-foreground hover:bg-background-tertiary hover:text-foreground'
                                                            }
                            `}
                                                    >
                                                        <item.icon className="w-4 h-4" />
                                                        <span>{item.name}</span>
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </nav>
            </aside>

            {/* Main Content */}
            <div
                className={`
          transition-all duration-300
          ${sidebarOpen ? 'lg:pl-64' : 'lg:pl-20'}
        `}
            >
                {/* Top Header */}
                <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-xl border-b border-border">
                    <div className="flex items-center justify-between h-full px-4 lg:px-6">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="lg:hidden p-2 rounded-lg hover:bg-background-tertiary transition-colors"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        {/* Search */}
                        <div className="hidden md:flex flex-1 max-w-md">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                                <input
                                    type="text"
                                    placeholder="Buscar tickets, socios, artículos..."
                                    className="input-premium pl-10 py-2 text-sm"
                                />
                            </div>
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-2">
                            {/* Theme Switcher */}
                            <ThemeSwitcher />

                            {/* Help */}
                            <button className="p-2.5 rounded-lg hover:bg-background-tertiary transition-colors">
                                <HelpCircle className="w-5 h-5 text-muted-foreground" />
                            </button>

                            {/* Notifications */}
                            <button className="relative p-2.5 rounded-lg hover:bg-background-tertiary transition-colors">
                                <Bell className="w-5 h-5 text-muted-foreground" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full" />
                            </button>

                            {/* User Menu */}
                            <div className="relative">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center gap-3 p-1.5 pr-3 rounded-lg hover:bg-background-tertiary transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="hidden md:block text-left">
                                        <p className="text-sm font-medium">Admin User</p>
                                        <p className="text-xs text-muted-foreground">Super Admin</p>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-muted-foreground hidden md:block" />
                                </button>

                                <AnimatePresence>
                                    {userMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute right-0 mt-2 w-56 glass-card p-2"
                                        >
                                            <Link
                                                href="/dashboard/profile"
                                                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-background-tertiary transition-colors"
                                            >
                                                <User className="w-4 h-4" />
                                                <span className="text-sm">Mi Perfil</span>
                                            </Link>
                                            <Link
                                                href="/dashboard/settings"
                                                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-background-tertiary transition-colors"
                                            >
                                                <Settings className="w-4 h-4" />
                                                <span className="text-sm">Configuración</span>
                                            </Link>
                                            <hr className="my-2 border-border" />
                                            <button
                                                onClick={() => {
                                                    localStorage.removeItem('token');
                                                    localStorage.removeItem('user');
                                                    window.location.href = '/login';
                                                }}
                                                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-danger/10 text-danger transition-colors w-full"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                <span className="text-sm">Cerrar Sesión</span>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}

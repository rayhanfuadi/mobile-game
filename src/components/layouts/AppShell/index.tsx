
type AppShellProps = {
    children: React.ReactNode
}

const AppShell = (props: AppShellProps) => {
    const { children } = props
    return (
        <main className="bg-radial-primary text-white">
            {children}
        </main>
    )
}

export default AppShell
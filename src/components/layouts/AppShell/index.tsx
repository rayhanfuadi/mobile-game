
type AppShellProps = {
    children: React.ReactNode
}

const AppShell = (props: AppShellProps) => {
    const { children } = props
    return (
        <main>
            {children}
        </main>
    )
}

export default AppShell
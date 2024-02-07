export const UnauthedLayout: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return <main className="grid place-items-center h-screen">{children}</main>
}

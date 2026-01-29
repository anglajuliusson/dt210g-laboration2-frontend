// Inline-styling för header (komponentspecifik CSS)
const headerStyle = {
    backgroundColor: "lightblue",
    color: "white",
    padding: "3rem",
}

function Header() {
    return (
        <header style={headerStyle}>
            <h1 style={{ textAlign: "center" }}>Min att göra lista</h1>
        </header>
    )
}

export default Header;
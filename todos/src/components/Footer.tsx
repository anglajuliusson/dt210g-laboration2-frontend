// Inline-styling för header (komponentspecifik CSS)
const footerStyle = {
    backgroundColor: "rgb(142, 182, 195)",
    color: "white",
    padding: "3rem",
}

function Footer() {
    return (
        <footer style={footerStyle}>
            <p style={{ textAlign: "center" }}>DT210G - Laboration 2 | anju2402, Ängla Juliusson | VT26</p>
        </footer>
    )
}

export default Footer;
import type { TodoInterface } from "../interfaces/TodoInterface"; // Importera TodoInterface

// Inline styling för listan
const listStyle = {
    maxWidth: "500px",
    width: "90%",
    margin: "auto",
    marginBottom: "1.5em"
}

// Todo-komponenten ansvarar för att visa information om en enskild todo
// Komponenten tar emot ett todo-objekt via props
function Todo({todoProp} : {todoProp: TodoInterface}) {
    return (
        // Varje todo renderas som ett list-element
        <li style={listStyle}>
            <h3>{todoProp.title}</h3> {/* Visar titel för todo */}
            <p>{todoProp.description}</p> {/* Visar beskrivning för todo */}
            <p>Status: {todoProp.status}</p> {/* Visar aktuell status för todo */}
        </li>
    )
}

export default Todo;
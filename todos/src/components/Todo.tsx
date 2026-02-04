import type { TodoInterface } from "../interfaces/TodoInterface"; // Importera TodoInterface

// Inline styling för listan
const listStyle = {
    maxWidth: "500px",
    width: "90%",
    margin: "auto",
    marginBottom: "1.5em"
};

// Styling för ta bort-knapp
const buttonStyle = {
    marginTop: "0.8em",
    padding: "0.5em 0.8em",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "crimson",
    color: "white",
    cursor: "pointer",
};

// Styling för uppdatera status
const selectStyle = {
    marginTop: "0.6em",
    padding: "0.5em",
    borderRadius: "6px",
    border: "1px solid #ccc",
    margin: "1em"
};

// Todo-komponenten ansvarar för att visa information om en enskild todo
// Komponenten tar emot ett todo-objekt via props
function Todo({todoProp} : {todoProp: TodoInterface}) {
    
    // Tar bort en todo via backend och uppdaterar listan genom refresh-event
    const deleteTodo = async (id: number) => {
        const resp = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
        });

        if (!resp.ok) {
            const msg = await resp.text();
            console.log("Fel vid delete:", msg);
            throw new Error(msg);
        }

        // Säg till TodoList att hämta om direkt
        window.dispatchEvent(new Event("todos:refresh"));
    };

    const statusArr = ["Ej påbörjad", "Pågående", "Avklarad"];

    // Uppdaterar status på en todo
    const updateStatus = async (id: number, status: string) => {
      const resp = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: todoProp.title,
            description: todoProp.description ?? "",
            status,
          }),
      });
  
      if (!resp.ok) {
        const msg = await resp.text();
        console.log("Fel vid status-uppdatering:", msg);
        throw new Error(msg);
      }
  
      // Uppdatera listan direkt
      window.dispatchEvent(new Event("todos:refresh"));
    };

    return (
        // Varje todo renderas som ett list-element
        <li style={listStyle}>
            <h3>{todoProp.title}</h3> {/* Visar titel för todo */}
            <p>{todoProp.description}</p> {/* Visar beskrivning för todo */}
            <p>Status: {todoProp.status}</p> {/* Visar aktuell status för todo */}
            <label>
                Uppdatera status:
                <select
                style={selectStyle}
                value={todoProp.status}
                onChange={(e) => updateStatus(todoProp.id, e.target.value)}
                >
                {statusArr.map((s) => (
                    <option key={s} value={s}>
                    {s}
                    </option>
                ))}
                </select>
            </label>
            <button
                style={buttonStyle}
                onClick={() => {
                if (confirm("Vill du ta bort denna todo?")) {
                    deleteTodo(todoProp.id);
                }
                }}
            >
                Ta bort
            </button>
        </li>
    )
}

export default Todo;
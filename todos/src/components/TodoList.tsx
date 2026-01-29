import { useState, useEffect } from "react";
import Todo from "./Todo"; // Importera Todo-komponenten
import type { TodoInterface } from "../interfaces/TodoInterface"; // Imporetera TodoInterface

// Inline-styling för todolist (komponentspecifik CSS)
const todoListStyle = {
    backgroundColor: "rgb(198, 228, 237)",
    color: "rgb(84, 84, 84)",
    padding: "3rem",
}

// Inline styling för listan
const listStyle = {
    backgroundColor: "rgb(237, 251, 255)",
    borderRadius: "10px",
    padding: "2em",
}

function TodoList() {

    // State för todos
    const [todos, setTodos] = useState<[TodoInterface] | []>([]);

    // UseEffekt för att hämta in todos
    useEffect(() => {
        getAllTodos()
    }, []);

    // Asynkron funktion som hämtar alla todos från backend-API:t
    const getAllTodos = async () => {
        try {
            // Skickar GET-request till backend
            const resp = await fetch("http://localhost:3000/todos");

            // Kontrollerar att svaret är OK
            if (resp.ok) {

                // Konverterar svaret från JSON till JavaScript-objekt
                const data = await resp.json();

                // Uppdaterar state med hämtade todos
                setTodos(data);

            } else {
                throw Error;
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div style={todoListStyle}>
            <div style={listStyle}>
                <h2 style={{ textAlign: "center", marginBottom: "1em" }}>Att göra:</h2>
                {/* Lista som innehåller alla todos */}
                <ul>
                    {/* Loopa igenom todos-arrayen och renderar en Todo-komponent per objekt */}
                    {
                        todos.map((todo) => (
                            <Todo todoProp={todo} key={todo.id}/>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default TodoList;
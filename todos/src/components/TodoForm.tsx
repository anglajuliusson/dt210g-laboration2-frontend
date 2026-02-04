import { useState } from "react";
import type { FormDataInterface } from "../interfaces/FormDataInterface"; // Importera FormDataInterface
import type { ErrorsDataInterface} from "../interfaces/ErrorsDataInterface"; // Importera ErrorsDataInterface
import * as Yup from "yup"; // Importera Yup för tillgång till alla funktioner

// Inline-styling för todoform (komponentspecifik CSS)
const todoFormStyle = {
    backgroundColor: "rgb(198, 228, 237)",
    color: "rgb(84, 84, 84)",
    padding: "1rem 3rem 3rem 3rem",
};

// Inline styling för formuläret
const formStyle = {
    backgroundColor: "rgb(237, 251, 255)",
    borderRadius: "10px",
    padding: "2em",
};

// Styling för endast form
const submitFormStyle = {
    maxWidth: "500px",
    width: "90%",
    margin: "auto",
}

// Styling för varje formulärfält (label + input)
const fieldStyle = {
    display: "flex",
    flexDirection: "column" as const,
    marginBottom: "1.2em",
};

// Styling för input och select
const inputStyle = {
    padding: "0.6em",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
};

// Styling för felmeddelanden
const errorStyle = {
    color: "crimson",
    fontSize: "0.85rem",
    marginTop: "0.3em",
};

// Styling för submit-knappen
const buttonStyle = {
    marginTop: "1em",
    padding: "0.7em",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "rgb(84, 84, 84)",
    color: "white",
    fontSize: "1rem",
    cursor: "pointer",
};
const buttonWrapperStyle = {
    display: "flex",
    justifyContent: "flex-end",
};

// TodoForm-komponenten ansvarar för att hantera formulär för att skapa en ny todo
const TodoForm = () =>  {

    // States för formulär
    // State som lagrar användarens input i formuläret
    const [formData, setFormData] = useState<FormDataInterface>({title: "", description: "", status: "Ej påbörjad"});

    // State för att spara ny todo till databasen
    const [addTodo, setAddTodo] = useState(false);

    // Array med möjliga statusalternativ för todos
    const statusArr = ["Ej påbörjad", "Pågående", "Avklarad"];

    // Validerings schema
    const validationSchema = Yup.object({
        title: Yup.string().required("Fyll i titel").min(3, "Titel måste vara minst 3 tecken"), // Titeln måste fyllas i och vara minst 3 tecken
        description: Yup.string().optional().max(200, "Beskrivningen får max vara 200 tecken"), // Beskrivning är valfri men får max vara 200 tecken
        status: Yup.string().required("Välj en status från listan") // Felmeddelande för status men kommer förmodligen aldrig synas
    });

    // States för felmeddelanden
    const [errors, setErrors] = useState<ErrorsDataInterface>({});

    // Funktion som körs när formuläret skickas
    const submitForm = async (event: any) => {
        event.preventDefault(); // Förhindrar att sidan laddas om

        try {
            // Validerar formulärdata med Yup-schema.
            // abortEarly: false gör att vi får ALLA fel samtidigt (inte bara första felet)
            await validationSchema.validate(formData, {abortEarly: false});

            // Om valideringen lyckas: rensa tidigare felmeddelanden
            setErrors({});

            setAddTodo(true);
            await createTodo(formData);

            // Efter lyckad POST skickas ett custom event som används för att tala om för TodoList att den ska hämta om todos utan sidomladdning
            window.dispatchEvent(new Event("todos:refresh"));

            setFormData({ title: "", description: "", status: "Ej påbörjad" });

        } catch (errors) {

            // Skapar ett objekt som samlar fel per fält
            // Används sedan för att visa felmeddelanden i formuläret
            const validationErrors: ErrorsDataInterface = {};

            // Säkerställer att felet faktiskt är ett Yup ValidationError
            if(errors instanceof Yup.ValidationError) {

                // errors.inner innehåller alla valideringsfel (ett per fält)
                // Loopar igenom och mappar varje fel till rätt property i validationErrors
                errors.inner.forEach(error => {

                    // error.path innehåller namnet på fältet som valideringen gäller
                    // Typ-castar till nycklarna i ErrorsDataInterface för TypeScript-säkerhet
                    const prop = error.path as keyof ErrorsDataInterface;

                    // Sätter felmeddelandet på motsvarande fält
                    validationErrors[prop] = error.message;
                })

                // Uppdaterar state så att felmeddelanden visas
                setErrors(validationErrors);
            }
        } finally {
            setAddTodo(false);
        }

        /*
        // Validerar formulärdata och returnerar eventuella fel
        const validateForm = ((data: FormDataInterface) => {
            const validationErrors: ErrorsDataInterface = {};

            if(!data.title) {
                validationErrors.title = "Fyll i titel";
            }
            if(!data.description) {
                validationErrors.description = "Fyll i beskrivning";
            }

            return validationErrors;
        });
        */
        
        /*
        // Kör validering på aktuell formulärdata
        const validationErrors = validateForm(formData)

        // Om det finns valideringsfel – visa dem
        if(Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);

        } else {
            // Nollställ felmeddelanden
            setErrors({});

            // Skicka data
        }*/
    };

    // Skickar POST-request till backend för att skapa en ny todo
    // Vid lyckat svar nollställs formuläret
    const createTodo = async (data: FormDataInterface) => {
        const resp = await fetch("http://localhost:3000/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!resp.ok) {
            const msg = await resp.text();
            console.log("400 från backend:", msg);
            throw new Error(msg);
          }
    };

    return(
        <div style={todoFormStyle}>
            <div style={formStyle}>
                <h2 style={{ textAlign: "center", marginBottom: "1em" }}>Lägg till ny sak att göra:</h2>
                <form onSubmit={submitForm} style={submitFormStyle}>
                    <div style={fieldStyle}>
                        <label htmlFor="title">Titel: </label>
                        <input type="text" name="title" id="title" value={formData.title} style={inputStyle}
                        onChange={(event) => setFormData({...formData, title: event.target.value})}></input>

                        {errors.title && <span style={errorStyle}>{errors.title}</span>}
                    </div>
                    <div style={fieldStyle}>
                        <label htmlFor="description">Beskrivning: </label>
                        <input type="text" name="description" id="description" value={formData.description} style={inputStyle}
                        onChange={(event) => setFormData({...formData, description: event.target.value})}></input>

                        {errors.description && <span style={errorStyle}>{errors.description}</span>}
                    </div>
                    <div style={fieldStyle}>
                        <label htmlFor="status">Status: </label>
                        <select name="status" id="status" value={formData.status} style={inputStyle}
                        onChange={(event) => setFormData({...formData, status: event.target.value})}>
                            {
                                statusArr.map((status) => (
                                    <option key={status}>{status}</option>
                                ))
                            }
                        </select>

                        {errors.status && <span style={errorStyle}>{errors.status}</span>}
                    </div>
                    <div style={buttonWrapperStyle}>
                        <input type="submit" value={addTodo ? "Sparar..." :  "Lägg till"} 
                        style={buttonStyle} 
                        disabled={addTodo}/>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default TodoForm;
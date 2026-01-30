import { useState } from "react";
import type { FormDataInterface } from "../interfaces/FormDataInterface"; // Importera FormDataInterface
import type { ErrorsDataInterface} from "../interfaces/ErrorsDataInterface"; // Importera ErrorsDataInterface

// Inline-styling för todoform (komponentspecifik CSS)
const todoFormStyle = {
    backgroundColor: "rgb(198, 228, 237)",
    color: "rgb(84, 84, 84)",
    padding: "1rem 3rem 1rem 3rem",
};

// Inline styling för formuläret
const formStyle = {
    backgroundColor: "rgb(237, 251, 255)",
    borderRadius: "10px",
    padding: "2em",
};

// TodoForm-komponenten ansvarar för att hantera formulär för att skapa en ny todo
const TodoForm = () =>  {

    // States för formulär
    // State som lagrar användarens input i formuläret
    const [formData, setFormData] = useState<FormDataInterface>({title: "", description: "", status: "Ej påbörjad"});
    // Array med möjliga statusalternativ för todos
    const statusArr = ["Ej påbörjad", "Pågående", "Avklarad"];

    // States för felmeddelanden
    const [errors, serErrors] = useState<ErrorsDataInterface>({});

    // Funktion som körs när formuläret skickas
    const submitForm = ((event: any) => {
        event.preventDefault(); // Förhindrar att sidan laddas om

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

        // Kör validering på aktuell formulärdata
        const validationErrors = validateForm(formData)

        // Om det finns valideringsfel – visa dem
        if(Object.keys(validationErrors).length > 0) {
            serErrors(validationErrors);

        } else {
            // Nollställ felmeddelanden
            serErrors({});

            // Skicka data
        }
    });

    return(
        <div style={todoFormStyle}>
            <div style={formStyle}>
                <h2 style={{ textAlign: "center", marginBottom: "1em" }}>Lägg till ny sak att göra:</h2>
                <form onSubmit={submitForm}>
                    <label htmlFor="title">Titel: </label>
                    <input type="text" name="title" id="title" value={formData.title} 
                    onChange={(event) => setFormData({...formData, title: event.target.value})}></input>

                    {errors.title && <span>{errors.title}</span>}

                    <label htmlFor="description">Beskrivning: </label>
                    <input type="text" name="description" id="description" value={formData.description}
                    onChange={(event) => setFormData({...formData, description: event.target.value})}></input>

                    {errors.description && <span>{errors.description}</span>}

                    <label htmlFor="status">Status: </label>
                    <select name="status" id="status" value={formData.status}
                    onChange={(event) => setFormData({...formData, status: event.target.value})}>
                        {
                            statusArr.map((status) => (
                                <option key={status}>{status}</option>
                            ))
                        }
                    </select>
                    <input type="submit" value="Lägg till" />
                </form>
            </div>
        </div>
    )
};

export default TodoForm;
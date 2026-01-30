import { useState } from "react";
import type { FormDataInterface } from "../interfaces/FormDataInterface"; // Importera FormDataInterface
import type { ErrorsDataInterface} from "../interfaces/ErrorsDataInterface"; // Importera ErrorsDataInterface

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
                    </div>
                    <div style={buttonWrapperStyle}>
                        <input type="submit" value="Lägg till" style={buttonStyle} />
                    </div>
                </form>
            </div>
        </div>
    )
};

export default TodoForm;
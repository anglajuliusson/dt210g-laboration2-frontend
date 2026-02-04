# Todo-applikation – Frontend

Detta är frontend-delen av en Todo-applikation byggd med **React**, **TypeScript** och **Vite**.  
Applikationen kommunicerar med ett backend-API för att hantera todos och uppdaterar gränssnittet dynamiskt utan sidomladdning.

---

## Funktionalitet

Frontend-applikationen gör det möjligt att:

- Visa alla todos
- Lägga till nya todos via formulär
- Uppdatera status på en todo
- Ta bort en todo
- Visa laddnings- och felmeddelanden

Alla förändringar uppdateras direkt i gränssnittet.

---

## Tekniker

- React
- TypeScript
- Vite
- Yup (formulärvalidering)
- Fetch API

---

## Projektstruktur

```text
src/
 ├── components/
 │   ├── TodoList.tsx
 │   ├── Todo.tsx
 │   ├── TodoForm.tsx
 │   ├── Header.tsx
 │   └── Footer.tsx
 ├── interfaces/
 │   ├── TodoInterface.ts
 │   ├── FormDataInterface.ts
 │   └── ErrorsDataInterface.ts
 ├── App.tsx
 ├── main.tsx
 └── index.css
```
---

## Validering

Formuläret för att skapa todos använder Yup för validering:
- Titel är obligatorisk och måste vara minst 3 tecken
- Beskrivning är valfri men får max vara 200 tecken
- Status måste vara ett giltigt alternativ

---

## Installation och körning
npm install

npm run dev

Frontend körs som standard på: http://localhost:5173

---

## Kommunikation med backend
Frontend kommunicerar med backend via följande endpoints:
- GET /todos
- POST /todos
- PUT /todos/:id
- DELETE /todos/:id

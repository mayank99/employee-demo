# employee-demo

A basic UI for viewing and managing employee details.

### Features

- Filterable/sortable/paginated table for main employee list. Uses [MUI](https://mui.com/).
- Nested routes using [React Router](https://reactrouter.com/).
- Responsive layout and responsive theme.
- In-memory database for mock CRUD operations.

### Running the app

This project uses [Vite](https://vitejs.dev/) for development. To run it locally, run `npm install` followed by `npm run dev`. This should start the development server.

If you don't want to clone the repo, you can simply open it in Stackblitz:

[![Open in Stackblitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/mayank99/employee-demo)

#### Directory structure

- `src/App.tsx` contains the main route configuration for React Router, as well as some global styles.
- `src/routes/employees.tsx` contains the main page UI, including the employees table.
- `src/routes/employee.tsx` contains the modals for viewing/editing/adding employee details.
- `src/api.ts` contains the mock API which loads data from `mock-data.json`

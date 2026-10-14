# Employee Management App

A full-stack CRUD application for managing employee records, built with **Angular** (TypeScript) on the frontend and **Django REST Framework** on the backend.

The frontend uses **Angular Signals** for shared state, **Reactive Forms** for validated input, and **NG-ZORRO** for the UI. It talks to a REST API exposed by Django REST Framework.
****
## Features

- **Employee table:** view all employees in a full-height, flexbox-based table layout
- **Add employee:** modal form with Reactive Forms validation
- **Delete employee:** confirmation prompt before deletion
- **Auto-refresh:** the list reloads after every create or delete, so the UI always matches the database
- **Shared state:** employee data is held in an Angular Signal and consumed reactively by components

## Tech Stack

| Layer    | Technologies                                                                                               |
| -------- | ---------------------------------------------------------------------------------------------------------- |
| Frontend | Angular, TypeScript, Angular Signals, Reactive Forms, HttpClient (RxJS Observables), NG-ZORRO, SCSS, HTML5 |
| Backend  | Python, Django, Django REST Framework (`ModelViewSet`, `DefaultRouter`)                                    |

## Architecture

```text
┌────────────────────────┐   HTTP / JSON   ┌──────────────────────────┐
│ Angular frontend       │ ──────────────► │ Django REST Framework    │
│ Components + Signals   │ ◄────────────── │ ModelViewSet + Router    │
│ EmployeeService        │                 │ Serializer + Model       │
└────────────────────────┘                 └──────────────────────────┘
```

### How the data flows

1. The employee table asks `EmployeeService` to load employees.
2. The service sends a `GET` request to the Django API.
3. The response is stored in an Angular Signal.
4. Components read the Signal, so the table re-renders automatically when the list changes.
5. Adding an employee: the modal validates the form, then the service sends a `POST`.
6. Deleting an employee: after the user confirms, the service sends a `DELETE`.
7. After a successful create or delete, the service re-fetches the list and updates the Signal.

## API Reference

Base path: `/api/v1/`

| Method | Endpoint                  | Description                  |
| ------ | ------------------------- | ---------------------------- |
| GET    | `/api/v1/employees/`      | List all employees           |
| POST   | `/api/v1/employees/`      | Create an employee           |
| GET    | `/api/v1/employees/<id>/` | Retrieve an employee         |
| PUT    | `/api/v1/employees/<id>/` | Update an employee           |
| PATCH  | `/api/v1/employees/<id>/` | Partially update an employee |
| DELETE | `/api/v1/employees/<id>/` | Delete an employee           |

The backend supports full CRUD. The UI currently implements list, create, and delete (see [Roadmap](#roadmap)).

### Employee model

| Field        | Type    | Description                          |
| ------------ | ------- | ------------------------------------ |
| `id`         | Integer | Unique database-generated identifier |
| `name`       | String  | Employee name                        |
| `role`       | String  | Job title or designation             |
| `department` | String  | Department                           |
| `email`      | String  | Email address                        |

## Project Structure

```text
employee-management-angular/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # employee table, nav bar, etc.
│   │   │   ├── models/       # TypeScript interfaces
│   │   │   └── services/     # EmployeeService (HTTP + Signal state)
│   │   └── environments/     # API base URL
│   └── package.json
└── backend/
    ├── employees/
    │   ├── models.py
    │   ├── serializers.py
    │   ├── views.py
    │   └── urls.py
    └── manage.py
```

## Getting Started

### Prerequisites

- Node.js and npm
- Python 3 and pip
- Git

### 1. Clone the repository

```bash
git clone https://github.com/shawn7797/employee-management-angular.git
cd employee-management-angular
```

### 2. Run the Django backend

```bash
cd backend
python -m venv .venv

# Windows PowerShell
.\.venv\Scripts\Activate.ps1
# macOS / Linux
source .venv/bin/activate

pip install django djangorestframework django-cors-headers
python manage.py migrate
python manage.py runserver
```

The API runs at `http://127.0.0.1:8000/`.

> The Angular dev server runs on a different origin, so Django must allow it via CORS (for example, `django-cors-headers` with `http://localhost:4200` in `CORS_ALLOWED_ORIGINS`).

### 3. Run the Angular frontend

In a new terminal:

```bash
cd frontend
npm install
npx ng serve
```

Open `http://localhost:4200/`.

The API base URL is configured in the Angular environment file:

```typescript
export const environment = {
  baseUrl: 'http://127.0.0.1:8000/api/v1/',
};
```

## What This Project Demonstrates

**Angular**
- Component-based UI built with NG-ZORRO
- A service layer that centralises HTTP calls and shared state
- Signals for reactive state shared across components
- Reactive Forms with validation
- `HttpClient` and Observables for async API calls
- Dependency injection with `inject()`

**Django REST Framework**
- Models and serializers for database-backed records
- `ModelViewSet` and `DefaultRouter` for CRUD routes
- Versioned API under `/api/v1/`

## Roadmap

- [ ] Edit employee details (backend `PUT`/`PATCH` already available)
- [ ] Search, filter, sorting, and pagination
- [ ] Loading indicators and success/error notifications
- [ ] Unit and integration tests
- [ ] Authentication and permissions
- [ ] Deployment
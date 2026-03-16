# Study-os-backend

``` text
study-os-backend/
├── src/
│   ├── config/          # DB connections, env vars
│   ├── routes/          # URL definitions → hands off to conrollers
│   ├── controllers/     # Request/response handling
│   ├── services/        # Business logic (the brain)
│   ├── repositories/    # Database queries only
│   ├── middleware/       # Auth checks, error handling, logging
│   └── utils/           # Shared helper functions
├── .env                 # Secret config (never commit this)
├── .env.example         # Template showing what keys exist (safe to commit)
├── .gitignore
├── package.json
└── server.js            # Entry point — just starts the app
```

## Dependencies

``` bash
# Production dependencies
npm install express dotenv cors helmet

# Development dependencies (only used while coding)
npm install -D nodemon
```

What did we just install?

* `express` — the web framework
* `dotenv` — loads your .env file into process.env
* `cors` — allows your React frontend to call your API
* `helmet` — sets security headers automatically (free security hardening)
* `nodemon` — auto-restarts server when you save a file
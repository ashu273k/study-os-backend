The prefix `/api/v1/tasks` lives in one place. When you release v2, you add one line: `app.use('/api/v2/tasks', taskRouterV2)`. Nothing else changes.

---

## ✏️ Your tasks

**Task 1 — Build it:** Create all three files and update `app.js`. Test these two endpoints with Postman or curl:
```
GET http://localhost:3000/api/v1/tasks
GET http://localhost:3000/api/v1/tasks/1
GET http://localhost:3000/api/v1/tasks/99
```

Paste the three responses you get.

**Task 2 — Understand:** Answer in your own words:
- Why does the service function not use `async/await` yet, but the controller does?
- What does `req.params.id` give you, and why did we `parseInt()` it?
- What happens if you remove the `return` before the 404 response in `getTaskById`?

**Task 3 — Extend:** Add a third endpoint to the tasks route:
## What is REST?

REST is not a framework or a library. It's a set of **conventions** for how URLs and HTTP methods should communicate intent. The goal is that any developer — including your future self — can read a URL and immediately understand what it does.

Here's the core idea: **URLs are nouns, HTTP methods are verbs.**

```
# The noun  →  the thing you're operating on
# The verb  →  what you're doing to it

GET    /tasks        → fetch all tasks
GET    /tasks/42     → fetch task with id 42
POST   /tasks        → create a new task
PUT    /tasks/42     → fully replace task 42
PATCH  /tasks/42     → partially update task 42
DELETE /tasks/42     → delete task 42
```

Notice the URL never changes for a single resource — only the HTTP method changes. A common junior mistake looks like this:

```
# WRONG — verbs in URLs
GET  /getTasks
POST /createTask
GET  /deleteTask?id=42
```

That's not REST. That's just random URLs. Avoid it.

---

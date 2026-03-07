import express from "express";
import { createServer as createViteServer } from "vite";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Initialize SQLite database
  const db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });

  // Create portfolio table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS portfolio (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      image_url TEXT,
      live_link TEXT,
      category TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Seed initial data if empty
  const count = await db.get("SELECT COUNT(*) as count FROM portfolio");
  if (count.count === 0) {
    const initialProjects = [
      {
        title: 'Luxury Real Estate Portal',
        category: 'Web',
        image_url: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=800&auto=format&fit=crop',
        live_link: '#',
        description: 'A high-end property listing site for Dubai real estate featuring immersive VR tours and custom filtering.'
      },
      {
        title: 'Cloud-Based Delivery App',
        category: 'App',
        image_url: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=800&auto=format&fit=crop',
        live_link: '#',
        description: 'Efficient logistics management mobile application with real-time tracking and automated dispatch.'
      },
      {
        title: 'Corporate Identity Kit',
        category: 'Graphics',
        image_url: 'https://images.unsplash.com/photo-1634942550612-b105fb467921?q=80&w=800&auto=format&fit=crop',
        live_link: '#',
        description: 'Brand guidelines, stationary, and digital asset library for a high-growth tech startup.'
      }
    ];

    for (const project of initialProjects) {
      await db.run(
        "INSERT INTO portfolio (title, category, image_url, live_link, description) VALUES (?, ?, ?, ?, ?)",
        [project.title, project.category, project.image_url, project.live_link, project.description]
      );
    }
    console.log("Database seeded with initial projects.");
  }

  // API Routes
  app.get("/api/portfolio", async (req, res) => {
    try {
      const items = await db.all("SELECT * FROM portfolio ORDER BY created_at DESC");
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch portfolio items" });
    }
  });

  app.post("/api/portfolio", async (req, res) => {
    const { title, description, image_url, live_link, category } = req.body;
    try {
      const result = await db.run(
        "INSERT INTO portfolio (title, description, image_url, live_link, category) VALUES (?, ?, ?, ?, ?)",
        [title, description, image_url, live_link, category]
      );
      res.status(201).json({ id: result.lastID, title, description, image_url, live_link, category });
    } catch (error) {
      res.status(500).json({ error: "Failed to create portfolio item" });
    }
  });

  app.put("/api/portfolio/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, image_url, live_link, category } = req.body;
    try {
      await db.run(
        "UPDATE portfolio SET title = ?, description = ?, image_url = ?, live_link = ?, category = ? WHERE id = ?",
        [title, description, image_url, live_link, category, id]
      );
      res.json({ id, title, description, image_url, live_link, category });
    } catch (error) {
      res.status(500).json({ error: "Failed to update portfolio item" });
    }
  });

  app.delete("/api/portfolio/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await db.run("DELETE FROM portfolio WHERE id = ?", [id]);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete portfolio item" });
    }
  });

  app.post("/api/sql", async (req, res) => {
    const { query, password } = req.body;
    
    // Simple protection using the same admin password
    if (password !== "admin123") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const result = await db.all(query);
      res.json(result);
    } catch (error: any) {
      // If it's not a SELECT query, db.all might return an empty array or throw
      // Let's try db.run if it's not a SELECT
      if (error.message.includes("does not return data")) {
        try {
          const runResult = await db.run(query);
          return res.json({ message: "Query executed successfully", result: runResult });
        } catch (runError: any) {
          return res.status(400).json({ error: runError.message });
        }
      }
      res.status(400).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

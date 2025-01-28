import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Mock data - you can modify this array to test different scenarios
const mockData = [
  {
    id: 1,
    name: "iPhone 14 Pro",
    email: "apple@example.com",
    body: "Latest iPhone model",
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    email: "samsung@example.com",
    body: "Android flagship phone",
  },
  {
    id: 3,
    name: "Google Pixel 7",
    email: "google@example.com",
    body: "Google's smartphone",
  },
  {
    id: 4,
    name: "iPad Pro",
    email: "apple@example.com",
    body: "Professional tablet",
  },
  {
    id: 5,
    name: "MacBook Pro",
    email: "apple@example.com",
    body: "Professional laptop",
  },
];

// Search endpoint
app.get("/api/search", async (req, res) => {
  try {
    const query = req.query.q?.toString().toLowerCase() || "";

    // Use mock data instead of external API
    const filteredResults = mockData
      .filter((comment: any) => comment.name.toLowerCase().includes(query))
      .slice(0, 5); // Limit to 5 results

    res.json(filteredResults);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

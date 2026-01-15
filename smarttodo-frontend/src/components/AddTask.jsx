import { TextField, Button } from "@mui/material";
import { useState } from "react";

export default function AddTask({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <div className="app-page">
      <div className="app-page-inner">
        <div style={{ display: "flex", gap: 12 }}>
          <TextField
            fullWidth
            placeholder="Add a new task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            variant="outlined"
            size="small"
            sx={{
              background: "#fff",
              borderRadius: "10px",
            }}
          />

          <Button
            onClick={handleSubmit}
            size="small"
            sx={{
              borderRadius: "10px",
              px: 3,
              background: "linear-gradient(135deg, #FF6B6B, #FF9F66)",
              color: "#fff",
              textTransform: "none",
              fontWeight: 600,
              minHeight: "40px",
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}

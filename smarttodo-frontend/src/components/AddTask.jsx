import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function AddTask({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <Box display="flex" gap={2} mb={3}>
      <TextField
        fullWidth
        label="Add a new task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Add
      </Button>
    </Box>
  );
}

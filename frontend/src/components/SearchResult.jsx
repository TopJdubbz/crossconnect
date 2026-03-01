import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function SearchResult({ events = [] }) {
  if (events.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ mt: 2 }}>
        No events match your search.
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
      {events.map((event) => (
        <Card key={event.id} variant="outlined" sx={{ width: "100%" }}>
          <CardContent sx={{ py: 1.5, "&:last-child": { pb: 1.5 } }}>
            <Typography variant="subtitle1" component="h2" fontWeight={600}>
              {event.name}
            </Typography>
            {event.location && (
              <Typography variant="body2" color="text.secondary">
                {event.location}
              </Typography>
            )}
            {event.category && (
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.25 }}>
                {event.category}
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

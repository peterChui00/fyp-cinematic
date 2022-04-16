import { useMemo, useEffect } from "react";
import { Box, Divider, Grid, Typography, Stack } from "@mui/material";
import { useLocation } from "react-router-dom";

// Custom hook to parse the query parameters in the url
function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function MovieSearch() {
  let query = useQuery();

  useEffect(() => {}, []);

  return (
    <Box>
      <Box>{query.get("search_query")}</Box>
    </Box>
  );
}

import { Box } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import OrderService from "../../services/OrderService";

export default function Order() {
  const [order, setOrder] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const res = await OrderService.getOrderByUserId(
        localStorage.getItem("uid")
      );
      console.log(res);
      setOrder(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return <Box></Box>;
}

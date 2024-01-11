import "./App.css";
import { useState ,useEffect} from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { BarChart } from "./BarChart";
import {Dashboard} from "./DashBoard";

function App() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch("https://blackcoffer-backend-42go.onrender.com/data", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const Navigate = useNavigate()

  return (
    <div className="App">
      <h1>Bar Chart</h1>
      <div className="navigation">
      <Button onClick={() => Navigate("/BarChart")}>Charts</Button>
       <Button onClick={() => Navigate("/")}>DashBoard</Button>
      </div>
      <Routes>
        <Route path="/BarChart" element={<BarChart data={data} />} />
        <Route path="/" element={<Dashboard data={data} />} />
      </Routes>
    </div>
  );
}

export default App;

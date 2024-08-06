import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const navigator = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("apiKey") === null){
        navigator("/");
      }
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard

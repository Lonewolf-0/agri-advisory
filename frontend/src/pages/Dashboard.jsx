import AdvisoryPage from "./AdvisoryPage";
import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <div>
      <Navbar />
      <h2>Farmer Dashboard</h2>
      <AdvisoryPage />
    </div>
  );
}

export default Dashboard;

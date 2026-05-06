import AdvisoryPage from "./AdvisoryPage";
import Navbar from "../components/Navbar";
import CropSelector from "../components/CropSelector";

function Dashboard() {
  return (
    <div>
      <Navbar />
      <h2>Farmer Dashboard</h2>
      <CropSelector />
      <AdvisoryPage />
    </div>
  );
}

export default Dashboard;

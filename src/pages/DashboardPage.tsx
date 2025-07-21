import HomeHeader from "../../components/navigation/HomeHeader";

const DashboardPage = () => {
  return (
    <div>
      <HomeHeader />
      {/* Dashboard content will be imported from the existing dashboard page */}
      <div className="p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Dashboard content goes here</p>
      </div>
    </div>
  );
};

export default DashboardPage;
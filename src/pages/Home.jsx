import { useState } from "react";

function Home() {
  // Simulated available food data
  const [foodData, setFoodData] = useState([
    { id: 1, donor: "Hotel A", quantity: 40 },
    { id: 2, donor: "Restaurant B", quantity: 25 },
  ]);

  // Calculations
  const totalMeals = foodData.reduce((sum, item) => sum + item.quantity, 0);
  const totalDonors = foodData.length;
  const communitiesHelped = Math.floor(totalMeals / 15);

  // Example function to simulate adding food
  const addFood = () => {
    const newFood = {
      id: foodData.length + 1,
      donor: "New Donor",
      quantity: 30,
    };

    setFoodData([...foodData, newFood]);
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>
          Reduce Food Waste with <span className="rescue-text">Rescue</span>
        </h1>
        <p className="tagline">
          Connecting surplus food from donors to people who need it most.
        </p>

        <button className="donate-btn" onClick={addFood}>
          Simulate Add Food
        </button>
      </div>

      <div className="stats-section">
        <div className="stat-box">
          <h2>{totalMeals}+</h2>
          <p>Meals Available</p>
        </div>

        <div className="stat-box">
          <h2>{totalDonors}+</h2>
          <p>Active Donors</p>
        </div>

        <div className="stat-box">
          <h2>{communitiesHelped}+</h2>
          <p>Communities Helped</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
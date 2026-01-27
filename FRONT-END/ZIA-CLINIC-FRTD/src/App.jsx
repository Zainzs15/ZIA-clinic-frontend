import { useEffect } from "react";
import AOS from "aos";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
// import DoctorSection from "./components/DoctorSection";
import Appointment from "./components/Appointment";
import Footer from "./components/Footer";
import Login from "./components/login";
import PlanSelect from "./components/PlanSelect";


function App() {
useEffect(() => {
AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
}, []);


return (
<>
<Navbar />
<HeroSlider />
<Appointment />
<Login />
<PlanSelect />
<Footer />
</>
);
}


export default App;
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";


import slide1 from "../assets/slider/slide1.jpeg";
import slide2 from "../assets/slider/slide2.png";
import slide3 from "../assets/slider/slide3.png";
import slide4 from "../assets/slider/slide4.png";


export default function HeroSlider() {
return (
<section className="hero">
<Swiper
modules={[Autoplay, EffectFade]}
effect="fade"
autoplay={{ delay: 3000 }}
loop={true}
className="hero-swiper"
>
{[slide1, slide2, slide3, slide4].map((img, index) => (
<SwiperSlide key={index}>
<div
className="slide"
style={{ backgroundImage: `url(${img})` }}
>
<div className="overlay">
<h1>Natural Healing with Homeopathy</h1>
<p>Providing compassionate care for your health</p>
<a href="./login.jsx"><button className="gold-btn">Book Appointment</button></a>
</div>
</div>
</SwiperSlide>
))}
</Swiper>
</section>
);
}
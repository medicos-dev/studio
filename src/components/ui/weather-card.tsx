'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface WeatherData {
  temperature: number;
  city: string;
  country: string;
  date: string;
  weatherCode: number;
}

const WeatherCard = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [suggestion, setSuggestion] = useState('');

  // Function to get drink suggestion based on temperature and weather code
  const getDrinkSuggestion = (temp: number) => {
    const hotPhrases = [
      "Perfect weather for an Iced Matcha!",
      "Time for a Mojito Refresher.",
      "Cool down with a Cold Brew.",
      "A Peach Iced Tea would be lovely.",
      "Try our signature Iced Americano.",
      "Beat the Raiganj heat with a Frappe.",
      "Cucumber Mint Cooler calling your name.",
      "A chilled Mango Lassi awaits!",
      "Sip on a zesty Lemon Soda.",
      "Iced Caramel Macchiato kind of day."
    ];

    const warmPhrases = [
      "Great day for a Latte.",
      "Enjoy a smooth Flat White.",
      "How about a Caramel Macchiato?",
      "Perfect temp for a Cortado.",
      "A classic Cappuccino fits perfectly.",
      "Relax with a classic Cold Coffee.",
      "Time for a Vanilla Sweet Cream Cold Brew.",
      "Lovely weather for an Affogato.",
      "Enjoy a smooth Nitro Brew."
    ];

    const coolPhrases = [
      "Cozy up with a Cappuccino.",
      "Perfect weather for an Americano.",
      "Time for a warm Chai Latte.",
      "A hot Mocha sounds perfect.",
      "Warm your soul with a Red Velvet Latte.",
      "Steaming cup of Earl Grey/Masala Chai?",
      "Perfect time for a Hazelnut Latte.",
      "Warm up with a Hot Chocolate."
    ];

    const coldPhrases = [
      "Warm up with Hot Cocoa.",
      "Espresso weather.",
      "Time for a hot tea.",
      "Perfect for a Gingerbread Latte.",
      "Stay warm with a Double Espresso.",
      "Freezing? Grab a Turmeric Latte.",
      "Best time for a hot ginger tea.",
      "Double piping hot Cappuccino."
    ];

    let phrase = "";
    if (temp >= 28) {
      phrase = hotPhrases[Math.floor(Math.random() * hotPhrases.length)];
    } else if (temp >= 20) {
      phrase = warmPhrases[Math.floor(Math.random() * warmPhrases.length)];
    } else if (temp >= 12) {
      phrase = coolPhrases[Math.floor(Math.random() * coolPhrases.length)];
    } else {
      phrase = coldPhrases[Math.floor(Math.random() * coldPhrases.length)];
    }
    return phrase;
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Hardcoded Raiganj coordinates
        const lat = 25.6208;
        const lon = 88.1264;

        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`
        );
        const data = await response.json();

        const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

        const currentTemp = Math.round(data.current.temperature_2m);

        setWeather({
          temperature: currentTemp,
          city: "Raiganj",
          country: "West Bengal",
          date: date,
          weatherCode: data.current.weather_code
        });

        setSuggestion(getDrinkSuggestion(currentTemp));
        setLoading(false);

      } catch (error) {
        console.error("Weather fetch error:", error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading || !weather) return null;

  return (
    <ContainerWrapper>
      <StyledWrapper>
        <div className="card">
          <div className="container">
            <div className="cloud front">
              <span className="left-front" />
              <span className="right-front" />
            </div>
            <span className="sun sunshine" />
            <span className="sun" />
            <div className="cloud back">
              <span className="left-back" />
              <span className="right-back" />
            </div>
          </div>
          <div className="card-header">
            <span>{weather.city}<br />{weather.country}</span>
            <span>{weather.date}</span>
          </div>
          <span className="temp">{weather.temperature}°</span>
          <div className="temp-scale">
            <span>Celsius</span>
          </div>
        </div>
      </StyledWrapper>
      <SignatureText>
        {/* Beautiful Fern/Bushy Leaf - Top Left Corner - Moved further out */}
        <div className="absolute -z-10 -top-10 -left-10 text-secondary/80 transform -rotate-45" style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.1))' }}>
          <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.5,1.91L16.68,2.73L13.3,6.1L15.39,8.19L18.77,4.82L19.59,5.64L13.85,11.38C13.85,11.38 12.33,14.6 12.58,16.89C11.53,15.35 11.23,12.5 11.23,12.5L2,21.71L2.81,22.5L12.04,13.25C12.04,13.25 14.89,12.96 16.42,11.91C14.13,12.16 10.91,10.64 10.91,10.64L16.65,4.9L17.47,5.72L14.09,9.1L16.18,11.19L19.56,7.8L20.38,8.63L16.29,12.72L17.11,13.54L22,8.65L17.5,1.91Z" />
          </svg>
        </div>

        {/* Elegant Flower - Bottom Right Corner - Moved further out */}
        <div className="absolute -z-10 -bottom-8 -right-8 text-primary/70 transform rotate-12" style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.1))' }}>
          <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2C10.5,2 9.5,3.5 9.5,5C9.5,6.5 10.5,8 12,8C13.5,8 14.5,6.5 14.5,5C14.5,3.5 13.5,2 12,2M5,9.5C3.5,9.5 2,10.5 2,12C2,13.5 3.5,14.5 5,14.5C6.5,14.5 8,13.5 8,12C8,10.5 6.5,9.5 5,9.5M12,16C10.5,16 9.5,17.5 9.5,19C9.5,20.5 10.5,22 12,22C13.5,22 14.5,20.5 14.5,19C14.5,17.5 13.5,16 12,16M19,9.5C17.5,9.5 16,10.5 16,12C16,13.5 17.5,14.5 19,14.5C20.5,14.5 22,13.5 22,12C22,10.5 20.5,9.5 19,9.5M12,10C10.9,10 10,10.9 10,12C10,13.1 10.9,14 12,14C13.1,14 14,13.1 14,12C14,10.9 13.1,10 12,10Z" />
          </svg>
        </div>

        {/* Small Leaf - Top Right - Moved further out */}
        <div className="absolute -z-10 -top-8 -right-6 text-accent/60 transform rotate-45 scale-90">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" /></svg>
        </div>

        {/* Removed Bottom Left Branch Leaf as requested */}
        {suggestion}
      </SignatureText>
    </ContainerWrapper>
  );
}

// Wrapper to position everything
const ContainerWrapper = styled.div`
  position: absolute; /* Changed from fixed to absolute for Hero section */
  top: 40px; /* Adjusted for Hero section */
  left: 40px;
  z-index: 40;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;

  @media (max-width: 1024px) {
    display: none; /* Hide on tablets and mobile */
  }
`;

const SignatureText = styled.div`
  font-family: 'Dancing Script', cursive;
  font-size: 1.5rem;
  color: hsl(var(--foreground));
  background: hsl(var(--background) / 0.9);
  backdrop-filter: blur(8px);
  padding: 1.5rem 2.5rem; /* Increased padding */
  border-radius: 2rem;
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06),
    0 0 0 1px hsl(var(--primary) / 0.2);
  transform: rotate(-2deg);
  max-width: 280px;
  line-height: 1.4;
  position: relative;
  
  text-shadow: 1px 1px 0px rgba(0,0,0,0.05);

  animation: float 6s ease-in-out infinite;

  @keyframes float {
      0% { transform: translateY(0px) rotate(-2deg); }
      50% { transform: translateY(-5px) rotate(-1deg); }
      100% { transform: translateY(0px) rotate(-2deg); }
  }
    z-index: -1;
    opacity: 0.8;
    filter: drop-shadow(0 2px 2px rgba(0,0,0,0.1));
  }
  
  /* We will use React components for the actual icons to be more decorative */
`;

const StyledWrapper = styled.div`
  /* Scale down the card slightly so it's not huge */
  transform: scale(0.65); 
  transform-origin: top left;
  margin-bottom: -70px; /* Compensate for scaling whitespace */
  margin-right: -100px;

  .card {
    width: 350px;
    height: 235px;
    position: relative;
    padding: 25px;
    background: radial-gradient(178.94% 106.41% at 26.42% 106.41%, #FFF7B1 0%, rgba(255, 255, 255, 0) 71.88%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, #FFFFFF;
    box-shadow: 0px 155px 62px rgba(0, 0, 0, 0.01), 0px 87px 52px rgba(0, 0, 0, 0.05), 0px 39px 39px rgba(0, 0, 0, 0.09), 0px 10px 21px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
    border-radius: 23px;
    transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);
    cursor: pointer;
  }

  .card:hover {
    transform: scale(1.05);
  }

  .container {
    width: 250px;
    height: 250px;
    position: absolute;
    right: -35px;
    top: -50px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(0.7);
  }

  .cloud {
    width: 250px;
  }

  .front {
    padding-top: 45px;
    margin-left: 25px;
    display: inline;
    position: absolute;
    z-index: 11;
    animation: clouds 8s infinite;
    animation-timing-function: ease-in-out;
  }

  .back {
    margin-top: -30px;
    margin-left: 150px;
    z-index: 12;
    animation: clouds 12s infinite;
    animation-timing-function: ease-in-out;
  }

  .right-front {
    width: 45px;
    height: 45px;
    border-radius: 50% 50% 50% 0%;
    background-color: #4c9beb;
    display: inline-block;
    margin-left: -25px;
    z-index: 5;
  }

  .left-front {
    width: 65px;
    height: 65px;
    border-radius: 50% 50% 0% 50%;
    background-color: #4c9beb;
    display: inline-block;
    z-index: 5;
  }

  .right-back {
    width: 50px;
    height: 50px;
    border-radius: 50% 50% 50% 0%;
    background-color: #4c9beb;
    display: inline-block;
    margin-left: -20px;
    z-index: 5;
  }

  .left-back {
    width: 30px;
    height: 30px;
    border-radius: 50% 50% 0% 50%;
    background-color: #4c9beb;
    display: inline-block;
    z-index: 5;
  }

  .sun {
    width: 120px;
    height: 120px;
    background: -webkit-linear-gradient(to right, #fcbb04, #fffc00);
    background: linear-gradient(to right, #fcbb04, #fffc00);
    border-radius: 60px;
    display: inline;
    position: absolute;
  }

  .sunshine {
    animation: sunshines 2s infinite;
  }

  @keyframes sunshines {
    0% {
      transform: scale(1);
      opacity: 0.6;
    }

    100% {
      transform: scale(1.4);
      opacity: 0;
    }
  }

  @keyframes clouds {
    0% {
      transform: translateX(15px);
    }

    50% {
      transform: translateX(0px);
    }

    100% {
      transform: translateX(15px);
    }
  }

  .card-header {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .card-header span:first-child {
    word-break: break-all;
    font-weight: 800;
    font-size: 15px;
    line-height: 135%;
    color: rgba(87, 77, 51, 0.66);
  }

  .card-header span:last-child {
    font-weight: 700;
    font-size: 15px;
    line-height: 135%;
    color: rgba(87, 77, 51, 0.33);
  }

  .temp {
    position: absolute;
    left: 25px;
    bottom: 12px;
    font-weight: 700;
    font-size: 64px;
    line-height: 77px;
    color: rgba(87, 77, 51, 1);
  }

  .temp-scale {
    width: 80px;
    height: 36px;
    position: absolute;
    right: 25px;
    bottom: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.06);
    border-radius: 9px;
  }

  .temp-scale span {
    font-weight: 700;
    font-size: 13px;
    line-height: 134.49%;
    color: rgba(87, 77, 51, 0.66);
  }`;

export default WeatherCard;

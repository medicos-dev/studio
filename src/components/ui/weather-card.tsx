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
        {/* Leaf decorations on outer borders - primarily using the 'top-right' leaf style as requested */}
        {/* Top Border */}
        <LeafDecor className="top-right-main">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.3 65.33" fill="currentColor">
            <path d="M13.98 52.87c0.37,-0.8 0.6,-1.74 0.67,-2.74 1.01,1.1 2.23,2.68 1.24,3.87 -0.22,0.26 -0.41,0.61 -0.59,0.97 -2.95,5.89 3.44,10.87 2.98,0.78 0.29,0.23 0.73,0.82 1.03,1.18 0.33,0.4 0.7,0.77 1,1.15 0.29,0.64 -0.09,2.68 1.77,4.91 5.42,6.5 5.67,-2.38 0.47,-4.62 -0.41,-0.18 -0.95,-0.26 -1.28,-0.54 -0.5,-0.41 -1.23,-1.37 -1.66,-1.9 0.03,-0.43 -0.17,-0.13 0.11,-0.33 4.98,1.72 8.4,-1.04 2.38,-3.16 -1.98,-0.7 -2.9,-0.36 -4.72,0.16 -0.63,-0.58 -2.38,-3.82 -2.82,-4.76 1.21,0.56 1.72,1.17 3.47,1.3 6.5,0.5 2.31,-4.21 -2.07,-4.04 -1.12,0.04 -1.62,0.37 -2.49,0.62l-1.25 -3.11c0.03,-0.26 0.01,-0.18 0.1,-0.28z" />
          </svg>
        </LeafDecor>
        <LeafDecor className="top-left-mirror">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.3 65.33" fill="currentColor">
            <path d="M13.98 52.87c0.37,-0.8 0.6,-1.74 0.67,-2.74 1.01,1.1 2.23,2.68 1.24,3.87 -0.22,0.26 -0.41,0.61 -0.59,0.97 -2.95,5.89 3.44,10.87 2.98,0.78 0.29,0.23 0.73,0.82 1.03,1.18 0.33,0.4 0.7,0.77 1,1.15 0.29,0.64 -0.09,2.68 1.77,4.91 5.42,6.5 5.67,-2.38 0.47,-4.62 -0.41,-0.18 -0.95,-0.26 -1.28,-0.54 -0.5,-0.41 -1.23,-1.37 -1.66,-1.9 0.03,-0.43 -0.17,-0.13 0.11,-0.33 4.98,1.72 8.4,-1.04 2.38,-3.16 -1.98,-0.7 -2.9,-0.36 -4.72,0.16 -0.63,-0.58 -2.38,-3.82 -2.82,-4.76 1.21,0.56 1.72,1.17 3.47,1.3 6.5,0.5 2.31,-4.21 -2.07,-4.04 -1.12,0.04 -1.62,0.37 -2.49,0.62l-1.25 -3.11c0.03,-0.26 0.01,-0.18 0.1,-0.28z" />
          </svg>
        </LeafDecor>

        {/* Side Borders */}
        <LeafDecor className="right-mid">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.3 65.33" fill="currentColor">
            <path d="M13.98 52.87c0.37,-0.8 0.6,-1.74 0.67,-2.74 1.01,1.1 2.23,2.68 1.24,3.87 -0.22,0.26 -0.41,0.61 -0.59,0.97 -2.95,5.89 3.44,10.87 2.98,0.78 0.29,0.23 0.73,0.82 1.03,1.18 0.33,0.4 0.7,0.77 1,1.15 0.29,0.64 -0.09,2.68 1.77,4.91 5.42,6.5 5.67,-2.38 0.47,-4.62 -0.41,-0.18 -0.95,-0.26 -1.28,-0.54 -0.5,-0.41 -1.23,-1.37 -1.66,-1.9 0.03,-0.43 -0.17,-0.13 0.11,-0.33 4.98,1.72 8.4,-1.04 2.38,-3.16 -1.98,-0.7 -2.9,-0.36 -4.72,0.16 -0.63,-0.58 -2.38,-3.82 -2.82,-4.76 1.21,0.56 1.72,1.17 3.47,1.3 6.5,0.5 2.31,-4.21 -2.07,-4.04 -1.12,0.04 -1.62,0.37 -2.49,0.62l-1.25 -3.11c0.03,-0.26 0.01,-0.18 0.1,-0.28z" />
          </svg>
        </LeafDecor>
        <LeafDecor className="left-mid">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.3 65.33" fill="currentColor">
            <path d="M13.98 52.87c0.37,-0.8 0.6,-1.74 0.67,-2.74 1.01,1.1 2.23,2.68 1.24,3.87 -0.22,0.26 -0.41,0.61 -0.59,0.97 -2.95,5.89 3.44,10.87 2.98,0.78 0.29,0.23 0.73,0.82 1.03,1.18 0.33,0.4 0.7,0.77 1,1.15 0.29,0.64 -0.09,2.68 1.77,4.91 5.42,6.5 5.67,-2.38 0.47,-4.62 -0.41,-0.18 -0.95,-0.26 -1.28,-0.54 -0.5,-0.41 -1.23,-1.37 -1.66,-1.9 0.03,-0.43 -0.17,-0.13 0.11,-0.33 4.98,1.72 8.4,-1.04 2.38,-3.16 -1.98,-0.7 -2.9,-0.36 -4.72,0.16 -0.63,-0.58 -2.38,-3.82 -2.82,-4.76 1.21,0.56 1.72,1.17 3.47,1.3 6.5,0.5 2.31,-4.21 -2.07,-4.04 -1.12,0.04 -1.62,0.37 -2.49,0.62l-1.25 -3.11c0.03,-0.26 0.01,-0.18 0.1,-0.28z" />
          </svg>
        </LeafDecor>

        {/* Bottom Borders */}
        <LeafDecor className="bottom-right-decor">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.3 65.33" fill="currentColor">
            <path d="M13.98 52.87c0.37,-0.8 0.6,-1.74 0.67,-2.74 1.01,1.1 2.23,2.68 1.24,3.87 -0.22,0.26 -0.41,0.61 -0.59,0.97 -2.95,5.89 3.44,10.87 2.98,0.78 0.29,0.23 0.73,0.82 1.03,1.18 0.33,0.4 0.7,0.77 1,1.15 0.29,0.64 -0.09,2.68 1.77,4.91 5.42,6.5 5.67,-2.38 0.47,-4.62 -0.41,-0.18 -0.95,-0.26 -1.28,-0.54 -0.5,-0.41 -1.23,-1.37 -1.66,-1.9 0.03,-0.43 -0.17,-0.13 0.11,-0.33 4.98,1.72 8.4,-1.04 2.38,-3.16 -1.98,-0.7 -2.9,-0.36 -4.72,0.16 -0.63,-0.58 -2.38,-3.82 -2.82,-4.76 1.21,0.56 1.72,1.17 3.47,1.3 6.5,0.5 2.31,-4.21 -2.07,-4.04 -1.12,0.04 -1.62,0.37 -2.49,0.62l-1.25 -3.11c0.03,-0.26 0.01,-0.18 0.1,-0.28z" />
          </svg>
        </LeafDecor>
        <LeafDecor className="bottom-left-decor">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.3 65.33" fill="currentColor">
            <path d="M13.98 52.87c0.37,-0.8 0.6,-1.74 0.67,-2.74 1.01,1.1 2.23,2.68 1.24,3.87 -0.22,0.26 -0.41,0.61 -0.59,0.97 -2.95,5.89 3.44,10.87 2.98,0.78 0.29,0.23 0.73,0.82 1.03,1.18 0.33,0.4 0.7,0.77 1,1.15 0.29,0.64 -0.09,2.68 1.77,4.91 5.42,6.5 5.67,-2.38 0.47,-4.62 -0.41,-0.18 -0.95,-0.26 -1.28,-0.54 -0.5,-0.41 -1.23,-1.37 -1.66,-1.9 0.03,-0.43 -0.17,-0.13 0.11,-0.33 4.98,1.72 8.4,-1.04 2.38,-3.16 -1.98,-0.7 -2.9,-0.36 -4.72,0.16 -0.63,-0.58 -2.38,-3.82 -2.82,-4.76 1.21,0.56 1.72,1.17 3.47,1.3 6.5,0.5 2.31,-4.21 -2.07,-4.04 -1.12,0.04 -1.62,0.37 -2.49,0.62l-1.25 -3.11c0.03,-0.26 0.01,-0.18 0.1,-0.28z" />
          </svg>
        </LeafDecor>
        <LeafDecor className="top-mid">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.3 65.33" fill="currentColor">
            <path d="M13.98 52.87c0.37,-0.8 0.6,-1.74 0.67,-2.74 1.01,1.1 2.23,2.68 1.24,3.87 -0.22,0.26 -0.41,0.61 -0.59,0.97 -2.95,5.89 3.44,10.87 2.98,0.78 0.29,0.23 0.73,0.82 1.03,1.18 0.33,0.4 0.7,0.77 1,1.15 0.29,0.64 -0.09,2.68 1.77,4.91 5.42,6.5 5.67,-2.38 0.47,-4.62 -0.41,-0.18 -0.95,-0.26 -1.28,-0.54 -0.5,-0.41 -1.23,-1.37 -1.66,-1.9 0.03,-0.43 -0.17,-0.13 0.11,-0.33 4.98,1.72 8.4,-1.04 2.38,-3.16 -1.98,-0.7 -2.9,-0.36 -4.72,0.16 -0.63,-0.58 -2.38,-3.82 -2.82,-4.76 1.21,0.56 1.72,1.17 3.47,1.3 6.5,0.5 2.31,-4.21 -2.07,-4.04 -1.12,0.04 -1.62,0.37 -2.49,0.62l-1.25 -3.11c0.03,-0.26 0.01,-0.18 0.1,-0.28z" />
          </svg>
        </LeafDecor>
        <LeafDecor className="bottom-mid">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.3 65.33" fill="currentColor">
            <path d="M13.98 52.87c0.37,-0.8 0.6,-1.74 0.67,-2.74 1.01,1.1 2.23,2.68 1.24,3.87 -0.22,0.26 -0.41,0.61 -0.59,0.97 -2.95,5.89 3.44,10.87 2.98,0.78 0.29,0.23 0.73,0.82 1.03,1.18 0.33,0.4 0.7,0.77 1,1.15 0.29,0.64 -0.09,2.68 1.77,4.91 5.42,6.5 5.67,-2.38 0.47,-4.62 -0.41,-0.18 -0.95,-0.26 -1.28,-0.54 -0.5,-0.41 -1.23,-1.37 -1.66,-1.9 0.03,-0.43 -0.17,-0.13 0.11,-0.33 4.98,1.72 8.4,-1.04 2.38,-3.16 -1.98,-0.7 -2.9,-0.36 -4.72,0.16 -0.63,-0.58 -2.38,-3.82 -2.82,-4.76 1.21,0.56 1.72,1.17 3.47,1.3 6.5,0.5 2.31,-4.21 -2.07,-4.04 -1.12,0.04 -1.62,0.37 -2.49,0.62l-1.25 -3.11c0.03,-0.26 0.01,-0.18 0.1,-0.28z" />
          </svg>
        </LeafDecor>
        {suggestion}
      </SignatureText>
    </ContainerWrapper>
  );
}

// Wrapper - moved more toward center
const ContainerWrapper = styled.div`
  position: absolute;
  top: 40px;
  left: 120px; /* Moved more toward center */
  z-index: 40;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;

  @media (max-width: 1024px) {
    display: none; /* Hide on tablets and mobile */
  }
`;

// Leaf decoration on borders
const LeafDecor = styled.div`
  position: absolute;
  z-index: -1;
  opacity: 0.7;
  filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.1));
  
  svg {
    width: 22px;
    height: auto;
  }
  
  &.top-right-main {
    top: -20px;
    right: -15px;
    color: hsl(var(--primary) / 0.8);
    transform: rotate(20deg);
  }

  &.top-left-mirror {
    top: -18px;
    left: -12px;
    color: hsl(var(--secondary) / 0.7);
    transform: rotate(-30deg) scaleX(-1);
  }

  &.right-mid {
    top: 50%;
    right: -18px;
    color: hsl(var(--accent) / 0.6);
    transform: rotate(90deg);
  }

  &.left-mid {
    top: 40%;
    left: -18px;
    color: hsl(var(--primary) / 0.5);
    transform: rotate(-90deg);
  }

  &.bottom-right-decor {
    bottom: -15px;
    right: -10px;
    color: hsl(var(--secondary) / 0.8);
    transform: rotate(135deg);
  }

  &.bottom-left-decor {
    bottom: -12px;
    left: -10px;
    color: hsl(var(--primary) / 0.6);
    transform: rotate(-135deg) scaleX(-1);
  }

  &.top-mid {
    top: -18px;
    left: 45%;
    color: hsl(var(--accent) / 0.5);
    transform: rotate(0deg);
  }

  &.bottom-mid {
    bottom: -16px;
    left: 40%;
    color: hsl(var(--secondary) / 0.7);
    transform: rotate(180deg);
  }
`;

// Smaller signature text box
const SignatureText = styled.div`
  font-family: 'Dancing Script', cursive;
  font-size: 1.3rem;
  color: hsl(var(--foreground));
  background: hsl(var(--background) / 0.9);
  backdrop-filter: blur(8px);
  padding: 1rem 1.5rem;
  border-radius: 1.5rem;
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06),
    0 0 0 1px hsl(var(--primary) / 0.2);
  transform: rotate(-2deg);
  max-width: 240px;
  line-height: 1.3;
  position: relative;
  text-shadow: 1px 1px 0px rgba(0,0,0,0.05);

  animation: float 6s ease-in-out infinite;

  @keyframes float {
      0% { transform: translateY(0px) rotate(-2deg); }
      50% { transform: translateY(-5px) rotate(-1deg); }
      100% { transform: translateY(0px) rotate(-2deg); }
  }
`;

const StyledWrapper = styled.div`
  transform: scale(0.65); 
  transform-origin: top left;
  margin-bottom: -70px;
  margin-right: -100px;

  .card {
    width: 350px;
    height: 235px;
    position: relative;
    padding: 25px;
    background: radial-gradient(178.94% 106.41% at 26.42% 106.41%, #FFF7B1 0%, rgba(255, 255, 255, 0) 71.88%), #FFFFFF;
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
    0% { transform: translateX(15px); }
    50% { transform: translateX(0px); }
    100% { transform: translateX(15px); }
  }

  .card-header {
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: left;
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
  }
`;

export default WeatherCard;

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
  const [suggestion, setSuggestion] = useState<{ text: string, type: 'normal' | 'romantic' }>({ text: '', type: 'normal' });
  const [isNight, setIsNight] = useState(false);

  const getDrinkSuggestion = (temp: number) => {
    // Array of { text: string, type: 'normal' | 'romantic' }
    const hotPhrases: { text: string; type: 'normal' | 'romantic' }[] = [
      { text: "Escape the heat with our signature refreshing Iced Matcha!", type: 'normal' },
      { text: "Too hot outside? Our Mojito is your perfect getaway.", type: 'normal' },
      { text: "Chill vibes only with our premium Cold Brew.", type: 'normal' },
      { text: "A sip of our Peach Iced Tea is a sip of paradise.", type: 'normal' },
      { text: "You + Iced Americano = The perfect summer love story.", type: 'romantic' },
      { text: "Beat the Raiganj heat with a creamy, dreamy Frappe.", type: 'normal' },
      { text: "Treat yourself to a Cucumber Mint Cooler. You deserve it.", type: 'normal' },
      { text: "Sweating? Let our chilled Mango Lassi save the day.", type: 'normal' },
      { text: "Hot days call for cool dates and Iced Lattes.", type: 'romantic' },
      { text: "Share a refreshing Lemon Soda with someone special.", type: 'romantic' },
      { text: "Our Watermelon Slush is summer in a glass.", type: 'normal' },
      { text: "Cool down with a tropical Passion Fruit Cooler.", type: 'normal' },
      { text: "Nothing beats the heat like our Blue Lagoon.", type: 'normal' },
      { text: "Sparkling Iced Lemonade: your new summer obsession.", type: 'normal' },
      { text: "Two straws, one cold coffee, endless love.", type: 'romantic' },
      { text: "Frozen Mocha Bliss for the hottest days.", type: 'normal' },
      { text: "Our Coconut Milk Shake is pure tropical heaven.", type: 'normal' },
      { text: "Berry Blast Smoothie to keep you cool all day.", type: 'normal' },
      { text: "Let's chill together over an Iced Caramel Latte.", type: 'romantic' },
      { text: "Summer flings and cold drinks are our specialty.", type: 'romantic' }
    ];

    const warmPhrases: { text: string; type: 'normal' | 'romantic' }[] = [
      { text: "It's a beautiful day for our smooth, handcrafted Latte.", type: 'normal' },
      { text: "Experience the velvet touch of our Flat White.", type: 'normal' },
      { text: "Sweeten your day with a Caramel Macchiato.", type: 'normal' },
      { text: "Perfect temperature for coffee and conversation.", type: 'romantic' },
      { text: "A classic Cappuccino, made just for you.", type: 'normal' },
      { text: "Relax and unwind with our signature Cold Coffee.", type: 'normal' },
      { text: "Vanilla Sweet Cream Cold Brew: Love at first sip.", type: 'romantic' },
      { text: "Treat your date to a delicious Affogato.", type: 'romantic' },
      { text: "Smooth Nitro Brew for a smooth day ahead.", type: 'normal' },
      { text: "Golden hour calls for a Golden Latte.", type: 'normal' },
      { text: "Our Lavender Latte is pure afternoon bliss.", type: 'normal' },
      { text: "Share stories over a Honey Almond Cappuccino.", type: 'romantic' },
      { text: "The perfect weather for our Irish Cream Coffee.", type: 'normal' },
      { text: "Discover love in every sip of our Rose Latte.", type: 'romantic' },
      { text: "Maple Pecan Latte: Autumn in a cup.", type: 'normal' },
      { text: "Our Oat Milk Latte is smooth like this weather.", type: 'normal' },
      { text: "Perfect day for a café date and our Vienna Coffee.", type: 'romantic' },
      { text: "Espresso Tonic: Refreshingly different.", type: 'normal' },
      { text: "Let our Pistachio Latte make your day sweeter.", type: 'normal' },
      { text: "Coffee, you, and this beautiful weather.", type: 'romantic' }
    ];

    const coolPhrases: { text: string; type: 'normal' | 'romantic' }[] = [
      { text: "Cozy vibes and Cappuccinos. The perfect match.", type: 'normal' },
      { text: "Warm hands, warm heart. Try our Americano.", type: 'romantic' },
      { text: "Cuddle weather calls for a warm Chai Latte.", type: 'romantic' },
      { text: "A hot Mocha to warm your soul today.", type: 'normal' },
      { text: "Red Velvet Latte: A hug in a mug.", type: 'normal' },
      { text: "Nothing beats a steaming cup of Earl Grey.", type: 'normal' },
      { text: "Fall in love with our Hazelnut Latte.", type: 'romantic' },
      { text: "Rich Hot Chocolate. Pure liquid happiness.", type: 'normal' },
      { text: "Snuggle up with our Cinnamon Dolce Latte.", type: 'romantic' },
      { text: "Our Spiced Apple Cider warms from within.", type: 'normal' },
      { text: "Pumpkin Spice Latte weather is here!", type: 'normal' },
      { text: "Warm your heart with our Salted Caramel Mocha.", type: 'romantic' },
      { text: "Perfect day for a cozy corner and Hot Toddy.", type: 'normal' },
      { text: "Share a blanket and our Double Hot Chocolate.", type: 'romantic' },
      { text: "Our Masala Chai will spice up your evening.", type: 'normal' },
      { text: "Butterscotch Latte: Sweet warmth in every sip.", type: 'normal' },
      { text: "Let's get lost in conversation over warm drinks.", type: 'romantic' },
      { text: "Toasted Marshmallow Latte for a toasty day.", type: 'normal' },
      { text: "Our Matcha Latte is zen in a cup.", type: 'normal' },
      { text: "Hold hands, hold mugs, hold this moment.", type: 'romantic' }
    ];

    const coldPhrases: { text: string; type: 'normal' | 'romantic' }[] = [
      { text: "Baby it's cold outside. Warm up with Hot Cocoa.", type: 'romantic' },
      { text: "Espresso weather is the best weather.", type: 'normal' },
      { text: "Wrap your hands around a steaming hot tea.", type: 'normal' },
      { text: "Spice up the chill with a Gingerbread Latte.", type: 'normal' },
      { text: "Keep each other warm with Double Espressos.", type: 'romantic' },
      { text: "Freezing? Our Turmeric Latte is a warm embrace.", type: 'normal' },
      { text: "Best time for deep talks and hot ginger tea.", type: 'romantic' },
      { text: "Double piping hot Cappuccino to melt the frost.", type: 'normal' },
      { text: "Our Winter Spice Latte fights the freeze.", type: 'normal' },
      { text: "Steaming Mulled Wine for frozen fingers.", type: 'normal' },
      { text: "Come in from the cold to our warm embrace.", type: 'romantic' },
      { text: "Irish Coffee to warm your winter soul.", type: 'normal' },
      { text: "Our Chestnut Praline Latte is holiday magic.", type: 'normal' },
      { text: "Share body heat and our Extra Hot Mocha.", type: 'romantic' },
      { text: "Peppermint Hot Chocolate for frosty days.", type: 'normal' },
      { text: "Create warmth together over Cardamom Tea.", type: 'romantic' },
      { text: "Our Brandy Coffee is liquid courage.", type: 'normal' },
      { text: "Snowy weather, warm hearts, hot lattes.", type: 'romantic' },
      { text: "Triple shot Macchiato for triple cold weather.", type: 'normal' },
      { text: "Stay warm, stay close, stay caffeinated.", type: 'romantic' }
    ];

    let selection;
    if (temp >= 28) selection = hotPhrases[Math.floor(Math.random() * hotPhrases.length)];
    else if (temp >= 20) selection = warmPhrases[Math.floor(Math.random() * warmPhrases.length)];
    else if (temp >= 12) selection = coolPhrases[Math.floor(Math.random() * coolPhrases.length)];
    else selection = coldPhrases[Math.floor(Math.random() * coldPhrases.length)];

    return selection;
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const lat = 25.6208;
        const lon = 88.1264;
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`);
        const data = await response.json();

        const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
        const currentTemp = Math.round(data.current.temperature_2m);
        const hour = new Date().getHours();

        // Assume night is before 6 AM or after 6 PM
        const nightStatus = hour >= 18 || hour < 6;
        setIsNight(nightStatus);

        setWeather({ temperature: currentTemp, city: "Raiganj", country: "West Bengal", date: date, weatherCode: data.current.weather_code });

        const selection = getDrinkSuggestion(currentTemp);
        // Explicitly ensuring the type matches the state
        setSuggestion(selection || { text: '', type: 'normal' });

        setLoading(false);
      } catch (error) {
        console.error("Weather fetch error:", error);
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  if (loading || !weather) return null;

  const DecorComponent = suggestion.type === 'romantic' ? HeartDecor : LeafDecor;
  const decorColor = suggestion.type === 'romantic' ? 'text-red-500' : 'text-current';

  return (
    <ContainerWrapper>
      <StyledWrapper $isNight={isNight}>
        <div className="card">
          <div className="container">
            <div className="cloud front">
              <span className="left-front" />
              <span className="right-front" />
            </div>

            {isNight ? (
              <>
                <span className="moon" />
                <div className="stars">
                  <span className="star s1" />
                  <span className="star s2" />
                  <span className="star s3" />
                </div>
              </>
            ) : (
              <>
                <span className="sun sunshine" />
                <span className="sun" />
              </>
            )}

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
        {/* Decorations - switching between Heart and Leaf based on type */}
        <DecorComponent className="top-right-main">
          {suggestion.type === 'romantic' ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
              {/* Blobby Heart Path */}
              <path d="M256,464c-117.8,-75.7 -198.8,-139.7 -208.6,-220.1C39.4,179 46.5,123.6 86.6,83.9c50.8,-50.3 116.8,-15.8 132.4,1.4c29.6,32.7 54.4,26.5 74,1.4c15.6,-17.2 81.6,-51.7 132.4,-1.4c40.1,39.7 47.9,94.3 39.2,160C454.8,324.3 373.8,388.3 256,464z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.3 65.33" fill="currentColor"><path d="M13.98 52.87c0.37,-0.8 0.6,-1.74 0.67,-2.74 1.01,1.1 2.23,2.68 1.24,3.87 -0.22,0.26 -0.41,0.61 -0.59,0.97 -2.95,5.89 3.44,10.87 2.98,0.78 0.29,0.23 0.73,0.82 1.03,1.18 0.33,0.4 0.7,0.77 1,1.15 0.29,0.64 -0.09,2.68 1.77,4.91 5.42,6.5 5.67,-2.38 0.47,-4.62 -0.41,-0.18 -0.95,-0.26 -1.28,-0.54 -0.5,-0.41 -1.23,-1.37 -1.66,-1.9 0.03,-0.43 -0.17,-0.13 0.11,-0.33 4.98,1.72 8.4,-1.04 2.38,-3.16 -1.98,-0.7 -2.9,-0.36 -4.72,0.16 -0.63,-0.58 -2.38,-3.82 -2.82,-4.76 1.21,0.56 1.72,1.17 3.47,1.3 6.5,0.5 2.31,-4.21 -2.07,-4.04 -1.12,0.04 -1.62,0.37 -2.49,0.62l-1.25 -3.11c0.03,-0.26 0.01,-0.18 0.1,-0.28z" /></svg>
          )}
        </DecorComponent>
        <DecorComponent className="top-left-mirror">
          {suggestion.type === 'romantic' ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><path d="M256,464c-117.8,-75.7 -198.8,-139.7 -208.6,-220.1C39.4,179 46.5,123.6 86.6,83.9c50.8,-50.3 116.8,-15.8 132.4,1.4c29.6,32.7 54.4,26.5 74,1.4c15.6,-17.2 81.6,-51.7 132.4,-1.4c40.1,39.7 47.9,94.3 39.2,160C454.8,324.3 373.8,388.3 256,464z" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.3 65.33" fill="currentColor"><path d="M13.98 52.87c0.37,-0.8 0.6,-1.74 0.67,-2.74 1.01,1.1 2.23,2.68 1.24,3.87 -0.22,0.26 -0.41,0.61 -0.59,0.97 -2.95,5.89 3.44,10.87 2.98,0.78 0.29,0.23 0.73,0.82 1.03,1.18 0.33,0.4 0.7,0.77 1,1.15 0.29,0.64 -0.09,2.68 1.77,4.91 5.42,6.5 5.67,-2.38 0.47,-4.62 -0.41,-0.18 -0.95,-0.26 -1.28,-0.54 -0.5,-0.41 -1.23,-1.37 -1.66,-1.9 0.03,-0.43 -0.17,-0.13 0.11,-0.33 4.98,1.72 8.4,-1.04 2.38,-3.16 -1.98,-0.7 -2.9,-0.36 -4.72,0.16 -0.63,-0.58 -2.38,-3.82 -2.82,-4.76 1.21,0.56 1.72,1.17 3.47,1.3 6.5,0.5 2.31,-4.21 -2.07,-4.04 -1.12,0.04 -1.62,0.37 -2.49,0.62l-1.25 -3.11c0.03,-0.26 0.01,-0.18 0.1,-0.28z" /></svg>
          )}
        </DecorComponent>
        <DecorComponent className="right-mid">
          {suggestion.type === 'romantic' ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><path d="M256,464c-117.8,-75.7 -198.8,-139.7 -208.6,-220.1C39.4,179 46.5,123.6 86.6,83.9c50.8,-50.3 116.8,-15.8 132.4,1.4c29.6,32.7 54.4,26.5 74,1.4c15.6,-17.2 81.6,-51.7 132.4,-1.4c40.1,39.7 47.9,94.3 39.2,160C454.8,324.3 373.8,388.3 256,464z" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.3 65.33" fill="currentColor"><path d="M13.98 52.87c0.37,-0.8 0.6,-1.74 0.67,-2.74 1.01,1.1 2.23,2.68 1.24,3.87 -0.22,0.26 -0.41,0.61 -0.59,0.97 -2.95,5.89 3.44,10.87 2.98,0.78 0.29,0.23 0.73,0.82 1.03,1.18 0.33,0.4 0.7,0.77 1,1.15 0.29,0.64 -0.09,2.68 1.77,4.91 5.42,6.5 5.67,-2.38 0.47,-4.62 -0.41,-0.18 -0.95,-0.26 -1.28,-0.54 -0.5,-0.41 -1.23,-1.37 -1.66,-1.9 0.03,-0.43 -0.17,-0.13 0.11,-0.33 4.98,1.72 8.4,-1.04 2.38,-3.16 -1.98,-0.7 -2.9,-0.36 -4.72,0.16 -0.63,-0.58 -2.38,-3.82 -2.82,-4.76 1.21,0.56 1.72,1.17 3.47,1.3 6.5,0.5 2.31,-4.21 -2.07,-4.04 -1.12,0.04 -1.62,0.37 -2.49,0.62l-1.25 -3.11c0.03,-0.26 0.01,-0.18 0.1,-0.28z" /></svg>
          )}
        </DecorComponent>
        <DecorComponent className="left-mid">
          {suggestion.type === 'romantic' ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><path d="M256,464c-117.8,-75.7 -198.8,-139.7 -208.6,-220.1C39.4,179 46.5,123.6 86.6,83.9c50.8,-50.3 116.8,-15.8 132.4,1.4c29.6,32.7 54.4,26.5 74,1.4c15.6,-17.2 81.6,-51.7 132.4,-1.4c40.1,39.7 47.9,94.3 39.2,160C454.8,324.3 373.8,388.3 256,464z" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.3 65.33" fill="currentColor"><path d="M13.98 52.87c0.37,-0.8 0.6,-1.74 0.67,-2.74 1.01,1.1 2.23,2.68 1.24,3.87 -0.22,0.26 -0.41,0.61 -0.59,0.97 -2.95,5.89 3.44,10.87 2.98,0.78 0.29,0.23 0.73,0.82 1.03,1.18 0.33,0.4 0.7,0.77 1,1.15 0.29,0.64 -0.09,2.68 1.77,4.91 5.42,6.5 5.67,-2.38 0.47,-4.62 -0.41,-0.18 -0.95,-0.26 -1.28,-0.54 -0.5,-0.41 -1.23,-1.37 -1.66,-1.9 0.03,-0.43 -0.17,-0.13 0.11,-0.33 4.98,1.72 8.4,-1.04 2.38,-3.16 -1.98,-0.7 -2.9,-0.36 -4.72,0.16 -0.63,-0.58 -2.38,-3.82 -2.82,-4.76 1.21,0.56 1.72,1.17 3.47,1.3 6.5,0.5 2.31,-4.21 -2.07,-4.04 -1.12,0.04 -1.62,0.37 -2.49,0.62l-1.25 -3.11c0.03,-0.26 0.01,-0.18 0.1,-0.28z" /></svg>
          )}
        </DecorComponent>
        <DecorComponent className="bottom-right-decor">
          {suggestion.type === 'romantic' ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><path d="M256,464c-117.8,-75.7 -198.8,-139.7 -208.6,-220.1C39.4,179 46.5,123.6 86.6,83.9c50.8,-50.3 116.8,-15.8 132.4,1.4c29.6,32.7 54.4,26.5 74,1.4c15.6,-17.2 81.6,-51.7 132.4,-1.4c40.1,39.7 47.9,94.3 39.2,160C454.8,324.3 373.8,388.3 256,464z" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.3 65.33" fill="currentColor"><path d="M13.98 52.87c0.37,-0.8 0.6,-1.74 0.67,-2.74 1.01,1.1 2.23,2.68 1.24,3.87 -0.22,0.26 -0.41,0.61 -0.59,0.97 -2.95,5.89 3.44,10.87 2.98,0.78 0.29,0.23 0.73,0.82 1.03,1.18 0.33,0.4 0.7,0.77 1,1.15 0.29,0.64 -0.09,2.68 1.77,4.91 5.42,6.5 5.67,-2.38 0.47,-4.62 -0.41,-0.18 -0.95,-0.26 -1.28,-0.54 -0.5,-0.41 -1.23,-1.37 -1.66,-1.9 0.03,-0.43 -0.17,-0.13 0.11,-0.33 4.98,1.72 8.4,-1.04 2.38,-3.16 -1.98,-0.7 -2.9,-0.36 -4.72,0.16 -0.63,-0.58 -2.38,-3.82 -2.82,-4.76 1.21,0.56 1.72,1.17 3.47,1.3 6.5,0.5 2.31,-4.21 -2.07,-4.04 -1.12,0.04 -1.62,0.37 -2.49,0.62l-1.25 -3.11c0.03,-0.26 0.01,-0.18 0.1,-0.28z" /></svg>
          )}
        </DecorComponent>
        <DecorComponent className="bottom-left-decor">
          {suggestion.type === 'romantic' ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><path d="M256,464c-117.8,-75.7 -198.8,-139.7 -208.6,-220.1C39.4,179 46.5,123.6 86.6,83.9c50.8,-50.3 116.8,-15.8 132.4,1.4c29.6,32.7 54.4,26.5 74,1.4c15.6,-17.2 81.6,-51.7 132.4,-1.4c40.1,39.7 47.9,94.3 39.2,160C454.8,324.3 373.8,388.3 256,464z" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.3 65.33" fill="currentColor"><path d="M13.98 52.87c0.37,-0.8 0.6,-1.74 0.67,-2.74 1.01,1.1 2.23,2.68 1.24,3.87 -0.22,0.26 -0.41,0.61 -0.59,0.97 -2.95,5.89 3.44,10.87 2.98,0.78 0.29,0.23 0.73,0.82 1.03,1.18 0.33,0.4 0.7,0.77 1,1.15 0.29,0.64 -0.09,2.68 1.77,4.91 5.42,6.5 5.67,-2.38 0.47,-4.62 -0.41,-0.18 -0.95,-0.26 -1.28,-0.54 -0.5,-0.41 -1.23,-1.37 -1.66,-1.9 0.03,-0.43 -0.17,-0.13 0.11,-0.33 4.98,1.72 8.4,-1.04 2.38,-3.16 -1.98,-0.7 -2.9,-0.36 -4.72,0.16 -0.63,-0.58 -2.38,-3.82 -2.82,-4.76 1.21,0.56 1.72,1.17 3.47,1.3 6.5,0.5 2.31,-4.21 -2.07,-4.04 -1.12,0.04 -1.62,0.37 -2.49,0.62l-1.25 -3.11c0.03,-0.26 0.01,-0.18 0.1,-0.28z" /></svg>
          )}
        </DecorComponent>
        <DecorComponent className="bottom-mid">
          {suggestion.type === 'romantic' ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><path d="M256,464c-117.8,-75.7 -198.8,-139.7 -208.6,-220.1C39.4,179 46.5,123.6 86.6,83.9c50.8,-50.3 116.8,-15.8 132.4,1.4c29.6,32.7 54.4,26.5 74,1.4c15.6,-17.2 81.6,-51.7 132.4,-1.4c40.1,39.7 47.9,94.3 39.2,160C454.8,324.3 373.8,388.3 256,464z" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.3 65.33" fill="currentColor"><path d="M13.98 52.87c0.37,-0.8 0.6,-1.74 0.67,-2.74 1.01,1.1 2.23,2.68 1.24,3.87 -0.22,0.26 -0.41,0.61 -0.59,0.97 -2.95,5.89 3.44,10.87 2.98,0.78 0.29,0.23 0.73,0.82 1.03,1.18 0.33,0.4 0.7,0.77 1,1.15 0.29,0.64 -0.09,2.68 1.77,4.91 5.42,6.5 5.67,-2.38 0.47,-4.62 -0.41,-0.18 -0.95,-0.26 -1.28,-0.54 -0.5,-0.41 -1.23,-1.37 -1.66,-1.9 0.03,-0.43 -0.17,-0.13 0.11,-0.33 4.98,1.72 8.4,-1.04 2.38,-3.16 -1.98,-0.7 -2.9,-0.36 -4.72,0.16 -0.63,-0.58 -2.38,-3.82 -2.82,-4.76 1.21,0.56 1.72,1.17 3.47,1.3 6.5,0.5 2.31,-4.21 -2.07,-4.04 -1.12,0.04 -1.62,0.37 -2.49,0.62l-1.25 -3.11c0.03,-0.26 0.01,-0.18 0.1,-0.28z" /></svg>
          )}
        </DecorComponent>
        {suggestion.text}
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
  opacity: 0.95;
  filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.15));
  
  svg {
    width: 22px;
    height: auto;
  }
  
  &.top-right-main {
    top: -20px;
    right: -15px;
    color: hsl(var(--primary));
    transform: rotate(20deg);
  }

  &.top-left-mirror {
    top: -18px;
    left: -12px;
    color: hsl(var(--secondary));
    transform: rotate(-30deg) scaleX(-1);
  }

  &.right-mid {
    top: 50%;
    right: -18px;
    color: hsl(var(--accent));
    transform: rotate(90deg);
  }

  &.left-mid {
    top: 40%;
    left: -18px;
    color: hsl(var(--primary));
    transform: rotate(-90deg);
  }

  &.bottom-right-decor {
    bottom: -15px;
    right: -10px;
    color: hsl(var(--secondary));
    transform: rotate(135deg);
  }

  &.bottom-left-decor {
    bottom: -12px;
    left: -10px;
    color: hsl(var(--primary));
    transform: rotate(-135deg) scaleX(-1);
  }

  &.top-mid {
    top: -18px;
    left: 45%;
    color: hsl(var(--accent));
    transform: rotate(0deg);
  }

  &.bottom-mid {
    bottom: -16px;
    left: 40%;
    color: hsl(var(--secondary));
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

const StyledWrapper = styled.div<{ $isNight: boolean }>`
  transform: scale(0.65); 
  transform-origin: top left;
  margin-bottom: -70px;
  margin-right: -100px;
  transition: all 0.5s ease;

  .card {
    width: 350px;
    height: 235px;
    position: relative;
    padding: 25px;
    background: ${props => props.$isNight
    ? `radial-gradient(178.94% 106.41% at 26.42% 106.41%, #1B2947 0%, #2C3E50 71.88%), #1A202C` // Dark Night Gradient
    : `radial-gradient(178.94% 106.41% at 26.42% 106.41%, #FFF7B1 0%, rgba(255, 255, 255, 0) 71.88%), #FFFFFF` // Day Light Gradient
  };
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

  /* Cloud colors based on day/night */
  .right-front, .left-front, .right-back, .left-back {
    background-color: ${props => props.$isNight ? '#4B5563' : '#4c9beb'};
  }

  .right-front {
    width: 45px;
    height: 45px;
    border-radius: 50% 50% 50% 0%;
    display: inline-block;
    margin-left: -25px;
    z-index: 5;
  }

  .left-front {
    width: 65px;
    height: 65px;
    border-radius: 50% 50% 0% 50%;
    display: inline-block;
    z-index: 5;
  }

  .right-back {
    width: 50px;
    height: 50px;
    border-radius: 50% 50% 50% 0%;
    display: inline-block;
    margin-left: -20px;
    z-index: 5;
  }

  .left-back {
    width: 30px;
    height: 30px;
    border-radius: 50% 50% 0% 50%;
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
  
  /* Moon Styling */
  .moon {
    width: 100px;
    height: 100px;
    background: linear-gradient(to right, #D1D5DB, #E5E7EB);
    border-radius: 60px;
    display: inline;
    position: absolute;
    box-shadow: 0 0 20px rgba(255,255,255, 0.3);
  }

  .stars {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
  }

  .star {
    position: absolute;
    background: white;
    border-radius: 50%;
    opacity: 0.8;
    animation: twinkle 3s infinite ease-in-out;
  }
  .s1 { width: 3px; height: 3px; top: 10px; right: 40px; animation-delay: 0s; }
  .s2 { width: 2px; height: 2px; top: 80px; left: 20px; animation-delay: 1s; }
  .s3 { width: 3px; height: 3px; bottom: 20px; right: 60px; animation-delay: 2s; }

  @keyframes twinkle {
    0%, 100% { opacity: 0.8; transform: scale(1); }
    50% { opacity: 0.3; transform: scale(0.8); }
  }

  @keyframes sunshines {
    0% { transform: scale(1); opacity: 0.6; }
    100% { transform: scale(1.4); opacity: 0; }
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
    color: ${props => props.$isNight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(87, 77, 51, 0.66)'};
  }

  .card-header span:last-child {
    font-weight: 700;
    font-size: 15px;
    line-height: 135%;
    color: ${props => props.$isNight ? 'rgba(255, 255, 255, 0.5)' : 'rgba(87, 77, 51, 0.33)'};
  }

  .temp {
    position: absolute;
    left: 25px;
    bottom: 12px;
    font-weight: 700;
    font-size: 64px;
    line-height: 77px;
    color: ${props => props.$isNight ? 'rgba(255, 255, 255, 1)' : 'rgba(87, 77, 51, 1)'};
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
    background: ${props => props.$isNight ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'};
    border-radius: 9px;
  }

  .temp-scale span {
    font-weight: 700;
    font-size: 13px;
    line-height: 134.49%;
    color: ${props => props.$isNight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(87, 77, 51, 0.66)'};
  }
`;

// Heart decoration with dripping effect
const HeartDecor = styled.div`
  position: absolute;
  z-index: -1;
  opacity: 0.9;
  filter: drop-shadow(1px 2px 3px rgba(0,0,0,0.2));
  
  svg {
    width: 24px;
    height: auto;
    fill: currentColor;
  }
  
  &.top-right-main {
    top: -12px;
    right: -8px;
    color: #ef4444; 
    // transform: rotate(10deg);
    transform-origin: bottom center;
    animation: drip 3s infinite ease-in-out;
  }

  &.top-left-mirror {
    top: -10px;
    left: -6px;
    color: #ec4899; 
    // transform: rotate(-10deg);
    transform-origin: bottom center;
    animation: drip 3s infinite ease-in-out 1.5s;
  }

  &.right-mid {
    top: 50%;
    right: -12px;
    color: #f43f5e; 
    // transform: rotate(90deg);
    transform-origin: bottom center;
    animation: drip 3.5s infinite ease-in-out 0.5s;
  }

  &.left-mid {
    top: 40%;
    left: -12px;
    color: #d946ef; 
    // transform: rotate(-90deg);
    transform-origin: bottom center;
    animation: drip 3.5s infinite ease-in-out 2s;
  }

  &.bottom-right-decor {
    bottom: -8px;
    right: -6px;
    color: #ef4444;
    // transform: rotate(135deg);
    transform-origin: bottom center;
    animation: drip 4s infinite ease-in-out 1s;
  }

  &.bottom-left-decor {
    bottom: -6px;
    left: -6px;
    color: #ec4899;
    // transform: rotate(-135deg);
    transform-origin: bottom center;
    animation: drip 4s infinite ease-in-out 2.5s;
  }

  &.bottom-mid {
    bottom: -10px;
    left: 45%;
    color: #f43f5e;
    // transform: rotate(180deg);
    transform-origin: top center;
    animation: drip 3s infinite ease-in-out 1.5s;
  }

  /* Drip animation that grows "out" from the anchor point (tip) */
  @keyframes drip {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-3px) scale(1.1); }
  }
`;

export default WeatherCard;

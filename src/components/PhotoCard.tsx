'use client';

import React from 'react';
import styled from 'styled-components';
import { AsterasiaLogo } from './icons';

const PhotoCard = () => {
    return (
        <StyledWrapper>
            <div className="card-container">
                {/* Leaf decorations around the card */}
                <LeafDecor className="top-right-main">
                    <AsterasiaLogo />
                </LeafDecor>
                <LeafDecor className="top-left-mirror">
                    <AsterasiaLogo />
                </LeafDecor>
                <LeafDecor className="right-mid">
                    <AsterasiaLogo />
                </LeafDecor>
                <LeafDecor className="left-mid">
                    <AsterasiaLogo />
                </LeafDecor>
                <LeafDecor className="bottom-right-decor">
                    <AsterasiaLogo />
                </LeafDecor>
                <LeafDecor className="bottom-left-decor">
                    <AsterasiaLogo />
                </LeafDecor>

                <div className="card">
                    <div className="image" />
                </div>
            </div>
        </StyledWrapper>
    );
};

// Leaf decoration on borders (similar to weather card)
const LeafDecor = styled.div`
  position: absolute;
  z-index: -1;
  opacity: 0.7;
  filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.1));
  
  svg {
    width: 22px;
    height: auto;
    fill: currentColor;
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
`;

const StyledWrapper = styled.div`
  .card-container {
    position: relative;
    width: 180px;
  }

  .card {
    width: 100%;
    aspect-ratio: 3 / 4;
    border-radius: 24px;
    background: hsl(var(--card));
    border: 3px solid hsl(var(--border));
    padding: 8px;
    box-shadow: 
      0 4px 20px rgba(0, 0, 0, 0.08),
      0 8px 32px rgba(0, 0, 0, 0.04);
    transition: all 0.3s ease;
    overflow: hidden;

    &:hover {
      transform: translateY(-4px) rotate(2deg);
      box-shadow: 
        0 8px 30px rgba(0, 0, 0, 0.12),
        0 16px 48px rgba(0, 0, 0, 0.08);
    }
  }

  .image {
    width: 100%;
    height: 100%;
    border-radius: 16px;
    background-image: url('/assets/aiks.jpg');
    background-size: cover;
    background-position: center top;
  }
`;

export default PhotoCard;

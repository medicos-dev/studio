'use client';

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

// The exact leaf SVG from weather card
const LeafSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.3 65.33" fill="currentColor">
        <path d="M13.98 52.87c0.37,-0.8 0.6,-1.74 0.67,-2.74 1.01,1.1 2.23,2.68 1.24,3.87 -0.22,0.26 -0.41,0.61 -0.59,0.97 -2.95,5.89 3.44,10.87 2.98,0.78 0.29,0.23 0.73,0.82 1.03,1.18 0.33,0.4 0.7,0.77 1,1.15 0.29,0.64 -0.09,2.68 1.77,4.91 5.42,6.5 5.67,-2.38 0.47,-4.62 -0.41,-0.18 -0.95,-0.26 -1.28,-0.54 -0.5,-0.41 -1.23,-1.37 -1.66,-1.9 0.03,-0.43 -0.17,-0.13 0.11,-0.33 4.98,1.72 8.4,-1.04 2.38,-3.16 -1.98,-0.7 -2.9,-0.36 -4.72,0.16 -0.63,-0.58 -2.38,-3.82 -2.82,-4.76 1.21,0.56 1.72,1.17 3.47,1.3 6.5,0.5 2.31,-4.21 -2.07,-4.04 -1.12,0.04 -1.62,0.37 -2.49,0.62l-1.25 -3.11c0.03,-0.26 0.01,-0.18 0.1,-0.28z" />
    </svg>
);

const PhotoCard = () => {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, 500);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <StyledWrapper ref={containerRef}>
            <div className="card-container">
                <LeafDecor className="top-right-main" $isVisible={isVisible}><LeafSvg /></LeafDecor>
                <LeafDecor className="top-left-mirror" $isVisible={isVisible}><LeafSvg /></LeafDecor>
                <LeafDecor className="top-mid" $isVisible={isVisible}><LeafSvg /></LeafDecor>
                <LeafDecor className="right-mid" $isVisible={isVisible}><LeafSvg /></LeafDecor>
                <LeafDecor className="right-upper" $isVisible={isVisible}><LeafSvg /></LeafDecor>
                <LeafDecor className="right-lower" $isVisible={isVisible}><LeafSvg /></LeafDecor>
                <LeafDecor className="left-mid" $isVisible={isVisible}><LeafSvg /></LeafDecor>
                <LeafDecor className="left-upper" $isVisible={isVisible}><LeafSvg /></LeafDecor>
                <LeafDecor className="left-lower" $isVisible={isVisible}><LeafSvg /></LeafDecor>
                <LeafDecor className="bottom-right-decor" $isVisible={isVisible}><LeafSvg /></LeafDecor>
                <LeafDecor className="bottom-left-decor" $isVisible={isVisible}><LeafSvg /></LeafDecor>
                <LeafDecor className="bottom-mid" $isVisible={isVisible}><LeafSvg /></LeafDecor>

                <div className="card">
                    <div className="image" />
                </div>
            </div>
        </StyledWrapper>
    );
};

const LeafDecor = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  z-index: 10;
  filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.15));
  opacity: ${props => props.$isVisible ? 0.95 : 0};
  transition: opacity 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
              transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  svg {
    width: 22px;
    height: auto;
  }
  
  &.top-right-main {
    top: -20px;
    right: -15px;
    color: hsl(var(--primary));
    transform: ${props => props.$isVisible ? 'scale(1) rotate(20deg)' : 'scale(0) rotate(20deg)'};
  }

  &.top-left-mirror {
    top: -18px;
    left: -12px;
    color: hsl(var(--secondary));
    transform: ${props => props.$isVisible ? 'scale(1) rotate(-30deg) scaleX(-1)' : 'scale(0) rotate(-30deg) scaleX(-1)'};
  }

  &.top-mid {
    top: -18px;
    left: 45%;
    color: hsl(var(--accent));
    transform: ${props => props.$isVisible ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(0deg)'};
  }

  &.right-mid {
    top: 50%;
    right: -18px;
    color: hsl(var(--accent));
    transform: ${props => props.$isVisible ? 'scale(1) rotate(90deg)' : 'scale(0) rotate(90deg)'};
  }

  &.right-upper {
    top: 25%;
    right: -16px;
    color: hsl(var(--primary));
    transform: ${props => props.$isVisible ? 'scale(1) rotate(70deg)' : 'scale(0) rotate(70deg)'};
  }

  &.right-lower {
    top: 70%;
    right: -16px;
    color: hsl(var(--secondary));
    transform: ${props => props.$isVisible ? 'scale(1) rotate(110deg)' : 'scale(0) rotate(110deg)'};
  }

  &.left-mid {
    top: 40%;
    left: -18px;
    color: hsl(var(--primary));
    transform: ${props => props.$isVisible ? 'scale(1) rotate(-90deg)' : 'scale(0) rotate(-90deg)'};
  }

  &.left-upper {
    top: 20%;
    left: -16px;
    color: hsl(var(--accent));
    transform: ${props => props.$isVisible ? 'scale(1) rotate(-70deg)' : 'scale(0) rotate(-70deg)'};
  }

  &.left-lower {
    top: 65%;
    left: -16px;
    color: hsl(var(--secondary));
    transform: ${props => props.$isVisible ? 'scale(1) rotate(-110deg)' : 'scale(0) rotate(-110deg)'};
  }

  &.bottom-right-decor {
    bottom: -15px;
    right: -10px;
    color: hsl(var(--secondary));
    transform: ${props => props.$isVisible ? 'scale(1) rotate(135deg)' : 'scale(0) rotate(135deg)'};
  }

  &.bottom-left-decor {
    bottom: -12px;
    left: -10px;
    color: hsl(var(--primary));
    transform: ${props => props.$isVisible ? 'scale(1) rotate(-135deg) scaleX(-1)' : 'scale(0) rotate(-135deg) scaleX(-1)'};
  }

  &.bottom-mid {
    bottom: -16px;
    left: 40%;
    color: hsl(var(--secondary));
    transform: ${props => props.$isVisible ? 'scale(1) rotate(180deg)' : 'scale(0) rotate(180deg)'};
  }
`;

const StyledWrapper = styled.div`
  .card-container {
    position: relative;
    width: 180px;
    overflow: visible;
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
    position: relative;
    z-index: 1;

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

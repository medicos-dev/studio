'use client';

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from 'next-themes';

// Sample songs - user can update these with actual playlist songs
const playlistSongs = [
  { title: "Coffee & Chill", artist: "Lo-Fi Beats", isPlaying: true },
  { title: "Morning Brew", artist: "Café Sessions", isPlaying: false },
  { title: "Smooth Jazz Vibes", artist: "Acoustic Mood", isPlaying: false },
  { title: "Rainy Day Dreams", artist: "Ambient Sounds", isPlaying: false },
];

const SpotifyWidget = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const playlistUrl = "https://open.spotify.com/playlist/4xqaDMF4E9zFOoENyZQ9Fk?si=f7fd3ecf2e2a47a0";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Inverted logic: 
  // If website is Light -> Widget is Dark
  // If website is Dark -> Widget is Light
  const isWidgetDark = resolvedTheme === 'light';

  return (
    <WidgetContainer>
      <GlassCard href={playlistUrl} target="_blank" rel="noopener noreferrer" $isDark={isWidgetDark}>
        {/* Header */}
        <CardHeader $isDark={isWidgetDark}>
          <SpotifyLogo viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </SpotifyLogo>
          <HeaderText>
            <PlaylistName $isDark={isWidgetDark}>Asterasia Vibes</PlaylistName>
            <PlaylistMeta $isDark={isWidgetDark}>Café Playlist • 4 tracks</PlaylistMeta>
          </HeaderText>
        </CardHeader>

        {/* Song List */}
        <SongList>
          {playlistSongs.map((song, index) => (
            <SongItem key={index} $isPlaying={song.isPlaying} $isDark={isWidgetDark}>
              <SongNumber $isPlaying={song.isPlaying} $isDark={isWidgetDark}>
                {song.isPlaying ? (
                  <EqualizerMini>
                    <MiniBar $delay="0s" />
                    <MiniBar $delay="0.15s" />
                    <MiniBar $delay="0.3s" />
                  </EqualizerMini>
                ) : (
                  <span>{index + 1}</span>
                )}
              </SongNumber>
              <SongInfo>
                <SongTitle $isPlaying={song.isPlaying} $isDark={isWidgetDark}>{song.title}</SongTitle>
                <SongArtist $isDark={isWidgetDark}>{song.artist}</SongArtist>
              </SongInfo>
            </SongItem>
          ))}
        </SongList>

        {/* Footer */}
        <CardFooter $isDark={isWidgetDark}>
          <PlayButton>
            <PlayIcon viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </PlayIcon>
            <span>View more</span>
          </PlayButton>
        </CardFooter>
      </GlassCard>
    </WidgetContainer>
  );
};

// Animations
const bounce = keyframes`
  0%, 100% { transform: scaleY(0.4); }
  50% { transform: scaleY(1); }
`;

// Styled Components
const WidgetContainer = styled.div`
  position: absolute;
  bottom: 140px; /* Lifted up significantly */
  right: 50px; /* Moved even closer to right */
  z-index: 40;

  @media (max-width: 1024px) {
    display: none; 
  }
`;

const GlassCard = styled.a<{ $isDark: boolean }>`
  display: flex;
  flex-direction: column;
  width: 340px; /* Even Broader width */
  padding: 10px 16px; /* Reduced vertical padding further */
  /* Light Website -> Dark Widget (rgba(0,0,0,0.4)) */
  /* Dark Website -> Light Widget (rgba(255,255,255,0.4)) */
  background: ${props => props.$isDark ? 'rgba(18, 18, 18, 0.4)' : 'rgba(255, 255, 255, 0.4)'};
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-radius: 16px;
  border: 1px solid ${props => props.$isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'};
  box-shadow: ${props => props.$isDark
    ? '0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.03)'
    : '0 8px 32px rgba(0, 0, 0, 0.05), 0 2px 8px rgba(0, 0, 0, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.25)'};
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.$isDark
    ? '0 12px 40px rgba(29, 185, 84, 0.15), 0 4px 12px rgba(0, 0, 0, 0.3)'
    : '0 12px 40px rgba(29, 185, 84, 0.15), 0 4px 12px rgba(0, 0, 0, 0.05)'};
    border-color: rgba(29, 185, 84, 0.2);
  }
`;

const CardHeader = styled.div<{ $isDark: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 6px; /* Reduced padding */
  border-bottom: 1px solid ${props => props.$isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)'};
  margin-bottom: 4px; /* Reduced margin */
`;

const SpotifyLogo = styled.svg`
  width: 22px; /* Slightly smaller logo to fit compact height */
  height: 22px;
  color: #1DB954;
  flex-shrink: 0;
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px; /* Removed gap */
`;

const PlaylistName = styled.span<{ $isDark: boolean }>`
  font-size: 13px;
  font-weight: 600;
  color: ${props => props.$isDark ? '#fff' : '#000'};
  letter-spacing: -0.01em;
`;

const PlaylistMeta = styled.span<{ $isDark: boolean }>`
  font-size: 10px;
  color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'};
`;

const SongList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px; /* Tighter gap */
`;

const SongItem = styled.div<{ $isPlaying: boolean; $isDark: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 6px; /* Tight padding */
  border-radius: 6px;
  background: ${props => props.$isPlaying ? 'rgba(29, 185, 84, 0.1)' : 'transparent'};
  transition: background 0.2s;

  &:hover {
    background: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
  }
`;

const SongNumber = styled.div<{ $isPlaying: boolean; $isDark: boolean }>`
  width: 20px;
  font-size: 11px;
  /* Active: Green in dark mode, Orange-Brown in light widget mode */
  color: ${props => props.$isPlaying
    ? (props.$isDark ? '#1DB954' : 'rgba(224, 121, 18, 0.76)')
    : (props.$isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)')};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EqualizerMini = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 12px;
`;

const MiniBar = styled.div<{ $delay: string; $isDark?: boolean }>`
  width: 3px;
  height: 100%;
  background: #1DB954;
  border-radius: 1px;
  transform-origin: bottom;
  animation: ${bounce} 1s ease-in-out infinite; 
  animation-delay: ${props => props.$delay};
`;

const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
  overflow: hidden;
`;

const SongTitle = styled.span<{ $isPlaying: boolean; $isDark: boolean }>`
  font-size: 12px;
  font-weight: 500;
  /* Active: Green in dark mode, Orange-Brown in light widget mode */
  color: ${props => props.$isPlaying
    ? (props.$isDark ? '#1DB954' : 'rgba(0, 0, 0, 1)')
    : (props.$isDark ? '#fff' : '#000')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SongArtist = styled.span<{ $isDark: boolean }>`
  font-size: 10px;
  color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardFooter = styled.div<{ $isDark: boolean }>`
  padding-top: 8px; /* Reduced */
  margin-top: 6px; /* Reduced */
  border-top: 1px solid ${props => props.$isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)'};
  display: flex;
  justify-content: flex-end; /* Align button to right or keep centered? Keeping centered button logic */
`;

const PlayButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px; /* Smaller button padding */
  background: #1DB954;
  border-radius: 24px;
  transition: all 0.2s;
  width: 100%; /* Full width button in compact view looks clean */

  span {
    font-size: 11px;
    font-weight: 600;
    color: #fff; 
  }

  &:hover {
    background: #1ed760;
    transform: scale(1.02);
  }
`;

const PlayIcon = styled.svg`
  width: 14px;
  height: 14px;
  color: #fff;
`;

export default SpotifyWidget;

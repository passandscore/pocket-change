import { useEffect, useState, useRef } from "react";
import { useWindowSize } from "usehooks-ts";
import { Center, Image, useMantineColorScheme } from "@mantine/core";
import styled from "@emotion/styled";
import { GithubIcon, TwitterIcon, LinkedInIcon, DiscordIcon } from "./icons";
import {
  spinLeft,
  spinRight,
  fadeLeft,
  fadeRight,
  fadeIn,
  fadeOut,
  pulse,
} from "./keyframes";

const AVATAR_IMAGE = "images/avatar.jpeg";

export const SOCIAL_MEDIA = {
  twitter: "https://twitter.com/passandscore",
  linkedin: "https://www.linkedin.com/in/jason-schwarz-75b91482/",
  github: "https://github.com/passandscore",
  discord: "https://discord.gg/jXPnv2t5mN",
};

const SocialContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const SocialsMenu = () => {
  const [hovered, setHovered] = useState(false);
  const [isRow, setIsRow] = useState(false);

  const { width, height } = useWindowSize();
  const { colorScheme } = useMantineColorScheme();

  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (width < 1000) {
      if (isRow) return;
      setIsRow(true);
    } else {
      setIsRow(false);
    }
  }, [width]);

  const hideSocialsByScreenWidth = height < 700;

  const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ef8c01;
    width: 60px;
    height: 60px;
    cursor: pointer;
    border-radius: 50%;
    &:hover {
      opacity: 0.8;
      animation: ${pulse} 1.3s ease-in-out;
      background-color: transparent;
    }

    &:hover svg {
      stroke: ${colorScheme === "dark" ? "white" : "black"};
    }
  `;

  const StyledContainer = styled.div`
    grid-gap: 30px;
    position: absolute;
    bottom: 30px;
    right: 50px;
    cursor: pointer;

    &:hover #avatar {
      border: 1px solid white;
      animation: ${isRow ? spinLeft : spinRight} 1s ease-in-out;
    }

    &:not(:hover) #avatar {
      border: 1px solid ${colorScheme === "dark" ? "white" : "black"};
      animation: ${isRow ? spinRight : spinLeft} 1s ease-in-out;
    }

    &:hover #twitter {
      animation: ${isRow ? fadeLeft : fadeIn} 0.6s ease-in-out;
    }

    &:hover #linkedin {
      animation: ${isRow ? fadeLeft : fadeIn} 1s ease-in-out;
    }

    &:hover #github {
      animation: ${isRow ? fadeLeft : fadeIn} 1.3s ease-in-out;
    }

    &:hover #discord {
      animation: ${isRow ? fadeLeft : fadeIn} 1.6s ease-in-out;
    }

    &:not(:hover) #twitter {
      animation: ${isRow ? fadeRight : fadeOut} 1.6s ease-in-out;
      opacity: 0;
    }

    &:not(:hover) #linkedin {
      animation: ${isRow ? fadeRight : fadeOut} 1.3s ease-in-out;
      opacity: 0;
    }

    &:not(:hover) #github {
      animation: ${isRow ? fadeRight : fadeOut} 0.9s ease-in-out;
      opacity: 0;
    }

    &:not(:hover) #discord {
      animation: ${isRow ? fadeRight : fadeOut} 0.6s ease-in-out;
      opacity: 0;
    }
  `;

  return (
    <StyledContainer
      style={{
        display: hideSocialsByScreenWidth ? "none" : "flex",
        flexDirection: isRow ? "row" : "column",
      }}
      onMouseLeave={() => {
        if (avatarRef?.current) {
          avatarRef.current.style.animationPlayState = "paused";
        }
        setTimeout(() => {
          setHovered(false);
        }, 1000);
      }}
    >
      {hovered && (
        <>
          {/* Discord */}
          <SocialContainer id="discord">
            <IconContainer
              onClick={() => window.open(SOCIAL_MEDIA.discord, "_blank")}
            >
              {DiscordIcon(40, 40, "white", 1)}
            </IconContainer>
          </SocialContainer>

          {/* Github */}
          <SocialContainer id="github">
            <IconContainer
              onClick={() => window.open(SOCIAL_MEDIA.github, "_blank")}
            >
              {GithubIcon(40, 40, "white", 1)}
            </IconContainer>
          </SocialContainer>

          {/* LinkedIn */}
          <SocialContainer id="linkedin">
            <IconContainer
              onClick={() => window.open(SOCIAL_MEDIA.linkedin, "_blank")}
            >
              {LinkedInIcon(40, 40, "white", 1)}
            </IconContainer>
          </SocialContainer>

          {/* Twitter */}
          <SocialContainer id="twitter">
            <IconContainer
              onClick={() => window.open(SOCIAL_MEDIA.twitter, "_blank")}
            >
              {TwitterIcon(40, 40, "white", 1)}
            </IconContainer>
          </SocialContainer>
        </>
      )}

      {/* Avatar */}
      <Center
        id="avatar"
        ref={avatarRef}
        style={{
          borderRadius: "50%",
          overflow: "hidden",
        }}
        onMouseOver={() => setHovered(true)}
      >
        <Image
          src={AVATAR_IMAGE}
          alt="it's me"
          fit="contain"
          style={{
            width: "70px",
            height: "70px",
          }}
        />
      </Center>
    </StyledContainer>
  );
};

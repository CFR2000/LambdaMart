// @ts-nocheck
import React from "react";
import { Link, HeadFC, PageProps } from "gatsby";
import Layout from "../layouts/page-layout";
import CallToAction from "../components/presentation/CallToAction";
import { Box, BoxProps, Button, Icon, IconProps } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";
import { ReactSVG } from "react-svg";
import styled from "@emotion/styled";

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <CallToAction
        heading="Page not found"
        text="You just hit a route that doesn&#39;t exist... the sadness."
        button={
          <Button
            as={Link}
            to="/"
            w="full"
            variant="solid"
            colorScheme="primary"
          >
            Return home
          </Button>
        }
        image={
          <Illustration
            height={{ base: "24rem", sm: "30rem", lg: "36rem" }}
            mt={{ base: 4, sm: 8 }}
            width="100%"
          />
        }
      />
    </Layout>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => (
  <>
    <title>Not found</title>
  </>
);

const StyledIcon = styled(Icon)`
  width: 100%;
  height: 100%;
  :not(.animated) .animable {
    opacity: 0;
  }
  /* > .animated #freepik--Astronaut--inject-15 {
    animation: 6s Infinite linear wind;
    animation-delay: 0s;
  } */
  .animated-rocket {
    animation: 12s Infinite cubic-bezier(0.45, 0.05, 0.55, 0.95) wind;
    animation-delay: 50ms;
  }
  .animated-astronaut {
    animation: 12s Infinite ease wind;
    animation-delay: 0s;
  }
  @keyframes wind {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(2deg);
    }
    75% {
      transform: rotate(-2deg);
    }
  }
  .animator-hidden {
    display: none;
  }
`;

// <a href="https://storyset.com/web">Web illustrations by Storyset</a>
const Illustration = (props: BoxProps) => (
  <Box {...props}>
    <StyledIcon
      xmlns="http://www.w3.org/2000/svg"
      className="animated"
      version="1.1"
      viewBox="0 0 500 500"
    >
      <g
        className="animable animator-hidden"
        style={{
          WebkitTransformOrigin: 250,
          MsTransformOrigin: 250,
          transformOrigin: 250,
        }}
      >
        <path
          d="M238.4 445.05H45.3a5.71 5.71 0 01-5.71-5.71V60.66A5.71 5.71 0 0145.3 55h193.1a5.71 5.71 0 015.71 5.71v378.63a5.71 5.71 0 01-5.71 5.71zM45.3 55.2a5.47 5.47 0 00-5.46 5.46v378.68a5.47 5.47 0 005.46 5.46h193.1a5.47 5.47 0 005.46-5.46V60.66a5.47 5.47 0 00-5.46-5.46z"
          style={{
            WebkitTransformOrigin: 141.85,
            MsTransformOrigin: 141.85,
            transformOrigin: 141.85,
          }}
          fill="#EBEBEB"
          className="animable"
        ></path>
        <path
          d="M454.7 445.05H261.6a5.71 5.71 0 01-5.71-5.71V60.66A5.71 5.71 0 01261.6 55h193.1a5.71 5.71 0 015.71 5.71v378.63a5.71 5.71 0 01-5.71 5.71zM261.6 55.2a5.47 5.47 0 00-5.46 5.46v378.68a5.47 5.47 0 005.46 5.46h193.1a5.47 5.47 0 005.46-5.46V60.66a5.47 5.47 0 00-5.46-5.46z"
          style={{
            WebkitTransformOrigin: 358.15,
            MsTransformOrigin: 358.15,
            transformOrigin: 358.15,
          }}
          fill="#EBEBEB"
          className="animable"
        ></path>
        <path
          style={{
            WebkitTransformOrigin: 113.055,
            MsTransformOrigin: 113.055,
            transformOrigin: 113.055,
          }}
          fill="#EBEBEB"
          d="M113.05 168.25L114.67 171.52 118.29 172.05 115.67 174.6 116.29 178.2 113.05 176.5 109.82 178.2 110.44 174.6 107.82 172.05 111.44 171.52 113.05 168.25z"
          className="animable"
        ></path>
        <path
          style={{
            WebkitTransformOrigin: 436.705,
            MsTransformOrigin: 436.705,
            transformOrigin: 436.705,
          }}
          fill="#F5F5F5"
          d="M436.7 322.48L438.32 325.76 441.94 326.29 439.32 328.83 439.94 332.44 436.7 330.74 433.47 332.44 434.09 328.83 431.47 326.29 435.09 325.76 436.7 322.48z"
          className="animable"
        ></path>
        <path
          style={{
            WebkitTransformOrigin: 372.6,
            MsTransformOrigin: 372.6,
            transformOrigin: 372.6,
          }}
          fill="#F5F5F5"
          d="M372.6 417.57L374.22 420.84 377.83 421.37 375.21 423.92 375.83 427.52 372.6 425.82 369.37 427.52 369.98 423.92 367.37 421.37 370.98 420.84 372.6 417.57z"
          className="animable"
        ></path>
        <path
          d="M225.94 110.15l.6 1.22 1.35.2a.4.4 0 01.22.69l-1 .95.23 1.34a.41.41 0 01-.59.43l-1.2-.64-1.2.64a.41.41 0 01-.59-.43l.22-1.34-1-.95a.4.4 0 01.23-.69l1.34-.2.6-1.22a.41.41 0 01.79 0z"
          style={{
            WebkitTransformOrigin: 225.546,
            MsTransformOrigin: 225.546,
            transformOrigin: 225.546,
          }}
          fill="#EBEBEB"
          className="animable"
        ></path>
        <path
          d="M60.78 402l.6 1.21 1.34.2a.41.41 0 01.23.7l-1 .94.23 1.34a.41.41 0 01-.59.43l-1.2-.63-1.2.63a.41.41 0 01-.59-.43l.23-1.34-1-.94a.41.41 0 01.22-.7l1.34-.2L60 402a.41.41 0 01.78 0z"
          style={{
            WebkitTransformOrigin: 60.3893,
            MsTransformOrigin: 60.3893,
            transformOrigin: 60.3893,
          }}
          fill="#F5F5F5"
          className="animable"
        ></path>
        <path
          d="M87.75 97.3l.6 1.22 1.35.19a.41.41 0 01.22.7l-1 1 .23 1.33a.4.4 0 01-.59.43l-1.2-.63-1.2.63a.4.4 0 01-.59-.43l.22-1.33-1-1a.41.41 0 01.23-.7l1.34-.19.64-1.22a.41.41 0 01.75 0z"
          style={{
            WebkitTransformOrigin: 87.3557,
            MsTransformOrigin: 87.3557,
            transformOrigin: 87.3557,
          }}
          fill="#EBEBEB"
          className="animable"
        ></path>
        <path
          d="M86.13 338.32A1.33 1.33 0 1184.8 337a1.33 1.33 0 011.33 1.32z"
          style={{
            WebkitTransformOrigin: 84.8,
            MsTransformOrigin: 84.8,
            transformOrigin: 84.8,
          }}
          fill="#EBEBEB"
          className="animable"
        ></path>
        <path
          d="M275.67 171.89a1.33 1.33 0 11-1.33-1.32 1.32 1.32 0 011.33 1.32z"
          style={{
            WebkitTransformOrigin: 274.34,
            MsTransformOrigin: 274.34,
            transformOrigin: 274.34,
          }}
          fill="#EBEBEB"
          className="animable"
        ></path>
        <path
          d="M206.71 98.4a1.33 1.33 0 11-1.33-1.33 1.34 1.34 0 011.33 1.33z"
          style={{
            WebkitTransformOrigin: 205.38,
            MsTransformOrigin: 205.38,
            transformOrigin: 205.38,
          }}
          fill="#F5F5F5"
          className="animable"
        ></path>
        <circle
          cx="207.14"
          cy="415.38"
          r="7.35"
          style={{
            WebkitTransformOrigin: 207.14,
            MsTransformOrigin: 207.14,
            transformOrigin: 207.14,
          }}
          fill="#F0F0F0"
          className="animable"
          transform="rotate(-13.28)"
        ></circle>
        <path
          d="M204.6 411.09a7.09 7.09 0 00-4.19 1.36 7.34 7.34 0 0010.5 9.23 7.17 7.17 0 00-6.31-10.58z"
          style={{
            WebkitTransformOrigin: 205.786,
            MsTransformOrigin: 205.786,
            transformOrigin: 205.786,
          }}
          fill="#E6E6E6"
          className="animable"
        ></path>
      </g>
      <g
        className="animable"
        style={{
          WebkitTransformOrigin: 251.415,
          MsTransformOrigin: 251.415,
          transformOrigin: 251.415,
        }}
      >
        <path
          d="M147.68 287.64H86.83v-27.47l60.85-72.34h29.12v73.9h15.09v25.91H176.8v22.48h-29.12zm0-25.91v-37.84l-32.16 37.84z"
          style={{
            WebkitTransformOrigin: 139.36,
            MsTransformOrigin: 139.36,
            transformOrigin: 139.36,
          }}
          fill="#8978E9"
          className="animable"
        ></path>
        <path
          d="M202.3 249.51q0-34.29 12.34-48t37.61-13.7q12.13 0 19.93 3a36.79 36.79 0 0112.71 7.79 41.59 41.59 0 017.75 10.09 52.38 52.38 0 014.55 12.34 115.36 115.36 0 013.36 28q0 32.72-11.07 47.89t-38.13 15.18q-15.18 0-24.53-4.84a39.76 39.76 0 01-15.33-14.19q-4.35-6.64-6.77-18.17a124.33 124.33 0 01-2.42-25.39zm33.14.08q0 23 4.05 31.37t11.77 8.41a12.34 12.34 0 008.82-3.57q3.74-3.57 5.5-11.28t1.76-24q0-23.94-4.06-32.19t-12.18-8.24q-8.28 0-12 8.41t-3.66 31.09z"
          style={{
            WebkitTransformOrigin: 251.423,
            MsTransformOrigin: 251.423,
            transformOrigin: 251.423,
          }}
          fill="#8978E9"
          className="animable"
        ></path>
        <path
          d="M371.74 287.64h-60.85v-27.47l60.85-72.34h29.12v73.9H416v25.91h-15.14v22.48h-29.12zm0-25.91v-37.84l-32.15 37.84z"
          style={{
            WebkitTransformOrigin: 363.445,
            MsTransformOrigin: 363.445,
            transformOrigin: 363.445,
          }}
          fill="#8978E9"
          className="animable"
        ></path>
      </g>
      <g
        className="animable"
        style={{
          WebkitTransformOrigin: 247.91,
          MsTransformOrigin: 247.91,
          transformOrigin: 247.91,
        }}
      >
        <g
          style={{
            WebkitTransformOrigin: 247.91,
            MsTransformOrigin: 247.91,
            transformOrigin: 247.91,
          }}
          className="animable"
          opacity="0.3"
        >
          <path
            d="M201 145.62a1.87 1.87 0 11-1.86-1.87 1.86 1.86 0 011.86 1.87z"
            style={{
              WebkitTransformOrigin: 199.13,
              MsTransformOrigin: 199.13,
              transformOrigin: 199.13,
            }}
            fill="#8978E9"
            className="animable"
          ></path>
          <circle
            cx="72.97"
            cy="216.13"
            r="1.32"
            style={{
              WebkitTransformOrigin: 72.97,
              MsTransformOrigin: 72.97,
              transformOrigin: 72.97,
            }}
            fill="#8978E9"
            className="animable"
          ></circle>
          <circle
            cx="291.05"
            cy="408.33"
            r="1.89"
            style={{
              WebkitTransformOrigin: 291.05,
              MsTransformOrigin: 291.05,
              transformOrigin: 291.05,
            }}
            fill="#8978E9"
            className="animable"
          ></circle>
          <circle
            cx="336.5"
            cy="332"
            r="1.32"
            style={{
              WebkitTransformOrigin: 336.5,
              MsTransformOrigin: 336.5,
              transformOrigin: 336.5,
            }}
            fill="#8978E9"
            className="animable"
          ></circle>
          <path
            d="M424.17 95.62a1.32 1.32 0 11-1.32-1.32 1.32 1.32 0 011.32 1.32z"
            style={{
              WebkitTransformOrigin: 422.85,
              MsTransformOrigin: 422.85,
              transformOrigin: 422.85,
            }}
            fill="#8978E9"
            className="animable"
          ></path>
          <path
            d="M172.75 69a1.32 1.32 0 11-1.32-1.32 1.33 1.33 0 011.32 1.32z"
            style={{
              WebkitTransformOrigin: 171.43,
              MsTransformOrigin: 171.43,
              transformOrigin: 171.43,
            }}
            fill="#8978E9"
            className="animable"
          ></path>
          <circle
            cx="277.7"
            cy="136.94"
            r="1.32"
            style={{
              WebkitTransformOrigin: 277.7,
              MsTransformOrigin: 277.7,
              transformOrigin: 277.7,
            }}
            fill="#8978E9"
            className="animable"
          ></circle>
        </g>
        <circle
          cx="141.23"
          cy="116.36"
          r="21.91"
          style={{
            WebkitTransformOrigin: 141.23,
            MsTransformOrigin: 141.23,
            transformOrigin: 141.23,
          }}
          fill="#8978E9"
          className="animable"
        ></circle>
        <circle
          cx="141.23"
          cy="116.36"
          r="21.91"
          style={{
            WebkitTransformOrigin: 141.23,
            MsTransformOrigin: 141.23,
            transformOrigin: 141.23,
          }}
          fill="#FFF"
          className="animable"
          opacity="0.7"
        ></circle>
        <path
          d="M133.68 99.83a21.84 21.84 0 00-8.68 1.77 21.92 21.92 0 0024.87 34.89 21.92 21.92 0 00-16.23-36.65z"
          style={{
            WebkitTransformOrigin: 137.425,
            MsTransformOrigin: 137.425,
            transformOrigin: 137.425,
          }}
          fill="#8978E9"
          className="animable"
          opacity="0.2"
        ></path>
        <path
          d="M131.5 105.62a2 2 0 11-2-2 2 2 0 012 2z"
          style={{
            WebkitTransformOrigin: 129.5,
            MsTransformOrigin: 129.5,
            transformOrigin: 129.5,
          }}
          fill="#8978E9"
          className="animable"
          opacity="0.2"
        ></path>
        <path
          d="M155.06 103.62a2 2 0 11-2-2 2 2 0 012 2z"
          style={{
            WebkitTransformOrigin: 153.06,
            MsTransformOrigin: 153.06,
            transformOrigin: 153.06,
          }}
          fill="#8978E9"
          className="animable"
          opacity="0.2"
        ></path>
        <path
          d="M151.06 117.9a3.28 3.28 0 11-3.28-3.28 3.28 3.28 0 013.28 3.28z"
          style={{
            WebkitTransformOrigin: 147.78,
            MsTransformOrigin: 147.78,
            transformOrigin: 147.78,
          }}
          fill="#8978E9"
          className="animable"
          opacity="0.2"
        ></path>
        <path
          d="M140.64 127.25a4.38 4.38 0 11-4.38-4.38 4.38 4.38 0 014.38 4.38z"
          style={{
            WebkitTransformOrigin: 136.26,
            MsTransformOrigin: 136.26,
            transformOrigin: 136.26,
          }}
          fill="#8978E9"
          className="animable"
          opacity="0.2"
        ></path>
        <circle
          cx="382.2"
          cy="376.25"
          r="19.23"
          style={{
            WebkitTransformOrigin: 382.2,
            MsTransformOrigin: 382.2,
            transformOrigin: 382.2,
          }}
          fill="#8978E9"
          className="animable"
          transform="rotate(-76.72)"
        ></circle>
        <circle
          cx="382.2"
          cy="376.25"
          r="19.23"
          style={{
            WebkitTransformOrigin: 382.2,
            MsTransformOrigin: 382.2,
            transformOrigin: 382.2,
          }}
          fill="#FFF"
          className="animable"
          opacity="0.3"
          transform="rotate(-76.72)"
        ></circle>
        <path
          d="M394.33 361.34a19.22 19.22 0 00-17.67 33.32 19 19 0 005.53.82 19.23 19.23 0 0012.14-34.14z"
          style={{
            WebkitTransformOrigin: 385.486,
            MsTransformOrigin: 385.486,
            transformOrigin: 385.486,
          }}
          fill="#8978E9"
          className="animable"
          opacity="0.4"
        ></path>
        <path
          d="M363.83 382c-20.53 9.66-5.22 17.11 23.71 6.71 26.79-9.63 37-21.77 13-18 1.29 5.05-32.26 18.12-36.71 11.29z"
          style={{
            WebkitTransformOrigin: 384.229,
            MsTransformOrigin: 384.229,
            transformOrigin: 384.229,
          }}
          fill="#8978E9"
          className="animable"
        ></path>
      </g>
      <g
        className="animable animated-astronaut animator-active"
        style={{
          WebkitTransformOrigin: 315.482,
          MsTransformOrigin: 315.482,
          transformOrigin: 315.482,
        }}
      >
        <path
          d="M394.1 187.83C367.21 206 332.4 230 322.79 287.64h-2.05c9.35-57 42.89-81.57 69.79-99.81z"
          style={{
            WebkitTransformOrigin: 357.42,
            MsTransformOrigin: 357.42,
            transformOrigin: 357.42,
          }}
          className="animable"
          opacity="0.2"
        ></path>
        <path
          d="M255 368.27c-17 0-33.81-7.67-42-20.19-5.05-7.74-10.92-23.95 6.56-45.58l1.55 1.26c-12.36 15.3-14.64 30.65-6.43 43.23 10 15.3 33.59 23 53.73 17.52 20.63-5.61 33.15-23.55 34.36-49.22 4.13-87.81 50.78-114.86 84.84-134.61 21.17-12.27 36.46-21.13 33.1-39.84-.47-2.59-1.5-4.38-3.17-5.48-4.35-2.87-12.85-.88-22.69 1.41-19.31 4.5-45.75 10.66-61.5-16.13l1.73-1c15 25.53 39.57 19.8 59.32 15.2 10.29-2.39 19.17-4.46 24.24-1.13 2.15 1.41 3.47 3.64 4 6.8 3.61 20.08-13 29.72-34.05 41.92-33.67 19.52-79.77 46.25-83.85 133-1.26 26.6-14.32 45.21-35.84 51.06a52.88 52.88 0 01-13.9 1.78z"
          style={{
            WebkitTransformOrigin: 315.482,
            MsTransformOrigin: 315.482,
            transformOrigin: 315.482,
          }}
          fill="#8978E9"
          className="animable"
        ></path>
        <path
          d="M255 368.27c-17 0-33.81-7.67-42-20.19-5.05-7.74-10.92-23.95 6.56-45.58l1.55 1.26c-12.36 15.3-14.64 30.65-6.43 43.23 10 15.3 33.59 23 53.73 17.52 20.63-5.61 33.15-23.55 34.36-49.22 4.13-87.81 50.78-114.86 84.84-134.61 21.17-12.27 36.46-21.13 33.1-39.84-.47-2.59-1.5-4.38-3.17-5.48-4.35-2.87-12.85-.88-22.69 1.41-19.31 4.5-45.75 10.66-61.5-16.13l1.73-1c15 25.53 39.57 19.8 59.32 15.2 10.29-2.39 19.17-4.46 24.24-1.13 2.15 1.41 3.47 3.64 4 6.8 3.61 20.08-13 29.72-34.05 41.92-33.67 19.52-79.77 46.25-83.85 133-1.26 26.6-14.32 45.21-35.84 51.06a52.88 52.88 0 01-13.9 1.78z"
          style={{
            WebkitTransformOrigin: 315.482,
            MsTransformOrigin: 315.482,
            transformOrigin: 315.482,
          }}
          fill="#FFF"
          className="animable"
          opacity="0.2"
        ></path>
        <path
          d="M312.76 97a46.05 46.05 0 0113.58 2.13s11 18.77 12.3 23.07c-.46 4.24-7.61 11.19-7.61 11.19z"
          style={{
            WebkitTransformOrigin: 325.7,
            MsTransformOrigin: 325.7,
            transformOrigin: 325.7,
          }}
          fill="#8978E9"
          className="animable"
        ></path>
        <path
          d="M312.76 97a46.05 46.05 0 0113.58 2.13s11 18.77 12.3 23.07c-.46 4.24-7.61 11.19-7.61 11.19z"
          style={{
            WebkitTransformOrigin: 325.7,
            MsTransformOrigin: 325.7,
            transformOrigin: 325.7,
          }}
          fill="#FFF"
          className="animable"
          opacity="0.3"
        ></path>
        <path
          d="M345.34 188.13a141.41 141.41 0 01-11.56-16.38q-1.26-2.17-2.39-4.42c-.43-.85-.84-1.7-1.24-2.56a10.76 10.76 0 01-1.21-2.69c-1.2-12.67 3.14-22-1-32.17l-16.48 6.44s1.4 18.12 4.6 29c2 6.73 6.48 12.55 10.81 17.94 1.35 1.68 2.65 3.41 4 5.1s2.71 3.06 4 4.65c1.95 2.41 2.59 4.72 1.12 7.56l-.25.45c-.42.74 1.54 1.58 2.78 0 2-2.58 1.72-2.42 3.46-4.62 1.06-1.33 2.27-2.78 3.32-4a3.37 3.37 0 00.04-4.3z"
          style={{
            WebkitTransformOrigin: 328.778,
            MsTransformOrigin: 328.778,
            transformOrigin: 328.778,
          }}
          fill="#8978E9"
          className="animable"
        ></path>
        <path
          d="M345.34 188.13a141.41 141.41 0 01-11.56-16.38q-1.26-2.17-2.39-4.42c-.43-.85-.84-1.7-1.24-2.56a10.76 10.76 0 01-1.21-2.69c-1.2-12.67 3.14-22-1-32.17l-16.48 6.44s1.4 18.12 4.6 29c2 6.73 6.48 12.55 10.81 17.94 1.35 1.68 2.65 3.41 4 5.1s2.71 3.06 4 4.65c1.95 2.41 2.59 4.72 1.12 7.56l-.25.45c-.42.74 1.54 1.58 2.78 0 2-2.58 1.72-2.42 3.46-4.62 1.06-1.33 2.27-2.78 3.32-4a3.37 3.37 0 00.04-4.3z"
          style={{
            WebkitTransformOrigin: 328.778,
            MsTransformOrigin: 328.778,
            transformOrigin: 328.778,
          }}
          fill="#FFF"
          className="animable"
          opacity="0.7"
        ></path>
        <path
          d="M341.31 182.92a54.69 54.69 0 01-8.66 7.52c.43.48.85 1 1.28 1.46a43.92 43.92 0 008.5-7.51z"
          style={{
            WebkitTransformOrigin: 337.54,
            MsTransformOrigin: 337.54,
            transformOrigin: 337.54,
          }}
          fill="#8978E9"
          className="animable"
          opacity="0.3"
        ></path>
        <path
          d="M345.34 188.13l-.12-.14a5.18 5.18 0 00-1.27 3.17 5 5 0 00.38 2.35l.95-1.13a3.37 3.37 0 00.06-4.25z"
          style={{
            WebkitTransformOrigin: 344.999,
            MsTransformOrigin: 344.999,
            transformOrigin: 344.999,
          }}
          fill="#8978E9"
          className="animable"
          opacity="0.3"
        ></path>
        <path
          d="M308.84 109a35.38 35.38 0 01-6.37 7.19 23.27 23.27 0 01-4.42 3 19 19 0 01-2.58 1.09l-.68.22-.22.06-.47.13a5.93 5.93 0 01-.88.14 7.55 7.55 0 01-2.51-.23 12.24 12.24 0 01-2.94-1.27 25 25 0 01-2.15-1.41 40.31 40.31 0 01-3.58-3 53.16 53.16 0 01-6-6.74 2.51 2.51 0 013.35-3.62h.08c2.36 1.5 4.74 3.08 7.06 4.49 1.18.69 2.32 1.39 3.45 1.93a15.29 15.29 0 001.59.72 3.12 3.12 0 001.07.26c.06 0 0-.07-.37-.06a2.93 2.93 0 00-.35 0l-.22.05.33-.17a13.53 13.53 0 001.29-.79 18.4 18.4 0 002.5-2.12 63.62 63.62 0 004.9-5.79 5 5 0 018 5.93z"
          style={{
            WebkitTransformOrigin: 292.498,
            MsTransformOrigin: 292.498,
            transformOrigin: 292.498,
          }}
          fill="#8978E9"
          className="animable"
        ></path>
        <path
          d="M308.84 109a35.38 35.38 0 01-6.37 7.19 23.27 23.27 0 01-4.42 3 19 19 0 01-2.58 1.09l-.68.22-.22.06-.47.13a5.93 5.93 0 01-.88.14 7.55 7.55 0 01-2.51-.23 12.24 12.24 0 01-2.94-1.27 25 25 0 01-2.15-1.41 40.31 40.31 0 01-3.58-3 53.16 53.16 0 01-6-6.74 2.51 2.51 0 013.35-3.62h.08c2.36 1.5 4.74 3.08 7.06 4.49 1.18.69 2.32 1.39 3.45 1.93a15.29 15.29 0 001.59.72 3.12 3.12 0 001.07.26c.06 0 0-.07-.37-.06a2.93 2.93 0 00-.35 0l-.22.05.33-.17a13.53 13.53 0 001.29-.79 18.4 18.4 0 002.5-2.12 63.62 63.62 0 004.9-5.79 5 5 0 018 5.93z"
          style={{
            WebkitTransformOrigin: 292.498,
            MsTransformOrigin: 292.498,
            transformOrigin: 292.498,
          }}
          fill="#FFF"
          className="animable"
          opacity="0.7"
        ></path>
        <path
          d="M272.29 102.42l1.17 2s.89 2.62 2.68 3.1l4.86-1.57-.25-.41c-.62-.94-.55-2.77-.34-4.29s-.57-1.57-1.15-1.19a3.82 3.82 0 00-.84 1.65 7.77 7.77 0 00-.79-.93l-1.48-1.48a1.72 1.72 0 00-2.34-.06l-1.2 1.07a1.71 1.71 0 00-.32 2.11z"
          style={{
            WebkitTransformOrigin: 276.531,
            MsTransformOrigin: 276.531,
            transformOrigin: 276.531,
          }}
          fill="#8978E9"
          className="animable"
        ></path>
        <path
          d="M272.29 102.42l1.17 2s.89 2.62 2.68 3.1l4.86-1.57-.25-.41c-.62-.94-.55-2.77-.34-4.29s-.57-1.57-1.15-1.19a3.82 3.82 0 00-.84 1.65 7.77 7.77 0 00-.79-.93l-1.48-1.48a1.72 1.72 0 00-2.34-.06l-1.2 1.07a1.71 1.71 0 00-.32 2.11z"
          style={{
            WebkitTransformOrigin: 276.531,
            MsTransformOrigin: 276.531,
            transformOrigin: 276.531,
          }}
          fill="#FFF"
          className="animable"
          opacity="0.7"
        ></path>
        <path
          d="M317.67 95.22a59.64 59.64 0 00-15.34 6.47 4.32 4.32 0 00-1.94 4.53c1.93 9.44 6.32 22.08 11.06 30.13l22.11-9.15c.15-3.9-5.22-16.52-10.69-28.72-.98-2.19-2.87-3.82-5.2-3.26z"
          style={{
            WebkitTransformOrigin: 316.932,
            MsTransformOrigin: 316.932,
            transformOrigin: 316.932,
          }}
          fill="#8978E9"
          className="animable"
        ></path>
        <path
          d="M317.67 95.22a59.64 59.64 0 00-15.34 6.47 4.32 4.32 0 00-1.94 4.53c1.93 9.44 6.32 22.08 11.06 30.13l22.11-9.15c.15-3.9-5.22-16.52-10.69-28.72-.98-2.19-2.87-3.82-5.2-3.26z"
          style={{
            WebkitTransformOrigin: 316.932,
            MsTransformOrigin: 316.932,
            transformOrigin: 316.932,
          }}
          fill="#FFF"
          className="animable"
          opacity="0.8"
        ></path>
        <path
          d="M326.3 106.21l-4.39-1.47c1 2.57 4.53 5.82 7 7.73-.8-2-1.69-4.1-2.61-6.26z"
          style={{
            WebkitTransformOrigin: 325.41,
            MsTransformOrigin: 325.41,
            transformOrigin: 325.41,
          }}
          fill="#8978E9"
          className="animable"
          opacity="0.3"
        ></path>
        <path
          d="M316.22 85.32c-1.83-3.48-5.78-5.23-10.52-4.84-4 .34-7.54 4.42-7.12 6.62s3.78 3.14 4.42 3.9l-2.77 2a3 3 0 00-.6 4.29c1.17 1.48 2.71 3 3.6 4.12 7.66-.2 13.33-3.12 15.38-5.93-.77-3.56-.61-6.7-2.39-10.16z"
          style={{
            WebkitTransformOrigin: 308.578,
            MsTransformOrigin: 308.578,
            transformOrigin: 308.578,
          }}
          fill="#8978E9"
          className="animable"
        ></path>
        <path
          d="M316.22 85.32c-1.83-3.48-5.78-5.23-10.52-4.84-4 .34-7.54 4.42-7.12 6.62s3.78 3.14 4.42 3.9l-2.77 2a3 3 0 00-.6 4.29c1.17 1.48 2.71 3 3.6 4.12 7.66-.2 13.33-3.12 15.38-5.93-.77-3.56-.61-6.7-2.39-10.16z"
          style={{
            WebkitTransformOrigin: 308.578,
            MsTransformOrigin: 308.578,
            transformOrigin: 308.578,
          }}
          fill="#FFF"
          className="animable"
          opacity="0.8"
        ></path>
        <path
          d="M312.46 87.48a7.57 7.57 0 11-9.81-4.3 7.58 7.58 0 019.81 4.3z"
          style={{
            WebkitTransformOrigin: 305.407,
            MsTransformOrigin: 305.407,
            transformOrigin: 305.407,
          }}
          fill="#263238"
          className="animable"
        ></path>
        <path
          d="M377.39 177.6c-.11-3.29-.26-3-.35-5.77-.06-1.7-.07-3.59-.08-5.22a3.36 3.36 0 00-2.7-3.28c-1.32-.27-2.65-.52-4-.8-1.73-.37-3.44-.77-5.13-1.26-1.32-.38-2.62-.8-3.91-1.27s-2.74-1-4.08-1.62c-1.58-.67-3.14-1.39-4.68-2.14-1.73-.82-3.44-1.68-5.15-2.55-6.58-10.89-6.72-18.07-13.78-26.49l-15.16 6.86s11.14 19.76 18.72 28.14c4.37 4.82 11.22 7 17.33 8.58 4.41 1.13 8.88 2 13.35 2.83 1.74.32 3.63.44 5.13 1.48a5.74 5.74 0 012.14 3.45q.1.42.18.84c.19.84 2.24.2 2.17-1.78z"
          style={{
            WebkitTransformOrigin: 347.881,
            MsTransformOrigin: 347.881,
            transformOrigin: 347.881,
          }}
          fill="#8978E9"
          className="animable"
        ></path>
        <path
          d="M377.39 177.6c-.11-3.29-.26-3-.35-5.77-.06-1.7-.07-3.59-.08-5.22a3.36 3.36 0 00-2.7-3.28c-1.32-.27-2.65-.52-4-.8-1.73-.37-3.44-.77-5.13-1.26-1.32-.38-2.62-.8-3.91-1.27s-2.74-1-4.08-1.62c-1.58-.67-3.14-1.39-4.68-2.14-1.73-.82-3.44-1.68-5.15-2.55-6.58-10.89-6.72-18.07-13.78-26.49l-15.16 6.86s11.14 19.76 18.72 28.14c4.37 4.82 11.22 7 17.33 8.58 4.41 1.13 8.88 2 13.35 2.83 1.74.32 3.63.44 5.13 1.48a5.74 5.74 0 012.14 3.45q.1.42.18.84c.19.84 2.24.2 2.17-1.78z"
          style={{
            WebkitTransformOrigin: 347.881,
            MsTransformOrigin: 347.881,
            transformOrigin: 347.881,
          }}
          fill="#FFF"
          className="animable"
          opacity="0.8"
        ></path>
        <path
          d="M369.7 162.4c-.6-.13-1.2-.26-1.81-.41.05 3.46-1.57 9.42-2.16 11.23l1.9.36a38.11 38.11 0 002.07-11.18z"
          style={{
            WebkitTransformOrigin: 367.715,
            MsTransformOrigin: 367.715,
            transformOrigin: 367.715,
          }}
          fill="#8978E9"
          className="animable"
          opacity="0.3"
        ></path>
        <path
          d="M377 166.61a3.36 3.36 0 00-2.69-3.28l-1-.19a4.58 4.58 0 001.63 2.9 5.09 5.09 0 002 1.14c.06-.18.06-.38.06-.57z"
          style={{
            WebkitTransformOrigin: 375.155,
            MsTransformOrigin: 375.155,
            transformOrigin: 375.155,
          }}
          fill="#8978E9"
          className="animable"
          opacity="0.3"
        ></path>
        <path
          d="M311.05 87.54c.4 1.52-1.3 3.11-2.65 1.8a30.83 30.83 0 00-4.12-3.69c-1.39-.87.46-2.39 2.65-1.8a5.94 5.94 0 014.12 3.69z"
          style={{
            WebkitTransformOrigin: 307.454,
            MsTransformOrigin: 307.454,
            transformOrigin: 307.454,
          }}
          fill="#FFF"
          className="animable"
        ></path>
        <path
          d="M311.16 135.86c-.7.26.58 1.46.58 1.46s14-4.79 22.5-9.72a1.88 1.88 0 00-.68-1.58 216 216 0 01-22.4 9.84z"
          style={{
            WebkitTransformOrigin: 322.598,
            MsTransformOrigin: 322.598,
            transformOrigin: 322.598,
          }}
          fill="#8978E9"
          className="animable"
        ></path>
        <path
          d="M311.16 135.86c-.7.26.58 1.46.58 1.46s14-4.79 22.5-9.72a1.88 1.88 0 00-.68-1.58 216 216 0 01-22.4 9.84z"
          style={{
            WebkitTransformOrigin: 322.598,
            MsTransformOrigin: 322.598,
            transformOrigin: 322.598,
          }}
          fill="#FFF"
          className="animable"
          opacity="0.5"
        ></path>
        <path
          d="M321.46 94.56c2.76 1.4 5.35 2.87 8 4.5 1.29.82 2.57 1.65 3.84 2.55s2.53 1.82 3.8 2.86l.47.39.59.54a12.74 12.74 0 011 1c.32.35.59.69.85 1s.54.68.77 1a43.8 43.8 0 012.58 4 59.05 59.05 0 014 8.35 2.52 2.52 0 01-4.19 2.62l-.05-.06c-2-2.13-3.93-4.37-5.87-6.46s-3.91-4.21-5.54-5.14c-2.27-1.41-4.8-2.82-7.31-4.2l-7.56-4.2a5 5 0 014.68-8.84z"
          style={{
            WebkitTransformOrigin: 330.851,
            MsTransformOrigin: 330.851,
            transformOrigin: 330.851,
          }}
          fill="#8978E9"
          className="animable"
        ></path>
        <path
          d="M321.46 94.56c2.76 1.4 5.35 2.87 8 4.5 1.29.82 2.57 1.65 3.84 2.55s2.53 1.82 3.8 2.86l.47.39.59.54a12.74 12.74 0 011 1c.32.35.59.69.85 1s.54.68.77 1a43.8 43.8 0 012.58 4 59.05 59.05 0 014 8.35 2.52 2.52 0 01-4.19 2.62l-.05-.06c-2-2.13-3.93-4.37-5.87-6.46s-3.91-4.21-5.54-5.14c-2.27-1.41-4.8-2.82-7.31-4.2l-7.56-4.2a5 5 0 014.68-8.84z"
          style={{
            WebkitTransformOrigin: 330.851,
            MsTransformOrigin: 330.851,
            transformOrigin: 330.851,
          }}
          fill="#FFF"
          className="animable"
          opacity="0.8"
        ></path>
        <path
          d="M349.73 125.74l-.85-2.13s-.47-2.72-2.16-3.48l-5 .79.17.44c.46 1 .11 2.83-.34 4.29s.31 1.65.95 1.36c.36-.16.71-.81 1.09-1.5a8.46 8.46 0 00.63 1l1.23 1.69a1.72 1.72 0 002.3.44l1.36-.87a1.7 1.7 0 00.62-2.03z"
          style={{
            WebkitTransformOrigin: 345.632,
            MsTransformOrigin: 345.632,
            transformOrigin: 345.632,
          }}
          fill="#8978E9"
          className="animable"
        ></path>
        <path
          d="M349.73 125.74l-.85-2.13s-.47-2.72-2.16-3.48l-5 .79.17.44c.46 1 .11 2.83-.34 4.29s.31 1.65.95 1.36c.36-.16.71-.81 1.09-1.5a8.46 8.46 0 00.63 1l1.23 1.69a1.72 1.72 0 002.3.44l1.36-.87a1.7 1.7 0 00.62-2.03z"
          style={{
            WebkitTransformOrigin: 345.632,
            MsTransformOrigin: 345.632,
            transformOrigin: 345.632,
          }}
          fill="#FFF"
          className="animable"
          opacity="0.8"
        ></path>
        <path
          d="M317.24 106.06l-1.22.1-7.49 18.08a4 4 0 001.22-.1s9.76-3.64 12.71-5c-1.98-4.09-5.22-13.08-5.22-13.08z"
          style={{
            WebkitTransformOrigin: 315.495,
            MsTransformOrigin: 315.495,
            transformOrigin: 315.495,
          }}
          fill="#8978E9"
          className="animable"
          opacity="0.3"
        ></path>
        <path
          d="M303.57 110.8a43.41 43.41 0 005 13.44c3.66-1.26 9.76-3.64 12.72-5a135.36 135.36 0 01-5.29-13.08c-3.13.21-10 2.84-12.43 4.64z"
          style={{
            WebkitTransformOrigin: 312.43,
            MsTransformOrigin: 312.43,
            transformOrigin: 312.43,
          }}
          fill="#FFF"
          className="animable"
        ></path>
        <path
          d="M311 114.71a2.58 2.58 0 11-1.73-3.21 2.58 2.58 0 011.73 3.21z"
          style={{
            WebkitTransformOrigin: 308.528,
            MsTransformOrigin: 308.528,
            transformOrigin: 308.528,
          }}
          fill="#8978E9"
          className="animable"
          opacity="0.3"
        ></path>
        <path
          d="M312.91 111.27a.85.85 0 11-.56-1 .84.84 0 01.56 1z"
          style={{
            WebkitTransformOrigin: 312.083,
            MsTransformOrigin: 312.083,
            transformOrigin: 312.083,
          }}
          fill="#8978E9"
          className="animable"
          opacity="0.6"
        ></path>
        <path
          d="M315.15 110.4a.85.85 0 11-1.62-.49.84.84 0 011.05-.56.85.85 0 01.57 1.05z"
          style={{
            WebkitTransformOrigin: 314.325,
            MsTransformOrigin: 314.325,
            transformOrigin: 314.325,
          }}
          fill="#8978E9"
          className="animable"
          opacity="0.6"
        ></path>
        <path
          style={{
            WebkitTransformOrigin: 313.39,
            MsTransformOrigin: 313.39,
            transformOrigin: 313.39,
          }}
          fill="#8978E9"
          d="M318.29 118.19L309.04 121.84 308.49 120.02 317.73 116.37 318.29 118.19z"
          className="animable"
          opacity="0.5"
        ></path>
      </g>
      <g
        className="animable animated-rocket"
        style={{
          WebkitTransformOrigin: 191.359,
          MsTransformOrigin: 191.359,
          transformOrigin: 191.359,
        }}
      >
        <path
          d="M267.26 257.17a94 94 0 01-1.68 17.35q-1.77 7.71-5.5 11.28a12.3 12.3 0 01-8.81 3.57q-7.71 0-11.77-8.41a23.79 23.79 0 01-1.21-3.11 144.31 144.31 0 00-15.92 16l-5.31 6.26a38.62 38.62 0 009.77 7.19q9.34 4.83 24.52 4.84c1.78 0 3.5-.05 5.17-.15a143.39 143.39 0 0015.1-29l14.85-38.72z"
          style={{
            WebkitTransformOrigin: 251.765,
            MsTransformOrigin: 251.765,
            transformOrigin: 251.765,
          }}
          className="animable"
          opacity="0.2"
        ></path>
        <path
          d="M133.39 310l17.5 17.5 49-46.17c-16.89-6.45-49.73 11.86-66.5 28.67z"
          style={{
            WebkitTransformOrigin: 166.64,
            MsTransformOrigin: 166.64,
            transformOrigin: 166.64,
          }}
          fill="#263238"
          className="animable"
        ></path>
        <path
          d="M194.42 371c-5.59-5.6-17.5-17.5-17.5-17.5l46.17-49c6.41 16.85-11.9 49.72-28.67 66.5z"
          style={{
            WebkitTransformOrigin: 200.66,
            MsTransformOrigin: 200.66,
            transformOrigin: 200.66,
          }}
          fill="#263238"
          className="animable"
        ></path>
        <path
          d="M261.4 260.7l19.09-36.81L243.68 243a144.22 144.22 0 00-32.44 23l-62.75 59.07 30.83 30.83 59.07-62.75a144.22 144.22 0 0023.01-32.45z"
          style={{
            WebkitTransformOrigin: 214.49,
            MsTransformOrigin: 214.49,
            transformOrigin: 214.49,
          }}
          fill="#8978E9"
          className="animable"
        ></path>
        <path
          d="M261.4 260.7l19.09-36.81L243.68 243a144.22 144.22 0 00-32.44 23l-62.75 59.07 30.83 30.83 59.07-62.75a144.22 144.22 0 0023.01-32.45z"
          style={{
            WebkitTransformOrigin: 214.49,
            MsTransformOrigin: 214.49,
            transformOrigin: 214.49,
          }}
          fill="#FFF"
          className="animable"
          opacity="0.6"
        ></path>
        <circle
          cx="222.2"
          cy="282.18"
          r="12.9"
          style={{
            WebkitTransformOrigin: 222.2,
            MsTransformOrigin: 222.2,
            transformOrigin: 222.2,
          }}
          fill="#FFF"
          className="animable"
        ></circle>
        <circle
          cx="222.2"
          cy="282.18"
          r="8.29"
          style={{
            WebkitTransformOrigin: 222.2,
            MsTransformOrigin: 222.2,
            transformOrigin: 222.2,
          }}
          fill="#8978E9"
          className="animable"
        ></circle>
        <path
          style={{
            WebkitTransformOrigin: 186.285,
            MsTransformOrigin: 186.285,
            transformOrigin: 186.285,
          }}
          fill="#8978E9"
          d="M189.75 344.82L159.56 314.63 184.28 291.37 213.01 320.11 189.75 344.82z"
          className="animable"
          opacity="0.3"
        ></path>
        <path
          d="M140.22 337.62c-22.6 1.83-30.09 16.3-32.65 35.53-1.3 9.81-1.88 19.74-10.11 25.48a2.77 2.77 0 001.63 5.06c30.34-.95 44.49-15.8 46.27-22a43.06 43.06 0 01-2.49 9.47 2.76 2.76 0 004 3.39c8.51-5.33 19.19-15.15 19.9-31.08-6.26-8.87-26.55-25.85-26.55-25.85z"
          style={{
            WebkitTransformOrigin: 131.509,
            MsTransformOrigin: 131.509,
            transformOrigin: 131.509,
          }}
          fill="#8978E9"
          className="animable"
        ></path>
        <path
          d="M140.22 337.62c-22.6 1.83-30.09 16.3-32.65 35.53-1.3 9.81-1.88 19.74-10.11 25.48a2.77 2.77 0 001.63 5.06c30.34-.95 44.49-15.8 46.27-22a43.06 43.06 0 01-2.49 9.47 2.76 2.76 0 004 3.39c8.51-5.33 19.19-15.15 19.9-31.08-6.26-8.87-26.55-25.85-26.55-25.85z"
          style={{
            WebkitTransformOrigin: 131.509,
            MsTransformOrigin: 131.509,
            transformOrigin: 131.509,
          }}
          fill="#FFF"
          className="animable"
          opacity="0.2"
        ></path>
        <path
          style={{
            WebkitTransformOrigin: 154.265,
            MsTransformOrigin: 154.265,
            transformOrigin: 154.265,
          }}
          fill="#8978E9"
          d="M170.28 370.3L134.08 334.1 153.36 329.93 174.45 351.02 170.28 370.3z"
          className="animable"
        ></path>
      </g>
      <defs>
        <filter id="active" height="200%">
          <feMorphology
            in="SourceAlpha"
            operator="dilate"
            radius="2"
            result="DILATED"
          ></feMorphology>
          <feFlood
            floodColor="#32DFEC"
            floodOpacity="1"
            result="PINK"
          ></feFlood>
          <feComposite
            in="PINK"
            in2="DILATED"
            operator="in"
            result="OUTLINE"
          ></feComposite>
          <feMerge>
            <feMergeNode in="OUTLINE"></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
          </feMerge>
        </filter>
        <filter id="hover" height="200%">
          <feMorphology
            in="SourceAlpha"
            operator="dilate"
            radius="2"
            result="DILATED"
          ></feMorphology>
          <feFlood floodColor="red" floodOpacity="0.5" result="PINK"></feFlood>
          <feComposite
            in="PINK"
            in2="DILATED"
            operator="in"
            result="OUTLINE"
          ></feComposite>
          <feMerge>
            <feMergeNode in="OUTLINE"></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
          </feMerge>
          <feColorMatrix values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0"></feColorMatrix>
        </filter>
      </defs>
    </StyledIcon>
  </Box>
  // <Icon
  //   width="100%"
  //   viewBox="0 0 500 500"
  //   fill="none"
  //   xmlns="http://www.w3.org/2000/svg"
  //   {...props}
  // >
  //   <g>
  //     <path
  //       fill="#ebebeb"
  //       d="M238.4 445.05H45.3a5.71 5.71 0 01-5.71-5.71V60.66A5.71 5.71 0 0145.3 55h193.1a5.71 5.71 0 015.71 5.71v378.63a5.71 5.71 0 01-5.71 5.71zM45.3 55.2a5.47 5.47 0 00-5.46 5.46v378.68a5.47 5.47 0 005.46 5.46h193.1a5.47 5.47 0 005.46-5.46V60.66a5.47 5.47 0 00-5.46-5.46zM454.7 445.05H261.6a5.71 5.71 0 01-5.71-5.71V60.66A5.71 5.71 0 01261.6 55h193.1a5.71 5.71 0 015.71 5.71v378.63a5.71 5.71 0 01-5.71 5.71zM261.6 55.2a5.47 5.47 0 00-5.46 5.46v378.68a5.47 5.47 0 005.46 5.46h193.1a5.47 5.47 0 005.46-5.46V60.66a5.47 5.47 0 00-5.46-5.46z"
  //     ></path>
  //     <path
  //       fill="#ebebeb"
  //       d="M113.05 168.25L114.67 171.52 118.29 172.05 115.67 174.6 116.29 178.2 113.05 176.5 109.82 178.2 110.44 174.6 107.82 172.05 111.44 171.52 113.05 168.25z"
  //     ></path>
  //     <path
  //       fill="#f5f5f5"
  //       d="M436.7 322.48L438.32 325.76 441.94 326.29 439.32 328.83 439.94 332.44 436.7 330.74 433.47 332.44 434.09 328.83 431.47 326.29 435.09 325.76 436.7 322.48z"
  //     ></path>
  //     <path
  //       fill="#f5f5f5"
  //       d="M372.6 417.57L374.22 420.84 377.83 421.37 375.21 423.92 375.83 427.52 372.6 425.82 369.37 427.52 369.98 423.92 367.37 421.37 370.98 420.84 372.6 417.57z"
  //     ></path>
  //     <path
  //       fill="#ebebeb"
  //       d="M225.94 110.15l.6 1.22 1.35.2a.4.4 0 01.22.69l-1 .95.23 1.34a.41.41 0 01-.59.43l-1.2-.64-1.2.64a.41.41 0 01-.59-.43l.22-1.34-1-.95a.4.4 0 01.23-.69l1.34-.2.6-1.22a.41.41 0 01.79 0z"
  //     ></path>
  //     <path
  //       fill="#f5f5f5"
  //       d="M60.78 402l.6 1.21 1.34.2a.41.41 0 01.23.7l-1 .94.23 1.34a.41.41 0 01-.59.43l-1.2-.63-1.2.63a.41.41 0 01-.59-.43l.23-1.34-1-.94a.41.41 0 01.22-.7l1.34-.2L60 402a.41.41 0 01.78 0z"
  //     ></path>
  //     <path
  //       fill="#ebebeb"
  //       d="M87.75 97.3l.6 1.22 1.35.19a.41.41 0 01.22.7l-1 1 .23 1.33a.4.4 0 01-.59.43l-1.2-.63-1.2.63a.4.4 0 01-.59-.43l.22-1.33-1-1a.41.41 0 01.23-.7l1.34-.19.64-1.22a.41.41 0 01.75 0zM86.13 338.32A1.33 1.33 0 1184.8 337a1.33 1.33 0 011.33 1.32zM275.67 171.89a1.33 1.33 0 11-1.33-1.32 1.32 1.32 0 011.33 1.32z"
  //     ></path>
  //     <path
  //       fill="#f5f5f5"
  //       d="M206.71 98.4a1.33 1.33 0 11-1.33-1.33 1.34 1.34 0 011.33 1.33z"
  //     ></path>
  //     <circle
  //       cx="207.14"
  //       cy="415.38"
  //       r="7.35"
  //       fill="#f0f0f0"
  //       transform="rotate(-13.28 207.178 415.437)"
  //     ></circle>
  //     <path
  //       fill="#e6e6e6"
  //       d="M204.6 411.09a7.09 7.09 0 00-4.19 1.36 7.34 7.34 0 0010.5 9.23 7.17 7.17 0 00-6.31-10.58z"
  //     ></path>
  //   </g>
  //   <g fill="#8978E9">
  //     <path d="M147.68 287.64H86.83v-27.47l60.85-72.34h29.12v73.9h15.09v25.91H176.8v22.48h-29.12zm0-25.91v-37.84l-32.16 37.84zM202.3 249.51q0-34.29 12.34-48t37.61-13.7q12.13 0 19.93 3a36.79 36.79 0 0112.71 7.79 41.59 41.59 0 017.75 10.09 52.38 52.38 0 014.55 12.34 115.36 115.36 0 013.36 28q0 32.72-11.07 47.89t-38.13 15.18q-15.18 0-24.53-4.84a39.76 39.76 0 01-15.33-14.19q-4.35-6.64-6.77-18.17a124.33 124.33 0 01-2.42-25.39zm33.14.08q0 23 4.05 31.37t11.77 8.41a12.34 12.34 0 008.82-3.57q3.74-3.57 5.5-11.28t1.76-24q0-23.94-4.06-32.19t-12.18-8.24q-8.28 0-12 8.41t-3.66 31.09zM371.74 287.64h-60.85v-27.47l60.85-72.34h29.12v73.9H416v25.91h-15.14v22.48h-29.12zm0-25.91v-37.84l-32.15 37.84z"></path>
  //   </g>
  //   <g>
  //     <g fill="#8978E9" opacity="0.3">
  //       <path d="M201 145.62a1.87 1.87 0 11-1.86-1.87 1.86 1.86 0 011.86 1.87z"></path>
  //       <circle cx="72.97" cy="216.13" r="1.32"></circle>
  //       <circle cx="291.05" cy="408.33" r="1.89"></circle>
  //       <circle cx="336.5" cy="332" r="1.32"></circle>
  //       <path d="M424.17 95.62a1.32 1.32 0 11-1.32-1.32 1.32 1.32 0 011.32 1.32zM172.75 69a1.32 1.32 0 11-1.32-1.32 1.33 1.33 0 011.32 1.32z"></path>
  //       <circle cx="277.7" cy="136.94" r="1.32"></circle>
  //     </g>
  //     <circle cx="141.23" cy="116.36" r="21.91" fill="#8978E9"></circle>
  //     <circle
  //       cx="141.23"
  //       cy="116.36"
  //       r="21.91"
  //       fill="#fff"
  //       opacity="0.7"
  //     ></circle>
  //     <path
  //       fill="#8978E9"
  //       d="M133.68 99.83a21.84 21.84 0 00-8.68 1.77 21.92 21.92 0 0024.87 34.89 21.92 21.92 0 00-16.23-36.65z"
  //       opacity="0.2"
  //     ></path>
  //     <path
  //       fill="#8978E9"
  //       d="M131.5 105.62a2 2 0 11-2-2 2 2 0 012 2zM155.06 103.62a2 2 0 11-2-2 2 2 0 012 2zM151.06 117.9a3.28 3.28 0 11-3.28-3.28 3.28 3.28 0 013.28 3.28zM140.64 127.25a4.38 4.38 0 11-4.38-4.38 4.38 4.38 0 014.38 4.38z"
  //       opacity="0.2"
  //     ></path>
  //     <circle
  //       cx="382.2"
  //       cy="376.25"
  //       r="19.23"
  //       fill="#8978E9"
  //       transform="rotate(-76.72 382.179 376.25)"
  //     ></circle>
  //     <circle
  //       cx="382.2"
  //       cy="376.25"
  //       r="19.23"
  //       fill="#fff"
  //       opacity="0.3"
  //       transform="rotate(-76.72 382.179 376.25)"
  //     ></circle>
  //     <path
  //       fill="#8978E9"
  //       d="M394.33 361.34a19.22 19.22 0 00-17.67 33.32 19 19 0 005.53.82 19.23 19.23 0 0012.14-34.14z"
  //       opacity="0.4"
  //     ></path>
  //     <path
  //       fill="#8978E9"
  //       d="M363.83 382c-20.53 9.66-5.22 17.11 23.71 6.71 26.79-9.63 37-21.77 13-18 1.29 5.05-32.26 18.12-36.71 11.29z"
  //     ></path>
  //   </g>
  //   <g>
  //     <path
  //       d="M394.1 187.83C367.21 206 332.4 230 322.79 287.64h-2.05c9.35-57 42.89-81.57 69.79-99.81z"
  //       opacity="0.2"
  //     ></path>
  //     <path
  //       fill="#8978E9"
  //       d="M255 368.27c-17 0-33.81-7.67-42-20.19-5.05-7.74-10.92-23.95 6.56-45.58l1.55 1.26c-12.36 15.3-14.64 30.65-6.43 43.23 10 15.3 33.59 23 53.73 17.52 20.63-5.61 33.15-23.55 34.36-49.22 4.13-87.81 50.78-114.86 84.84-134.61 21.17-12.27 36.46-21.13 33.1-39.84-.47-2.59-1.5-4.38-3.17-5.48-4.35-2.87-12.85-.88-22.69 1.41-19.31 4.5-45.75 10.66-61.5-16.13l1.73-1c15 25.53 39.57 19.8 59.32 15.2 10.29-2.39 19.17-4.46 24.24-1.13 2.15 1.41 3.47 3.64 4 6.8 3.61 20.08-13 29.72-34.05 41.92-33.67 19.52-79.77 46.25-83.85 133-1.26 26.6-14.32 45.21-35.84 51.06a52.88 52.88 0 01-13.9 1.78z"
  //     ></path>
  //     <path
  //       fill="#fff"
  //       d="M255 368.27c-17 0-33.81-7.67-42-20.19-5.05-7.74-10.92-23.95 6.56-45.58l1.55 1.26c-12.36 15.3-14.64 30.65-6.43 43.23 10 15.3 33.59 23 53.73 17.52 20.63-5.61 33.15-23.55 34.36-49.22 4.13-87.81 50.78-114.86 84.84-134.61 21.17-12.27 36.46-21.13 33.1-39.84-.47-2.59-1.5-4.38-3.17-5.48-4.35-2.87-12.85-.88-22.69 1.41-19.31 4.5-45.75 10.66-61.5-16.13l1.73-1c15 25.53 39.57 19.8 59.32 15.2 10.29-2.39 19.17-4.46 24.24-1.13 2.15 1.41 3.47 3.64 4 6.8 3.61 20.08-13 29.72-34.05 41.92-33.67 19.52-79.77 46.25-83.85 133-1.26 26.6-14.32 45.21-35.84 51.06a52.88 52.88 0 01-13.9 1.78z"
  //       opacity="0.2"
  //     ></path>
  //     <path
  //       fill="#8978E9"
  //       d="M312.76 97a46.05 46.05 0 0113.58 2.13s11 18.77 12.3 23.07c-.46 4.24-7.61 11.19-7.61 11.19z"
  //     ></path>
  //     <path
  //       fill="#fff"
  //       d="M312.76 97a46.05 46.05 0 0113.58 2.13s11 18.77 12.3 23.07c-.46 4.24-7.61 11.19-7.61 11.19z"
  //       opacity="0.3"
  //     ></path>
  //     <path
  //       fill="#8978E9"
  //       d="M345.34 188.13a141.41 141.41 0 01-11.56-16.38q-1.26-2.17-2.39-4.42c-.43-.85-.84-1.7-1.24-2.56a10.76 10.76 0 01-1.21-2.69c-1.2-12.67 3.14-22-1-32.17l-16.48 6.44s1.4 18.12 4.6 29c2 6.73 6.48 12.55 10.81 17.94 1.35 1.68 2.65 3.41 4 5.1s2.71 3.06 4 4.65c1.95 2.41 2.59 4.72 1.12 7.56l-.25.45c-.42.74 1.54 1.58 2.78 0 2-2.58 1.72-2.42 3.46-4.62 1.06-1.33 2.27-2.78 3.32-4a3.37 3.37 0 00.04-4.3z"
  //     ></path>
  //     <path
  //       fill="#fff"
  //       d="M345.34 188.13a141.41 141.41 0 01-11.56-16.38q-1.26-2.17-2.39-4.42c-.43-.85-.84-1.7-1.24-2.56a10.76 10.76 0 01-1.21-2.69c-1.2-12.67 3.14-22-1-32.17l-16.48 6.44s1.4 18.12 4.6 29c2 6.73 6.48 12.55 10.81 17.94 1.35 1.68 2.65 3.41 4 5.1s2.71 3.06 4 4.65c1.95 2.41 2.59 4.72 1.12 7.56l-.25.45c-.42.74 1.54 1.58 2.78 0 2-2.58 1.72-2.42 3.46-4.62 1.06-1.33 2.27-2.78 3.32-4a3.37 3.37 0 00.04-4.3z"
  //       opacity="0.7"
  //     ></path>
  //     <path
  //       fill="#8978E9"
  //       d="M341.31 182.92a54.69 54.69 0 01-8.66 7.52c.43.48.85 1 1.28 1.46a43.92 43.92 0 008.5-7.51zM345.34 188.13l-.12-.14a5.18 5.18 0 00-1.27 3.17 5 5 0 00.38 2.35l.95-1.13a3.37 3.37 0 00.06-4.25z"
  //       opacity="0.3"
  //     ></path>
  //     <path
  //       fill="#8978E9"
  //       d="M308.84 109a35.38 35.38 0 01-6.37 7.19 23.27 23.27 0 01-4.42 3 19 19 0 01-2.58 1.09l-.68.22-.22.06-.47.13a5.93 5.93 0 01-.88.14 7.55 7.55 0 01-2.51-.23 12.24 12.24 0 01-2.94-1.27 25 25 0 01-2.15-1.41 40.31 40.31 0 01-3.58-3 53.16 53.16 0 01-6-6.74 2.51 2.51 0 013.35-3.62h.08c2.36 1.5 4.74 3.08 7.06 4.49 1.18.69 2.32 1.39 3.45 1.93a15.29 15.29 0 001.59.72 3.12 3.12 0 001.07.26c.06 0 0-.07-.37-.06a2.93 2.93 0 00-.35 0l-.22.05.33-.17a13.53 13.53 0 001.29-.79 18.4 18.4 0 002.5-2.12 63.62 63.62 0 004.9-5.79 5 5 0 018 5.93z"
  //     ></path>
  //     <path
  //       fill="#fff"
  //       d="M308.84 109a35.38 35.38 0 01-6.37 7.19 23.27 23.27 0 01-4.42 3 19 19 0 01-2.58 1.09l-.68.22-.22.06-.47.13a5.93 5.93 0 01-.88.14 7.55 7.55 0 01-2.51-.23 12.24 12.24 0 01-2.94-1.27 25 25 0 01-2.15-1.41 40.31 40.31 0 01-3.58-3 53.16 53.16 0 01-6-6.74 2.51 2.51 0 013.35-3.62h.08c2.36 1.5 4.74 3.08 7.06 4.49 1.18.69 2.32 1.39 3.45 1.93a15.29 15.29 0 001.59.72 3.12 3.12 0 001.07.26c.06 0 0-.07-.37-.06a2.93 2.93 0 00-.35 0l-.22.05.33-.17a13.53 13.53 0 001.29-.79 18.4 18.4 0 002.5-2.12 63.62 63.62 0 004.9-5.79 5 5 0 018 5.93z"
  //       opacity="0.7"
  //     ></path>
  //     <path
  //       fill="#8978E9"
  //       d="M272.29 102.42l1.17 2s.89 2.62 2.68 3.1l4.86-1.57-.25-.41c-.62-.94-.55-2.77-.34-4.29s-.57-1.57-1.15-1.19a3.82 3.82 0 00-.84 1.65 7.77 7.77 0 00-.79-.93l-1.48-1.48a1.72 1.72 0 00-2.34-.06l-1.2 1.07a1.71 1.71 0 00-.32 2.11z"
  //     ></path>
  //     <path
  //       fill="#fff"
  //       d="M272.29 102.42l1.17 2s.89 2.62 2.68 3.1l4.86-1.57-.25-.41c-.62-.94-.55-2.77-.34-4.29s-.57-1.57-1.15-1.19a3.82 3.82 0 00-.84 1.65 7.77 7.77 0 00-.79-.93l-1.48-1.48a1.72 1.72 0 00-2.34-.06l-1.2 1.07a1.71 1.71 0 00-.32 2.11z"
  //       opacity="0.7"
  //     ></path>
  //     <path
  //       fill="#8978E9"
  //       d="M317.67 95.22a59.64 59.64 0 00-15.34 6.47 4.32 4.32 0 00-1.94 4.53c1.93 9.44 6.32 22.08 11.06 30.13l22.11-9.15c.15-3.9-5.22-16.52-10.69-28.72-.98-2.19-2.87-3.82-5.2-3.26z"
  //     ></path>
  //     <path
  //       fill="#fff"
  //       d="M317.67 95.22a59.64 59.64 0 00-15.34 6.47 4.32 4.32 0 00-1.94 4.53c1.93 9.44 6.32 22.08 11.06 30.13l22.11-9.15c.15-3.9-5.22-16.52-10.69-28.72-.98-2.19-2.87-3.82-5.2-3.26z"
  //       opacity="0.8"
  //     ></path>
  //     <path
  //       fill="#8978E9"
  //       d="M326.3 106.21l-4.39-1.47c1 2.57 4.53 5.82 7 7.73-.8-2-1.69-4.1-2.61-6.26z"
  //       opacity="0.3"
  //     ></path>
  //     <path
  //       fill="#8978E9"
  //       d="M316.22 85.32c-1.83-3.48-5.78-5.23-10.52-4.84-4 .34-7.54 4.42-7.12 6.62s3.78 3.14 4.42 3.9l-2.77 2a3 3 0 00-.6 4.29c1.17 1.48 2.71 3 3.6 4.12 7.66-.2 13.33-3.12 15.38-5.93-.77-3.56-.61-6.7-2.39-10.16z"
  //     ></path>
  //     <path
  //       fill="#fff"
  //       d="M316.22 85.32c-1.83-3.48-5.78-5.23-10.52-4.84-4 .34-7.54 4.42-7.12 6.62s3.78 3.14 4.42 3.9l-2.77 2a3 3 0 00-.6 4.29c1.17 1.48 2.71 3 3.6 4.12 7.66-.2 13.33-3.12 15.38-5.93-.77-3.56-.61-6.7-2.39-10.16z"
  //       opacity="0.8"
  //     ></path>
  //     <path
  //       fill="#263238"
  //       d="M312.46 87.48a7.57 7.57 0 11-9.81-4.3 7.58 7.58 0 019.81 4.3z"
  //     ></path>
  //     <path
  //       fill="#8978E9"
  //       d="M377.39 177.6c-.11-3.29-.26-3-.35-5.77-.06-1.7-.07-3.59-.08-5.22a3.36 3.36 0 00-2.7-3.28c-1.32-.27-2.65-.52-4-.8-1.73-.37-3.44-.77-5.13-1.26-1.32-.38-2.62-.8-3.91-1.27s-2.74-1-4.08-1.62c-1.58-.67-3.14-1.39-4.68-2.14-1.73-.82-3.44-1.68-5.15-2.55-6.58-10.89-6.72-18.07-13.78-26.49l-15.16 6.86s11.14 19.76 18.72 28.14c4.37 4.82 11.22 7 17.33 8.58 4.41 1.13 8.88 2 13.35 2.83 1.74.32 3.63.44 5.13 1.48a5.74 5.74 0 012.14 3.45q.1.42.18.84c.19.84 2.24.2 2.17-1.78z"
  //     ></path>
  //     <path
  //       fill="#fff"
  //       d="M377.39 177.6c-.11-3.29-.26-3-.35-5.77-.06-1.7-.07-3.59-.08-5.22a3.36 3.36 0 00-2.7-3.28c-1.32-.27-2.65-.52-4-.8-1.73-.37-3.44-.77-5.13-1.26-1.32-.38-2.62-.8-3.91-1.27s-2.74-1-4.08-1.62c-1.58-.67-3.14-1.39-4.68-2.14-1.73-.82-3.44-1.68-5.15-2.55-6.58-10.89-6.72-18.07-13.78-26.49l-15.16 6.86s11.14 19.76 18.72 28.14c4.37 4.82 11.22 7 17.33 8.58 4.41 1.13 8.88 2 13.35 2.83 1.74.32 3.63.44 5.13 1.48a5.74 5.74 0 012.14 3.45q.1.42.18.84c.19.84 2.24.2 2.17-1.78z"
  //       opacity="0.8"
  //     ></path>
  //     <path
  //       fill="#8978E9"
  //       d="M369.7 162.4c-.6-.13-1.2-.26-1.81-.41.05 3.46-1.57 9.42-2.16 11.23l1.9.36a38.11 38.11 0 002.07-11.18zM377 166.61a3.36 3.36 0 00-2.69-3.28l-1-.19a4.58 4.58 0 001.63 2.9 5.09 5.09 0 002 1.14c.06-.18.06-.38.06-.57z"
  //       opacity="0.3"
  //     ></path>
  //     <path
  //       fill="#fff"
  //       d="M311.05 87.54c.4 1.52-1.3 3.11-2.65 1.8a30.83 30.83 0 00-4.12-3.69c-1.39-.87.46-2.39 2.65-1.8a5.94 5.94 0 014.12 3.69z"
  //     ></path>
  //     <path
  //       fill="#8978E9"
  //       d="M311.16 135.86c-.7.26.58 1.46.58 1.46s14-4.79 22.5-9.72a1.88 1.88 0 00-.68-1.58 216 216 0 01-22.4 9.84z"
  //     ></path>
  //     <path
  //       fill="#fff"
  //       d="M311.16 135.86c-.7.26.58 1.46.58 1.46s14-4.79 22.5-9.72a1.88 1.88 0 00-.68-1.58 216 216 0 01-22.4 9.84z"
  //       opacity="0.5"
  //     ></path>
  //     <path
  //       fill="#8978E9"
  //       d="M321.46 94.56c2.76 1.4 5.35 2.87 8 4.5 1.29.82 2.57 1.65 3.84 2.55s2.53 1.82 3.8 2.86l.47.39.59.54a12.74 12.74 0 011 1c.32.35.59.69.85 1s.54.68.77 1a43.8 43.8 0 012.58 4 59.05 59.05 0 014 8.35 2.52 2.52 0 01-4.19 2.62l-.05-.06c-2-2.13-3.93-4.37-5.87-6.46s-3.91-4.21-5.54-5.14c-2.27-1.41-4.8-2.82-7.31-4.2l-7.56-4.2a5 5 0 014.68-8.84z"
  //     ></path>
  //     <path
  //       fill="#fff"
  //       d="M321.46 94.56c2.76 1.4 5.35 2.87 8 4.5 1.29.82 2.57 1.65 3.84 2.55s2.53 1.82 3.8 2.86l.47.39.59.54a12.74 12.74 0 011 1c.32.35.59.69.85 1s.54.68.77 1a43.8 43.8 0 012.58 4 59.05 59.05 0 014 8.35 2.52 2.52 0 01-4.19 2.62l-.05-.06c-2-2.13-3.93-4.37-5.87-6.46s-3.91-4.21-5.54-5.14c-2.27-1.41-4.8-2.82-7.31-4.2l-7.56-4.2a5 5 0 014.68-8.84z"
  //       opacity="0.8"
  //     ></path>
  //     <path
  //       fill="#8978E9"
  //       d="M349.73 125.74l-.85-2.13s-.47-2.72-2.16-3.48l-5 .79.17.44c.46 1 .11 2.83-.34 4.29s.31 1.65.95 1.36c.36-.16.71-.81 1.09-1.5a8.46 8.46 0 00.63 1l1.23 1.69a1.72 1.72 0 002.3.44l1.36-.87a1.7 1.7 0 00.62-2.03z"
  //     ></path>
  //     <path
  //       fill="#fff"
  //       d="M349.73 125.74l-.85-2.13s-.47-2.72-2.16-3.48l-5 .79.17.44c.46 1 .11 2.83-.34 4.29s.31 1.65.95 1.36c.36-.16.71-.81 1.09-1.5a8.46 8.46 0 00.63 1l1.23 1.69a1.72 1.72 0 002.3.44l1.36-.87a1.7 1.7 0 00.62-2.03z"
  //       opacity="0.8"
  //     ></path>
  //     <path
  //       fill="#8978E9"
  //       d="M317.24 106.06l-1.22.1-7.49 18.08a4 4 0 001.22-.1s9.76-3.64 12.71-5c-1.98-4.09-5.22-13.08-5.22-13.08z"
  //       opacity="0.3"
  //     ></path>
  //     <path
  //       fill="#fff"
  //       d="M303.57 110.8a43.41 43.41 0 005 13.44c3.66-1.26 9.76-3.64 12.72-5a135.36 135.36 0 01-5.29-13.08c-3.13.21-10 2.84-12.43 4.64z"
  //     ></path>
  //     <path
  //       fill="#8978E9"
  //       d="M311 114.71a2.58 2.58 0 11-1.73-3.21 2.58 2.58 0 011.73 3.21z"
  //       opacity="0.3"
  //     ></path>
  //     <path
  //       fill="#8978E9"
  //       d="M312.91 111.27a.85.85 0 11-.56-1 .84.84 0 01.56 1zM315.15 110.4a.85.85 0 11-1.62-.49.84.84 0 011.05-.56.85.85 0 01.57 1.05z"
  //       opacity="0.6"
  //     ></path>
  //     <path
  //       fill="#8978E9"
  //       d="M318.29 118.19L309.04 121.84 308.49 120.02 317.73 116.37 318.29 118.19z"
  //       opacity="0.5"
  //     ></path>
  //   </g>
  //   <g>
  //     <path
  //       d="M267.26 257.17a94 94 0 01-1.68 17.35q-1.77 7.71-5.5 11.28a12.3 12.3 0 01-8.81 3.57q-7.71 0-11.77-8.41a23.79 23.79 0 01-1.21-3.11 144.31 144.31 0 00-15.92 16l-5.31 6.26a38.62 38.62 0 009.77 7.19q9.34 4.83 24.52 4.84c1.78 0 3.5-.05 5.17-.15a143.39 143.39 0 0015.1-29l14.85-38.72z"
  //       opacity="0.2"
  //     ></path>
  //     <path
  //       fill="#263238"
  //       d="M133.39 310l17.5 17.5 49-46.17c-16.89-6.45-49.73 11.86-66.5 28.67zM194.42 371c-5.59-5.6-17.5-17.5-17.5-17.5l46.17-49c6.41 16.85-11.9 49.72-28.67 66.5z"
  //     ></path>
  //     <path
  //       fill="#8978E9"
  //       d="M261.4 260.7l19.09-36.81L243.68 243a144.22 144.22 0 00-32.44 23l-62.75 59.07 30.83 30.83 59.07-62.75a144.22 144.22 0 0023.01-32.45z"
  //     ></path>
  //     <path
  //       fill="#fff"
  //       d="M261.4 260.7l19.09-36.81L243.68 243a144.22 144.22 0 00-32.44 23l-62.75 59.07 30.83 30.83 59.07-62.75a144.22 144.22 0 0023.01-32.45z"
  //       opacity="0.6"
  //     ></path>
  //     <circle cx="222.2" cy="282.18" r="12.9" fill="#fff"></circle>
  //     <circle cx="222.2" cy="282.18" r="8.29" fill="#8978E9"></circle>
  //     <path
  //       fill="#8978E9"
  //       d="M189.75 344.82L159.56 314.63 184.28 291.37 213.01 320.11 189.75 344.82z"
  //       opacity="0.3"
  //     ></path>
  //     <path
  //       fill="#8978E9"
  //       d="M140.22 337.62c-22.6 1.83-30.09 16.3-32.65 35.53-1.3 9.81-1.88 19.74-10.11 25.48a2.77 2.77 0 001.63 5.06c30.34-.95 44.49-15.8 46.27-22a43.06 43.06 0 01-2.49 9.47 2.76 2.76 0 004 3.39c8.51-5.33 19.19-15.15 19.9-31.08-6.26-8.87-26.55-25.85-26.55-25.85z"
  //     ></path>
  //     <path
  //       fill="#fff"
  //       d="M140.22 337.62c-22.6 1.83-30.09 16.3-32.65 35.53-1.3 9.81-1.88 19.74-10.11 25.48a2.77 2.77 0 001.63 5.06c30.34-.95 44.49-15.8 46.27-22a43.06 43.06 0 01-2.49 9.47 2.76 2.76 0 004 3.39c8.51-5.33 19.19-15.15 19.9-31.08-6.26-8.87-26.55-25.85-26.55-25.85z"
  //       opacity="0.2"
  //     ></path>
  //     <path
  //       fill="#8978E9"
  //       d="M170.28 370.3L134.08 334.1 153.36 329.93 174.45 351.02 170.28 370.3z"
  //     ></path>
  //   </g>
  // </Icon>
);

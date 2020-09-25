import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';

import Lottie from 'react-lottie';

import animation from '../lotties/not-found.json';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;

    h1{
        color: black;
        font-weight: 600;
    }
    
    p {
        color: black;
        background-color: rgba(255,255,255,0.7);
        margin: 25px;
        padding: 25px;
    }

    .anim {
        margin: 0px;
    }
`;
const animationOptions = {
    loop: false,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  function NotFound() {
      return (
      <Container>
          <h1>Well. This is awkward.</h1>
          <Lottie options={animationOptions} height={400} width={300} className="anim"/>
          <p>This feature is still a work in progress.<br/>
          Keep checking this page for updates and don't hesitate to hassle the developer every now and then.</p>
      </Container>
      );
}

export default NotFound;
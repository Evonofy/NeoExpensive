import React, { FC } from 'react';

import Header from './Header';
import { Next } from './Next';
import { Container, Content } from './styles';

const screen: FC = () => {
  return (
    <Container>
      <Header title="Neo Expensive" />
      <Content>
        <Next url="http://localhost:3000" />
      </Content>
    </Container>
  );
};

export default screen;

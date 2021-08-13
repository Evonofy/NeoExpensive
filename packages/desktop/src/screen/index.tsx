import React, { FC, useEffect } from 'react';

import Header from './Header';
import { Next } from './Next';
import { Container, Content } from './styles';

const screen: FC = () => {
  return (
    <Container>
      <Header title="faedadawdawdwa" />
      <Content>
        <Next url="https://esquemaflorescer.github.io/neo-expensive/packages/web/" />
      </Content>
    </Container>
  );
};

export default screen;

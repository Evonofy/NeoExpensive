import { FC } from 'react';

import { useClamp } from '@hooks';
import { Button } from '@components';
import { DropdownContainer, Info } from '@styles/components/dropdown';

interface DropdownProps {
  rootFontSize: number;
}

export const Dropdown: FC<DropdownProps> = ({ rootFontSize }) => {
  return (
    <DropdownContainer className="dropdown">
      <div className="dropdown__bg">
        <div className="dropdown__bg-bottom"></div>
      </div>

      <section className="dropdown__wrap">
        <Info
          titleSize={useClamp('0.6rem', '1.1rem', rootFontSize)}
          className="dropdown-menu"
          id="info"
          data-sub="info"
        >
          <div className="dropdown-menu__content">
            <div className="top-section">
              <div className="card">
                <img src="https://raw.githubusercontent.com/EsquemaFlorescer/neo-expensive/main/packages/web/images/info.svg" />
                <h2>Peças (HARDWARE)</h2>
                <ul>
                  <li>
                    <a tabIndex={2} href="#">
                      Processadores
                    </a>
                  </li>
                  <li>
                    <a tabIndex={2} href="#">
                      Placas De Vídeo
                    </a>
                  </li>
                  <li>
                    <a tabIndex={2} href="#">
                      Placas mãe
                    </a>
                  </li>
                  <li>
                    <a tabIndex={2} href="#">
                      Memórias
                    </a>
                  </li>
                  <li>
                    <a tabIndex={2} href="#">
                      Disco rígido hd/ssd
                    </a>
                  </li>
                  <li>
                    <a tabIndex={2} href="#">
                      fontes
                    </a>
                  </li>
                </ul>
              </div>

              <div className="card">
                <img
                  src="https://raw.githubusercontent.com/EsquemaFlorescer/neo-expensive/main/packages/web/images/platforms.svg"
                  alt=""
                />
                <h2>Periféricos e Acessórios</h2>
                <ul>
                  <li>
                    <a tabIndex={2} href="#">
                      Fones de Ouvido
                    </a>
                  </li>
                  <li>
                    <a tabIndex={2} href="#">
                      Teclados
                    </a>
                  </li>
                  <li>
                    <a tabIndex={2} href="#">
                      Mouses
                    </a>
                  </li>
                  <li>
                    <a tabIndex={2} href="#">
                      Controles
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bottom-section">
              <a href="#pcs">Computadores Montados</a>

              <Button rootFontSize={rootFontSize} variant="primary">
                Monte seu pc
              </Button>
            </div>
          </div>
        </Info>

        <div className="dropdown-menu" id="developer" data-sub="developer">
          <div className="dropdown-menu__content">
            <div className="top-section">dwad34433423434w34adwa</div>
            <div className="bottom-section">
              dswadaw23423423423423423423423waedwa
            </div>
          </div>
        </div>
      </section>
    </DropdownContainer>
  );
};

import { FC } from 'react';

import { DropdownContainer } from '@styles/components/dropdown';

export const Dropdown: FC = () => {
  return (
    <DropdownContainer className="dropdown">
      <div className="dropdown__bg">
        <div className="dropdown__bg-bottom"></div>
      </div>

      <section className="dropdown__wrap">
        <div className="dropdown-menu" id="info" data-sub="info">
          <div className="dropdown-menu__content">
            <div className="top-section">
              <div className="card">
                <img src="https://raw.githubusercontent.com/EsquemaFlorescer/neo-expensive/main/packages/web/images/info.svg" />
                <h2>Peças (HARDWARE)</h2>
                <ul>
                  <li>
                    <a href="#">Processadores</a>
                  </li>
                  <li>
                    <a href="#">Placas De Vídeo</a>
                  </li>
                  <li>
                    <a href="#">Placas mãe</a>
                  </li>
                  <li>
                    <a href="#">Memórias</a>
                  </li>
                  <li>
                    <a href="#">Disco rígido hd/ssd</a>
                  </li>
                  <li>
                    <a href="#">fontes</a>
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
                    <a href="#">Fones de Ouvido</a>
                  </li>
                  <li>
                    <a href="#">Teclados</a>
                  </li>
                  <li>
                    <a href="#">Mouses</a>
                  </li>
                  <li>
                    <a href="#">Controles</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bottom-section">
              <a href="#pcs">Computadores Montados</a>

              <button>Monte seu pc</button>
            </div>
          </div>
        </div>

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

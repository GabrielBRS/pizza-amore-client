import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Clock3,
  Heart,
  MapPin,
  Menu,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  Wheat,
  X,
} from 'lucide-react';

type MenuCategory = 'Tradicionais' | 'Especiais' | 'Premium' | 'Doces';

type Pizza = {
  name: string;
  description: string;
  category: MenuCategory;
  largePrice: number;
  smallPrice: number;
};

const pizzas: Pizza[] = [
  {
    name: 'Margherita',
    description: 'Molho italiano Pelati, mussarela, manjericão e parmesão.',
    category: 'Tradicionais',
    largePrice: 75,
    smallPrice: 43,
  },
  {
    name: 'Calabresa',
    description: 'Molho italiano Pelati, mussarela, calabresa e orégano.',
    category: 'Tradicionais',
    largePrice: 75,
    smallPrice: 43,
  },
  {
    name: 'Frango',
    description: 'Molho italiano Pelati, mussarela, frango desfiado e orégano.',
    category: 'Tradicionais',
    largePrice: 75,
    smallPrice: 43,
  },
  {
    name: 'Calabresa com Cebola',
    description: 'Molho italiano Pelati, mussarela, calabresa, cebola e orégano.',
    category: 'Especiais',
    largePrice: 76,
    smallPrice: 44,
  },
  {
    name: 'Napolitana',
    description: 'Molho italiano Pelati, mussarela, presunto, tomate-cereja, manjericão e orégano.',
    category: 'Especiais',
    largePrice: 76,
    smallPrice: 44,
  },
  {
    name: 'Portuguesa',
    description: 'Molho italiano Pelati, mussarela, presunto, calabresa, cebola, pimentão, ovo e orégano.',
    category: 'Especiais',
    largePrice: 78,
    smallPrice: 46,
  },
  {
    name: 'Frango com Catupiry® Original',
    description: 'Molho italiano Pelati, mussarela, frango desfiado, Catupiry® e orégano.',
    category: 'Especiais',
    largePrice: 78,
    smallPrice: 46,
  },
  {
    name: 'Lombo com Catupiry® Original',
    description: 'Molho italiano Pelati, mussarela, lombo, tomate-cereja, Catupiry® e orégano.',
    category: 'Premium',
    largePrice: 80,
    smallPrice: 48,
  },
  {
    name: 'Carne Seca',
    description: 'Molho italiano Pelati, mussarela, carne seca e orégano.',
    category: 'Premium',
    largePrice: 80,
    smallPrice: 48,
  },
  {
    name: 'Carne Seca com Cebola',
    description: 'Molho italiano Pelati, mussarela, carne seca, cebola e orégano.',
    category: 'Premium',
    largePrice: 82,
    smallPrice: 48,
  },
  {
    name: 'Pepperoni',
    description: 'Molho italiano Pelati, mussarela, pepperoni, molho sweet chilli e orégano.',
    category: 'Premium',
    largePrice: 82,
    smallPrice: 50,
  },
  {
    name: 'Quatro Queijos',
    description: 'Molho italiano Pelati, mussarela, Catupiry®, gorgonzola, parmesão e orégano.',
    category: 'Premium',
    largePrice: 83,
    smallPrice: 50,
  },
  {
    name: 'Margherita ao Filetto',
    description: 'Molho italiano Pelati, mussarela de búfala, tomate-cereja confitado no azeite, alho e ervas, manjericão e parmesão.',
    category: 'Premium',
    largePrice: 85,
    smallPrice: 50,
  },
  {
    name: 'Carne Seca com Catupiry® Original',
    description: 'Molho italiano Pelati, mussarela, carne seca, Catupiry® e orégano.',
    category: 'Premium',
    largePrice: 85,
    smallPrice: 50,
  },
  {
    name: 'Goiana com Catupiry® Original',
    description: 'Molho italiano Pelati, mussarela, frango desfiado, bacon, milho, Catupiry® e orégano.',
    category: 'Premium',
    largePrice: 88,
    smallPrice: 52,
  },
  {
    name: 'Banana',
    description: 'Creme de leite, mussarela, banana, açúcar e canela.',
    category: 'Doces',
    largePrice: 75,
    smallPrice: 45,
  },
  {
    name: 'Chocolate',
    description: 'Creme de leite, mussarela e chocolate Nestlé.',
    category: 'Doces',
    largePrice: 80,
    smallPrice: 50,
  },
  {
    name: 'Chocolate Branco',
    description: 'Creme de leite, mussarela e chocolate branco Nestlé.',
    category: 'Doces',
    largePrice: 80,
    smallPrice: 50,
  },
  {
    name: 'Banana Nevada',
    description: 'Creme de leite, mussarela, banana, açúcar, canela e chocolate branco Nestlé.',
    category: 'Doces',
    largePrice: 82,
    smallPrice: 52,
  },
];

const categories: Array<'Todas' | MenuCategory> = [
  'Todas',
  'Tradicionais',
  'Especiais',
  'Premium',
  'Doces',
];

const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
});

const whatsappUrl = 'https://wa.me/5561998812648';

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`brand ${compact ? 'brand--compact' : ''}`} href="#inicio" aria-label="Pizza Amore, início">
      <span className="brand__seal" aria-hidden="true"><Heart size={22} fill="currentColor" /></span>
      <span className="brand__wordmark"><span>Pizza</span><strong>Amore</strong></span>
    </a>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState<(typeof categories)[number]>('Todas');

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const visiblePizzas = useMemo(
    () => (category === 'Todas' ? pizzas : pizzas.filter((pizza) => pizza.category === category)),
    [category],
  );

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="site-header">
        <div className="announcement">
          <span>Guará II</span>
          <span className="announcement__diamond" aria-hidden="true" />
          <span>Gama</span>
          <span className="announcement__message">Duas casas, a mesma receita feita com afeto.</span>
        </div>

        <nav className="nav container" aria-label="Navegação principal">
          <BrandMark />

          <div className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
            <button className="nav__close" onClick={closeMenu} aria-label="Fechar menu"><X size={25} /></button>
            <a href="#historia" onClick={closeMenu}>Nossa pizza</a>
            <a href="#cardapio" onClick={closeMenu}>Cardápio</a>
            <a href="#unidades" onClick={closeMenu}>Unidades</a>
            <a className="button button--small button--red" href="#unidades" onClick={closeMenu}>
              <ShoppingBag size={17} /> Fazer pedido
            </a>
          </div>

          <button className="nav__toggle" onClick={() => setMenuOpen(true)} aria-label="Abrir menu"><Menu size={27} /></button>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero__texture" aria-hidden="true" />
          <div className="container hero__grid">
            <div className="hero__copy">
              <p className="eyebrow"><span /> Pizza artesanal em Brasília</p>
              <h1>Feita com <em>tempo.</em><br />Servida com <em>afeto.</em></h1>
              <p className="hero__lead">
                Massa leve, borda tostada e ingredientes escolhidos um a um. Uma pizza com alma de casa,
                agora em dois cantinhos de Brasília.
              </p>
              <div className="hero__actions">
                <a className="button button--red" href="#unidades">Escolher minha unidade <ArrowRight size={19} /></a>
                <a className="text-link" href="#cardapio">Ver sabores <ArrowDown size={17} /></a>
              </div>
              <div className="hero__details" aria-label="Diferenciais">
                <span><Clock3 size={18} /> Longa fermentação</span>
                <span><Wheat size={18} /> Feita à mão</span>
              </div>
            </div>

            <div className="hero__visual">
              <div className="hero__photo-frame">
                <img src="/images/pizza-forno.jpg" alt="Pizza artesanal assando em forno de pedra" fetchPriority="high" />
              </div>
              <div className="hero__stamp" aria-label="Massa artesanal, forno e afeto">
                <Sparkles size={20} /><strong>Massa artesanal</strong><span>forno & afeto</span>
              </div>
              <p className="hero__note">O amor mora aqui.</p>
            </div>
          </div>
        </section>

        <section className="story" id="historia">
          <div className="container story__grid">
            <div className="story__image-wrap">
              <img src="/images/pizza-mesa.jpg" alt="Pizza artesanal servida sobre uma mesa de madeira" loading="lazy" />
              <div className="story__image-caption">Feita para dividir — ou não.</div>
            </div>
            <div className="story__copy">
              <p className="eyebrow eyebrow--green"><span /> Nossa receita</p>
              <h2>Sem pressa.<br />Sem atalhos.</h2>
              <p className="story__intro">A Pizza Amore nasce do encontro entre a simplicidade italiana e o jeito caloroso de Brasília.</p>
              <p>
                A massa descansa até chegar no ponto certo. O molho tem gosto de tomate. Cada combinação é
                pensada para equilibrar textura, aroma e aquele último pedaço que ninguém quer deixar.
              </p>
              <div className="story__values">
                <div><strong>01</strong><span>Massa preparada todos os dias</span></div>
                <div><strong>02</strong><span>Ingredientes frescos e honestos</span></div>
                <div><strong>03</strong><span>Receitas clássicas e da casa</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="menu-section" id="cardapio">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow eyebrow--light"><span /> Cardápio oficial</p>
                <h2>Escolha pelo desejo.</h2>
              </div>
              <p>Pizza grande com 8 fatias ou pequena com 4 fatias. Todos os sabores e valores em um só lugar.</p>
            </div>

            <div className="menu-filters" role="group" aria-label="Filtrar sabores">
              {categories.map((item) => (
                <button key={item} className={category === item ? 'is-active' : ''} onClick={() => setCategory(item)} aria-pressed={category === item}>
                  {item}
                </button>
              ))}
            </div>

            <div className="menu-price-key" aria-hidden="true">
              <span>Grande <small>8 fatias</small></span>
              <span>Pequena <small>4 fatias</small></span>
            </div>

            <div className="pizza-list" aria-live="polite">
              {visiblePizzas.map((pizza, index) => (
                <article className="pizza-item" key={pizza.name}>
                  <span className="pizza-item__number">{String(index + 1).padStart(2, '0')}</span>
                  <div className="pizza-item__content">
                    <div className="pizza-item__title">
                      <h3>{pizza.name}</h3>
                      <span>{pizza.category}</span>
                    </div>
                    <p>{pizza.description}</p>
                  </div>
                  <div className="pizza-item__prices">
                    <span><small>Grande</small>{currency.format(pizza.largePrice)}</span>
                    <span><small>Pequena</small>{currency.format(pizza.smallPrice)}</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="drinks-block">
              <div>
                <p className="eyebrow eyebrow--light"><span /> Para acompanhar</p>
                <h3>Bebidas</h3>
              </div>
              <div className="drinks-list">
                <p><span>Coca-Cola 1,5 L <small>normal ou zero</small></span><strong>{currency.format(12)}</strong></p>
                <p><span>Guaraná 1,5 L</span><strong>{currency.format(12)}</strong></p>
              </div>
            </div>
            <p className="menu-disclaimer">Valores e sabores conforme o cardápio fornecido. Consulte disponibilidade pelo WhatsApp.</p>
          </div>
        </section>

        <section className="locations" id="unidades">
          <div className="container">
            <div className="section-heading section-heading--dark">
              <div>
                <p className="eyebrow eyebrow--green"><span /> Onde encontrar a Amore</p>
                <h2>Escolha a sua casa.</h2>
              </div>
              <p>O mesmo cuidado, duas experiências com personalidade própria.</p>
            </div>

            <div className="location-grid">
              <article className="location-card location-card--vila">
                <div className="location-card__topline"><span>01</span><span>Guará II • Brasília</span></div>
                <div>
                  <p className="location-card__kind">A villa do bairro</p>
                  <h3>Villa<br />Pizza Amore</h3>
                  <p>QE 36, Conjunto I — Guará II, próximo ao posto de gasolina.</p>
                  <p className="location-card__hours"><Clock3 size={18} /> Todos os dias, das 19h às 23h.</p>
                </div>
                <div className="location-card__footer">
                  <a href="https://www.google.com/maps/search/?api=1&query=QE+36+Conjunto+I+Guara+II+Brasilia+DF" target="_blank" rel="noreferrer">
                    <MapPin size={18} /> Ver no mapa
                  </a>
                  <a className="status-pill status-pill--order" href={whatsappUrl} target="_blank" rel="noreferrer">
                    <MessageCircle size={15} /> Pedir no WhatsApp
                  </a>
                </div>
              </article>

              <article className="location-card location-card--casa">
                <div className="location-card__topline"><span>02</span><span>Gama • Brasília</span></div>
                <div>
                  <p className="location-card__kind">A casa original</p>
                  <h3>Casa<br />Pizza Amore</h3>
                  <p>SOE Q 19, Casa 93A — Gama, Brasília — DF, CEP 72420-190.</p>
                  <p className="location-card__hours"><Clock3 size={18} /> Todos os dias, das 19h às 23h.</p>
                </div>
                <div className="location-card__footer">
                  <a href="https://www.google.com/maps/search/?api=1&query=SOE+Q+19+Casa+93A+Gama+Brasilia+DF+72420-190" target="_blank" rel="noreferrer">
                    <MapPin size={18} /> Ver no mapa
                  </a>
                  <a className="status-pill status-pill--order" href={whatsappUrl} target="_blank" rel="noreferrer">
                    <MessageCircle size={15} /> Pedir no WhatsApp
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="cta-band">
          <div className="container cta-band__inner">
            <span className="cta-band__seal" aria-hidden="true">♥</span>
            <div><p>Villa ou Casa, você escolhe</p><h2>O forno está esquentando.</h2></div>
            <a className="button button--cream" href={whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle size={19} /> WhatsApp (61) 9 9881-2648
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__top">
          <BrandMark compact />
          <p>Pizza artesanal, feita com tempo e servida com afeto em Brasília. Pedidos: (61) 9 9881-2648.</p>
          <div className="footer__social">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp da Pizza Amore"><MessageCircle size={20} /></a>
          </div>
        </div>
        <div className="container footer__bottom">
          <span>© {new Date().getFullYear()} Pizza Amore</span>
          <span>Villa no Guará II • Casa no Gama</span>
        </div>
      </footer>
    </>
  );
}

export default App;

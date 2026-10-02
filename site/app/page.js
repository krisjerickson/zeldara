'use client';
// The Zeldara home page: Kris's picks — the World Tree Veil page, the World Tree logo and the Ringed Z
// wordmark — painted on one canvas by the same code the game's title uses (public/brand.js, built from
// src/js/07zz-brand*.js). Real links sit over the two painted buttons and lead into the game at /play.
import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

const BLURB = 'Four realms. One awakening. Wake the waystones, befriend the spirits, and face the Volcano Lord.';
const LINKS = { 'NEW GAME': '/play?start=new', 'RETURNING PLAYER': '/play?start=returning' };

export default function Home() {
  const canvas = useRef(null);
  const [brand, setBrand] = useState(false);      // brand.js has loaded
  const [players, setPlayers] = useState(0);      // names saved in this browser
  const [rects, setRects] = useState([]);         // where the painted buttons are (CSS px)
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    try { const p = JSON.parse(localStorage.getItem('zeldara_profiles') || 'null'); setPlayers(p && p.players ? p.players.length : 0); } catch (e) { setPlayers(0); }
    if (typeof window !== 'undefined' && window.ZBrand) setBrand(true);
  }, []);

  useEffect(() => {
    if (!brand) return;
    const Z = window.ZBrand, cv = canvas.current, cfg = Z.HOMES.find((h) => h.id === Z.HOME);
    const still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const opts = { sym: Z.LOGO, word: Z.WORDMARK, btns: players ? ['NEW GAME', 'RETURNING PLAYER'] : ['NEW GAME'] };
    let raf = 0, last = 0, W = 0, H = 0, dead = false;
    const size = () => {
      const w = window.innerWidth, h = window.innerHeight, dpr = Math.min(2, window.devicePixelRatio || 1);
      W = Math.round(w * dpr); H = Math.round(h * dpr); cv.width = W; cv.height = H;
      setRects(Z.homeLayout(cfg, w, h, opts)); setNarrow(w / h * 20 < 16);
      paint(still ? 4.2 : performance.now() / 1000);
    };
    const paint = (t) => { try { Z.home(cv.getContext('2d'), cfg, W, H, t, opts); } catch (e) { console.error(e); } };
    const tick = (ts) => { if (dead) return; if (ts - last > 33) { last = ts; paint(ts / 1000); } raf = requestAnimationFrame(tick); };
    size(); window.addEventListener('resize', size);
    if (window.ZBrandFonts) window.ZBrandFonts.load().then(() => { if (!dead) paint(still ? 4.2 : performance.now() / 1000); });
    if (!still) raf = requestAnimationFrame(tick);
    return () => { dead = true; cancelAnimationFrame(raf); window.removeEventListener('resize', size); };
  }, [brand, players]);

  return (
    <main className="home">
      <Script src="/brand.js" strategy="afterInteractive" onReady={() => setBrand(true)} />
      <h1 className="sr">Zeldara</h1>
      <canvas ref={canvas} aria-hidden="true" />
      {!brand && <div className="loading">ZELDARA</div>}
      {rects.map((r) => (
        <a key={r.label} className="btn" href={LINKS[r.label]} style={{ left: r.x, top: r.y, width: r.w, height: r.h }}
          onClick={() => { try { sessionStorage.setItem('zeldara_start', r.label === 'NEW GAME' ? 'new' : 'returning'); } catch (e) {} }}>
          <span className="sr">{r.label === 'NEW GAME' ? 'New game' : 'Returning player'}</span>
        </a>
      ))}
      <p className={narrow ? 'blurb' : 'sr'}>{BLURB}</p>
    </main>
  );
}

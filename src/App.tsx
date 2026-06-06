import { useState, useEffect, useRef, useCallback } from 'react';
import SphereImageGrid from '@/components/ui/img-sphere';
import { ALL_PHOTOS } from '@/lib/photos';

// ==========================================
// Petals
// ==========================================
function Petals() {
  const chars = ['🌸', '🌹', '💗', '🌷', '💕'];
  const petals = Array.from({ length: 22 }, (_, i) => ({
    left: Math.random() * 100,
    dur: 7 + Math.random() * 9,
    delay: -Math.random() * 12,
    size: 0.9 + Math.random() * 1.4,
    char: chars[i % chars.length],
  }));
  return (
    <div id="petals">
      {petals.map((p, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: `${p.left}vw`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            fontSize: `${p.size}rem`,
          }}
        >
          {p.char}
        </div>
      ))}
    </div>
  );
}

// ==========================================
// Countdown to June 11
// ==========================================
function nextBirthday() {
  const now = new Date();
  const y = now.getFullYear();
  const end = new Date(y, 5, 11, 23, 59, 59);
  return now > end ? new Date(y + 1, 5, 11) : new Date(y, 5, 11);
}
function isBirthdayToday() {
  const n = new Date();
  return n.getMonth() === 5 && n.getDate() === 11;
}

function Countdown({ onBirthday }: { onBirthday: () => void }) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [today, setToday] = useState(isBirthdayToday());

  useEffect(() => {
    const tick = () => {
      if (isBirthdayToday()) {
        setToday(true);
        onBirthday();
        return;
      }
      const diff = nextBirthday().getTime() - Date.now();
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [onBirthday]);

  if (today) {
    return <div className="cd-msg">🎉 It's finally here — Happy Birthday! 🎉</div>;
  }

  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <>
      <div className="countdown">
        <div className="cd-box"><div className="num">{t.d}</div><div className="lbl">Days</div></div>
        <div className="cd-box"><div className="num">{pad(t.h)}</div><div className="lbl">Hours</div></div>
        <div className="cd-box"><div className="num">{pad(t.m)}</div><div className="lbl">Minutes</div></div>
        <div className="cd-box"><div className="num">{pad(t.s)}</div><div className="lbl">Seconds</div></div>
      </div>
      <div className="cd-msg">until your special day 🌹</div>
    </>
  );
}

// ==========================================
// Lightbox (for timeline + gallery)
// ==========================================
function Lightbox({
  list, index, onClose, onNav,
}: { list: string[]; index: number; onClose: () => void; onNav: (dir: number) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav(1);
      if (e.key === 'ArrowLeft') onNav(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, onNav]);

  return (
    <div id="lightbox" className="show" onClick={onClose}>
      <button className="lb-btn" id="lb-close" onClick={(e) => { e.stopPropagation(); onClose(); }}>✕</button>
      <button className="lb-btn" id="lb-prev" onClick={(e) => { e.stopPropagation(); onNav(-1); }}>‹</button>
      <img src={list[index]} alt="Tsedu" onClick={(e) => e.stopPropagation()} />
      <button className="lb-btn" id="lb-next" onClick={(e) => { e.stopPropagation(); onNav(1); }}>›</button>
    </div>
  );
}

// ==========================================
// Scroll-reveal hook
// ==========================================
function useReveal<T extends Element>() {
  const [shown, setShown] = useState(false);
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }),
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

function GalleryImg({ src, onClick }: { src: string; onClick: () => void }) {
  const { ref, shown } = useReveal<HTMLImageElement>();
  return (
    <img ref={ref} className={shown ? 'in' : ''} src={src} alt="Tsedu" loading="lazy" onClick={onClick} />
  );
}

// ==========================================
// Confetti burst
// ==========================================
function confettiBurst() {
  const c = document.getElementById('confetti');
  if (!c) return;
  const colors = ['#c44569', '#f8a5c2', '#d4af37', '#ff6b9d', '#ffd6e3'];
  for (let i = 0; i < 90; i++) {
    const bit = document.createElement('div');
    bit.className = 'confetti-bit';
    bit.style.background = colors[i % colors.length];
    bit.style.left = `${40 + Math.random() * 20}vw`;
    bit.style.top = '40vh';
    bit.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    c.appendChild(bit);
    const ang = Math.random() * Math.PI * 2;
    const vel = 200 + Math.random() * 420;
    const dx = Math.cos(ang) * vel;
    const dy = Math.sin(ang) * vel - 250;
    bit.animate(
      [
        { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${dx}px,${dy + 700}px) rotate(${720 * Math.random()}deg)`, opacity: 0 },
      ],
      { duration: 1600 + Math.random() * 900, easing: 'cubic-bezier(.2,.7,.3,1)' }
    ).onfinish = () => bit.remove();
  }
}

// ==========================================
// Music button
// ==========================================
function MusicButton() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [label, setLabel] = useState('Play music');

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (!playing) {
      const p = a.play();
      if (p && p.then) {
        p.then(() => { setPlaying(true); setLabel('Pause music'); })
         .catch(() => setLabel('Add music.mp3 to /public'));
      }
    } else {
      a.pause();
      setPlaying(false);
      setLabel('Play music');
    }
  };

  return (
    <>
      <button id="music-btn" onClick={toggle}>
        🎵 <span>{label}</span>
      </button>
      <audio ref={audioRef} loop preload="auto">
        <source src={`${import.meta.env.BASE_URL}music.mp3`} type="audio/mpeg" />
        <source src={`${import.meta.env.BASE_URL}song.mp3`} type="audio/mpeg" />
        <source src={`${import.meta.env.BASE_URL}tsedu.mp3`} type="audio/mpeg" />
        <source src={`${import.meta.env.BASE_URL}music.m4a`} type="audio/mp4" />
        <source src={`${import.meta.env.BASE_URL}music.ogg`} type="audio/ogg" />
      </audio>
    </>
  );
}

// ==========================================
// App
// ==========================================
export default function App() {
  const [opened, setOpened] = useState(false);
  const [lb, setLb] = useState<{ list: string[]; index: number } | null>(null);

  const allSrcs = ALL_PHOTOS.map((p) => p.src);

  const openLightbox = useCallback((list: string[], src: string) => {
    setLb({ list, index: Math.max(0, list.indexOf(src)) });
  }, []);
  const navLightbox = useCallback((dir: number) => {
    setLb((cur) => (cur ? { ...cur, index: (cur.index + dir + cur.list.length) % cur.list.length } : cur));
  }, []);

  const reveal = useCallback((auto = false) => {
    setOpened((was) => {
      if (!was && !auto) {
        confettiBurst();
        setTimeout(() => {
          document.querySelector('.letter-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 700);
      }
      return true;
    });
  }, []);

  const onBirthday = useCallback(() => reveal(true), [reveal]);

  const sphereSize = Math.min(560, (typeof window !== 'undefined' ? window.innerWidth : 600) - 48);
  const unlocked = isBirthdayToday();

  return (
    <>
      <div id="confetti" />
      <Petals />
      <MusicButton />

      {/* HERO */}
      <header className="hero">
        <div className="pre">A little surprise, just for you</div>
        <div className="big">Happy Birthday</div>
        <div className="big" style={{ marginTop: '-1rem' }}>Tsedu</div>
        <div className="name">Tsedale Sisay Kefyale</div>
        <div className="age">Turning 26 — June 11 🎂</div>
        <Countdown onBirthday={onBirthday} />
        <div className="scroll-hint">❤</div>
      </header>

      {/* GIFT */}
      <section className="gift-section">
        <span className="gift-emoji">{opened ? '💖' : unlocked ? '🎁' : '🔒'}</span>
        <h2 className="section-title">I made something for you</h2>
        {opened ? (
          <p className="section-sub">💝 opened with love</p>
        ) : unlocked ? (
          <>
            <p className="section-sub">go on... open it</p>
            <button id="gift-btn" onClick={() => reveal(false)}>Open your gift 💝</button>
          </>
        ) : (
          <>
            <p className="section-sub">this gift opens on June 11 🔒</p>
            <p className="lockmsg">Come back on your birthday — something special is waiting for you 🌹</p>
          </>
        )}
      </section>

      {/* SECRET CONTENT */}
      {opened && (
        <>
          {/* LOVE LETTER */}
          <section className="letter-section">
            <h2 className="section-title">From My Heart</h2>
            <p className="section-sub">a few words</p>
            <div className="letter">
              <p className="salutation">My dearest Tsedu,</p>
              <p>Happy birthday to my best friend! Today the whole world gets a little brighter, because today is the day you were born — and I get to celebrate one of the most wonderful people I know.</p>
              <p>I built this little corner of the internet just for you, filled with the moments that made you <em>you</em>. From the tiny girl with the biggest smile, to the amazing person you've grown into — every version of you is someone I'm so grateful to have in my life.</p>
              <p>You were born on <strong>04 ሰኔ 1992</strong> (11 June 2000), and ever since, the world has been luckier for having you in it. I'm lucky too, because somehow I get to call you my friend.</p>
              <p>Thank you for your laugh, your kindness, the way you always show up, and for every ordinary day you turn into a memory worth keeping. Here's to you — to twenty-six years of being wonderful, and to many more birthdays celebrated together.</p>
              <p>Thank you for being the best friend anyone could ask for.</p>
              <p className="signoff">Always your friend 💛</p>
            </div>
          </section>

          {/* 3D SPHERE */}
          <section className="sphere-section">
            <h2 className="section-title">Tsedu's Little Universe</h2>
            <p className="section-sub">spin her around — drag it, then tap a photo</p>
            <div className="sphere-hint">🖐️ drag to rotate · tap a photo to enlarge</div>
            <div className="sphere-stage-wrap">
              <SphereImageGrid
                images={ALL_PHOTOS}
                containerSize={sphereSize}
                sphereRadius={200}
                dragSensitivity={0.8}
                momentumDecay={0.96}
                maxRotationSpeed={6}
                baseImageScale={0.16}
                perspective={1000}
                autoRotate={true}
                autoRotateSpeed={0.2}
              />
            </div>
          </section>

          {/* GALLERY */}
          <section style={{ background: 'linear-gradient(180deg,var(--blush),#fff)' }}>
            <h2 className="section-title">Every Beautiful Moment</h2>
            <p className="section-sub">tap any photo to see it bigger</p>
            <div className="wrap">
              <div className="gallery">
                {allSrcs.map((src) => (
                  <GalleryImg key={src} src={src} onClick={() => openLightbox(allSrcs, src)} />
                ))}
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer>
            <div className="heart">❤</div>
            <h2 className="script" style={{ fontSize: 'clamp(2.2rem,7vw,3.6rem)', color: 'var(--rose)' }}>Happy Birthday, Tsedu</h2>
            <div className="dates">11 June 2000 · 04 ሰኔ 1992 (Ethiopian Calendar)</div>
            <div className="sig">— with all my love</div>
          </footer>
        </>
      )}

      {lb && (
        <Lightbox list={lb.list} index={lb.index} onClose={() => setLb(null)} onNav={navLightbox} />
      )}
    </>
  );
}

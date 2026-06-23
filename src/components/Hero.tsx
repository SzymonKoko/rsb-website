import { useEffect, useRef } from 'react';

const HERO_FRAMES = Array.from(
  { length: 49 },
  (_, index) => `/assets/frames/frame-${String(index + 1).padStart(4, '0')}.jpg`,
);

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    framesRef.current = HERO_FRAMES.map((src, index) => {
      const image = new Image();
      image.decoding = 'async';
      image.src = src;

      image.addEventListener(
        'load',
        () => {
          if (index === 0) {
            drawFrame(image);
          }
        },
        { once: true },
      );

      return image;
    });

    function drawFrame(image: HTMLImageElement) {
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d', { alpha: true });

      if (!canvas || !context || !image.complete) {
        return;
      }

      if (canvas.width !== image.naturalWidth || canvas.height !== image.naturalHeight) {
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    let frame = 0;
    let lastIndex = -1;

    const findLoadedFrame = (targetIndex: number) => {
      const frames = framesRef.current;
      const exact = frames[targetIndex];

      if (exact?.complete) {
        return { image: exact, index: targetIndex };
      }

      for (let offset = 1; offset < frames.length; offset += 1) {
        const before = frames[targetIndex - offset];
        if (before?.complete) {
          return { image: before, index: targetIndex - offset };
        }

        const after = frames[targetIndex + offset];
        if (after?.complete) {
          return { image: after, index: targetIndex + offset };
        }
      }

      return null;
    };

    const drawImageToCanvas = (image: HTMLImageElement) => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d', { alpha: true });

      if (!canvas || !context) {
        return;
      }

      if (canvas.width !== image.naturalWidth || canvas.height !== image.naturalHeight) {
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);
    };

    const drawFrameAtScroll = () => {
      frame = 0;

      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      const targetIndex = Math.round(progress * (HERO_FRAMES.length - 1));
      const loadedFrame = findLoadedFrame(targetIndex);

      if (!loadedFrame || loadedFrame.index === lastIndex) {
        return;
      }

      drawImageToCanvas(loadedFrame.image);
      lastIndex = loadedFrame.index;
    };

    const requestDraw = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(drawFrameAtScroll);
    };

    window.addEventListener('scroll', requestDraw, { passive: true });
    window.addEventListener('resize', requestDraw);
    requestDraw();

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener('scroll', requestDraw);
      window.removeEventListener('resize', requestDraw);
    };
  }, []);

  return (
    <section className="hero" id="home" aria-labelledby="hero-title" ref={sectionRef}>
      <div className="hero-pin">
        <img
          className="hero-sequence-fallback"
          src={HERO_FRAMES[0]}
          alt=""
          aria-hidden="true"
          decoding="async"
        />
        <canvas className="hero-sequence-canvas" ref={canvasRef} aria-hidden="true" />
        <div className="hero-scrim" aria-hidden="true" />
        <div className="hero-content">
          <img
            className="hero-logo"
            src="/assets/logo_wykres_tekst.png"
            alt="Rozwiń Swój Biznes (RSB)"
            decoding="async"
          />
          <p className="eyebrow">Strony, marketing, SEO</p>
          <h1 id="hero-title">Rozwiń Swój Biznes online.</h1>
          <p className="hero-text">
            RSB tworzy strony wizytówkowe i produktowe, które wspierają sprzedaż,
            marketing oraz widoczność w Google.
          </p>
          <div className="hero-actions" aria-label="Główne akcje">
            <a className="button primary" href="#contact">
              Zaplanuj stronę
            </a>
            <a className="button secondary" href="#offer">
              Zobacz ofertę
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

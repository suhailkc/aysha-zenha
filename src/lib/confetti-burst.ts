type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  spin: number;
  life: number;
};

const palette = [
  "#cdb8ff",
  "#ffb6d5",
  "#b8ebd2",
  "#ffe69a",
  "#382b4a",
] as const;

function createParticles(
  width: number,
  height: number,
  count: number,
): Particle[] {
  const originX = width * 0.5;
  const originY = height * 0.35;
  return Array.from({ length: count }, () => ({
    x: originX + (Math.random() - 0.5) * width * 0.2,
    y: originY + (Math.random() - 0.5) * 40,
    vx: (Math.random() - 0.5) * 6,
    vy: Math.random() * -8 - 2,
    size: 4 + Math.random() * 6,
    color: palette[Math.floor(Math.random() * palette.length)] ?? palette[0],
    rotation: Math.random() * 360,
    spin: (Math.random() - 0.5) * 12,
    life: 1,
  }));
}

export type ConfettiBurstOptions = {
  durationMs?: number;
  particleCount?: number;
};

export function runConfettiBurst(
  canvas: HTMLCanvasElement,
  options: ConfettiBurstOptions = {},
): () => void {
  const durationMs = options.durationMs ?? 2200;
  const particleCount = options.particleCount ?? 72;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return () => {};
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  let particles = createParticles(width, height, particleCount);
  const start = performance.now();
  let frameId = 0;

  const tick = (now: number) => {
    const elapsed = now - start;
    ctx.clearRect(0, 0, width, height);

    particles = particles.filter((p) => p.life > 0.05);
    for (const p of particles) {
      p.vy += 0.22;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.spin;
      p.life -= 0.012;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    }

    if (elapsed < durationMs && particles.length > 0) {
      frameId = requestAnimationFrame(tick);
    } else {
      ctx.clearRect(0, 0, width, height);
    }
  };

  frameId = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(frameId);
    ctx.clearRect(0, 0, width, height);
  };
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type ManifoldMode = 'pomdp' | 'rollout' | 'equilibrium';

interface CarbonManifoldCanvasProps {
  mode: ManifoldMode;
}

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uFrequency;
  uniform float uAmplitude;
  uniform vec2 uPointer;

  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vDisplacement;

  // Ashima 3D Simplex Noise
  vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 1.0 / 7.0;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  float displaceField(vec3 pos) {
    vec3 warp = pos * uFrequency + vec3(uTime * 0.26, -uTime * 0.19, uTime * 0.15);
    warp.xy += uPointer * 0.45;
    float n1 = snoise(warp);
    float n2 = 0.5 * snoise(warp * 2.15 + vec3(1.7));
    return (n1 + n2) * uAmplitude;
  }

  void main() {
    float d = displaceField(position);
    vDisplacement = d;

    // Finite-difference normal reconstruction for liquid-metal highlights
    float eps = 0.025;
    vec3 tangentX = vec3(eps, 0.0, 0.0);
    vec3 tangentY = vec3(0.0, eps, 0.0);
    vec3 tangentZ = vec3(0.0, 0.0, eps);

    vec3 pPos = position + normal * d;
    vec3 px = (position + tangentX) + normalize(position + tangentX) * displaceField(position + tangentX);
    vec3 py = (position + tangentY) + normalize(position + tangentY) * displaceField(position + tangentY);
    vec3 pz = (position + tangentZ) + normalize(position + tangentZ) * displaceField(position + tangentZ);

    vec3 grad = vec3(
      length(px) - length(pPos),
      length(py) - length(pPos),
      length(pz) - length(pPos)
    ) / eps;

    vec3 displacedNormal = normalize(normal - grad * 0.62);
    vNormal = normalize(normalMatrix * displacedNormal);

    vec4 mvPosition = modelViewMatrix * vec4(pPos, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uModeMix;

  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vDisplacement;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);

    // Anodized Carbon base & Studio Key/Rim Lighting
    vec3 baseCarbon = vec3(0.032, 0.038, 0.048);
    vec3 warmGold   = vec3(0.91, 0.71, 0.33);
    vec3 tungsten   = vec3(0.94, 0.54, 0.22);
    vec3 signalJade = vec3(0.20, 0.83, 0.60);

    vec3 keyLight = normalize(vec3(1.2, 1.6, 1.8));
    vec3 fillLight = normalize(vec3(-1.4, -0.8, 0.9));

    float diffKey = max(dot(normal, keyLight), 0.0);
    float diffFill = max(dot(normal, fillLight), 0.0);

    vec3 halfVec = normalize(keyLight + viewDir);
    float spec = pow(max(dot(normal, halfVec), 0.0), 46.0);
    float tightSpec = pow(max(dot(normal, halfVec), 0.0), 140.0);

    // Physical Fresnel rim
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.1);

    // Crest energy modulation
    float crest = smoothstep(-0.15, 0.36, vDisplacement);

    vec3 color = baseCarbon;
    color += vec3(0.07, 0.08, 0.10) * diffKey;
    color += vec3(0.03, 0.05, 0.06) * diffFill;

    // Burnished gold specular & rim
    vec3 accentTone = mix(warmGold, mix(tungsten, signalJade, 0.35), uModeMix * 0.55);
    color += accentTone * spec * 0.72;
    color += vec3(1.0, 0.96, 0.88) * tightSpec * 0.55;
    color += mix(warmGold, signalJade, crest * 0.28) * fresnel * 0.68;
    color += warmGold * crest * 0.065;

    gl_FragColor = vec4(color, 0.96);
  }
`;

const PARTICLE_VERT = /* glsl */ `
  attribute float aScale;
  uniform float uPixelRatio;
  uniform float uTime;
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    float angle = uTime * 0.12 + length(pos.xz) * 0.35;
    mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    pos.xz = rot * pos.xz;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aScale * uPixelRatio * (18.0 / -mvPosition.z);
    vAlpha = smoothstep(7.5, 2.2, -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const PARTICLE_FRAG = /* glsl */ `
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float glow = smoothstep(0.5, 0.05, d);
    vec3 col = mix(vec3(0.90, 0.71, 0.33), vec3(0.96, 0.95, 0.92), glow * 0.5);
    gl_FragColor = vec4(col, glow * vAlpha * 0.72);
  }
`;

const MODE_TARGETS: Record<ManifoldMode, { freq: number; amp: number; mix: number; ringSpeed: number }> = {
  pomdp: { freq: 1.32, amp: 0.27, mix: 0.0, ringSpeed: 0.18 },
  rollout: { freq: 2.25, amp: 0.36, mix: 1.0, ringSpeed: 0.44 },
  equilibrium: { freq: 0.82, amp: 0.15, mix: 0.45, ringSpeed: 0.09 }
};

export const CarbonManifoldCanvas: React.FC<CarbonManifoldCanvasProps> = ({ mode }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const modeRef = useRef<ManifoldMode>(mode);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch {
      // Graceful fallback if WebGL is unavailable in headless environments
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.domElement.className = 'hero-webgl-canvas';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
    camera.position.set(0, 0, 5.4);

    const rig = new THREE.Group();
    scene.add(rig);

    // 1. Liquid Carbon Latent Manifold Core
    const isMobile = window.innerWidth < 768;
    const detail = isMobile ? 42 : 64;
    const coreGeo = new THREE.IcosahedronGeometry(1.38, detail);
    const uniforms = {
      uTime: { value: 0 },
      uFrequency: { value: MODE_TARGETS[modeRef.current].freq },
      uAmplitude: { value: MODE_TARGETS[modeRef.current].amp },
      uModeMix: { value: MODE_TARGETS[modeRef.current].mix },
      uPointer: { value: new THREE.Vector2(0, 0) }
    };

    const coreMat = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      transparent: true
    });

    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rig.add(coreMesh);

    // 2. Precision Geodesic Telemetry Rings
    const ringGroup = new THREE.Group();
    const ringRadii = [1.98, 2.28, 2.58];
    const ringTilts = [
      [0.68, 0.32, 0.0],
      [-0.52, 0.85, 0.42],
      [1.18, -0.24, -0.35]
    ];

    const ringMats: THREE.MeshBasicMaterial[] = [];
    const ringGeos: THREE.TorusGeometry[] = [];

    ringRadii.forEach((radius, idx) => {
      const rGeo = new THREE.TorusGeometry(radius, 0.0055, 8, 128);
      const rMat = new THREE.MeshBasicMaterial({
        color: idx === 0 ? 0xe5b454 : 0x9aa2b2,
        transparent: true,
        opacity: idx === 0 ? 0.34 : 0.14
      });
      const rMesh = new THREE.Mesh(rGeo, rMat);
      rMesh.rotation.set(ringTilts[idx][0], ringTilts[idx][1], ringTilts[idx][2]);
      ringGroup.add(rMesh);
      ringGeos.push(rGeo);
      ringMats.push(rMat);
    });
    rig.add(ringGroup);

    // 3. 200 Orbiting Kaggle Environment Nodes (MLE-Dojo Corpus)
    const count = 200;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 1.9 + Math.random() * 1.25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      scales[i] = 0.55 + Math.random() * 1.15;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

    const particleUniforms = {
      uTime: { value: 0 },
      uPixelRatio: { value: dpr }
    };

    const particleMat = new THREE.ShaderMaterial({
      vertexShader: PARTICLE_VERT,
      fragmentShader: PARTICLE_FRAG,
      uniforms: particleUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    rig.add(particles);

    // Responsive Layout Positioning (Desktop right-balanced, Mobile upper-centered)
    const updateLayout = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      if (w >= 980) {
        rig.position.set(1.25, 0.08, 0);
        rig.scale.setScalar(1.0);
      } else {
        rig.position.set(0, 0.62, -0.65);
        rig.scale.setScalar(0.78);
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout, { passive: true });

    // Touch & Pointer Spring Tracking (Passive so mobile scroll is 100% smooth)
    const targetPtr = new THREE.Vector2(0, 0);
    const onPointerMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetPtr.set(x, y);
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // Pause WebGL loop when scrolled out of viewport to save mobile battery
    let isVisible = true;
    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.02 }
    );
    io.observe(container);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const dt = Math.min(clock.getDelta(), 0.05);
      const elapsed = reducedMotion ? 1.5 : clock.elapsedTime;
      const cfg = MODE_TARGETS[modeRef.current];

      uniforms.uTime.value = elapsed;
      particleUniforms.uTime.value = elapsed;

      uniforms.uFrequency.value += (cfg.freq - uniforms.uFrequency.value) * 0.06;
      uniforms.uAmplitude.value += (cfg.amp - uniforms.uAmplitude.value) * 0.06;
      uniforms.uModeMix.value += (cfg.mix - uniforms.uModeMix.value) * 0.06;

      uniforms.uPointer.value.lerp(targetPtr, 0.05);

      if (!reducedMotion) {
        coreMesh.rotation.y += dt * 0.14;
        coreMesh.rotation.x = uniforms.uPointer.value.y * 0.25;
        ringGroup.rotation.y -= dt * cfg.ringSpeed;
        ringGroup.rotation.z += dt * (cfg.ringSpeed * 0.45);
        rig.rotation.y = uniforms.uPointer.value.x * 0.22;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      window.removeEventListener('resize', updateLayout);
      window.removeEventListener('pointermove', onPointerMove);
      coreGeo.dispose();
      coreMat.dispose();
      ringGeos.forEach((g) => g.dispose());
      ringMats.forEach((m) => m.dispose());
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="hero-webgl-wrap" aria-hidden="true" />;
};

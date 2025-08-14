import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";

interface DistortedImageProps {
  imageUrl: string;
  alt: string;
}

const DistortedImage: React.FC<DistortedImageProps> = ({ imageUrl, alt }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const planeRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 2;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageUrl, (texture) => {
      const geometry = new THREE.PlaneGeometry(1.5, 1, 32, 32);

      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: texture },
          uDistortion: { value: 0 },
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        },
        vertexShader: `
          uniform float uDistortion;
          uniform float uTime;
          uniform vec2 uMouse;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 pos = position;
            // Вычисляем расстояние от точки UV до положения мыши
            float dist = distance(uv, uMouse);
            // Плавно уменьшаем влияние по мере удаления от курсора
            float influence = 1.0 - smoothstep(0.0, 0.5, dist);
            // Вычисляем смещение: вектор от uv к uMouse, умноженный на влияние и uDistortion
            vec2 mouseOffset = (uMouse - uv) * influence * uDistortion;
            pos.xy += mouseOffset;
            // Дополнительное небольшое смещение по Z для динамики
            pos.z += sin(uv.x * 3.1415 + uTime) * uDistortion * 0.1;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D uTexture;
          uniform float uDistortion;
          uniform float uTime;
          uniform vec2 uMouse;
          varying vec2 vUv;
          
          // Простая функция шума
          float random (vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
          }

          void main() {
            vec2 uv = vUv;
            // Добавляем шум для эффекта рябья
            float noise = random(uv + uTime);
            uv.x += noise * uDistortion * 0.05;
            uv.y += noise * uDistortion * 0.05;
            // Дополнительное локальное смещение на основе положения мыши
            vec2 diff = uMouse - uv;
            float influence = 1.0 - smoothstep(0.0, 0.3, length(diff));
            uv += diff * influence * uDistortion * 0.1;
            gl_FragColor = texture2D(uTexture, uv);
          }
        `,
        transparent: true,
      });

      const plane = new THREE.Mesh(geometry, material);

      const fov = camera.fov * (Math.PI / 180);
      const visibleHeight = 2 * Math.tan(fov / 2) * camera.position.z;
      const visibleWidth = visibleHeight * camera.aspect;
      const scaleX = visibleWidth / geometry.parameters.width;
      const scaleY = visibleHeight / geometry.parameters.height;
      plane.scale.set(scaleX, scaleY, 1);

      scene.add(plane);
      planeRef.current = plane;
    });

    let reqId: number;
    const animate = () => {
      if (planeRef.current) {
        const material = planeRef.current.material as THREE.ShaderMaterial;
        material.uniforms.uTime.value += 0.05;
      }
      renderer.render(scene, camera);
      reqId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(reqId);
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [imageUrl]);

  const handleMouseEnter = () => {
    if (planeRef.current) {
      const material = planeRef.current.material as THREE.ShaderMaterial;
      gsap.to(material.uniforms.uDistortion, { value: 0.3, duration: 0.5 });
    }
  };

  const handleMouseLeave = () => {
    if (planeRef.current) {
      const material = planeRef.current.material as THREE.ShaderMaterial;
      gsap.to(material.uniforms.uDistortion, { value: 0, duration: 0.5 });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const container = containerRef.current;
    if (!container || !planeRef.current) return;
    const rect = container.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width;
    const mouseY = 1 - (e.clientY - rect.top) / rect.height;
    const material = planeRef.current.material as THREE.ShaderMaterial;
    (material.uniforms.uMouse.value as THREE.Vector2).set(mouseX, mouseY);
  };

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", position: "relative" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      aria-label={alt}
    />
  );
};

export default DistortedImage;

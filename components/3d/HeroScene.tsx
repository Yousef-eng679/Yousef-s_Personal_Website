'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const innerGeometry = new THREE.IcosahedronGeometry(1.8, 1);
    const innerMaterial = new THREE.MeshPhongMaterial({
      color: 0x8b5cf6,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.9,
      wireframe: true,
      transparent: true,
      opacity: 0.95,
    });
    const innerCore = new THREE.Mesh(innerGeometry, innerMaterial);
    group.add(innerCore);

    const outerGeometry = new THREE.IcosahedronGeometry(2.3, 0);
    const outerMaterial = new THREE.MeshPhongMaterial({
      color: 0x3b82f6,
      emissive: 0x3b82f6,
      emissiveIntensity: 1.3,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const outerCage = new THREE.Mesh(outerGeometry, outerMaterial);
    group.add(outerCage);

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 600;
    const posArray = new Float32Array(particleCount * 3);

    for(let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 16;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const pointLight = new THREE.PointLight(0xffffff, 300, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    camera.position.z = 6;

    let targetSpeed = 1.0;
    let currentSpeed = 1.0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let animationFrameId: number;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = currentMount.getBoundingClientRect();
      const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      targetRotationX = mouseY * 0.5;
      targetRotationY = mouseX * 0.5;
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      currentSpeed += (targetSpeed - currentSpeed) * 0.08;

      group.rotation.y += 0.006 * currentSpeed + (targetRotationY - group.rotation.y) * 0.05;
      group.rotation.x += 0.003 * currentSpeed + (targetRotationX - group.rotation.x) * 0.05;
      
      outerCage.rotation.y -= 0.003 * currentSpeed;
      particles.rotation.y -= 0.0006;

      renderer.render(scene, camera);
    };

    animate();
    
    setTimeout(() => setOpacity(1), 300);

    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    const handleMouseEnter = () => { targetSpeed = 4.5; };
    const handleMouseLeave = () => { 
      targetSpeed = 1.0; 
      targetRotationX = 0;
      targetRotationY = 0;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    currentMount.addEventListener('mouseenter', handleMouseEnter);
    currentMount.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      currentMount.removeEventListener('mouseenter', handleMouseEnter);
      currentMount.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      innerGeometry.dispose();
      innerMaterial.dispose();
      outerGeometry.dispose();
      outerMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-[450px] bg-transparent relative z-10 transition-opacity duration-1000 cursor-grab active:cursor-grabbing"
      style={{ opacity }}
    />
  );
}

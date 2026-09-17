import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Zap,
  FlipHorizontal,
  Maximize2
} from 'lucide-react';

interface VirtualAvatarProps {
  biomechanicsKey?: string;
  targetMuscle?: string;
  exerciseName?: string;
  className?: string;
  height?: string;
  interactive?: boolean;
}

export const VirtualAvatar: React.FC<VirtualAvatarProps> = ({
  biomechanicsKey = 'shoulder_press',
  targetMuscle = 'Shoulders',
  exerciseName = 'Seated Dumbbell Shoulder Press',
  className = '',
  height = '500px',
  interactive = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Controls state
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1.0);
  const [cameraView, setCameraView] = useState<'front' | 'side' | 'back' | 'threeQuarter'>('threeQuarter');
  const [isMirrored, setIsMirrored] = useState<boolean>(false);
  const [showTechnique, setShowTechnique] = useState<boolean>(false);
  const [progressPhase, setProgressPhase] = useState<'START' | 'PRESS' | 'PEAK' | 'LOWER'>('START');

  // Three.js object references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Character body part references
  const bodyRef = useRef<{
    head?: THREE.Group;
    torso?: THREE.Group;
    leftArm?: THREE.Group;
    rightArm?: THREE.Group;
    leftForearm?: THREE.Group;
    rightForearm?: THREE.Group;
    leftLeg?: THREE.Group;
    rightLeg?: THREE.Group;
    leftFoot?: THREE.Group;
    rightFoot?: THREE.Group;
    leftDumbbell?: THREE.Group;
    rightDumbbell?: THREE.Group;
    bench?: THREE.Group;
    techniqueArrows?: THREE.Group[];
  }>({});

  const timeRef = useRef<number>(0);
  const isMouseDownRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Camera targets for presets
  const cameraAngles = {
    front: { x: 0, y: 1.2, z: 3.5 },
    side: { x: 3.5, y: 1.2, z: 0.1 },
    back: { x: 0, y: 1.2, z: -3.5 },
    threeQuarter: { x: 2.5, y: 1.5, z: 2.8 },
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene setup with pastel pink/lavender background
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xE8D5E7); // Pastel pink/lavender

    // 2. Professional studio lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Soft key light from front-left
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
    keyLight.position.set(3, 4, 3);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Soft fill light from front-right
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-3, 3, 3);
    scene.add(fillLight);

    // Rim light from behind for depth
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.4);
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    // 3. Camera setup
    const width = container.clientWidth || 400;
    const heightPx = container.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.1, 50);
    const initTarget = cameraAngles[cameraView];
    camera.position.set(initTarget.x, initTarget.y, initTarget.z);
    camera.lookAt(0, 0.8, 0);
    cameraRef.current = camera;

    // 4. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 5. Materials for premium cartoon aesthetic
    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0xDEB887, // Warm skin tone
      roughness: 0.6,
      metalness: 0.0,
    });

    const hairMaterial = new THREE.MeshStandardMaterial({
      color: 0x2C1810, // Dark brown/black hair
      roughness: 0.8,
      metalness: 0.0,
    });

    const shirtMaterial = new THREE.MeshStandardMaterial({
      color: 0x40E0D0, // Turquoise/cyan
      roughness: 0.7,
      metalness: 0.0,
    });

    const shortsMaterial = new THREE.MeshStandardMaterial({
      color: 0xFF69B4, // Bright pink
      roughness: 0.7,
      metalness: 0.0,
    });

    const shoesMaterial = new THREE.MeshStandardMaterial({
      color: 0xADFF2F, // Lime green
      roughness: 0.6,
      metalness: 0.0,
    });

    const benchMaterial = new THREE.MeshStandardMaterial({
      color: 0x2C2C2C, // Dark charcoal
      roughness: 0.4,
      metalness: 0.3,
    });

    const dumbbellMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a, // Dark charcoal/black
      roughness: 0.3,
      metalness: 0.7,
    });

    const techniqueArrowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00BFFF,
      transparent: true,
      opacity: 0.8,
    });

    // 6. Build character model
    const modelGroup = new THREE.Group();
    modelGroupRef.current = modelGroup;
    scene.add(modelGroup);

    // HEAD with facial features
    const headGroup = new THREE.Group();
    headGroup.position.y = 1.55;
    modelGroup.add(headGroup);

    // Head base (slightly oversized for cartoon look)
    const headGeo = new THREE.SphereGeometry(0.18, 32, 32);
    const head = new THREE.Mesh(headGeo, skinMaterial);
    head.scale.set(1.1, 1.0, 0.95);
    headGroup.add(head);

    // Hair (short dark hair)
    const hairGeo = new THREE.SphereGeometry(0.19, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
    const hair = new THREE.Mesh(hairGeo, hairMaterial);
    hair.position.y = 0.02;
    hair.scale.set(1.05, 0.9, 1.0);
    headGroup.add(hair);

    // Hair top styling
    const hairTopGeo = new THREE.SphereGeometry(0.15, 16, 16);
    const hairTop = new THREE.Mesh(hairTopGeo, hairMaterial);
    hairTop.position.y = 0.12;
    hairTop.scale.set(1.0, 0.6, 0.9);
    headGroup.add(hairTop);

    // Beard (short, neatly shaped)
    const beardGeo = new THREE.SphereGeometry(0.12, 16, 16, 0, Math.PI * 2, 0, Math.PI / 3);
    const beard = new THREE.Mesh(beardGeo, hairMaterial);
    beard.position.set(0, -0.05, 0.05);
    beard.scale.set(1.2, 0.8, 0.6);
    headGroup.add(beard);

    // Eyes (simple dark expressive eyes)
    const eyeGeo = new THREE.SphereGeometry(0.025, 16, 16);
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.3 });
    
    const leftEye = new THREE.Mesh(eyeGeo, eyeMaterial);
    leftEye.position.set(-0.05, 0.02, 0.15);
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMaterial);
    rightEye.position.set(0.05, 0.02, 0.15);
    headGroup.add(rightEye);

    // Nose (simple stylized)
    const noseGeo = new THREE.ConeGeometry(0.02, 0.04, 8);
    const nose = new THREE.Mesh(noseGeo, skinMaterial);
    nose.position.set(0, -0.02, 0.16);
    nose.rotation.x = Math.PI;
    headGroup.add(nose);

    // Mouth (simple friendly smile)
    const mouthGeo = new THREE.TorusGeometry(0.03, 0.008, 8, 16, Math.PI);
    const mouthMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.5 });
    const mouth = new THREE.Mesh(mouthGeo, mouthMaterial);
    mouth.position.set(0, -0.08, 0.14);
    mouth.rotation.x = Math.PI;
    headGroup.add(mouth);

    // TORSO with clothing
    const torsoGroup = new THREE.Group();
    torsoGroup.position.y = 1.25;
    modelGroup.add(torsoGroup);

    // Torso body
    const torsoGeo = new THREE.BoxGeometry(0.45, 0.5, 0.28);
    const torso = new THREE.Mesh(torsoGeo, skinMaterial);
    torsoGroup.add(torso);

    // Turquoise sleeveless shirt
    const shirtGeo = new THREE.BoxGeometry(0.48, 0.45, 0.30);
    const shirt = new THREE.Mesh(shirtGeo, shirtMaterial);
    shirt.position.y = -0.02;
    torsoGroup.add(shirt);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.07, 0.08, 0.12, 16);
    const neck = new THREE.Mesh(neckGeo, skinMaterial);
    neck.position.y = 0.28;
    torsoGroup.add(neck);

    // Shoulders (for arm attachment)
    const leftShoulder = new THREE.Group();
    leftShoulder.position.set(-0.26, 0.15, 0);
    torsoGroup.add(leftShoulder);

    const rightShoulder = new THREE.Group();
    rightShoulder.position.set(0.26, 0.15, 0);
    torsoGroup.add(rightShoulder);

    // ARMS
    // Left upper arm
    const leftArmGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.35, 16);
    const leftArm = new THREE.Mesh(leftArmGeo, skinMaterial);
    leftArm.position.y = -0.175;
    leftShoulder.add(leftArm);

    // Left forearm
    const leftForearmGroup = new THREE.Group();
    leftForearmGroup.position.y = -0.35;
    leftArm.add(leftForearmGroup);

    const leftForearmGeo = new THREE.CylinderGeometry(0.06, 0.05, 0.32, 16);
    const leftForearm = new THREE.Mesh(leftForearmGeo, skinMaterial);
    leftForearm.position.y = -0.16;
    leftForearmGroup.add(leftForearm);

    // Left hand
    const leftHandGeo = new THREE.SphereGeometry(0.05, 16, 16);
    const leftHand = new THREE.Mesh(leftHandGeo, skinMaterial);
    leftHand.position.y = -0.34;
    leftForearmGroup.add(leftHand);

    // Right upper arm
    const rightArmGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.35, 16);
    const rightArm = new THREE.Mesh(rightArmGeo, skinMaterial);
    rightArm.position.y = -0.175;
    rightShoulder.add(rightArm);

    // Right forearm
    const rightForearmGroup = new THREE.Group();
    rightForearmGroup.position.y = -0.35;
    rightArm.add(rightForearmGroup);

    const rightForearmGeo = new THREE.CylinderGeometry(0.06, 0.05, 0.32, 16);
    const rightForearm = new THREE.Mesh(rightForearmGeo, skinMaterial);
    rightForearm.position.y = -0.16;
    rightForearmGroup.add(rightForearm);

    // Right hand
    const rightHandGeo = new THREE.SphereGeometry(0.05, 16, 16);
    const rightHand = new THREE.Mesh(rightHandGeo, skinMaterial);
    rightHand.position.y = -0.34;
    rightForearmGroup.add(rightHand);

    // LEGS
    const hipsGroup = new THREE.Group();
    hipsGroup.position.y = 0.95;
    modelGroup.add(hipsGroup);

    // Pink shorts
    const shortsGeo = new THREE.BoxGeometry(0.42, 0.28, 0.26);
    const shorts = new THREE.Mesh(shortsGeo, shortsMaterial);
    shorts.position.y = -0.1;
    hipsGroup.add(shorts);

    // Left leg
    const leftLegGroup = new THREE.Group();
    leftLegGroup.position.set(-0.12, -0.22, 0);
    hipsGroup.add(leftLegGroup);

    const leftThighGeo = new THREE.CylinderGeometry(0.1, 0.08, 0.42, 16);
    const leftThigh = new THREE.Mesh(leftThighGeo, skinMaterial);
    leftThigh.position.y = -0.21;
    leftLegGroup.add(leftThigh);

    const leftLowerLegGroup = new THREE.Group();
    leftLowerLegGroup.position.y = -0.42;
    leftThigh.add(leftLowerLegGroup);

    const leftCalfGeo = new THREE.CylinderGeometry(0.07, 0.05, 0.40, 16);
    const leftCalf = new THREE.Mesh(leftCalfGeo, skinMaterial);
    leftCalf.position.y = -0.20;
    leftLowerLegGroup.add(leftCalf);

    // Left foot with lime-green shoe
    const leftFootGroup = new THREE.Group();
    leftFootGroup.position.y = -0.40;
    leftCalf.add(leftFootGroup);

    const leftFootGeo = new THREE.BoxGeometry(0.12, 0.08, 0.22);
    const leftFoot = new THREE.Mesh(leftFootGeo, shoesMaterial);
    leftFoot.position.set(0, -0.04, 0.04);
    leftFootGroup.add(leftFoot);

    // Right leg
    const rightLegGroup = new THREE.Group();
    rightLegGroup.position.set(0.12, -0.22, 0);
    hipsGroup.add(rightLegGroup);

    const rightThighGeo = new THREE.CylinderGeometry(0.1, 0.08, 0.42, 16);
    const rightThigh = new THREE.Mesh(rightThighGeo, skinMaterial);
    rightThigh.position.y = -0.21;
    rightLegGroup.add(rightThigh);

    const rightLowerLegGroup = new THREE.Group();
    rightLowerLegGroup.position.y = -0.42;
    rightThigh.add(rightLowerLegGroup);

    const rightCalfGeo = new THREE.CylinderGeometry(0.07, 0.05, 0.40, 16);
    const rightCalf = new THREE.Mesh(rightCalfGeo, skinMaterial);
    rightCalf.position.y = -0.20;
    rightLowerLegGroup.add(rightCalf);

    // Right foot with lime-green shoe
    const rightFootGroup = new THREE.Group();
    rightFootGroup.position.y = -0.40;
    rightCalf.add(rightFootGroup);

    const rightFootGeo = new THREE.BoxGeometry(0.12, 0.08, 0.22);
    const rightFoot = new THREE.Mesh(rightFootGeo, shoesMaterial);
    rightFoot.position.set(0, -0.04, 0.04);
    rightFootGroup.add(rightFoot);

    // ADJUSTABLE GYM BENCH
    const benchGroup = new THREE.Group();
    benchGroup.position.set(0, 0.35, 0);
    scene.add(benchGroup);

    // Bench seat
    const seatGeo = new THREE.BoxGeometry(0.6, 0.08, 0.35);
    const seat = new THREE.Mesh(seatGeo, benchMaterial);
    seat.position.y = 0.35;
    benchGroup.add(seat);

    // Bench backrest (adjustable angle)
    const backrestGeo = new THREE.BoxGeometry(0.6, 0.5, 0.08);
    const backrest = new THREE.Mesh(backrestGeo, benchMaterial);
    backrest.position.set(0, 0.65, -0.15);
    backrest.rotation.x = Math.PI / 12; // Slight angle
    benchGroup.add(backrest);

    // Bench frame
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.3,
      metalness: 0.8,
    });

    // Front legs
    const frontLegGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.35, 8);
    const leftFrontLeg = new THREE.Mesh(frontLegGeo, frameMaterial);
    leftFrontLeg.position.set(-0.25, 0.175, 0.1);
    benchGroup.add(leftFrontLeg);

    const rightFrontLeg = new THREE.Mesh(frontLegGeo, frameMaterial);
    rightFrontLeg.position.set(0.25, 0.175, 0.1);
    benchGroup.add(rightFrontLeg);

    // Back legs
    const backLegGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.45, 8);
    const leftBackLeg = new THREE.Mesh(backLegGeo, frameMaterial);
    leftBackLeg.position.set(-0.25, 0.225, -0.15);
    benchGroup.add(leftBackLeg);

    const rightBackLeg = new THREE.Mesh(backLegGeo, frameMaterial);
    rightBackLeg.position.set(0.25, 0.225, -0.15);
    benchGroup.add(rightBackLeg);

    // DUMBBELLS
    // Left dumbbell
    const leftDumbbellGroup = new THREE.Group();
    scene.add(leftDumbbellGroup);

    const handleGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.2, 12);
    const leftHandle = new THREE.Mesh(handleGeo, dumbbellMaterial);
    leftHandle.rotation.z = Math.PI / 2;
    leftDumbbellGroup.add(leftHandle);

    const weightPlateGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.04, 16);
    const leftWeight1 = new THREE.Mesh(weightPlateGeo, dumbbellMaterial);
    leftWeight1.rotation.z = Math.PI / 2;
    leftWeight1.position.x = -0.12;
    leftDumbbellGroup.add(leftWeight1);

    const leftWeight2 = new THREE.Mesh(weightPlateGeo, dumbbellMaterial);
    leftWeight2.rotation.z = Math.PI / 2;
    leftWeight2.position.x = 0.12;
    leftDumbbellGroup.add(leftWeight2);

    // Right dumbbell
    const rightDumbbellGroup = new THREE.Group();
    scene.add(rightDumbbellGroup);

    const rightHandle = new THREE.Mesh(handleGeo, dumbbellMaterial);
    rightHandle.rotation.z = Math.PI / 2;
    rightDumbbellGroup.add(rightHandle);

    const rightWeight1 = new THREE.Mesh(weightPlateGeo, dumbbellMaterial);
    rightWeight1.rotation.z = Math.PI / 2;
    rightWeight1.position.x = -0.12;
    rightDumbbellGroup.add(rightWeight1);

    const rightWeight2 = new THREE.Mesh(weightPlateGeo, dumbbellMaterial);
    rightWeight2.rotation.z = Math.PI / 2;
    rightWeight2.position.x = 0.12;
    rightDumbbellGroup.add(rightWeight2);

    // Technique arrows
    const techniqueArrows: THREE.Group[] = [];
    
    const createArrow = (position: THREE.Vector3, direction: THREE.Vector3) => {
      const arrowGroup = new THREE.Group();
      arrowGroup.position.copy(position);
      
      const shaftGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.2, 8);
      const shaft = new THREE.Mesh(shaftGeo, techniqueArrowMaterial);
      shaft.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
      arrowGroup.add(shaft);

      const headGeo = new THREE.ConeGeometry(0.04, 0.08, 8);
      const head = new THREE.Mesh(headGeo, techniqueArrowMaterial);
      head.position.copy(direction.normalize().multiplyScalar(0.14));
      head.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
      arrowGroup.add(head);

      arrowGroup.visible = false;
      scene.add(arrowGroup);
      techniqueArrows.push(arrowGroup);
      return arrowGroup;
    };

    // Create upward arrows for shoulder press
    const leftArrow = createArrow(new THREE.Vector3(-0.5, 1.2, 0.3), new THREE.Vector3(0, 1, 0));
    const rightArrow = createArrow(new THREE.Vector3(0.5, 1.2, 0.3), new THREE.Vector3(0, 1, 0));

    // Store references
    bodyRef.current = {
      head: headGroup,
      torso: torsoGroup,
      leftArm: leftShoulder,
      rightArm: rightShoulder,
      leftForearm: leftForearmGroup,
      rightForearm: rightForearmGroup,
      leftLeg: leftLegGroup,
      rightLeg: rightLegGroup,
      leftFoot: leftFootGroup,
      rightFoot: rightFootGroup,
      leftDumbbell: leftDumbbellGroup,
      rightDumbbell: rightDumbbellGroup,
      bench: benchGroup,
      techniqueArrows: techniqueArrows,
    };

    // 7. Orbit Mouse Drag Interaction
    const onMouseDown = (e: MouseEvent) => {
      isMouseDownRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isMouseDownRef.current || !modelGroupRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      modelGroupRef.current.rotation.y += deltaX * 0.01;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isMouseDownRef.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      if (!cameraRef.current) return;
      e.preventDefault();
      const zoomFactor = e.deltaY * 0.002;
      cameraRef.current.position.z = THREE.MathUtils.clamp(
        cameraRef.current.position.z + zoomFactor,
        2.0,
        6.0
      );
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domEl.addEventListener('wheel', onWheel, { passive: false });

    // 8. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      if (isPlaying) {
        timeRef.current += delta * speed * 1.5;
      }

      const t = timeRef.current;
      const cycle = (Math.sin(t) + 1) / 2; // 0 to 1 smooth sine cycle

      // Determine movement phase
      if (cycle < 0.15) setProgressPhase('START');
      else if (cycle < 0.5) setProgressPhase('PRESS');
      else if (cycle < 0.7) setProgressPhase('PEAK');
      else setProgressPhase('LOWER');

      const {
        head,
        torso,
        leftArm,
        rightArm,
        leftForearm,
        rightForearm,
        leftLeg,
        rightLeg,
        leftFoot,
        rightFoot,
        leftDumbbell,
        rightDumbbell,
        bench,
        techniqueArrows,
      } = bodyRef.current;

      if (head && torso && leftArm && rightArm && leftForearm && rightForearm && 
          leftLeg && rightLeg && leftFoot && rightFoot && leftDumbbell && rightDumbbell) {
        
        // Reset rotations
        torso.rotation.set(0, 0, 0);
        leftArm.rotation.set(0, 0, 0);
        rightArm.rotation.set(0, 0, 0);
        leftForearm.rotation.set(0, 0, 0);
        rightForearm.rotation.set(0, 0, 0);
        leftLeg.rotation.set(0, 0, 0);
        rightLeg.rotation.set(0, 0, 0);
        leftFoot.rotation.set(0, 0, 0);
        rightFoot.rotation.set(0, 0, 0);

        if (biomechanicsKey === 'shoulder_press') {
          // SEATED DUMBBELL SHOULDER PRESS
          
          // Character seated on bench
          torso.position.y = 0.75;
          torso.rotation.x = -Math.PI / 10; // Slight back lean
          
          // Legs: feet on floor, knees bent
          leftLeg.rotation.x = 0.8;
          rightLeg.rotation.x = 0.8;
          leftFoot.rotation.x = -0.8;
          rightFoot.rotation.x = -0.8;

          // Head looking forward
          head.rotation.x = Math.PI / 10;

          // Shoulder press animation
          const pressHeight = cycle * 0.5; // 0 to 0.5 meters
          
          // Arms start at shoulder level, press upward
          leftArm.rotation.z = -Math.PI / 4 - cycle * 0.3;
          rightArm.rotation.z = Math.PI / 4 + cycle * 0.3;
          
          // Forearms extend
          leftForearm.rotation.x = -(1 - cycle) * 1.2;
          rightForearm.rotation.x = -(1 - cycle) * 1.2;

          // Dumbbells follow hands
          leftDumbbell.position.set(
            -0.5 + cycle * 0.1,
            1.1 + pressHeight,
            0.3 + cycle * 0.1
          );
          leftDumbbell.rotation.z = Math.PI / 2 - cycle * 0.5;

          rightDumbbell.position.set(
            0.5 - cycle * 0.1,
            1.1 + pressHeight,
            0.3 + cycle * 0.1
          );
          rightDumbbell.rotation.z = Math.PI / 2 + cycle * 0.5;

          // Update technique arrows
          if (techniqueArrows) {
            techniqueArrows.forEach(arrow => {
              arrow.visible = showTechnique;
              arrow.position.y = 1.1 + pressHeight * 0.5;
            });
          }
        } else {
          // Default standing pose
          torso.position.y = 1.0;
          torso.rotation.set(0, 0, 0);
          leftLeg.rotation.set(0, 0, 0);
          rightLeg.rotation.set(0, 0, 0);
          leftFoot.rotation.set(0, 0, 0);
          rightFoot.rotation.set(0, 0, 0);
          head.rotation.set(0, 0, 0);
          
          // Idle breathing animation
          torso.position.y = 1.0 + Math.sin(t * 2) * 0.01;
          
          leftArm.rotation.z = -0.3 + Math.sin(t) * 0.05;
          rightArm.rotation.z = 0.3 - Math.sin(t) * 0.05;
          leftForearm.rotation.x = -0.2;
          rightForearm.rotation.x = -0.2;

          leftDumbbell.position.set(-0.4, 0.8, 0.3);
          rightDumbbell.position.set(0.4, 0.8, 0.3);
        }
      }

      // Mirror mode
      if (modelGroupRef.current) {
        modelGroupRef.current.scale.x = isMirrored ? -1 : 1;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Handle Resize
    const handleResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domEl.removeEventListener('wheel', onWheel);

      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      renderer.dispose();
    };
  }, [biomechanicsKey, isMirrored, showTechnique]);

  // Handle Camera View Presets
  const setCameraPreset = (view: 'front' | 'side' | 'back' | 'threeQuarter') => {
    setCameraView(view);
    if (!cameraRef.current) return;
    const target = cameraAngles[view];
    cameraRef.current.position.set(target.x, target.y, target.z);
    cameraRef.current.lookAt(0, 0.8, 0);
  };

  const restartAnimation = () => {
    timeRef.current = 0;
    setIsPlaying(true);
  };

  return (
    <div className={`relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-2xl ${className}`}>
      {/* Top Header */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase rounded-md bg-[#40E0D0]/20 text-[#008B8B] border border-[#40E0D0]/40 backdrop-blur-md">
            3D FITNESS TRAINER
          </span>
          <span className="px-2 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-md bg-white/80 text-gray-600 border border-gray-300 backdrop-blur-md">
            Phase: <strong className="text-[#FF69B4]">{progressPhase}</strong>
          </span>
        </div>

        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            onClick={() => setShowTechnique(!showTechnique)}
            className={`p-1.5 rounded-lg border text-xs transition-all ${
              showTechnique 
                ? 'bg-[#00BFFF]/20 border-[#00BFFF]/50 text-[#00BFFF]' 
                : 'bg-white/80 border-gray-300 text-gray-500 hover:text-gray-700'
            }`}
            title="Show Technique Arrows"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsMirrored(!isMirrored)}
            className={`p-1.5 rounded-lg border text-xs transition-all ${
              isMirrored 
                ? 'bg-[#FF69B4]/20 border-[#FF69B4]/50 text-[#FF69B4]' 
                : 'bg-white/80 border-gray-300 text-gray-500 hover:text-gray-700'
            }`}
            title="Mirror Mode"
          >
            <FlipHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3D Canvas Container */}
      <div 
        ref={mountRef} 
        style={{ height }}
        className="w-full relative cursor-grab active:cursor-grabbing select-none"
      />

      {/* Exercise info overlay */}
      <div className="absolute bottom-16 left-4 z-10 pointer-events-none">
        <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">Exercise</p>
        <p className="text-sm font-bold text-gray-800 tracking-wide">
          {biomechanicsKey === 'shoulder_press' ? 'Seated Dumbbell Shoulder Press' : 'Fitness Demonstration'}
        </p>
      </div>

      {/* Bottom Controls */}
      {interactive && (
        <div className="bg-white border-t border-gray-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 z-10">
          {/* Playback Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-xl bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-white transition-all shadow-md active:scale-95"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            <button
              onClick={restartAnimation}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all active:scale-95"
              title="Restart"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setSpeed(speed === 1.0 ? 0.4 : 1.0)}
              className={`px-2.5 py-1.5 text-xs font-bold rounded-xl flex items-center gap-1 transition-all ${
                speed < 1.0 
                  ? 'bg-amber-100 text-amber-600 border border-amber-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Toggle Speed"
            >
              <Zap className="w-3.5 h-3.5" />
              {speed < 1.0 ? '0.4x' : '1.0x'}
            </button>
          </div>

          {/* Camera Controls */}
          <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-200">
            <button
              onClick={() => setCameraPreset('front')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                cameraView === 'front' 
                  ? 'bg-[#40E0D0] text-white shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Front
            </button>
            <button
              onClick={() => setCameraPreset('side')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                cameraView === 'side' 
                  ? 'bg-[#40E0D0] text-white shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Side
            </button>
            <button
              onClick={() => setCameraPreset('back')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                cameraView === 'back' 
                  ? 'bg-[#40E0D0] text-white shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Back
            </button>
            <button
              onClick={() => setCameraPreset('threeQuarter')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                cameraView === 'threeQuarter' 
                  ? 'bg-[#40E0D0] text-white shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              3/4
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

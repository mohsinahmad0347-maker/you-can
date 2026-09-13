import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Eye, 
  Zap, 
  Sliders, 
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
  biomechanicsKey = 'squat',
  targetMuscle = 'Legs',
  exerciseName = 'Exercise Demonstration',
  className = '',
  height = '420px',
  interactive = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Controls state
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1.0);
  const [cameraView, setCameraView] = useState<'front' | 'side' | 'back' | 'threeQuarter'>('threeQuarter');
  const [isMirrored, setIsMirrored] = useState<boolean>(false);
  const [showJoints, setShowJoints] = useState<boolean>(true);
  const [showMuscles, setShowMuscles] = useState<boolean>(true);
  const [progressPhase, setProgressPhase] = useState<'START' | 'MOVEMENT' | 'PEAK' | 'RETURN'>('START');

  // Three.js object references held in ref to avoid re-instantiation
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Joint nodes and body segment references
  const jointsRef = useRef<{
    pelvis?: THREE.Group;
    spine?: THREE.Group;
    chest?: THREE.Group;
    head?: THREE.Mesh;
    leftShoulder?: THREE.Group;
    rightShoulder?: THREE.Group;
    leftElbow?: THREE.Group;
    rightElbow?: THREE.Group;
    leftHip?: THREE.Group;
    rightHip?: THREE.Group;
    leftKnee?: THREE.Group;
    rightKnee?: THREE.Group;
    barbell?: THREE.Group;
    jointMarkers?: THREE.Mesh[];
    muscleMeshes?: THREE.Mesh[];
    motionArrow?: THREE.Group;
  }>({});

  const timeRef = useRef<number>(0);
  const isMouseDownRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Camera targets for presets
  const cameraAngles = {
    front: { x: 0, y: 1.1, z: 3.2 },
    side: { x: 3.2, y: 1.1, z: 0.1 },
    back: { x: 0, y: 1.1, z: -3.2 },
    threeQuarter: { x: 2.2, y: 1.4, z: 2.4 },
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x161618);

    // Subtle grid platform with glow
    const gridHelper = new THREE.GridHelper(6, 20, 0xff5722, 0x2a2a2e);
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);

    // Circular neon training mat
    const matGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.02, 32);
    const matMat = new THREE.MeshStandardMaterial({ 
      color: 0x1f1f23, 
      roughness: 0.8,
      metalness: 0.2
    });
    const matMesh = new THREE.Mesh(matGeo, matMat);
    matMesh.position.y = -0.01;
    scene.add(matMesh);

    // Outer neon ring
    const ringGeo = new THREE.RingGeometry(1.58, 1.62, 48);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xff5722, side: THREE.DoubleSide });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 0.005;
    scene.add(ringMesh);

    // 2. Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(3, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00ff66, 0.4);
    dirLight2.position.set(-3, 3, -3);
    scene.add(dirLight2);

    const accentRimLight = new THREE.PointLight(0xff5722, 1.5, 8);
    accentRimLight.position.set(0, 2.5, 0);
    scene.add(accentRimLight);

    // 3. Camera setup
    const width = container.clientWidth || 400;
    const heightPx = container.clientHeight || 420;
    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.1, 50);
    const initTarget = cameraAngles[cameraView];
    camera.position.set(initTarget.x, initTarget.y, initTarget.z);
    camera.lookAt(0, 0.9, 0);
    cameraRef.current = camera;

    // 4. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 5. Build Articulated Athletic Humanoid Model
    const modelGroup = new THREE.Group();
    modelGroupRef.current = modelGroup;
    scene.add(modelGroup);

    // Materials
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x3a3b40,
      roughness: 0.5,
      metalness: 0.3,
    });

    const activeMuscleMat = new THREE.MeshStandardMaterial({
      color: 0xff5722,
      emissive: 0xff5722,
      emissiveIntensity: 0.6,
      roughness: 0.3,
    });

    const jointMat = new THREE.MeshStandardMaterial({
      color: 0x00ff66,
      emissive: 0x00ff66,
      emissiveIntensity: 0.8,
    });

    const jointMarkers: THREE.Mesh[] = [];
    const muscleMeshes: THREE.Mesh[] = [];

    const createJointMarker = (parent: THREE.Object3D) => {
      const jGeo = new THREE.SphereGeometry(0.045, 12, 12);
      const jMesh = new THREE.Mesh(jGeo, jointMat);
      parent.add(jMesh);
      jointMarkers.push(jMesh);
      return jMesh;
    };

    // PELVIS
    const pelvis = new THREE.Group();
    pelvis.position.y = 0.95;
    modelGroup.add(pelvis);

    const pelvisMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.14, 0.18, 16),
      targetMuscle === 'Glutes' || targetMuscle === 'Legs' ? activeMuscleMat : bodyMat
    );
    pelvis.add(pelvisMesh);
    if (targetMuscle === 'Glutes') muscleMeshes.push(pelvisMesh);

    // SPINE & TORSO
    const spine = new THREE.Group();
    spine.position.y = 0.12;
    pelvis.add(spine);

    const absMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.14, 0.22, 16),
      targetMuscle === 'Core' ? activeMuscleMat : bodyMat
    );
    spine.add(absMesh);
    if (targetMuscle === 'Core') muscleMeshes.push(absMesh);

    // CHEST & SHOULDERS
    const chest = new THREE.Group();
    chest.position.y = 0.18;
    spine.add(chest);

    const chestMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 0.26, 0.22),
      targetMuscle === 'Chest' || targetMuscle === 'Back' ? activeMuscleMat : bodyMat
    );
    chest.add(chestMesh);
    if (targetMuscle === 'Chest' || targetMuscle === 'Back') muscleMeshes.push(chestMesh);

    // HEAD & NECK
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.1, 12), bodyMat);
    neck.position.y = 0.18;
    chest.add(neck);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), bodyMat);
    head.position.y = 0.14;
    neck.add(head);

    // LEFT ARM (Shoulder -> Elbow -> Wrist)
    const leftShoulder = new THREE.Group();
    leftShoulder.position.set(-0.24, 0.08, 0);
    chest.add(leftShoulder);
    createJointMarker(leftShoulder);

    const leftUpperArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.05, 0.28, 12),
      targetMuscle === 'Shoulders' ? activeMuscleMat : bodyMat
    );
    leftUpperArm.position.y = -0.14;
    leftShoulder.add(leftUpperArm);
    if (targetMuscle === 'Shoulders') muscleMeshes.push(leftUpperArm);

    const leftElbow = new THREE.Group();
    leftElbow.position.y = -0.16;
    leftUpperArm.add(leftElbow);
    createJointMarker(leftElbow);

    const leftForearm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.04, 0.26, 12),
      targetMuscle === 'Biceps' || targetMuscle === 'Triceps' ? activeMuscleMat : bodyMat
    );
    leftForearm.position.y = -0.13;
    leftElbow.add(leftForearm);
    if (targetMuscle === 'Biceps' || targetMuscle === 'Triceps') muscleMeshes.push(leftForearm);

    // RIGHT ARM (Shoulder -> Elbow -> Wrist)
    const rightShoulder = new THREE.Group();
    rightShoulder.position.set(0.24, 0.08, 0);
    chest.add(rightShoulder);
    createJointMarker(rightShoulder);

    const rightUpperArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.05, 0.28, 12),
      targetMuscle === 'Shoulders' ? activeMuscleMat : bodyMat
    );
    rightUpperArm.position.y = -0.14;
    rightShoulder.add(rightUpperArm);
    if (targetMuscle === 'Shoulders') muscleMeshes.push(rightUpperArm);

    const rightElbow = new THREE.Group();
    rightElbow.position.y = -0.16;
    rightUpperArm.add(rightElbow);
    createJointMarker(rightElbow);

    const rightForearm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.04, 0.26, 12),
      targetMuscle === 'Biceps' || targetMuscle === 'Triceps' ? activeMuscleMat : bodyMat
    );
    rightForearm.position.y = -0.13;
    rightElbow.add(rightForearm);
    if (targetMuscle === 'Biceps' || targetMuscle === 'Triceps') muscleMeshes.push(rightForearm);

    // LEFT LEG (Hip -> Knee -> Ankle)
    const leftHip = new THREE.Group();
    leftHip.position.set(-0.11, -0.08, 0);
    pelvis.add(leftHip);
    createJointMarker(leftHip);

    const leftThigh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.06, 0.44, 14),
      targetMuscle === 'Legs' ? activeMuscleMat : bodyMat
    );
    leftThigh.position.y = -0.22;
    leftHip.add(leftThigh);
    if (targetMuscle === 'Legs') muscleMeshes.push(leftThigh);

    const leftKnee = new THREE.Group();
    leftKnee.position.y = -0.22;
    leftThigh.add(leftKnee);
    createJointMarker(leftKnee);

    const leftCalf = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.04, 0.42, 12), bodyMat);
    leftCalf.position.y = -0.21;
    leftKnee.add(leftCalf);

    // RIGHT LEG (Hip -> Knee -> Ankle)
    const rightHip = new THREE.Group();
    rightHip.position.set(0.11, -0.08, 0);
    pelvis.add(rightHip);
    createJointMarker(rightHip);

    const rightThigh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.06, 0.44, 14),
      targetMuscle === 'Legs' ? activeMuscleMat : bodyMat
    );
    rightThigh.position.y = -0.22;
    rightHip.add(rightThigh);
    if (targetMuscle === 'Legs') muscleMeshes.push(rightThigh);

    const rightKnee = new THREE.Group();
    rightKnee.position.y = -0.22;
    rightThigh.add(rightKnee);
    createJointMarker(rightKnee);

    const rightCalf = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.04, 0.42, 12), bodyMat);
    rightCalf.position.y = -0.21;
    rightKnee.add(rightCalf);

    // BARBELL / WEIGHT PROP
    const barbell = new THREE.Group();
    const barMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 1.4, 16),
      new THREE.MeshStandardMaterial({ color: 0x999999, metalness: 0.9, roughness: 0.2 })
    );
    barMesh.rotation.z = Math.PI / 2;
    barbell.add(barMesh);

    // Plates on both ends
    const plateMat = new THREE.MeshStandardMaterial({ color: 0xff5722, metalness: 0.5, roughness: 0.4 });
    const plateGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.04, 24);
    const leftPlate = new THREE.Mesh(plateGeo, plateMat);
    leftPlate.rotation.z = Math.PI / 2;
    leftPlate.position.x = -0.58;
    barbell.add(leftPlate);

    const rightPlate = new THREE.Mesh(plateGeo, plateMat);
    rightPlate.rotation.z = Math.PI / 2;
    rightPlate.position.x = 0.58;
    barbell.add(rightPlate);

    barbell.visible = ['bench_press', 'squat', 'overhead_press', 'barbell_row', 'deadlift', 'bicep_curl'].includes(biomechanicsKey);
    scene.add(barbell);

    // DIRECTIONAL MOTION ARROW
    const motionArrow = new THREE.Group();
    const arrowCone = new THREE.Mesh(
      new THREE.ConeGeometry(0.08, 0.2, 16),
      new THREE.MeshBasicMaterial({ color: 0x00ff66 })
    );
    arrowCone.position.y = 0.2;
    motionArrow.add(arrowCone);

    const arrowShaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 0.3, 12),
      new THREE.MeshBasicMaterial({ color: 0x00ff66 })
    );
    motionArrow.add(arrowShaft);
    motionArrow.position.set(0.65, 1.1, 0);
    scene.add(motionArrow);

    jointsRef.current = {
      pelvis,
      spine,
      chest,
      head,
      leftShoulder,
      rightShoulder,
      leftElbow,
      rightElbow,
      leftHip,
      rightHip,
      leftKnee,
      rightKnee,
      barbell,
      jointMarkers,
      muscleMeshes,
      motionArrow,
    };

    // 6. Orbit Mouse Drag Interaction
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
        1.5,
        5.0
      );
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domEl.addEventListener('wheel', onWheel, { passive: false });

    // 7. Animation Kinematic Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      if (isPlaying) {
        timeRef.current += delta * speed * 2.8;
      }

      const t = timeRef.current;
      const cycle = (Math.sin(t) + 1) / 2; // 0 to 1 smooth sine cycle

      // Determine movement phase
      if (cycle < 0.2) setProgressPhase('START');
      else if (cycle < 0.75) setProgressPhase('MOVEMENT');
      else if (cycle < 0.95) setProgressPhase('PEAK');
      else setProgressPhase('RETURN');

      // Update directional arrow
      if (motionArrow) {
        const vel = Math.cos(t);
        motionArrow.rotation.x = vel > 0 ? 0 : Math.PI;
        motionArrow.position.y = 1.1 + Math.sin(t) * 0.15;
      }

      // Biomechanical kinematics per exercise key
      const { 
        pelvis, 
        leftHip, 
        rightHip, 
        leftKnee, 
        rightKnee, 
        leftShoulder, 
        rightShoulder, 
        leftElbow, 
        rightElbow, 
        spine, 
        chest, 
        barbell: bar 
      } = jointsRef.current;

      if (pelvis && leftHip && rightHip && leftKnee && rightKnee && leftShoulder && rightShoulder && leftElbow && rightElbow && spine && chest) {
        // Reset base transforms
        pelvis.rotation.set(0, 0, 0);
        spine.rotation.set(0, 0, 0);
        chest.rotation.set(0, 0, 0);
        leftHip.rotation.set(0, 0, 0);
        rightHip.rotation.set(0, 0, 0);
        leftKnee.rotation.set(0, 0, 0);
        rightKnee.rotation.set(0, 0, 0);
        leftShoulder.rotation.set(0, 0, 0);
        rightShoulder.rotation.set(0, 0, 0);
        leftElbow.rotation.set(0, 0, 0);
        rightElbow.rotation.set(0, 0, 0);

        if (biomechanicsKey === 'squat') {
          // SQUAT: Hips descend, knees bend, torso leans slightly forward
          const squatDepth = cycle * 0.42;
          pelvis.position.y = 0.95 - squatDepth;
          leftHip.rotation.x = -cycle * 1.35;
          rightHip.rotation.x = -cycle * 1.35;
          leftKnee.rotation.x = cycle * 1.7;
          rightKnee.rotation.x = cycle * 1.7;
          spine.rotation.x = cycle * 0.35;

          // Hands support barbell across shoulders
          leftShoulder.rotation.z = -Math.PI / 4;
          rightShoulder.rotation.z = Math.PI / 4;
          leftElbow.rotation.x = -Math.PI / 2;
          rightElbow.rotation.x = -Math.PI / 2;

          if (bar) {
            bar.visible = true;
            bar.position.set(0, pelvis.position.y + 0.46, -0.05);
          }
        } else if (biomechanicsKey === 'pushup') {
          // PUSHUP: Horizontal body, elbows flare at 45 degrees
          pelvis.position.set(0, 0.26 + (1 - cycle) * 0.28, 0);
          pelvis.rotation.x = -Math.PI / 2.05;
          leftHip.rotation.x = 0.1;
          rightHip.rotation.x = 0.1;

          const armFold = (1 - cycle) * 1.25;
          leftShoulder.rotation.set(0.3, 0.4, -0.4 - armFold * 0.4);
          rightShoulder.rotation.set(0.3, -0.4, 0.4 + armFold * 0.4);
          leftElbow.rotation.x = -armFold;
          rightElbow.rotation.x = -armFold;

          if (bar) bar.visible = false;
        } else if (biomechanicsKey === 'bench_press') {
          // BENCH PRESS: Supine position, pressing bar vertically
          pelvis.position.set(0, 0.45, 0);
          pelvis.rotation.x = -Math.PI / 2;
          leftHip.rotation.x = 0.8;
          rightHip.rotation.x = 0.8;
          leftKnee.rotation.x = 1.3;
          rightKnee.rotation.x = 1.3;

          const pressExtension = (1 - cycle); // 0 = at chest, 1 = pressed high
          leftShoulder.rotation.set(1.4 - pressExtension * 0.2, 0, -0.7 + pressExtension * 0.4);
          rightShoulder.rotation.set(1.4 - pressExtension * 0.2, 0, 0.7 - pressExtension * 0.4);
          leftElbow.rotation.x = -pressExtension * 1.35;
          rightElbow.rotation.x = -pressExtension * 1.35;

          if (bar) {
            bar.visible = true;
            bar.position.set(0, 0.65 + pressExtension * 0.35, 0.1);
          }
        } else if (biomechanicsKey === 'pullup') {
          // PULLUP: Body hangs from bar, pulls up
          const pullHeight = cycle * 0.45;
          pelvis.position.y = 0.85 + pullHeight;
          leftKnee.rotation.x = 0.4;
          rightKnee.rotation.x = 0.4;

          const pullFlex = cycle * 1.6;
          leftShoulder.rotation.set(0, 0, -2.4 + pullFlex * 0.7);
          rightShoulder.rotation.set(0, 0, 2.4 - pullFlex * 0.7);
          leftElbow.rotation.x = -pullFlex;
          rightElbow.rotation.x = -pullFlex;

          if (bar) {
            bar.visible = true;
            bar.position.set(0, 1.85, 0);
          }
        } else if (biomechanicsKey === 'overhead_press') {
          // OVERHEAD PRESS: Bar moves from clavicle to overhead
          pelvis.position.y = 0.95;
          const pressReach = cycle * 0.45;
          leftShoulder.rotation.z = -0.5 - cycle * 1.6;
          rightShoulder.rotation.z = 0.5 + cycle * 1.6;
          leftElbow.rotation.x = -(1 - cycle) * 1.4;
          rightElbow.rotation.x = -(1 - cycle) * 1.4;

          if (bar) {
            bar.visible = true;
            bar.position.set(0, 1.4 + pressReach, 0.08);
          }
        } else if (biomechanicsKey === 'bicep_curl') {
          // BICEP CURL: Forearms curl upward, elbows pinned
          pelvis.position.y = 0.95;
          const curlFlex = cycle * 2.2;
          leftElbow.rotation.x = -curlFlex;
          rightElbow.rotation.x = -curlFlex;

          if (bar) {
            bar.visible = true;
            bar.position.set(0, 0.7 + cycle * 0.4, 0.25 + cycle * 0.1);
          }
        } else if (biomechanicsKey === 'lunge') {
          // LUNGE: Staggered step, front and back knees bend to 90
          pelvis.position.y = 0.95 - cycle * 0.35;
          leftHip.rotation.x = -0.9 * cycle;
          leftKnee.rotation.x = 1.4 * cycle;
          rightHip.rotation.x = 0.7 * cycle;
          rightKnee.rotation.x = 1.3 * cycle;
          if (bar) bar.visible = false;
        } else if (biomechanicsKey === 'lateral_raise') {
          // LATERAL RAISE: Arms abduct to shoulder level
          pelvis.position.y = 0.95;
          const raise = cycle * 1.5;
          leftShoulder.rotation.z = -raise;
          rightShoulder.rotation.z = raise;
          if (bar) bar.visible = false;
        } else if (biomechanicsKey === 'plank') {
          // ISOMETRIC PLANK: Rigid horizontal position
          pelvis.position.set(0, 0.28, 0);
          pelvis.rotation.x = -Math.PI / 2;
          leftShoulder.rotation.set(0.3, 0, -0.4);
          rightShoulder.rotation.set(0.3, 0, 0.4);
          leftElbow.rotation.x = -1.5;
          rightElbow.rotation.x = -1.5;
          if (bar) bar.visible = false;
        } else {
          // DEFAULT / MOBILITY: Athletic balanced breathing posture
          pelvis.position.y = 0.95 + Math.sin(t * 0.7) * 0.02;
          spine.rotation.x = Math.sin(t * 0.7) * 0.04;
          leftShoulder.rotation.z = -0.3 + Math.sin(t) * 0.1;
          rightShoulder.rotation.z = 0.3 - Math.sin(t) * 0.1;
          if (bar) bar.visible = false;
        }
      }

      // Mirror mode flip
      if (modelGroupRef.current) {
        modelGroupRef.current.scale.x = isMirrored ? -1 : 1;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Handle Resize
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
  }, [biomechanicsKey, targetMuscle, isMirrored]);

  // Handle Camera View Presets
  const setCameraPreset = (view: 'front' | 'side' | 'back' | 'threeQuarter') => {
    setCameraView(view);
    if (!cameraRef.current) return;
    const target = cameraAngles[view];
    cameraRef.current.position.set(target.x, target.y, target.z);
    cameraRef.current.lookAt(0, 0.9, 0);
  };

  // Toggle joint markers visibility
  useEffect(() => {
    jointsRef.current.jointMarkers?.forEach(m => {
      m.visible = showJoints;
    });
  }, [showJoints]);

  // Toggle muscle activation highlights
  useEffect(() => {
    jointsRef.current.muscleMeshes?.forEach(m => {
      const mat = m.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = showMuscles ? 0.7 : 0.05;
      }
    });
  }, [showMuscles]);

  const restartAnimation = () => {
    timeRef.current = 0;
    setIsPlaying(true);
  };

  return (
    <div className={`relative flex flex-col bg-[#161618] rounded-2xl overflow-hidden border border-[#2a2a2e] shadow-2xl ${className}`}>
      {/* Top Telemetry Header */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase rounded-md bg-[#ff5722]/20 text-[#ff5722] border border-[#ff5722]/40 backdrop-blur-md">
            3D AVATAR TRAINER
          </span>
          <span className="px-2 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-md bg-neutral-900/80 text-neutral-300 border border-neutral-700/60 backdrop-blur-md">
            Phase: <strong className="text-[#00ff66]">{progressPhase}</strong>
          </span>
        </div>

        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            onClick={() => setShowJoints(!showJoints)}
            className={`p-1.5 rounded-lg border text-xs transition-all ${
              showJoints 
                ? 'bg-[#00ff66]/20 border-[#00ff66]/50 text-[#00ff66]' 
                : 'bg-neutral-900/80 border-neutral-700 text-neutral-400 hover:text-white'
            }`}
            title="Toggle Joint Indicators"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsMirrored(!isMirrored)}
            className={`p-1.5 rounded-lg border text-xs transition-all ${
              isMirrored 
                ? 'bg-[#ff5722]/20 border-[#ff5722]/50 text-[#ff5722]' 
                : 'bg-neutral-900/80 border-neutral-700 text-neutral-400 hover:text-white'
            }`}
            title="Mirror Mode"
          >
            <FlipHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div 
        ref={mountRef} 
        style={{ height }}
        className="w-full relative cursor-grab active:cursor-grabbing select-none"
      />

      {/* Exercise info tag overlay */}
      <div className="absolute bottom-16 left-4 z-10 pointer-events-none">
        <p className="text-xs text-neutral-400 font-medium tracking-wide uppercase">Target Focus</p>
        <p className="text-sm font-bold text-white tracking-wide">{targetMuscle} Activation</p>
      </div>

      {/* Bottom Interactive Avatar Controls Bar */}
      {interactive && (
        <div className="bg-[#1c1c1e] border-t border-[#2a2a2e] px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 z-10">
          {/* Playback Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-xl bg-[#ff5722] hover:bg-[#ff5722]/90 text-white transition-all shadow-md active:scale-95"
              title={isPlaying ? 'Pause Demonstration' : 'Play Demonstration'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            <button
              onClick={restartAnimation}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-all active:scale-95"
              title="Restart Motion Cycle"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Speed Toggle: Normal vs Slow-Mo */}
            <button
              onClick={() => setSpeed(speed === 1.0 ? 0.4 : 1.0)}
              className={`px-2.5 py-1.5 text-xs font-bold rounded-xl flex items-center gap-1 transition-all ${
                speed < 1.0 
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50' 
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
              title="Toggle Slow Motion"
            >
              <Zap className="w-3.5 h-3.5" />
              {speed < 1.0 ? '0.4x Slow' : '1.0x Normal'}
            </button>
          </div>

          {/* Camera Angle Presets */}
          <div className="flex items-center gap-1 bg-neutral-900/90 p-1 rounded-xl border border-neutral-800">
            <button
              onClick={() => setCameraPreset('front')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                cameraView === 'front' 
                  ? 'bg-[#ff5722] text-white shadow-sm' 
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Front
            </button>
            <button
              onClick={() => setCameraPreset('side')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                cameraView === 'side' 
                  ? 'bg-[#ff5722] text-white shadow-sm' 
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Side
            </button>
            <button
              onClick={() => setCameraPreset('back')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                cameraView === 'back' 
                  ? 'bg-[#ff5722] text-white shadow-sm' 
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Back
            </button>
            <button
              onClick={() => setCameraPreset('threeQuarter')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                cameraView === 'threeQuarter' 
                  ? 'bg-[#ff5722] text-white shadow-sm' 
                  : 'text-neutral-400 hover:text-white'
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

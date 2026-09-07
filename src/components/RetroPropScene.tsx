"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export type RetroSceneVariant =
  | "hero" | "dice" | "trophy" | "contract" | "broadcast"
  | "casino" | "radio" | "desk" | "cabinet" | "island";

function buildScene(container: HTMLDivElement, variant: RetroSceneVariant) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, .1, 100);
  camera.position.z = 6.5;
  const renderer = new THREE.WebGLRenderer({ alpha:true, antialias:true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.45));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  const root = new THREE.Group();
  scene.add(root);
  const ink = new THREE.MeshStandardMaterial({ color:0x17120f, roughness:.56 });
  const paper = new THREE.MeshStandardMaterial({ color:0xf1dfb9, roughness:.82 });
  const red = new THREE.MeshStandardMaterial({ color:0xc84335, roughness:.64 });
  const gold = new THREE.MeshStandardMaterial({ color:0xd39a3c, roughness:.45, metalness:.18 });
  const green = new THREE.MeshStandardMaterial({ color:0x657b5e, roughness:.8 });
  const movers: THREE.Object3D[] = [];
  const wobblers: THREE.Object3D[] = [];

  const coin = (x:number,y:number,z:number,s=.18) => {
    const o=new THREE.Mesh(new THREE.CylinderGeometry(s,s,.055,28),gold);
    o.rotation.x=Math.PI/2;o.position.set(x,y,z);o.castShadow=true;root.add(o);movers.push(o);return o;
  };
  const die = (x:number,y:number,z:number,s=.8) => {
    const g=new THREE.Group();
    const box=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),paper);box.castShadow=true;g.add(box);
    [[0,0],[-.23,.23],[.23,-.23]].forEach(([a,b])=>{const p=new THREE.Mesh(new THREE.SphereGeometry(.06,10,10),ink);p.position.set(a,b,.51);g.add(p)});
    g.position.set(x,y,z);g.scale.setScalar(s);g.rotation.set(.5,.7,.1);root.add(g);movers.push(g);return g;
  };
  const card = (x:number,y:number,z:number,rot=.15) => {
    const g=new THREE.Group();
    const body=new THREE.Mesh(new THREE.BoxGeometry(1,1.45,.06),paper);body.castShadow=true;g.add(body);
    const pip=new THREE.Mesh(new THREE.CircleGeometry(.13,18),rot>0?red:ink);pip.position.z=.035;g.add(pip);
    g.position.set(x,y,z);g.rotation.z=rot;root.add(g);movers.push(g);return g;
  };
  const cup = (x:number,y:number,z:number,s=.9) => {
    const g=new THREE.Group();
    const body=new THREE.Mesh(new THREE.CylinderGeometry(.46,.56,.8,44),paper);body.castShadow=true;g.add(body);
    const rim=new THREE.Mesh(new THREE.TorusGeometry(.46,.07,14,44),ink);rim.rotation.x=Math.PI/2;rim.position.y=.4;g.add(rim);
    const handle=new THREE.Mesh(new THREE.TorusGeometry(.3,.065,12,34,Math.PI*1.6),ink);handle.position.set(.5,.04,0);handle.rotation.z=-.24;g.add(handle);
    const straw=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.92,12),red);straw.position.set(.18,.82,0);straw.rotation.z=.18;g.add(straw);
    [-.17,.17].forEach(px=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.052,10,10),ink);e.scale.set(.7,1.35,.5);e.position.set(px,.08,.49);g.add(e)});
    g.position.set(x,y,z);g.scale.setScalar(s);root.add(g);wobblers.push(g);return g;
  };
  const record = (x:number,y:number,z:number,s=.55) => {
    const g=new THREE.Group();
    const disc=new THREE.Mesh(new THREE.CylinderGeometry(s,s,.06,54),ink);disc.rotation.x=Math.PI/2;g.add(disc);
    const label=new THREE.Mesh(new THREE.CylinderGeometry(s*.3,s*.3,.07,24),red);label.rotation.x=Math.PI/2;g.add(label);
    g.position.set(x,y,z);root.add(g);movers.push(g);return g;
  };
  const trophy = (x:number,y:number,z:number,s=.75) => {
    const g=new THREE.Group();
    const bowl=new THREE.Mesh(new THREE.CylinderGeometry(.7,.44,.7,40),gold);bowl.position.y=.45;bowl.castShadow=true;g.add(bowl);
    const stem=new THREE.Mesh(new THREE.CylinderGeometry(.1,.15,.62,18),gold);stem.position.y=-.23;g.add(stem);
    const base=new THREE.Mesh(new THREE.CylinderGeometry(.52,.62,.17,28),ink);base.position.y=-.63;g.add(base);
    [-1,1].forEach(k=>{const h=new THREE.Mesh(new THREE.TorusGeometry(.4,.065,12,34,Math.PI*1.5),gold);h.position.set(k*.6,.48,0);h.rotation.z=k>0?-.55:Math.PI+.55;g.add(h)});
    g.position.set(x,y,z);g.scale.setScalar(s);root.add(g);wobblers.push(g);return g;
  };
  const contract = (x:number,y:number,z:number,s=.8) => {
    const g=new THREE.Group();
    const sheet=new THREE.Mesh(new THREE.BoxGeometry(2.2,1.5,.07),paper);sheet.castShadow=true;g.add(sheet);
    for(let i=0;i<5;i++){const l=new THREE.Mesh(new THREE.BoxGeometry(1.22-i*.08,.04,.075),ink);l.position.set(-.2,.4-i*.19,.04);g.add(l)}
    const seal=new THREE.Mesh(new THREE.CylinderGeometry(.23,.23,.09,30),red);seal.rotation.x=Math.PI/2;seal.position.set(.72,-.47,.08);g.add(seal);
    g.position.set(x,y,z);g.rotation.set(-.2,.34,-.1);g.scale.setScalar(s);root.add(g);wobblers.push(g);return g;
  };
  const mic = (x:number,y:number,z:number,s=.85) => {
    const g=new THREE.Group();
    const head=new THREE.Mesh(new THREE.SphereGeometry(.4,28,28),ink);head.scale.set(.8,1.15,.8);head.position.y=.65;g.add(head);
    for(let i=-2;i<=2;i++){const q=new THREE.Mesh(new THREE.BoxGeometry(.065,.6,.05),paper);q.position.set(i*.125,.65,.33);g.add(q)}
    const stem=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,1.1,14),gold);stem.position.y=-.12;g.add(stem);
    const base=new THREE.Mesh(new THREE.CylinderGeometry(.45,.58,.15,28),ink);base.position.y=-.75;g.add(base);
    g.position.set(x,y,z);g.scale.setScalar(s);root.add(g);wobblers.push(g);return g;
  };

  if(variant==="hero"){cup(-1.1,.25,.3,1.05);die(1,-.55,.2,.78);record(1.25,.95,-.35,.55);card(.15,-1,-.4,.22);card(.48,-1.04,-.52,-.18);for(let i=0;i<6;i++)coin(-1.7+i*.62,1.48+Math.sin(i)*.12,-.5,.12)}
  if(variant==="dice"){die(-.45,.1,.2,1.05);card(1.1,.2,-.2,.22);card(.72,-.08,-.5,-.18);coin(-1.45,-.75,.1,.22)}
  if(variant==="trophy"){trophy(0,0,.15,1);for(let i=0;i<6;i++)coin(-1.55+i*.6,1.2+Math.sin(i)*.18,-.3,.14)}
  if(variant==="contract"){contract(0,.05,.05,1);card(-1.35,-.6,-.4,-.28);coin(1.45,.85,-.25,.24)}
  if(variant==="broadcast"){mic(-.25,0,.2,1);record(1.25,-.15,-.2,.62);coin(-1.45,-.7,.1,.18)}
  if(variant==="casino"){trophy(-.65,.05,.15,.72);die(.95,-.35,.2,.72);record(.95,.8,-.4,.45);for(let i=0;i<7;i++)coin(-1.6+i*.48,-1.05+(i%2)*.12,-.2,.12)}
  if(variant==="radio"){mic(-.65,-.03,.2,.86);record(1.1,.55,-.2,.55);const box=new THREE.Mesh(new THREE.BoxGeometry(1.4,.85,.58),paper);box.position.set(.25,-.62,-.4);root.add(box);wobblers.push(box)}
  if(variant==="desk"){const desk=new THREE.Mesh(new THREE.BoxGeometry(3.4,.25,1.55),ink);desk.position.set(0,-.9,-.4);root.add(desk);contract(-.15,-.2,.15,.78);cup(1.18,-.42,.2,.7);const pen=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,1.2,8),red);pen.rotation.z=1.15;pen.position.set(.65,-.5,.45);root.add(pen);const light=new THREE.PointLight(0xffbd68,6,4,2);light.position.set(-1.2,.2,.4);scene.add(light)}
  if(variant==="cabinet"){const back=new THREE.Mesh(new THREE.BoxGeometry(3.3,2.45,.2),ink);back.position.z=-.65;root.add(back);for(let q=0;q<2;q++){const shelf=new THREE.Mesh(new THREE.BoxGeometry(3.05,.1,.6),paper);shelf.position.set(0,-.42+q*1.08,-.28);root.add(shelf)}trophy(-.78,-.1,.12,.48);cup(.02,-.1,.1,.56);record(.9,.74,.05,.32);die(.92,-.58,.08,.38);coin(-.95,.7,.08,.17)}
  if(variant==="island"){const island=new THREE.Group();const base=new THREE.Mesh(new THREE.CylinderGeometry(1.55,1.2,.45,48),green);base.position.y=-.4;island.add(base);const top=new THREE.Mesh(new THREE.CylinderGeometry(1.42,1.42,.18,48),paper);top.position.y=-.1;island.add(top);for(let i=0;i<3;i++){const tr=new THREE.Mesh(new THREE.CylinderGeometry(.045,.065,.52,8),ink);tr.position.set(-.7+i*.7,.2,-.2+i*.06);island.add(tr);const can=new THREE.Mesh(new THREE.SphereGeometry(.23,12,10),i===1?red:green);can.scale.set(1.3,.75,1);can.position.set(tr.position.x,.55,tr.position.z);island.add(can)}root.add(island);wobblers.push(island);cup(-1.65,.2,.42,.55);card(1.7,.55,-.5,.2)}

  for(let i=0;i<22;i++){const p=new THREE.Mesh(new THREE.SphereGeometry(.016+(i%4)*.008,8,8),i%6===0?red:ink);const a=i/22*Math.PI*2,rad=1.75+(i%4)*.15;p.position.set(Math.cos(a)*rad,Math.sin(a)*rad*.72,-.55+(i%3)*.12);root.add(p);movers.push(p)}

  scene.add(new THREE.HemisphereLight(0xfff0cb,0x3a281f,2.5));
  const key=new THREE.DirectionalLight(0xffdfa6,4.8);key.position.set(3,4,5);key.castShadow=true;scene.add(key);
  const rim=new THREE.DirectionalLight(0x7aa7b8,1.2);rim.position.set(-4,1,2);scene.add(rim);

  const pointer={x:0,y:0};
  const move=(e:PointerEvent)=>{const b=container.getBoundingClientRect();pointer.x=((e.clientX-b.left)/Math.max(1,b.width)-.5)*.58;pointer.y=((e.clientY-b.top)/Math.max(1,b.height)-.5)*.44};
  container.addEventListener("pointermove",move);
  const resize=()=>{const b=container.getBoundingClientRect();renderer.setSize(b.width,b.height,false);camera.aspect=b.width/Math.max(1,b.height);camera.updateProjectionMatrix()};
  resize();const ro=new ResizeObserver(resize);ro.observe(container);
  let visible=true;const io=new IntersectionObserver(([entry])=>visible=entry.isIntersecting,{rootMargin:"200px"});io.observe(container);
  let frame=0;
  const tick=(t:number)=>{if(visible){const s=t*.001;root.rotation.y+=(pointer.x-root.rotation.y)*.035;root.rotation.x+=(-pointer.y-root.rotation.x)*.035;root.position.y=Math.sin(s*.9)*.055;movers.forEach((o,i)=>o.rotation.y+=.0012+(i%3)*.00025);wobblers.forEach((o,i)=>o.rotation.z+=(Math.sin(s*.75+i)*.025-o.rotation.z)*.025);renderer.render(scene,camera)}frame=requestAnimationFrame(tick)};
  frame=requestAnimationFrame(tick);
  return()=>{cancelAnimationFrame(frame);container.removeEventListener("pointermove",move);ro.disconnect();io.disconnect();renderer.dispose();container.innerHTML=""};
}

export function RetroPropScene({variant,className=""}:{variant:RetroSceneVariant;className?:string}) {
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{if(!ref.current||matchMedia("(prefers-reduced-motion: reduce)").matches)return;return buildScene(ref.current,variant)},[variant]);
  return <div ref={ref} className={`retro-prop-scene ${className}`} aria-hidden="true"/>;
}
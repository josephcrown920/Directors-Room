import FeatureCard from "./FeatureCard";
const features=[
 {imageSrc:"/aurora/demo-charsheet.jpg",title:"Storyboard Engine",description:"Sequence reference frames into an ordered shot list with continuity you can see at a glance.",cta:"Build a storyboard"},
 {imageSrc:"/aurora/demo-motion.jpg",title:"Motion Control",description:"Direct the camera with a visual motion reference before you render the shot.",cta:"Explore motion presets"},
 {imageSrc:"/aurora/demo-layerstack.jpg",title:"Cinematic Layers",description:"Separate the frame into editable visual decisions—subject, depth, light, and environment.",cta:"Open layer editor"},
 {imageSrc:"/aurora/hero-street.jpg",title:"Image → Video",description:"Start from one still and carry its world into a moving cinematic sequence.",cta:"Generate a clip"},
 {imageSrc:"/aurora/layer-armor.jpg",title:"Relight & Composite",description:"Shape the look layer by layer, keeping the original scene direction intact.",cta:"Try relighting"},
 {imageSrc:"/aurora/hero-cone.jpg",title:"Sequence Preview",description:"Read the rhythm of a complete sequence before you commit to a final render.",cta:"Preview a project"},
];
export default function FeatureGrid(){return <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"><div className="mb-16 max-w-2xl"><span className="text-xs uppercase tracking-[0.25em] text-gold">Toolkit</span><h2 className="mt-3 font-display text-4xl text-white md:text-5xl">Everything a director needs, visually.</h2></div><div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">{features.map((f,i)=><FeatureCard key={f.title} {...f} delay={i*80}/>)}</div></section>}
export default function Footer() {
  return (
    <footer className="border-t border-line bg-panel/40 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <h4 className="font-display text-2xl text-white mb-2">Directors Room</h4>
          <p className="text-sm text-muted max-w-xs">
            A cinematic AI studio for storyboarding, motion control, and layered generation.
          </p>
        </div>
        <div className="flex gap-16 text-sm text-muted">
          <div className="flex flex-col gap-2">
            <span className="text-white mb-1">Product</span>
            <span>Storyboard</span>
            <span>Layers</span>
            <span>Motion Control</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-white mb-1">Studio</span>
            <span>Preview</span>
            <span>Generate</span>
            <span>Projects</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

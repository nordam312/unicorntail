import { Icon } from '@/components/Icon';

export function Canvas() {
  return (
    <main className="flex-1 ml-64 mr-72 bg-surface-container-lowest relative overflow-auto p-12 custom-scrollbar">
      <div className="max-w-5xl mx-auto min-h-full canvas-grid relative rounded-xl border border-outline-variant p-8 shadow-2xl bg-surface-dim">
        <div className="absolute -top-6 left-0 text-[10px] font-label-md text-on-surface-variant bg-surface-container-lowest px-2">
          Page Body [1440px]
        </div>

        <div className="space-y-8">
          {/* Header drop zone */}
          <div className="w-full h-24 border-2 border-dashed border-primary-fixed-dim/30 rounded-lg flex items-center justify-center bg-primary-fixed-dim/5 transition-all hover:bg-primary-fixed-dim/10 group">
            <div className="text-center group-hover:scale-105 transition-transform">
              <Icon
                name="add_circle"
                className="text-primary-fixed-dim block mb-1"
              />
              <span className="text-[10px] font-label-md text-primary-fixed-dim">
                Drop Header Component
              </span>
            </div>
          </div>

          {/* Selected section */}
          <div className="relative border-2 border-secondary-fixed-dim rounded-lg p-1 bg-surface-container-low/50">
            <div className="absolute -top-3 left-2 bg-secondary-fixed-dim text-on-secondary-fixed text-[10px] px-1.5 py-0.5 rounded font-label-md">
              Section_01
            </div>
            <div className="absolute -top-3 right-2 flex gap-1">
              <button className="bg-surface-container-high p-1 rounded hover:text-on-surface">
                <Icon name="content_copy" className="text-[10px]" />
              </button>
              <button className="bg-surface-container-high p-1 rounded hover:text-secondary-fixed-dim">
                <Icon name="delete" className="text-[10px]" />
              </button>
            </div>
            <div className="p-8 flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-surface-container-high rounded-2xl flex items-center justify-center text-secondary-fixed-dim">
                <Icon name="rocket_launch" className="text-4xl" />
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface">
                Ship Faster with Precision
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
                Our developer-first component library allows you to build
                sophisticated interfaces in record time using a hybrid
                fluid-fixed engine.
              </p>
              <button className="px-8 py-3 rounded-full border border-secondary-fixed-dim text-secondary-fixed-dim font-bold hover:bg-secondary-fixed-dim/10 transition-colors">
                Get Started
              </button>
            </div>
          </div>

          {/* Generic drop zone */}
          <div className="w-full h-48 border-2 border-dashed border-outline-variant rounded-lg flex items-center justify-center bg-surface-container-low hover:border-on-surface-variant transition-all cursor-pointer">
            <div className="text-center">
              <Icon name="add" className="text-on-surface-variant block mb-1" />
              <span className="text-[10px] font-label-md text-on-surface-variant">
                Add New Section
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

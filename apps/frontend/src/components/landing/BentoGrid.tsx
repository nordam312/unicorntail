import { Icon } from '@/components/Icon';

export function BentoGrid() {
  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="font-headline-lg text-primary mb-4">
          Engineered for Technical Founders
        </h2>
        <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Skip the boilerplate and focus on your unique business logic while we
          handle the UI orchestration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
        {/* Large card — workspace integration */}
        <div className="md:col-span-2 md:row-span-2 rounded-lg border border-outline-variant bg-surface-container-low overflow-hidden relative p-8 flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-8">
            <div className="w-64 h-64 bg-primary-fixed-dim/5 blur-[100px] rounded-full" />
          </div>
          <div>
            <span className="font-label-md text-label-sm text-primary-fixed-dim mb-4 block">
              WORKSPACE INTEGRATION
            </span>
            <h3 className="font-headline-lg text-primary mb-4">
              A unified environment for Designers and Devs.
            </h3>
            <p className="text-body-lg text-on-surface-variant max-w-md">
              Our workspace mirrors your actual file structure, making handoffs
              obsolete. What you see is exactly what gets committed.
            </p>
          </div>
          <div className="w-full h-48 rounded border border-outline-variant bg-background/80 mt-8 shadow-inner overflow-hidden flex flex-col">
            <div className="h-10 border-b border-outline-variant flex items-center px-4 gap-2 bg-surface-container">
              <span className="w-2 h-2 rounded-full bg-error" />
              <span className="w-2 h-2 rounded-full bg-secondary-container" />
              <span className="w-2 h-2 rounded-full bg-primary-fixed-dim" />
              <div className="ml-4 h-6 px-3 bg-background rounded border border-outline-variant flex items-center">
                <Icon
                  name="link"
                  className="text-[12px] text-on-surface-variant mr-2"
                />
                <span className="text-[10px] font-label-md text-on-tertiary-container">
                  localhost:3000/preview
                </span>
              </div>
            </div>
            <div className="flex-grow flex items-center justify-center">
              <div className="text-center p-6 space-y-4">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded border-2 border-dashed border-outline-variant flex items-center justify-center">
                    <Icon name="add" className="text-on-tertiary-container" />
                  </div>
                  <div className="space-y-2 text-left pt-2">
                    <div className="w-32 h-3 bg-surface-container-high rounded" />
                    <div className="w-24 h-3 bg-surface-container-highest rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tall card — version control */}
        <div className="md:col-span-1 md:row-span-2 rounded-lg border border-outline-variant bg-surface-container p-8 flex flex-col">
          <div className="w-12 h-12 rounded bg-secondary-fixed-dim/10 flex items-center justify-center mb-6">
            <Icon name="history" className="text-secondary-fixed-dim" />
          </div>
          <h3 className="font-headline-md text-primary mb-4">
            Version Control for Design
          </h3>
          <p className="text-body-md text-on-surface-variant mb-8">
            Branch, merge, and rollback visual changes just like code. Never lose
            a previous iteration again.
          </p>
          <div className="space-y-4 mt-auto">
            <div className="p-4 rounded bg-background border border-outline-variant flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-primary-fixed-dim/10 flex items-center justify-center">
                  <Icon
                    name="commit"
                    className="text-primary-fixed-dim text-sm"
                  />
                </div>
                <span className="text-body-md font-label-md text-on-surface">
                  feat: hero-revamp
                </span>
              </div>
              <span className="text-label-sm text-on-tertiary-container">
                2m ago
              </span>
            </div>
            <div className="p-4 rounded bg-background/30 border border-outline-variant flex items-center justify-between opacity-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center">
                  <Icon
                    name="commit"
                    className="text-on-surface-variant text-sm"
                  />
                </div>
                <span className="text-body-md font-label-md text-on-surface-variant">
                  fix: button-padding
                </span>
              </div>
              <span className="text-label-sm text-on-tertiary-container">
                1h ago
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

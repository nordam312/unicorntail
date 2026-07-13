import { Icon } from '@/components/Icon';
import { InspectorTabs } from './InspectorTabs';

export function Inspector() {
  return (
    <aside className="fixed right-0 top-14 bottom-0 w-72 z-40 flex flex-col bg-surface-container-low border-l border-outline-variant">
      <div className="p-4 border-b border-outline-variant flex items-center justify-between">
        <div>
          <h2 className="font-label-sm text-label-sm text-on-surface">
            Properties
          </h2>
          <p className="text-[10px] font-label-md text-on-surface-variant">
            Section_01
          </p>
        </div>
        <Icon
          name="close"
          className="text-on-surface-variant cursor-pointer hover:text-on-surface"
        />
      </div>

      <InspectorTabs />

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
        {/* Padding */}
        <div className="space-y-3">
          <label className="text-[10px] font-label-sm text-on-surface-variant uppercase tracking-widest">
            Padding (px)
          </label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Vertical', value: 32 },
              { label: 'Horizontal', value: 24 },
            ].map((field) => (
              <div key={field.label} className="space-y-1">
                <span className="text-[9px] font-label-md text-on-surface-variant">
                  {field.label}
                </span>
                <div className="flex items-center bg-surface-container-lowest border border-outline-variant rounded px-2 py-1.5 focus-within:border-primary-fixed-dim transition-colors">
                  <input
                    type="number"
                    defaultValue={field.value}
                    className="bg-transparent border-none text-[12px] font-label-md w-full p-0 focus:ring-0 text-on-surface"
                  />
                  <Icon
                    name="unfold_more"
                    className="text-xs text-on-surface-variant"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Width / Opacity */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-label-md text-on-surface-variant">
              Width
            </span>
            <select className="bg-surface-container-lowest border border-outline-variant text-[11px] font-label-md py-0.5 px-2 rounded focus:ring-0 outline-none text-on-surface">
              <option>Auto</option>
              <option>Full</option>
              <option>Fixed</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-label-md text-on-surface-variant">
              Opacity
            </span>
            <div className="flex items-center gap-2 w-32">
              <input
                type="range"
                defaultValue={100}
                className="w-full accent-secondary-fixed-dim h-1 bg-surface-container-highest rounded-full appearance-none"
              />
              <span className="text-[11px] font-label-md text-on-surface-variant">
                100%
              </span>
            </div>
          </div>
        </div>

        {/* Background */}
        <div className="space-y-3 pt-4 border-t border-outline-variant">
          <label className="text-[10px] font-label-sm text-on-surface-variant uppercase tracking-widest">
            Style
          </label>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-label-md text-on-surface-variant">
              Background
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-label-md text-on-surface-variant">
                #122131
              </span>
              <div className="w-5 h-5 rounded border border-outline bg-surface-container cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-outline-variant">
        <button className="w-full py-2 bg-secondary-fixed-dim/10 text-secondary-fixed-dim border border-secondary-fixed-dim/30 font-label-sm text-label-sm rounded hover:bg-secondary-fixed-dim/20 transition-all">
          Reset to Defaults
        </button>
      </div>
    </aside>
  );
}

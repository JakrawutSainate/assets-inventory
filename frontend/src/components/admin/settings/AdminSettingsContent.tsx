import { PageHeader } from "@/components/PageHeader";

export function AdminSettingsContent() {
  return (
    <>
      <PageHeader title="Platform Configuration" description="Manage system-wide parameters and legal text." />
      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-8 space-y-8">
          <section>
            <h3 className="mb-4 text-lg font-bold text-white">Terms &amp; Conditions</h3>
            <textarea
              className="w-full rounded-xl border border-slate-800 bg-slate-900 p-6 text-sm text-slate-300"
              rows={10}
              defaultValue="By accessing the Fluid Custodian platform, you agree to treat all assets with the highest level of care."
            />
          </section>
          <section className="grid grid-cols-2 gap-8">
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <p className="font-bold text-white">Dark Mode</p>
              <p className="text-xs text-slate-500">Currently active across admin dashboard</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <p className="font-bold text-white">Maintenance Mode</p>
              <p className="text-xs text-slate-500">Restricts user checkout access</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

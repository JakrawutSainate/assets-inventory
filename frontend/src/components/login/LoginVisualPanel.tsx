import { RemoteAssetImage } from "@/components/ui/RemoteAssetImage";

export function LoginVisualPanel() {
  return (
    <div className="absolute top-1/2 -right-20 hidden h-[600px] w-[400px] -translate-y-1/2 rotate-6 overflow-hidden rounded-[40px] bg-slate-100 shadow-2xl lg:block">
      <RemoteAssetImage
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDecW4ZGNW_bN3cJ4wpu0TnhU4U3eXKpE5WPSiae_86BPZkKOLcCPIYnkEEduF3603ImYCSjOXrQWI1K84qMEed1ZYcV1ZEtCGW1Q16yWojCjPzjop50H-Ka7rCTTory-KwrFUamzIjk9D1aaeU9QvFfVFeEDH6VtuR_lpwSnUS23e9mg6MRmeQmKS95PDiofykJgCcTrC06km3pNb8RBGX7Twi0HBGyzE6xNEyI_GKm6x6qb8I5YNfDOHl_pT4AJT9v-51X3HGJWQ"
        alt="Professional workspace"
        fill
        sizes="400px"
        priority
        loading="eager"
        className="object-cover grayscale contrast-125 opacity-20"
      />
      <div className="absolute inset-0 bg-indigo-700/10 mix-blend-multiply" />
      <div className="absolute right-12 bottom-12 left-12">
        <p className="mb-4 text-3xl leading-tight font-bold tracking-tight text-indigo-900">
          &quot;The foundation of institutional trust is seamless custody.&quot;
        </p>
        <p className="text-sm font-bold tracking-widest text-indigo-800/60 uppercase">
          - Custodian Charter
        </p>
      </div>
    </div>
  );
}

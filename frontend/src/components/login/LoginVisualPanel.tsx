export function LoginVisualPanel() {
  return (
    <div className="absolute -right-20 top-1/2 hidden h-[600px] w-[400px] -translate-y-1/2 rotate-6 overflow-hidden rounded-[40px] bg-surface-container-low shadow-2xl lg:block">
      <img
        alt="Professional workspace"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDecW4ZGNW_bN3cJ4wpu0TnhU4U3eXKpE5WPSiae_86BPZkKOLcCPIYnkEEduF3603ImYCSjOXrQWI1K84qMEed1ZYcV1ZEtCGW1Q16yWojCjPzjop50H-Ka7rCTTory-KwrFUamzIjk9D1aaeU9QvFfVFeEDH6VtuR_lpwSnUS23e9mg6MRmeQmKS95PDiofykJgCcTrC06km3pNb8RBGX7Twi0HBGyzE6xNEyI_GKm6x6qb8I5YNfDOHl_pT4AJT9v-51X3HGJWQ"
        className="h-full w-full object-cover grayscale opacity-20 contrast-125"
      />
      <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
      <div className="absolute bottom-12 left-12 right-12">
        <p className="mb-4 text-3xl font-bold leading-tight tracking-tight text-indigo-900">
          &quot;The foundation of institutional trust is seamless custody.&quot;
        </p>
        <p className="text-sm font-bold uppercase tracking-widest text-indigo-800/60">— Custodian Charter</p>
      </div>
    </div>
  );
}

export const GradientBackground = () => {
  return (
    <>
      <div className="fixed inset-0 block">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl" />
      </div>

      <div className="fixed inset-0 overflow-hidden pointer-events-none block">
        <div className="absolute -top-40 -right-40 w-120 h-120 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-120 h-120 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
    </>
  );
};
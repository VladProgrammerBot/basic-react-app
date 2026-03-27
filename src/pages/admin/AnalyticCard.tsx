export const AnalyticCard = ({ children, title }: { children: React.ReactNode, title: string }) => (
  <div className="p-4 bg-neutral-800 border border-neutral-700 rounded-xl">
    <p>{title}</p>
    {children}
  </div>
);

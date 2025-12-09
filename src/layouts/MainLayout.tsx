// src/layouts/MainLayout.tsx
export const MainLayout: React.FC<{children:any}> = ({children}) => (
  <div className="min-h-screen bg-white text-gray-900">
    <header className="bg-qatar text-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Brand</h1>
      </div>
    </header>
    <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    <footer className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600">© Brand</footer>
  </div>
);

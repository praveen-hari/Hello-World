export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 text-sm py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between gap-2">
        <span>&copy; {new Date().getFullYear()} ShopZone. All rights reserved.</span>
        <span>Help Center | Returns | Privacy Policy | Terms</span>
      </div>
    </footer>
  );
}

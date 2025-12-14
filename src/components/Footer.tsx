export default function Footer() {
  return (
    <footer className="flex border-t border-slate-200 bg-white mt-10">
      <div className="mx-auto max-w-5xl px-4 py-5 text-sm text-slate-600">
        © {new Date().getFullYear()} The Things Network NYC
      </div>
    </footer>
  );
}

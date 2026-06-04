export function showToast(msg: string) {
  const t = document.createElement("div");
  t.className =
    "fixed bottom-8 left-1/2 -translate-x-1/2 translate-y-5 bg-text-main text-surface-main px-6 py-3 rounded-full text-sm font-semibold z-[9999] opacity-0 transition-all duration-300 shadow-lg whitespace-nowrap";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => {
    t.classList.remove("opacity-0", "translate-y-5");
    t.classList.add("opacity-100", "translate-y-0");
  }, 10);
  setTimeout(() => {
    t.classList.remove("opacity-100", "translate-y-0");
    t.classList.add("opacity-0", "translate-y-5");
    setTimeout(() => {
      if (document.body.contains(t)) document.body.removeChild(t);
    }, 300);
  }, 2500);
}

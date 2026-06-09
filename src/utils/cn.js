export function cn(...inputs) {
  const out = [];
  const walk = (v) => {
    if (!v) return;
    if (typeof v === "string" || typeof v === "number") {
      out.push(String(v));
      return;
    }
    if (Array.isArray(v)) {
      v.forEach(walk);
      return;
    }
    if (typeof v === "object") {
      for (const key in v) if (v[key]) out.push(key);
    }
  };
  inputs.forEach(walk);
  return out.join(" ");
}

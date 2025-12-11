export default function Footer() {
  return (
    <footer
      className="mt-12 py-6 text-center text-sm"
      style={{ backgroundColor: "#F0EDEE", color: "#2C666E" }}
    >
      <p className="font-medium">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </p>
      <p className="text-xs mt-1">
        Designed with theme colors #2C666E & #F0EDEE
      </p>
    </footer>
  );
}

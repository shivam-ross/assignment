
export default function Button({ children, type, ...props }: { children: React.ReactNode; type: 'button' | 'submit' | 'reset' }) {
  return (
    <button
      className="w-full px-4 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
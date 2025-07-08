
export default function Input({ label, id, type,  ...props }:{ label: string; id: string; type: string; [key: string]: any }) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-900 mb-1">{label}</label>
            <input
                id={id}
                type={type}
                className="w-full px-3 py-2 bg-white/60 border border-white/70 backdrop-blur rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/80 focus:border-white/80 transition"
                {...props}
            />
        </div>
    );
}
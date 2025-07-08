export default function Select({ label, id, children, value, onChange, ...props }: { label: string; id: string; value:string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; children: React.ReactNode }) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-900 mb-1">{label}</label>
            <select
                id={id}
                value={value}
                onChange={onChange}
                className="w-full px-3 py-2 bg-white/60 border border-white/70 backdrop-blur rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/80 focus:border-white/80 transition"
                {...props}
            >
                {children}
            </select>
        </div>
    );
}
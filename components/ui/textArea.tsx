
export default function TextArea({ label, id, value, onChange, placeholder, ...props }: { label: string; id: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; placeholder?: string }) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-900 mb-1">{label}</label>
            <textarea
                id={id}
                rows={4}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                className="w-full px-3 py-2 bg-white/60 border border-white/70 backdrop-blur rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/80 focus:border-white/80 transition"
                {...props}
            />
        </div>
    );
}

export default function Card({ children, className = '' }:{ children: React.ReactNode; className?: string }) {
    return (
        <div className={`bg-white/60 border border-white/70 backdrop-blur shadow-lg rounded-xl p-6 md:p-8 ${className}`}>
            {children}
        </div>
    );
}
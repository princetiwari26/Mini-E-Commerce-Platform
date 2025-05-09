'use client';

export default function Preloader() {
    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center z-50">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-white/80 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-white font-medium">Loading...</p>
            </div>
        </div>
    );
}
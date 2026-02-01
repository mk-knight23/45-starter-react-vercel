import { motion } from 'framer-motion';

interface LoadingProps {
    fullScreen?: boolean;
    message?: string;
}

export function Loading({ fullScreen = false, message = 'Loading...' }: LoadingProps) {
    const content = (
        <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-4 h-4 bg-black rounded-full"
                        initial={{ scale: 0.8, opacity: 0.4 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.2,
                            repeatType: 'reverse',
                        }}
                    />
                ))}
            </div>
            {message && (
                <p className="text-black/40 font-medium uppercase tracking-widest text-sm">
                    {message}
                </p>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white z-[200] flex items-center justify-center">
                {content}
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center py-24">
            {content}
        </div>
    );
}

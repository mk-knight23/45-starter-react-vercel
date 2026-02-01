import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
            <div className="w-24 h-24 bg-black/5 rounded-full flex items-center justify-center mb-8">
                <Icon className="w-12 h-12 text-black/40" />
            </div>

            <h3 className="text-2xl font-black mb-4 tracking-tight">{title}</h3>

            <p className="text-lg text-black/40 max-w-md mb-8 leading-relaxed">
                {description}
            </p>

            {action && (
                <button
                    onClick={action.onClick}
                    className="px-8 py-4 bg-black text-white font-black rounded-2xl hover:bg-black/80 transition-all active:scale-95"
                >
                    {action.label}
                </button>
            )}
        </div>
    );
}

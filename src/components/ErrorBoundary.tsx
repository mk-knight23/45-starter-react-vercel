import { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: any) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: undefined });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center px-6 bg-white">
                    <div className="max-w-2xl w-full text-center">
                        <div className="w-24 h-24 bg-black/5 rounded-full mx-auto mb-8 flex items-center justify-center">
                            <AlertTriangle className="w-12 h-12 text-black/40" />
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
                            Something went <span className="italic">wrong</span>.
                        </h1>

                        <p className="text-xl text-black/40 mb-8 leading-relaxed">
                            We apologize for the inconvenience. An unexpected error has occurred.
                        </p>

                        {this.state.error && (
                            <details className="mb-8 text-left">
                                <summary className="cursor-pointer font-black text-sm uppercase tracking-widest mb-4 hover:text-black/60">
                                    Error Details
                                </summary>
                                <pre className="p-6 bg-black/5 rounded-2xl text-sm text-black/60 overflow-auto">
                                    {this.state.error.toString()}
                                </pre>
                            </details>
                        )}

                        <button
                            onClick={this.handleReset}
                            className="inline-flex items-center gap-3 px-10 py-5 bg-black text-white font-black rounded-[2rem] text-lg hover:bg-black/80 transition-all active:scale-95"
                        >
                            <RefreshCw className="w-5 h-5" />
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

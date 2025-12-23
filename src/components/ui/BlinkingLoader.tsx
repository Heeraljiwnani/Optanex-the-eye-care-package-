import { Eye } from "lucide-react";

interface BlinkingLoaderProps {
    text?: string;
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function BlinkingLoader({ text = "Loading...", size = "md", className = "" }: BlinkingLoaderProps) {
    const sizeClasses = {
        sm: "w-12 h-12",
        md: "w-24 h-24",
        lg: "w-32 h-32"
    };

    const iconSizes = {
        sm: "h-6 w-6",
        md: "h-12 w-12",
        lg: "h-16 w-16"
    };

    return (
        <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
            <div className="relative">
                <style dangerouslySetInnerHTML={{
                    __html: `
            @keyframes blink {
              0%, 100% { transform: scaleY(1); }
              50% { transform: scaleY(0.1); }
            }
            .animate-blink {
              animation: blink 3s infinite ease-in-out;
            }
          `
                }} />
                <div className={`${sizeClasses[size]} bg-primary/10 rounded-full flex items-center justify-center animate-blink`}>
                    <Eye className={`${iconSizes[size]} text-primary`} />
                </div>
            </div>
            {text && (
                <p className="mt-8 text-lg font-medium text-muted-foreground animate-pulse">
                    {text}
                </p>
            )}
        </div>
    );
}

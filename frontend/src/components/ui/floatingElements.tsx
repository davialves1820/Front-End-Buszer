import { Bus, MapPin, Clock, Bell } from "lucide-react";

export const FloatingElements = () => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute top-20 left-10 animate-float opacity-20">
                <Bus className="h-8 w-8 text-secondary" />
            </div>
            <div className="absolute top-40 right-20 animate-float-delayed opacity-20" style={{ animationDelay: "1s" }}>
                <MapPin className="h-10 w-10 text-primary" />
            </div>
            <div className="absolute bottom-32 left-1/4 animate-float opacity-20" style={{ animationDelay: "2s" }}>
                <Clock className="h-12 w-12 text-accent" />
            </div>
            <div className="absolute bottom-20 right-1/3 animate-float-delayed opacity-20" style={{ animationDelay: "0.5s" }}>
                <Bell className="h-8 w-8 text-secondary" />
            </div>
            <div className="absolute top-1/2 left-20 animate-float opacity-20" style={{ animationDelay: "1.5s" }}>
                <Bus className="h-6 w-6 text-primary" />
            </div>
            <div className="absolute top-1/3 right-10 animate-float-delayed opacity-20" style={{ animationDelay: "2.5s" }}>
                <MapPin className="h-7 w-7 text-accent" />
            </div>
        </div>
    );
};
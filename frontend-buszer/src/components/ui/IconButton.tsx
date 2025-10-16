import { Bus } from "lucide-react";

interface IconButtonProps {
    text: string;
    onClick?: () => void;
}

export const IconButton = ({ text, onClick }: IconButtonProps) => {
    return (
        <button
        onClick={onClick}
        className="
            flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-md
            text-black font-medium text-sm
            hover:bg-gray-50 transition-colors
        "
        >
        <Bus className="w-6 h-6 text-black" />
        {text}
        </button>
    );
};

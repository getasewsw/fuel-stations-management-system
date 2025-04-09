import { ArrowLeftCircle } from "lucide-react";

interface BackButtonProps {
    text: string;
    link: string;
}
function BackButton({ text, link }: BackButtonProps) {
    return (
        <div className="flex items-center space-x-2">
            <a href={link} className="flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeftCircle className="w-4 h-4 mr-1" />
                <span>{text}</span>
            </a>
        </div>
    );
}
export default BackButton;
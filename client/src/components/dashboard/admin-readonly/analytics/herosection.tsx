import { useSession } from '@/context/session-context';
import { Calendar } from 'lucide-react'

const HeroSection = () => {
    const { user } = useSession();
    const today = new Date();
    const formattedDateTime = today.toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        < div className="flex justify-between" >
            <div className="space-y-2">
                <h1 className="text-xl font-semibold">Hello, {user?.name}</h1>
                <p className="text-gray-500 text-sm">Track your processed work. Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="flex gap-2 items-center text-sm text-gray-600">
                <p>{formattedDateTime}</p>
                <div className="p-2 bg-gray-200 rounded-full">
                    <Calendar className="w-4 h-4" />
                </div>
            </div>
        </div >
    )
}

export default HeroSection
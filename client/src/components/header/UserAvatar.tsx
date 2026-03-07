import { useMemo, type JSX } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    username: string;
    provider: "LOCAL" | "GOOGLE" | "FACEBOOK" | null;
    imageUrl: string;
};

const UserAvatar = ({ username, provider, imageUrl }: Props): JSX.Element => {
    const navigate = useNavigate();

    const initial = useMemo(() => {
        const trimmed = (username ?? "").trim();
        if (!trimmed) return "U";
        return trimmed[0]?.toUpperCase() ?? "U";
    }, [username]);

    const showProfileImage = provider === "GOOGLE" && Boolean(imageUrl?.trim());

    return (
        <button
            type="button"
            title="Profile"
            onClick={() => navigate("/profile")}
            className={
                showProfileImage
                    ? "cursor-pointer border border-stone-800 rounded-full h-12 w-12 overflow-hidden"
                    : "border-1 bg-orange-500 hover:bg-orange-500/90 text-yellow-50 cursor-pointer border-stone-800 rounded-full h-12 w-12 flex items-center justify-center"
            }
        >
            {showProfileImage ? (
                <img
                    src={imageUrl}
                    alt={username}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                />
            ) : (
                <span className="text-xl font-semibold">{initial}</span>
            )}
        </button>
    );
};

export default UserAvatar;

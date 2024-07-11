import { useMemo } from "react";
import getInitials from "../utils/getInitials";
import { User } from "firebase/auth";


function useUserInitials(user: User | null | undefined): string {
    const initials = useMemo(() => {
        if (!user || !user.displayName) return '';
        return getInitials(user.displayName);
    }, [user]);
    return initials;
}

export default useUserInitials
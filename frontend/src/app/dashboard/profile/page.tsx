"use client";

import { UserProfile } from "@/components/profile/UserProfile";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export default function ProfilePage() {
    return (
        <div className="space-y-6">
            <UserProfile />
        </div>
    );
}

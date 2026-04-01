// job selection for JobListings.tsx
// import { useEffect, useState } from "react";

type Props = {
    onSelect: (role: string) => void;
};

export default function JobSelector({ onSelect }: Props) {

    return (
        <div>
            <h2> Choose Your Job </h2>
            <button onClick = {() => onSelect("Example1")}>
                Example1
            </button>
            <button onClick = {() => onSelect("Example2")}>
                Example2
            </button>
        </div>
    );
}

{/*
    basic framework when backend is included
    
type Role = {
    id: number;
    name: string;
};

type Props = {
    onSelect: (role: string) => void;
}

export default function RoleSelector({ onSelect }: Props) {
    const [roles, setRoles] = useState<Role[]>([]);

    useEffect(() => {
        fetch("/api/example")
            .then(res => res.json())
            .then((data: Role[]) => {
                setRoles(data);
            });
    }, []);

    return (
        <div>
            <h2> Choose Your Job <h2>

                {roles.map(role => (
                    <button key = {role.id} onClick = {)_ => onSelect(role.name)}>
                        {role.name}
                    </button>
                ))}
        </div>
    );
}

*/}

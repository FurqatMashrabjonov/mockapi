import React from "react";
import {PageProps} from "@/types";

type Icon = {
    name: string;
    icon: any;
}

export default function ExportToolsContainer({icons, selected, auth}: PageProps<{
    icons: Icon[],
    selected: (name: string) => void,
}>) {
    return (
        <div className="grid grid-cols-4 gap-1">
            {icons.map((icon, index) => (
                <div key={index}
                     onClick={() => selected(icon.name)}
                    className="p-1 cursor-pointer flex flex-col border rounded-lg border-gray-300 hover:shadow-lg transition duration-200">
                    <div className="flex justify-center">
                        {icon.icon}
                    </div>
                    <p className="mt-1 text-center  text-gray-600 dark:text-gray-400">
                        {icon.name}
                    </p>
                </div>
            ))}
        </div>
    );
}

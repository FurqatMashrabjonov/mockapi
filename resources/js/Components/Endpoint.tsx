import {PageProps} from "@/types";


export function Endpoint({projectUUID}: PageProps<{
    projectUUID: string
}>) {
    return (
        <div className="max-w-screen-md">
            <h2 className="font-semibold mb-2 text-lg dark:text-gray-800">
                API Endpoint
            </h2>
            <h5 className="font-semibold text-lg dark:text-gray-200 leading-tight">
                https://
                <span
                    className="inline-flex items-center rounded-md bg-gray-50 text-gray-600 p-1 ring-1 ring-inset ring-gray-500/20">
                    {projectUUID}
                </span>
                .<span>apimock.test</span>/
                <span
                    className="inline-flex items-center rounded-md bg-pink-50 text-gray-600 p-1 ring-1 ring-inset ring-pink-700/10">
                    :resource
                </span>
            </h5>
        </div>
    );
}

import {PageProps} from "@/types";
import React, {useEffect, useState} from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {useForm} from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import axios from "axios";
import {IconPlus, IconX} from "@tabler/icons-react";
import {Resource, Field} from "@/types/project";
import {Route} from "@/types/route";
import toast from "react-hot-toast";

const default_types = ['number', 'string', 'boolean', 'date', 'array', 'object'];

export function UpdateResource({resource, closeModal, restApis}: PageProps<{
    resource: Resource,
    closeModal: () => void,
    restApis: Array<Array<Route>>,
}>) {

    const maxFields = 10;

    const {data, setData, post, processing, errors, reset} = useForm(resource);
    const [fields, setFields] = useState<Field[]>([]);
    const [showDeleteButtons, setShowDeleteButtons] = useState(Array(data.fields.length).fill(false));
    const [selectedField, setSelectedField] = useState<Field[]>([]);


    useEffect(() => {
        axios.get(route('resources.fields')) // replace with your actual API endpoint
            .then(response => {
                setFields(response.data.data);
            })
            .catch(error => {
                toast.error('There was an error!');
            });

    }, []);

    const createResource = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // data.fields.shift();

        // post(route('resources.store', {project: project}), {
        //     preserveScroll: true
        // });
    };

    const formatErrorMessage = (message: string) => {
        if (typeof message === 'string') {
            const parts = message.split(' ');
            parts.splice(1, 1); // remove the first two parts
            return parts.join(' ');
        } else {
            return '';
        }
    }

    const addField = () => {
        const fieldsCount = data.fields.length;
        if (fieldsCount >= maxFields) {
            return;
        }
        // setData('fields', [...data.fields, {
        //     name: '',
        //     category: 'number',
        //     type: '',
        // }]);
    }

    const deleteField = (index: number) => {
        const fields = data.fields;
        fields.splice(index, 1);
        setData('fields', fields);
    }

    const upperCaseFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // @ts-ignore
    // @ts-ignore
    return (
        <form onSubmit={createResource} className="p-6 overflow-y-scroll"
              style={{maxHeight: '100vh', overflowY: 'auto'}}>
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Update Resource
            </h2>

            <div className="mt-6">
                <InputLabel htmlFor="name-resource" value="Resource Name"/>

                <TextInput
                    id="name-resource"
                    type="text"
                    name="name"
                    required
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="mt-1 block lg:w-2/4 md:w-2/4 sm:w-full"
                    autoComplete="off"
                    placeholder="Example: users, posts, comments"
                />

                <InputError message={errors.name} className="mt-2"/>
            </div>


            <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mt-6">
                    Scheme
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Define Resource schema, it will be used to generate mock data.
                </p>

                {data.fields.map((field: any, index: number) => (
                    <div key={index}>
                        <div className="flex align-items-center mt-2" key={index}>
                            <TextInput
                                id={`field-name-${index}`}
                                type="text"
                                required
                                name={`fields[${index}][name]`}
                                disabled={index == 0}
                                value={field.name}
                                onChange={(e) => {
                                    let newFields: Field[] = [...data.fields];
                                    newFields[index].name = e.target.value;
                                    setData('fields', newFields);
                                }}
                                autoComplete="off"
                                placeholder="Field name"
                                className="w-3/12"
                            />
                            <select
                                id={`category-type-${index}`}
                                className=" ml-6 w-3/12 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                value={default_types.includes(field.category) ? field.category : 'fakerPHP'}
                                disabled={index == 0}
                                onChange={(e) => {
                                    let newFields: Field[] = [...data.fields];
                                    newFields[index].name = e.target.value;
                                    setData('fields', newFields);
                                }}
                            >
                                {index == 0 && (
                                    <option value="number">Unique ID</option>
                                )}

                                {Object.entries(fields).map(([category, fields]) => {
                                    return (
                                        <option
                                            key={category}
                                            value={category}
                                        >{upperCaseFirstLetter(category)}
                                        </option>
                                    )
                                })}
                            </select>

                            {fields[default_types.includes(field.category) ? field.category : 'fakerPHP'] && (
                                <select
                                    id={`field-type-${index}`}
                                    className=" ml-6 w-3/12 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                    value={field.type}
                                    onChange={(e) => {
                                        let newFields: Field[] = [...data.fields];
                                        newFields[index].name = e.target.value;
                                        setData('fields', []);
                                    }}
                                >
                                    {Object.entries(fields[default_types.includes(field.category) ? field.category : 'fakerPHP'] || {}).map(([fieldName, fieldValue]) => (
                                        <option key={fieldName} value={fieldValue}>{fieldValue}</option>
                                    ))}
                                </select>
                            )}

                            {index != 0 && (
                                <SecondaryButton type="button" onClick={() => deleteField(index)} className="ml-6">
                                    <IconX/>
                                </SecondaryButton>
                            )}
                            {index == 0 && (
                                <SecondaryButton style={{opacity: '0'}} type="button" onClick={() => {
                                }} className="ml-6">
                                    <IconX/>
                                </SecondaryButton>
                            )}
                        </div>
                        <InputError message={formatErrorMessage(formatErrorMessage((errors as any)[`fields.${index}.type`]))}
                                    className="mt-2"/>
                    </div>
                ))
                }

                <SecondaryButton className="mt-6" type="button" onClick={addField}
                                 disabled={processing || maxFields <= data.fields.length}>
                    <IconPlus size={25}/>
                </SecondaryButton>

            </div>

            <h2 className="text-lg mt-6 font-medium text-gray-900 dark:text-gray-100">
                Endpoints
            </h2>

            <div className="mt-4">
                {restApis[0].map((api: Route, index: number) => (
                    <div className="flex flex-col" key={index}>

                        <p className="mt-2 text-sm text-gray-600 font-bold dark:text-gray-400">
                            {api.method}
                        </p>

                        <div
                            className={"inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-md text-gray-700 dark:text-gray-300 tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150"}>
                            {api.route}
                        </div>
                    </div>

                ))}

            </div>

            <div className="mt-6 flex justify-end">
                <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                <PrimaryButton className="ms-3" disabled={processing}>
                    Update
                </PrimaryButton>
            </div>
        </form>
    )
}

const footerButton = {
    position: 'sticky',
    bottom: '0',
    background: 'white', /* or any color that matches your modal background */
    padding: '10px', /* optional: for some space around the button */

}

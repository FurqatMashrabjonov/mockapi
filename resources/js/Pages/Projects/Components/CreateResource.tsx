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
import toast from "react-hot-toast";

export function CreateResource({project, maxFields, closeModal, auth}: PageProps<{
    project: Object,
    maxFields: number,
    closeModal: () => void,
}>) {

    const {data, setData, post, processing, errors, reset} = useForm({
        name: '',
        fields: [
            {
                name: 'name',
                category: 'person',
                type: 'firstName',
            },
            {
                name: 'phone_number',
                category: 'phoneNumber',
                type: 'phoneNumber',
            },
        ],
    });


    const [fields, setFields] = useState<Array<any>>([]);
    const [showDeleteButtons, setShowDeleteButtons] = useState(Array(data.fields.length).fill(false));
    const [selectedField, setSelectedField] = useState<Array<any>>([]);


    useEffect(() => {
        axios.get(route('resources.fields')) // replace with your actual API endpoint
            .then(response => {
                setFields(response.data.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const createResource = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //delete ',' comma of each filed type in the fields array
        let newFields = [...data.fields];
        newFields.forEach((field: any) => {
            field.type = field.type.replace(/,/g, '');
        });
        setData('fields', newFields);

        post(route('resources.store', {project: project}), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                closeModal();
                toast.success('Resource created successfully');
            }
        });
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
        setData('fields', [...data.fields, {
            name: '',
            category: 'address',
            type: 'city',
        }]);
    }

    const deleteField = (index: number) => {
        const fields = data.fields;
        fields.splice(index, 1);
        setData('fields', fields);
    }

    const upperCaseFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <form onSubmit={createResource} className="p-6 overflow-y-scroll"
              style={{maxHeight: '100vh', overflowY: 'auto'}}>
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Create Resource
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

                <div>
                    <div className="flex align-items-center mt-2">
                        <TextInput
                            id={`field-name-id`}
                            disabled={true}
                            value="id"
                            autoComplete="off"
                            placeholder="Field name"
                            className="w-3/12"
                        />
                        <select
                            id={`category-type-id`}
                            className=" ml-6 w-3/12 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                            value={'Object ID'}
                            disabled={true}
                        >
                            <option value="number">Unique ID</option>
                        </select>
                    </div>
                </div>

                {data.fields.map((field: any, index: number) => (
                    <div key={index}>
                        <div className="flex align-items-center mt-2" key={index}>
                            <TextInput
                                id={`field-name-${index}`}
                                type="text"
                                required
                                name={`fields[${index}][name]`}
                                value={field.name}
                                onChange={(e) => {
                                    let newFields = [...data.fields];
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
                                value={field.category}
                                onChange={(e) => {
                                    let newFields = [...data.fields];
                                    newFields[index].category = e.target.value;
                                    setData('fields', newFields);
                                }}
                            >
                                {/*{index == 0 && (*/}
                                {/*    <option value="number">Unique ID</option>*/}
                                {/*)}*/}

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

                            {fields[field.category] && (
                                <select
                                    id={`field-type-${index}`}
                                    className=" ml-6 w-3/12 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                    value={field.type}
                                    onChange={(e) => {
                                        let newFields = [...data.fields];
                                        newFields[index].type = e.target.value;
                                        setData('fields', newFields);
                                    }}
                                >
                                    {Object.entries(fields[field.category] || {}).map(([fieldName, fieldValue]) => (
                                        <option key={fieldName} value={fieldValue as string}>{fieldValue as string}</option>
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
            <div className="mt-6 flex justify-end">
                <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                <PrimaryButton className="ms-3" disabled={processing}>
                    Submit
                </PrimaryButton>
            </div>
        </form>
    )
}

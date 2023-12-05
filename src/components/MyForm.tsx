import React, { useState } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

interface Row {
    type: string;
    count: number;
    price: number;
}

const validationSchema = Yup.object({
    type: Yup.string().required('Required'),
    count: Yup.number().required('Required').positive().integer(),
    price: Yup.number().required('Required').positive().integer(),
});

const MyForm: React.FC = () => {
    const [SampleTableData, setSampleTableData] = useState<Row[]>([]);
    const [types, setTypes] = useState<string[]>(['LivingRoom', 'DiningRoom', 'Kitchen', 'Bathroom', 'Bedrooms', 'Other']);
    const [newType, setNewType] = useState<string>('');

    const addRow = () => {
        setSampleTableData([...SampleTableData, { type: '', count: 0, price: 0 }]);
    };

    return (
        <div className="lg:w-1/2">
            <div className="mt-8">
                <div className="flex flex-col text-center">
                    <div className="flex flex-row bg-gray-400 rounded font-bold">
                        <div className="w-1/3 p-2 text-left">Type</div>
                        <div className="w-1/3 p-2 text-center">Count</div>
                        <div className="w-1/3 p-2 text-right">Price</div>
                    </div>

                    {SampleTableData.map((data, index) => (
                        <Formik
                            key={index}
                            initialValues={data}
                            validationSchema={validationSchema}
                            onSubmit={(values: Row, { setSubmitting }: FormikHelpers<Row>) => {
                                const newSampleTableData = [...SampleTableData];
                                newSampleTableData[index] = values;
                                setSampleTableData(newSampleTableData);
                                setSubmitting(false);
                            }}
                        >
                            <Form className="flex flex-row">
                                <Field as="select" name="type" className="w-1/3 p-2 text-left" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    if (e.target.value === 'Other') {
                                        setTypes([...types, newType]);
                                        setNewType('');
                                    }
                                }}>
                                    <option value="">Select a type</option>
                                    {types.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </Field>
                                {data.type === 'Other' && (
                                    <Field type="text" name="type" className="w-1/3 p-2 text-left" onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                                        setNewType(e.target.value);
                                    }} />
                                )}
                                <Field type="number" name="count" className="w-1/3 p-2 text-center" />
                                <Field type="number" name="price" className="w-1/3 p-2 text-right" />
                            </Form>
                        </Formik>
                    ))}

                    <button onClick={addRow} className="w-1/3 p-2 bg-green-500 text-white">
                        Add New
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyForm;

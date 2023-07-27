import React, { useEffect, useState } from 'react';

const Table = ({ schema }) => {
    if (!schema) return null;

    const { properties } = schema;

    const notOption = !Object.keys(properties).length;

    return (
        <table style={{ width: '100%' }}>
            <thead>
                <tr>
                    <th style={{ width: '15%' }}>Name</th>
                    <th style={{ width: '15%' }}>Type</th>
                    <th style={{ width: '25%' }}>Default</th>
                    <th style={{ width: '35%' }}>Description</th>
                </tr>
            </thead>

            <tbody>
                {notOption ? (
                    <tr>
                        <td
                            colspan='4'
                            style={{
                                textAlign: 'center',
                                background: '#f3f4f6',
                                color: '#6b7280',
                                fontWeight: 600,
                                fontSize: '16px'
                            }}>
                            Not Applicable
                        </td>
                    </tr>
                ) : (
                    Object.entries(properties).map(([key, value], index) => {
                        const { type, default: defaultValue, description, enum: enumOpt } = value;

                        return (
                            <tr key={index} style={{ fontSize: '15px' }}>
                                <td style={{ fontWeight: 600, fontSize: '16px' }}>{key}</td>
                                <td>
                                    <div
                                        style={{
                                            border: '1px solid rgb(209 213 219)',
                                            background: 'rgb(243 244 246)',
                                            padding: '2px 8px',
                                            width: 'fit-content',
                                            fontWeight: '500',
                                            borderRadius: '8px',
                                            color: 'rgb(55 65 81)',
                                            fontSize: '14px'
                                        }}>
                                        {enumOpt?.length ? enumOpt.join(' | ') : type}
                                    </div>
                                </td>
                                <td>
                                    {defaultValue ? (
                                        <div
                                            style={{
                                                fontWeight: '500',
                                                color: 'rgb(75 85 99)'
                                            }}>
                                            {defaultValue.toString()}
                                        </div>
                                    ) : null}
                                </td>
                                <td>{description}</td>
                            </tr>
                        );
                    })
                )}
            </tbody>
        </table>
    );
};

export default function JSViewer(props) {
    const { schema } = props;

    const [current, setCurrent] = useState(null);

    const { oneOf } = schema;

    useEffect(() => {
        if (oneOf) {
            setCurrent(oneOf[0].title);
        }
    }, [oneOf]);

    return (
        <>
            {oneOf ? (
                <>
                    <div
                        style={{
                            fontSize: '18px',
                            fontWeight: '700',
                            marginBottom: '8px',
                            color: 'rgb(55 65 81)'
                        }}>
                        By data source type:{' '}
                    </div>
                    <div style={{ marginBottom: '20px', display: 'flex' }}>
                        {oneOf.map((item) => {
                            const { title } = item;
                            return (
                                <div
                                    key={title}
                                    style={{
                                        background:
                                            title === current
                                                ? 'rgb(84, 199, 236)'
                                                : 'rgb(243 244 246)',
                                        color: title === current ? 'white' : 'rgb(75 85 99)',
                                        width: 'fit-content',
                                        padding: '2px 12px',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        marginRight: '10px'
                                    }}
                                    onClick={() => {
                                        if (title !== current) {
                                            setCurrent(title);
                                        }
                                    }}>
                                    {title}
                                </div>
                            );
                        })}
                    </div>
                </>
            ) : null}
            <Table schema={oneOf ? oneOf.find((item) => item.title === current) : schema} />
        </>
    );
}

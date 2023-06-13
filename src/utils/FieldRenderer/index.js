import { localize } from '../../core';
import translations from './translations';
import React from 'react';
import FileRenderer from './FileFieldRenderer';

export const FileFieldRenderer = FileRenderer;

export function any(...fields) {
    if (fields.length === 0) {
        return false;
    } else {
        let contain = false;
        for (let field of fields) {
            if (field?.value) {
                if (field.type === 'localstr') {
                    if (Object.values(field.value).filter(Boolean).length) {
                        contain = true;
                        break;
                    }
                } else {
                    contain = true;
                    break;
                }
            }
        }
        if (!contain) {
            return false;
        } else {
            for (let field of fields) {
                if (field) field.count++;
            }
            return true;
        }
    }
}

export class FieldsTracker {
    constructor(fields) {
        const tempFields = { ...fields };
        this.fields = this.fieldsLoader(tempFields);
    }

    fieldsLoader = (fields) => {
        const fie = {};
        Object.keys(fields).forEach((key) => {
            if (key !== 'itemId' && key !== '_attributes') {
                const field = fields[key];

                fie[key] = {
                    count: 0,
                    ...field
                };
            }
        });
        return fie;
    };

    getFields() {
        return this.fields;
    }

    getUnformattedField() {
        return this.getUnFormattedFieldHelper(this.fields);
    }

    getUnFormattedFieldHelper = (fields) => {
        const result = {};
        Object.keys(fields).forEach((key) => {
            const field = fields[key];
            if (
                field.count === 0 &&
                field.value &&
                field.name !== 'order' &&
                field.name !== 'itemId'
            ) {
                result[key] = fields[key];
            }
        });
        return result;
    };
}

export const genericFieldRenderer = (
    field,
    showLabel = true,
    wrapper = 'p',
    editMode = false,
    plainText = false
) => {
    let Wrapper = wrapper;
    const { type, constraints, label, name } = field;
    const fieldValue = fieldValueParser(field);

    const getLabel = (showColon = true) => {
        if (label && showLabel)
            return (
                <span>
                    {label}
                    {showColon ? ': ' : ' '}
                </span>
            );
        return null;
    };

    if (fieldValue === null) return null;

    switch (type) {
        case 'bilingual':
        case 'localstr': {
            if (editMode) {
                if (constraints?.richText === true) {
                    return fieldValue.map((langValue, index) => {
                        const { lang, langVal } = langValue;

                        return (
                            <div key={index}>
                                <p className={`font-semibold text-gray-600 mb-0.5`}>
                                    <span>{getLabel(false)}</span>
                                    {lang && (
                                        <span className={`text-gray-400`}>
                                            {localize(translations[lang])}
                                        </span>
                                    )}
                                </p>
                                <TextTruncator
                                    text={langVal}
                                    className={richTextStyle}
                                    maxLine={3}
                                />
                                {/* <div
                                    dangerouslySetInnerHTML={{ __html: langVal }}
                                    className={`${richTextStyle} ${lineClamp(3)}`}
                                /> */}
                            </div>
                        );
                    });
                } else {
                    return (
                        <Wrapper className={`truncate`}>
                            {getLabel()}
                            {fieldValue.map((langValue, index) => {
                                const { lang, langVal } = langValue;
                                if (lang) {
                                    return (
                                        <span
                                            key={index}
                                            className={`text-gray-400`}
                                            title={langVal}
                                        >
                                            ({langVal}){index < fieldValue.length - 1 ? ' ' : ''}
                                        </span>
                                    );
                                } else {
                                    return (
                                        <span key={index} title={langVal}>
                                            {langVal}{' '}
                                        </span>
                                    );
                                }
                            })}
                        </Wrapper>
                    );
                }
            } else if (plainText) {
                const { activeValue = '', value = {} } = field;

                const finalValue = activeValue || Object.values(value)[0];

                if (constraints?.richText === true) {
                    return {
                        html: true,
                        value: finalValue
                    };
                } else {
                    return finalValue;
                }
            } else {
                const { activeValue = '', value = {} } = field;

                const finalValue = activeValue || Object.values(value)[0];

                if (constraints?.richText === true) {
                    return (
                        <div className={`${richTextStyle}`}>
                            <p className={`font-semibold text-gray-700`}>
                                <span>{getLabel(false)}</span>
                            </p>
                            <TextTruncator text={finalValue} maxLine={3} />
                        </div>
                    );
                } else {
                    return (
                        <Wrapper>
                            {getLabel()}
                            <span>{finalValue}</span>
                        </Wrapper>
                    );
                }
            }
        }
        case 'profile':
        case 'lov':
        case 'reftable':
        case 'systable': {
            if (plainText) {
                return `${fieldValue[0]} ${fieldValue.slice(1).filter(Boolean).join(' - ')}`; ////
            }
            return (
                <Wrapper>
                    {getLabel()}
                    {fieldValue.length > 1 ? (
                        <span>
                            <span className={`font-semibold text-gray-600`}>{fieldValue[0]} </span>
                            <span className={`text-gray-500`}>
                                {fieldValue.slice(1).join(' - ')}
                            </span>
                        </span>
                    ) : (
                        <span>{fieldValue[0]}</span>
                    )}
                </Wrapper>
            );
        }
        case 'elapsed-time': {
            const { min, sec } = fieldValue;
            if (plainText) {
                return `${i18n.t(`${configs.namespace}:minute`, { count: min })} ${i18n.t(
                    `${configs.namespace}:second`,
                    { count: sec }
                )}`;
            }
            return (
                <Wrapper>
                    {getLabel()}
                    {i18n.t(`${configs.namespace}:minute`, { count: min })}{' '}
                    {i18n.t(`${configs.namespace}:second`, { count: sec })}{' '}
                </Wrapper>
            );
        }
        case 'address': {
            const { formatted_address } = fieldValue;
            if (plainText) {
                return formatted_address;
            }
            return (
                <Wrapper className={`truncate`}>
                    {getLabel()}
                    {formatted_address}
                </Wrapper>
            );
        }
        case 'date':
        case 'year':
        case 'yearmonth':
        case 'monthday': {
            const { year, month, day } = fieldValue;
            if (plainText) {
                if (year && month && day) {
                    return `${localize(translations[Months[month - 1]])} ${day}, ${year}`;
                }
                return `${month ? localize(translations[Months[month - 1]]) : ''} ${day ?? ''} ${
                    year ?? ''
                }`;
            }
            if (year && month && day) {
                return (
                    <Wrapper>
                        {getLabel()}
                        {localize(translations[Months[month - 1]])} {day}, {year}
                    </Wrapper>
                );
            }
            return (
                <Wrapper>
                    {getLabel()}
                    {month ? localize(translations[Months[month - 1]]) : ''} {day ?? ''}{' '}
                    {year ?? ''}
                </Wrapper>
            );
        }
        case 'boolean': {
            if (plainText) {
                return `${
                    fieldValue === '1'
                        ? localize(translations['yes'])
                        : localize(translations['no'])
                }`;
            }
            return (
                <Wrapper>
                    {getLabel()}
                    {fieldValue === '1'
                        ? localize(translations['yes'])
                        : localize(translations['no'])}
                </Wrapper>
            );
        }
        case 'hourminute': {
            const { hour, min, meridiem } = fieldValue;

            if (plainText) {
                return `${hour}:${min} ${meridiem}`;
            }
            return (
                <Wrapper>
                    {getLabel()}
                    {hour}:{min} {meridiem}
                </Wrapper>
            );
        }
        case 'file': {
            const filename = fieldValue.replace(/^.*[\\\/]/, '');

            return (
                <Wrapper>
                    {getLabel()}
                    {filename}
                </Wrapper>
            );
        }
        case 'string': {
            if (plainText) {
                if (name === 'url') {
                    return {
                        link: true,
                        value: fieldValue
                    };
                }
                return fieldValue;
            }

            if (constraints?.select) {
                const options = constraints.select[0]?.options || [];
                const option = options.find((o) => o.value === fieldValue);
                const valueLabel = option?.label;

                if (valueLabel) {
                    return (
                        <Wrapper>
                            {getLabel()}
                            {localize(valueLabel)}
                        </Wrapper>
                    );
                }
            }

            return (
                <Wrapper className={`truncate`}>
                    {getLabel()}
                    <span title={fieldValue}>{fieldValue}</span>
                </Wrapper>
            );
        }
        case 'section': {
            return (
                <div>
                    <strong>{getLabel()}</strong>
                    <div>
                        {[...fieldValue]
                            .sort((a, b) => a.order?.value - b.order?.value)
                            .map((item, index) => {
                                const isSingleFieldSection =
                                    Object.keys(item).filter(
                                        (subFieldName) =>
                                            subFieldName !== 'order' && subFieldName !== 'itemId'
                                    ).length === 1;
                                return (
                                    <React.Fragment key={index}>
                                        {Object.keys(item).map((subFieldName, subFieldIndex) => {
                                            const subField = item[subFieldName];
                                            if (
                                                subFieldName !== 'order' &&
                                                subFieldName !== 'itemId'
                                            ) {
                                                return (
                                                    <React.Fragment key={subFieldIndex}>
                                                        {genericFieldRenderer(
                                                            subField,
                                                            !isSingleFieldSection
                                                        )}
                                                    </React.Fragment>
                                                );
                                            } else return null;
                                        })}
                                    </React.Fragment>
                                );
                            })}
                    </div>
                </div>
            );
        }
        default:
            return (
                <Wrapper>
                    {getLabel()}
                    {fieldValue}
                </Wrapper>
            );
    }
};

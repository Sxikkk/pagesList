import React from 'react';

const MySelect = ({options, defaultValue, value, OnChange}) => {
    return (
        <select
            value={value}
            onChange={event => OnChange(event.target.value)}
        >
            <option disabled value="">{defaultValue}</option>
            {options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
        </select>
    );
};

export default MySelect;
import commonPrismLanguages from '../assets/prismjs/common';
import Select from 'react-tailwindcss-select';
import PrismJsType from '../assets/prismjs/Prism';
import { SelectValue } from 'react-tailwindcss-select/dist/components/type';
import { useState } from 'react';
import twcls from '../util/twcls';

export interface LanguageSelectorProps {
    setLang: (lang: string) => void;
    disabled?: boolean;
    defaultValue?: string;
}
function LanguageSelector({ setLang, disabled, defaultValue = "plaintext" }: LanguageSelectorProps) {
    const [value, setValue] = useState<unknown | null>(commonPrismLanguages.find(lang => lang.value === defaultValue) || null);

    const handleChange = (value: unknown) => {
        setValue(value);
        setLang((value as PrismJsType).value);
    };

    return (
        <Select
            value={value as SelectValue}
            primaryColor="blue"
            onChange={handleChange}
            options={commonPrismLanguages}
            isDisabled={disabled}
            isSearchable
            classNames={{
                menu: "absolute z-10 w-full bg-white dark:bg-gray-900 shadow-lg border border-gray-300 dark:border-gray-700 rounded py-1 mt-1.5 text-sm text-gray-700 dark:text-gray-400",
                listItem: (value) => twcls(
                    "block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded",
                    (value?.isSelected ? "text-white bg-blue-500" : "text-gray-500 hover:bg-blue-100 dark:hover:bg-[#fff1] hover:text-blue-500 dark:hover:text-white"),
                ),
                menuButton: () => twcls(
                    "flex text-sm text-gray-500 border border-gray-300 dark:border-gray-700 rounded shadow-sm transition-all duration-300 focus:outline-none",
                    "bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20",
                    "dark:bg-secondary dark:hover:border-gray-500 focus:ring focus:ring-blue-500/20 dark:focus:ring-blue-500/60",
                ),
                searchBox: twcls(
                    "w-full py-2 pl-8 text-sm text-gray-500 bg-gray-100 border border-gray-200 rounded focus:border-gray-200 focus:ring-0 focus:outline-none",
                    "dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                ),
            }}
        />
    );
}

export default LanguageSelector;
import { ChangeEvent, useEffect, useState } from "react";
import useTasks from "../../shared/hooks/useTasks";
import { Task } from "../../shared/interfaces/task.interface";

type SearchInputProps = {
    getSearchedTasks: (tasks: Task[]) => void;
}

function SearchInput({ getSearchedTasks }: SearchInputProps) {
    const [inputValue, setInputValue] = useState<string>('');
    let tasks = useTasks();

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setInputValue(value);
        let searchResult = getSearchResults(value);
        getSearchedTasks(searchResult);
    }

    function getSearchResults(value: string) {
        const lowerCaseValue = value.toLowerCase();
        return tasks.filter(task =>
            task.title.toLowerCase().includes(lowerCaseValue) || task.description.toLowerCase().includes(lowerCaseValue)
        );
    }

    useEffect(() => {
        getSearchedTasks(tasks);
    }, [tasks])

    return (
        <div className="inputContainer">
            <label htmlFor="searchInput" />
            <input
                type="text"
                id="searchInput"
                name='searchInput'
                placeholder='Find Task'
                value={inputValue}
                onChange={handleInputChange}
            />
            <img src="/assets/icons/search.png" alt="Search Icon" />
        </div>
    );
}

export default SearchInput;

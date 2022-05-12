import React from 'react'

const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales']

export default function ProjectFilter({ currentFilter, changeFilter }) {
    return (
        <div className="project-filter">
            <nav>
                <p>Filter:</p>
                {filterList.map(el => (
                    <button
                        className={`${currentFilter === el ? 'active' : ''}`}
                        key={el}
                        onClick={() => changeFilter(el)}
                    >
                        {el}
                    </button>
                ))}
            </nav>
        </div>
    )
}

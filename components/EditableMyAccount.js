import { useState } from 'react';

export default function EditableMyAccount({ data, columns, onDelete, onAdd, onEdit }) {

    // console.log('data?.[0]=', data?.[0]);
    // console.log('data=', data);

    const
        [addInputsVal, setAddInputsVal] = useState(Array(columns.length).fill('')),
        [editInputsVal, setEditInputsVal] = useState(Array(columns.length).fill('')),

        [filterValue, setFilter] = useState(''),
        [sortCol, setSortCol] = useState(0),
        [editUserId, setEditUserId] = useState(null),

        [addSelectsVal, setAddSelectsVal] = useState(''),
        [editSelectsVal, setEditSelectsVal] = useState('');

    let newUser = {};

    // let viewData = data;

    // console.log('editUserId', editUserId);

    let viewData;
    Array.isArray(data) ? viewData = data : viewData = [];
    // console.log('viewData=', viewData);

    console.log('editInputsVal', editInputsVal);
    console.log('newUser', newUser);

    if (sortCol) {
        const
            { getVal } = columns[Math.abs(sortCol) - 1];
        viewData.sort((a, b) => {
            switch (true) {
                case (typeof getVal(a) === 'string' && typeof getVal(b) === 'string'):
                    return Math.sign(sortCol) * getVal(a).localeCompare(getVal(b));
                case (typeof getVal(a) === 'number' && typeof getVal(b) === 'number'):
                    return Math.sign(sortCol) * getVal(a) - getVal(b);
                default:
                    return;
            }
        });
    }

    if (filterValue) {
        viewData = viewData.filter(obj => columns
            .map(col => col.getVal(obj)?.toString().toLowerCase())
            .some(str => str?.includes(filterValue.toLowerCase())));
    }

    // console.log('editUserId=', editUserId);
    // console.log('editInputsVal=', editInputsVal);
    // console.log('addSelectsVal=', addSelectsVal);
    // console.log('newUser=', newUser);

    return <>
        <div className='filter'>
            <span>Search:</span>
            <input
                type="search"
                value={filterValue}
                placeholder='Enter a value to search'
                onInput={evt => setFilter(evt.target.value.trim())}
            />
        </div>
        <table className="admin-panel">
            <thead>
                <tr onClick={evt => {
                    if (!evt.target.closest('th')) return;
                    const index = evt.target.closest('th')?.cellIndex;
                    // if (columns[index].name === 'Actions') return;
                    if (evt.target.closest('th')?.textContent === 'Actions') return;

                    switch (true) {
                        case Math.abs(sortCol) - 1 !== index:
                            setSortCol(index + 1);
                            return;
                        case sortCol - 1 === index:
                            setSortCol(-sortCol);
                            return;
                        case -sortCol - 1 === index:
                            setSortCol(0);
                            return;
                    }
                }}>
                    {columns?.map((col, columN) => (
                        <th key={columN} className={
                            (Math.abs(sortCol) - 1 === columN ? 'sort ' : '') + (-sortCol - 1 === columN ? ' desc' : '')
                        }>{col.name}</th>))}
                    {/* <th>Actions</th> */}
                </tr>
            </thead>
            <tbody>
                {viewData?.map((user, userN) => (
                    <tr key={userN}>
                        {columns?.map(({ name, getVal, setVal }, columN) => (
                            <td key={columN} className={name === 'Role' ? 'td-role' : ''}>

                                {editUserId !== user.id

                                    ? getVal(user)
                                    : name === 'Role'

                                        ? getVal(user)

                                        // ? <select
                                        //     name={name}
                                        //     value={editSelectsVal}
                                        //     onChange={evt => {
                                        //         setEditSelectsVal(evt.target.value);
                                        //         setEditInputsVal(editInputsVal.with(columN, evt.target.value));
                                        //     }}
                                        // >
                                        //     <option value=""></option>
                                        //     {/* <option value="user">user</option> */}
                                        //     <option value="admin">admin</option>
                                        //     <option value="moderator">moderator</option>
                                        //     <option value="banned">banned</option>
                                        // </select>
                                        // : name === 'Name' || name === 'Email'
                                        : setVal
                                            ? <input
                                                key={name}
                                                value={editInputsVal[columN]}
                                                placeholder={name}
                                                onInput={evt => setEditInputsVal(editInputsVal.with(columN, evt.currentTarget.value))}
                                            />
                                            : getVal(user)
                                }

                            </td>
                        ))}
                        {/* <td className='actions-buttons'>{editUserId === user.id
                            ? <>
                                <button onClick={() => {
                                    newUser.id = editUserId;
                                    setEditUserId(null);
                                    columns.forEach((col, columN) => {
                                        if (col?.setVal) {
                                            Object.assign(newUser, col.setVal(editInputsVal[columN]));
                                            setEditSelectsVal('');
                                        }
                                    });
                                    onEdit?.(newUser);
                                }}>ok</button>
                                <button onClick={() => {
                                    setEditUserId(null);
                                }}>cancel</button>
                            </>
                            : <>
                                <button className="edit-button" onClick={() => {
                                    setEditUserId(user.id);
                                    setEditInputsVal(columns.map(({ getVal }) => getVal(user)));
                                    setEditSelectsVal(user.role);
                                }}>edit</button>
                                <button className="delete-button" onClick={() => {

                                    newUser = user;

                                    console.log(newUser);
                                    // onDelete?.({ id: user.id });
                                    onDelete?.({ id: user.id });
                                }}>delete</button>
                            </>
                        }</td> */}
                    </tr>)
                )}
            </tbody>
        </table >
    </>;
}
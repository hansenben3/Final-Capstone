import React from "react";

function TableData ({tables, setTable, setReservations}) {
    if(tables){

        const finish = (event) => {
            const id = event.target.id[0];
            if(window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
                fetch(`http://localhost:5000/tables/${id}/seat`, {
                    method: 'DELETE'
                })
                .then(() => {
                    window.location.reload();
                })
            }
            else{
                return;
            }
        }
    const data = tables.map((table) => {
        return (
            <div className="table" key = {table.table_id} >
                <h2>Table ID : {table.table_id}</h2>
                <h3>Table Name : {table.table_name}</h3>
                <h3>Capacity : {table.capacity}</h3>
                <div>
                    {!table.reservation_id ? 
                        <h3 data-table-id-status={table.table_id}>
                            Free
                        </h3>
                        :
                        <div>
                        <h3 data-table-id-status={table.table_id}>
                            Occupied
                        </h3>
                        <br></br>
                        <br></br>
                        <button data-table-id-finish={table.table_id} id={table.table_id} onClick={finish}>
                            Finish
                        </button> 
                        </div>
                    }
                </div>
            </div>
        )
    })
    return (
        <div className="tableContainer">
            {data}
        </div>
    )
    }
}

export default TableData;
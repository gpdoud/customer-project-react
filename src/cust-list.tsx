import { useState, useEffect } from 'react';
import { Customer } from './customer';
const uri = "http://localhost:5254/api/customersupports";

const callUserList = async () => {
  const res = await fetch(uri);
  const customers = await res.json();
  console.debug("Customers:", customers);
  return customers;
}

function CustList() {

    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        callUserList()
            .then(res => setCustomers(res));
    }, []);

    let trs = [];
    for (let u of customers) {
        trs.push(
            <tr key={'key'+u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.phone ?? "(null)"}</td>
                <td>{u.email ?? "(null)"}</td>
                <td>{u.isActive ? "Y" : "N"}</td>
            </tr>
        )
    }

    return (
        <>
            <h2>Customer Support List</h2>
            <main>
            <table className='table table-sm'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Admin?</th>
                    </tr>
                </thead>
                <tbody>
                    {trs}
                </tbody>
            </table>
        </main>
        </>
    )
}

export default CustList;